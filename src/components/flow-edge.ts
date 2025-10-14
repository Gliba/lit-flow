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
  @property({ type: String }) sourceHandle?: string;
  @property({ type: String }) targetHandle?: string;
  @property({ type: Object }) sourceNode?: Node;
  @property({ type: Object }) targetNode?: Node;
  @property({ type: Boolean }) animated = false;
  @property({ type: Boolean }) selected = false;
  @property({ type: String }) label = '';
  @property({ type: String }) markerStartId?: string;
  @property({ type: String }) markerEndId?: string;
  @property({ type: String }) markerStartDef?: string;
  @property({ type: String }) markerEndDef?: string;

  /** Returns the ShadowRoot of the parent flow-canvas */
  private getFlowCanvasRoot(): ShadowRoot | null {
    const root = this.getRootNode();
    return root instanceof ShadowRoot ? root : null;
  }

  /** Returns the flow-canvas host element (if available) */
  private getFlowCanvasHost(): HTMLElement | null {
    const root = this.getFlowCanvasRoot();
    // root.host will be the <flow-canvas> instance
    return (root && (root as any).host) || null;
  }

  /**
   * Find a specific handle element within a node
   */
  private findHandleElement(nodeId: string, handleId: string): HTMLElement | null {
    // Look up the node element by id inside the flow-canvas shadowRoot
    const canvasRoot = this.getFlowCanvasRoot();
    if (!canvasRoot) return null;

    const node = canvasRoot.querySelector(`[id="${CSS.escape(nodeId)}"]`) as HTMLElement | null;
    if (!node) return null; // node not rendered yet

    // Look in shadow root first, then light DOM
    const shadowRoot = node.shadowRoot;
    let handle: HTMLElement | null = null;
    
    if (shadowRoot) {
      handle = shadowRoot.querySelector(`[data-handle-id="${CSS.escape(handleId)}"]`) as HTMLElement;
    }
    
    if (!handle) {
      handle = node.querySelector(`[data-handle-id="${CSS.escape(handleId)}"]`) as HTMLElement;
    }
    
    return handle;
  }

  /**
   * Get the canvas coordinates of a specific handle
   */
  private getHandlePosition(nodeId: string, handleId: string): { x: number; y: number } | null {
    const handleEl = this.findHandleElement(nodeId, handleId);
    if (!handleEl) return null;

    // Get the node element
    const canvasRoot = this.getFlowCanvasRoot();
    if (!canvasRoot) return null;
    
    const nodeEl = canvasRoot.querySelector(`[id="${CSS.escape(nodeId)}"]`) as HTMLElement | null;
    if (!nodeEl) return null;

    // Get handle's offset relative to node
    // Handles are positioned absolutely within nodes
    const nodeRect = nodeEl.getBoundingClientRect();
    const handleRect = handleEl.getBoundingClientRect();
    
    // Get node's canvas position from its position property
    // Since nodeEl is already transformed by viewport, we need the original position
    const node = this.sourceNode?.id === nodeId ? this.sourceNode : this.targetNode;
    if (!node) return null;

    // Calculate handle offset within the node (in unscaled pixels)
    const nodeWidth = node.measured?.width || node.width || 150;
    const nodeHeight = node.measured?.height || node.height || 50;
    
    // Get viewport to calculate scale factor
    const flowCanvas = this.getFlowCanvasHost() as any;
    const viewport = flowCanvas?.viewport || { x: 0, y: 0, zoom: 1 };
    const zoom = viewport.zoom || 1;
    
    // Calculate offset from node's top-left in canvas coordinates
    const offsetX = (handleRect.left + handleRect.width / 2 - nodeRect.left) / zoom;
    const offsetY = (handleRect.top + handleRect.height / 2 - nodeRect.top) / zoom;
    
    return {
      x: node.position.x + offsetX,
      y: node.position.y + offsetY
    };
  }

  /**
   * Get the source position (handle or node edge)
   */
  private getSourcePosition(): { x: number; y: number; position: Position } {
    // Try to get specific handle position
    if (this.sourceHandle && this.sourceNode) {
      const handlePos = this.getHandlePosition(this.sourceNode.id, this.sourceHandle);
      if (handlePos) {
        return { ...handlePos, position: Position.Right };
      }
    }

    // Fall back to node right edge center
    const sourceWidth = this.sourceNode!.measured?.width || this.sourceNode!.width || 150;
    const sourceHeight = this.sourceNode!.measured?.height || this.sourceNode!.height || 50;
    return {
      x: this.sourceNode!.position.x + sourceWidth,
      y: this.sourceNode!.position.y + sourceHeight / 2,
      position: Position.Right
    };
  }

  /**
   * Get the target position (handle or node edge)
   */
  private getTargetPosition(): { x: number; y: number; position: Position } {
    // Try to get specific handle position
    if (this.targetHandle && this.targetNode) {
      const handlePos = this.getHandlePosition(this.targetNode.id, this.targetHandle);
      if (handlePos) {
        return { ...handlePos, position: Position.Left };
      }
    }

    // Fall back to node left edge center
    const targetHeight = this.targetNode!.measured?.height || this.targetNode!.height || 50;
    return {
      x: this.targetNode!.position.x,
      y: this.targetNode!.position.y + targetHeight / 2,
      position: Position.Left
    };
  }

  render() {
    if (!this.sourceNode || !this.targetNode) {
      return html``;
    }

    // Get source and target positions (handles or node edges)
    const source = this.getSourcePosition();
    const target = this.getTargetPosition();

    // Get bezier path
    const [path, labelX, labelY] = getBezierPath({
      sourceX: source.x,
      sourceY: source.y,
      sourcePosition: source.position,
      targetX: target.x,
      targetY: target.y,
      targetPosition: target.position,
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

