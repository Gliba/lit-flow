/**
 * FlowEdge - Edge component for connecting nodes
 * Renders SVG paths between nodes
 */

import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getBezierPath, getSmoothStepPath, getStraightPath, Position } from '../utils/geometry';
import type { Node, MarkerSpec, EdgeType } from '../core/types';

@customElement('flow-edge')
export class FlowEdge extends LitElement {
  // Render in light DOM so marker defs in parent shadow root are addressable
  /*
  protected createRenderRoot() {
    return this;
  }
  */
  static styles = css`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
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
      stroke-width: 3;
      cursor: pointer;
      pointer-events: stroke;
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
  @property({ type: String }) type: EdgeType = 'default';
  @property({ type: Object }) markerStart?: MarkerSpec | string;
  @property({ type: Object }) markerEnd?: MarkerSpec | string;

  private markerHandleHalf = 5; // half of node handle diameter (10px)

  /**
   * Create marker ID from marker spec
   */
  private getMarkerId(spec: MarkerSpec | string | undefined): string | undefined {
    if (!spec) return undefined;
    if (typeof spec === 'string') return spec;
    
    const key = this.normalizeMarkerSpec(spec);
    return `marker-${this.hashString(key)}`;
  }

  /**
   * Create marker SVG from marker spec
   */
  private createMarkerSVG(id: string, spec: MarkerSpec): string {
    if (spec.type === 'custom') {
      const width = spec.width ?? 10;
      const height = spec.height ?? 10;
      const refX = (spec.refX ?? width) + this.markerHandleHalf;
      const refY = spec.refY ?? height / 2;
      const color = spec.color ?? 'currentColor';
      const orient = spec.orient ?? 'auto';
      return `<marker id="${id}" markerWidth="${width}" markerHeight="${height}" refX="${refX}" refY="${refY}" orient="${orient}" markerUnits="userSpaceOnUse"><path d="${spec.path}" fill="${color}" stroke="${color}"/></marker>`;
    }
    
    const width = spec.width ?? 10;
    const height = spec.height ?? 10;
    const orient = spec.orient ?? 'auto';
    const color = spec.color ?? 'currentColor';
    const refX = (spec.type === 'ArrowClosed' ? width : width) + this.markerHandleHalf;
    const refY = height / 2;
    
    if (spec.type === 'ArrowClosed') {
      // Triangle pointing right with tip at (width, height/2)
      const path = `M0,0 L${width},${refY} L0,${height} Z`;
      return `<marker id="${id}" markerWidth="${width}" markerHeight="${height}" refX="${refX}" refY="${refY}" orient="${orient}" markerUnits="userSpaceOnUse"><path d="${path}" fill="${color}"/></marker>`;
    }
    
    // Arrow (open) -> V shape stroke
    const path = `M0,0 L${width},${refY} L0,${height}`;
    return `<marker id="${id}" markerWidth="${width}" markerHeight="${height}" refX="${refX}" refY="${refY}" orient="${orient}" markerUnits="userSpaceOnUse"><path d="${path}" fill="none" stroke="${color}" stroke-width="2"/></marker>`;
  }

  /**
   * Normalize marker spec to a string key for caching
   */
  private normalizeMarkerSpec(spec: MarkerSpec): string {
    if (spec.type === 'custom') {
      const { path, width = 20, height = 20, refX = 20, refY = 10, orient = 'auto', color = 'currentColor' } = spec;
      return `custom|p=${path}|w=${width}|h=${height}|rx=${refX}|ry=${refY}|o=${orient}|c=${color}`;
    }
    const { width = 20, height = 20, orient = 'auto', color = 'currentColor' } = spec;
    return `builtin|${spec.type}|w=${width}|h=${height}|o=${orient}|c=${color}`;
  }

  /**
   * Simple hash function for generating unique IDs
   */
  private hashString(input: string): string {
    let h = 0;
    for (let i = 0; i < input.length; i++) {
      h = (h << 5) - h + input.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h).toString(36);
  }

  /**
   * Get path based on edge type
   */
  private getPathForType(source: any, target: any): [path: string, labelX: number, labelY: number, offsetX: number, offsetY: number] {
    const sourceX = source.x;
    const sourceY = source.y;
    const targetX = target.x;
    const targetY = target.y;
    const sourcePosition = source.position;
    const targetPosition = target.position;

    switch (this.type) {
      case 'straight':
        return getStraightPath({
          sourceX,
          sourceY,
          targetX,
          targetY,
        });
      
      case 'smoothstep':
        return getSmoothStepPath({
          sourceX,
          sourceY,
          sourcePosition,
          targetX,
          targetY,
          targetPosition,
        });
      
      case 'step':
        return getSmoothStepPath({
          sourceX,
          sourceY,
          sourcePosition,
          targetX,
          targetY,
          targetPosition,
          borderRadius: 0, // Step edges have no border radius
        });
      
      case 'simplebezier':
        return getBezierPath({
          sourceX,
          sourceY,
          sourcePosition,
          targetX,
          targetY,
          targetPosition,
          curvature: 0.5, // Simple bezier with fixed curvature
        });
      
      case 'default':
      default:
        return getBezierPath({
          sourceX,
          sourceY,
          sourcePosition,
          targetX,
          targetY,
          targetPosition,
        });
    }
  }

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

    // Get path based on edge type
    const [path, labelX, labelY, offsetX, offsetY] = this.getPathForType(source, target);

    const pathClasses = [
      'edge-path',
      this.animated && 'animated',
      this.selected && 'selected'
    ].filter(Boolean).join(' ');
    
    // Create markers from specs
    const markerStartId = this.getMarkerId(this.markerStart);
    const markerEndId = this.getMarkerId(this.markerEnd);
    
    const markerStart = markerStartId ? `url(#${markerStartId})` : undefined;
    const markerEnd = markerEndId ? `url(#${markerEndId})` : undefined;

    const dashAttr = this.animated ? '5' : '';

    return html`
      <svg style="position:absolute; top:0; left:0; width:100%; height:100%; overflow:visible">
        <defs>
          ${markerStartId && typeof this.markerStart === 'object' ? 
            svg`<marker id="${markerStartId}" markerWidth="${this.markerStart.width || 10}" markerHeight="${this.markerStart.height || 10}" refX="${((this.markerStart.type === 'custom' ? (this.markerStart as any).refX : undefined) || this.markerStart.width || 10) + this.markerHandleHalf}" refY="${(this.markerStart.type === 'custom' ? (this.markerStart as any).refY : undefined) || (this.markerStart.height || 10) / 2}" orient="${this.markerStart.orient || 'auto'}" markerUnits="userSpaceOnUse">
              ${this.markerStart.type === 'custom' ? 
                svg`<path d="${(this.markerStart as any).path}" fill="${this.markerStart.color || 'currentColor'}" stroke="${this.markerStart.color || 'currentColor'}"/>` :
                this.markerStart.type === 'ArrowClosed' ?
                  svg`<path d="M0,0 L${this.markerStart.width || 10},${(this.markerStart.height || 10) / 2} L0,${this.markerStart.height || 10} Z" fill="${this.markerStart.color || 'currentColor'}"/>` :
                  svg`<path d="M0,0 L${this.markerStart.width || 10},${(this.markerStart.height || 10) / 2} L0,${this.markerStart.height || 10}" fill="none" stroke="${this.markerStart.color || 'currentColor'}" stroke-width="2"/>`
              }
            </marker>` : 
            ''}
          ${markerEndId && typeof this.markerEnd === 'object' ? 
            svg`<marker id="${markerEndId}" markerWidth="${this.markerEnd.width || 10}" markerHeight="${this.markerEnd.height || 10}" refX="${((this.markerEnd.type === 'custom' ? (this.markerEnd as any).refX : undefined) || this.markerEnd.width || 10) + this.markerHandleHalf}" refY="${(this.markerEnd.type === 'custom' ? (this.markerEnd as any).refY : undefined) || (this.markerEnd.height || 10) / 2}" orient="${this.markerEnd.orient || 'auto'}" markerUnits="userSpaceOnUse">
              ${this.markerEnd.type === 'custom' ? 
                svg`<path d="${(this.markerEnd as any).path}" fill="${this.markerEnd.color || 'currentColor'}" stroke="${this.markerEnd.color || 'currentColor'}"/>` :
                this.markerEnd.type === 'ArrowClosed' ?
                  svg`<path d="M0,0 L${this.markerEnd.width || 10},${(this.markerEnd.height || 10) / 2} L0,${this.markerEnd.height || 10} Z" fill="${this.markerEnd.color || 'currentColor'}"/>` :
                  svg`<path d="M0,0 L${this.markerEnd.width || 10},${(this.markerEnd.height || 10) / 2} L0,${this.markerEnd.height || 10}" fill="none" stroke="${this.markerEnd.color || 'currentColor'}" stroke-width="2"/>`
              }
            </marker>` : 
            ''}
        </defs>
        ${svg`
          <path 
            class="${pathClasses}"
            d="${path}"
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
    
    // Toggle selection
    const newSelected = !this.selected;
    this.selected = newSelected;
    
    // Dispatch selection event
    this.dispatchEvent(new CustomEvent('edge-select', {
      detail: { 
        edgeId: this.id,
        selected: newSelected,
        edge: {
          id: this.id,
          source: this.source,
          target: this.target,
          sourceHandle: this.sourceHandle,
          targetHandle: this.targetHandle,
          label: this.label,
          animated: this.animated,
          selected: newSelected
        }
      },
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

