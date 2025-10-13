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

  render() {
    if (!this.sourceNode || !this.targetNode) {
      return html``;
    }
    // Compute in canvas coordinates using node positions and widths/heights
    const sourceWidth = this.sourceNode.measured?.width || this.sourceNode.width || 150;
    const sourceHeight = this.sourceNode.measured?.height || this.sourceNode.height || 50;
    const targetWidth = this.targetNode.measured?.width || this.targetNode.width || 150;
    const targetHeight = this.targetNode.measured?.height || this.targetNode.height || 50;
    const sourceX = this.sourceNode.position.x + sourceWidth;
    const sourceY = this.sourceNode.position.y + sourceHeight / 2;
    const targetX = this.targetNode.position.x;
    const targetY = this.targetNode.position.y + targetHeight / 2;

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

