/**
 * FlowEdge - Edge component for connecting nodes
 * Renders SVG paths between nodes
 */

import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getBezierPath, Position } from '../utils/geometry';
import type { Node } from '../core/types';

@customElement('flow-edge')
export class FlowEdge extends LitElement {
  // Render in light DOM so marker defs in parent shadow root are addressable
  protected createRenderRoot() {
    return this;
  }
  static styles = css`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .edge-path {
      fill: none;
      stroke: var(--flow-edge-color, #b1b1b7);
      stroke-width: 2;
      pointer-events: stroke;
      cursor: pointer;
    }

    .edge-path:hover {
      stroke: var(--flow-edge-selected-color, #1a73e8);
    }

    .edge-path.selected {
      stroke: var(--flow-edge-selected-color, #1a73e8);
    }

    .edge-path.animated {
      stroke-dasharray: 5;
      animation: dashdraw 0.5s linear infinite;
    }

    .edge-label {
      pointer-events: none;
      user-select: none;
      fill: #333;
      font-size: 12px;
    }

    @keyframes dashdraw {
      to {
        stroke-dashoffset: -10;
      }
    }
  `;

  @property({ type: String }) id = '';
  @property({ type: String }) source = '';
  @property({ type: String }) target = '';
  @property({ type: Object }) sourceNode?: Node;
  @property({ type: Object }) targetNode?: Node;
  @property({ type: Boolean }) animated = false;
  @property({ type: Boolean }) selected = false;
  @property({ type: String }) label = '';
  @property({ type: String }) markerStartId?: string;
  @property({ type: String }) markerEndId?: string;
  @property({ type: String }) markerStartDef?: string;
  @property({ type: String }) markerEndDef?: string;

  private getViewportTransform(): { x: number; y: number; zoom: number } {
    const root = this.getRootNode() as ShadowRoot;
    const viewport = root.querySelector('.flow-viewport') as HTMLElement | null;
    if (!viewport) return { x: 0, y: 0, zoom: 1 };
    const transform = getComputedStyle(viewport).transform || viewport.style.transform || '';
    // transform is typically matrix(a, b, c, d, e, f) where a=d=scale, e=x, f=y for simple translate/scale
    if (transform.startsWith('matrix(')) {
      const values = transform
        .replace('matrix(', '')
        .replace(')', '')
        .split(',')
        .map((v) => parseFloat(v.trim()));
      const [a, , , d, e, f] = values;
      const zoom = Number.isFinite(a) ? a : 1;
      const x = Number.isFinite(e) ? e : 0;
      const y = Number.isFinite(f) ? f : 0;
      return { x, y, zoom };
    }
    // Fallback for translate(...) scale(...)
    const translateMatch = transform.match(/translate\(([^)]+)\)/);
    const scaleMatch = transform.match(/scale\(([^)]+)\)/);
    const x = translateMatch ? parseFloat(translateMatch[1].split(',')[0]) : 0;
    const y = translateMatch ? parseFloat(translateMatch[1].split(',')[1]) || 0 : 0;
    const zoom = scaleMatch ? parseFloat(scaleMatch[1]) : 1;
    return { x, y, zoom };
  }

  private getNodeCenterAndSides(id: string): {
    left: { x: number; y: number };
    right: { x: number; y: number };
    width: number;
    height: number;
  } | null {
    const root = this.getRootNode() as ShadowRoot;
    const el = root.querySelector(`flow-node[id="${CSS.escape(id)}"]`) as HTMLElement | null;
    const viewport = root.querySelector('.flow-viewport') as HTMLElement | null;
    if (!el || !viewport) return null;

    const vp = this.getViewportTransform();
    const elRect = el.getBoundingClientRect();
    const vpRect = viewport.getBoundingClientRect();

    const width = elRect.width / vp.zoom;
    const height = elRect.height / vp.zoom;
    const leftX = (elRect.left - vpRect.left - vp.x) / vp.zoom;
    const topY = (elRect.top - vpRect.top - vp.y) / vp.zoom;
    const centerY = topY + height / 2;

    return {
      left: { x: leftX, y: centerY },
      right: { x: leftX + width, y: centerY },
      width,
      height,
    };
  }

  render() {
    if (!this.sourceNode || !this.targetNode) {
      return html``;
    }
    // Prefer DOM-based geometry to avoid style-origin offsets; fallback to state sizes
    const sourceGeom = this.getNodeCenterAndSides(this.source);
    const targetGeom = this.getNodeCenterAndSides(this.target);

    let sourceX: number;
    let sourceY: number;
    let targetX: number;
    let targetY: number;

    if (sourceGeom && targetGeom) {
      sourceX = sourceGeom.right.x;
      sourceY = sourceGeom.right.y;
      targetX = targetGeom.left.x;
      targetY = targetGeom.left.y;
    } else {
      // Fallback to state-based measurement
      const sourceWidth = this.sourceNode.measured?.width || this.sourceNode.width || 150;
      const sourceHeight = this.sourceNode.measured?.height || this.sourceNode.height || 50;
      const targetWidth = this.targetNode.measured?.width || this.targetNode.width || 150;
      const targetHeight = this.targetNode.measured?.height || this.targetNode.height || 50;
      sourceX = this.sourceNode.position.x + sourceWidth;
      sourceY = this.sourceNode.position.y + sourceHeight / 2;
      targetX = this.targetNode.position.x;
      targetY = this.targetNode.position.y + targetHeight / 2;
    }

    // Get bezier path
    const [path, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition: Position.Right,
      targetX,
      targetY,
      targetPosition: Position.Left,
    });

    const pathClasses = [
      'edge-path',
      this.animated && 'animated',
      this.selected && 'selected'
    ].filter(Boolean).join(' ');
    
    const markerStart = this.markerStartId ? `url(#${this.markerStartId})` : undefined;
    const markerEnd = this.markerEndId ? `url(#${this.markerEndId})` : undefined;

    const styleAttr = `fill: none; stroke: var(--flow-edge-color, #b1b1b7); stroke-width: 2; pointer-events: stroke;`;
    const dashAttr = this.animated ? '5' : '';

    return html`
      <svg style="position:absolute; top:0; left:0; width:100%; height:100%; overflow:visible">
        ${svg`
          <path 
            class="${pathClasses}"
            d="${path}"
            style="${styleAttr}"
            stroke-dasharray="${dashAttr}"
            marker-start="${markerStart ?? ''}"
            marker-end="${markerEnd ?? ''}"
            @click=${this.handleClick}
          />
          ${this.label ? svg`
            <text 
              x="${labelX}" 
              y="${labelY}" 
              text-anchor="middle"
              dy="-5"
              fill="#333"
              style="user-select:none; pointer-events:none; font-size:12px;"
            >
              ${this.label}
            </text>
          ` : ''}
        `}
      </svg>
    `;
  }

  private handleClick(e: MouseEvent) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('edge-click', {
      detail: { id: this.id },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flow-edge': FlowEdge;
  }
}

