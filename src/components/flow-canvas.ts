/**
 * FlowCanvas - Main container component for the flow diagram
 * This is the root element that manages the viewport and renders nodes/edges
 */

import { LitElement, css } from 'lit';
import { html, svg, unsafeStatic } from 'lit/static-html.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { FlowInstance } from '../core/flow-instance';
import type { Node, Edge, Viewport, MarkerSpec } from '../core/types';
import { getBezierPath, Position } from '../utils/geometry';

@customElement('flow-canvas')
export class FlowCanvas extends LitElement {
  protected createRenderRoot() {
    return super.createRenderRoot();
  }
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      background: var(--flow-background-color, #fafafa);
    }

    .flow-container {
      width: 100%;
      height: 100%;
      position: relative;
      cursor: grab;
    }

    .flow-container.panning {
      cursor: grabbing;
    }

    .flow-viewport {
      width: 100%;
      height: 100%;
      position: relative;
      transform-origin: 0 0;
      will-change: transform;
    }

    .flow-nodes-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .flow-edges-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .flow-labels-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .edge-label {
      position: absolute;
      transform: translate(-50%, -50%);
      background: white;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 12px;
      color: #333;
      pointer-events: all;
      white-space: nowrap;
      user-select: none;
    }
  `;

  @property({ type: Array }) nodes: Node[] = [];
  @property({ type: Array }) edges: Edge[] = [];
  @property({ type: Object }) viewport: Viewport = { x: 0, y: 0, zoom: 1 };
  
  // Node type registry (maps type name to tag name)
  @property({ type: Object }) nodeTypes: Record<string, string> = {};

  private connection: { 
    from?: { nodeId: string; handleId?: string }; 
    to?: { nodeId: string; handleId?: string }; 
    preview?: { x: number; y: number } 
  } | null = null;

  // Marker registry: normalizedKey -> id
  private markerRegistry = new Map<string, string>();
  private markerDefs: Array<{ id: string; svg: string }> = [];
  private markerHandleHalf = 5; // half of node handle diameter (10px)

  private getMarkerId(spec: MarkerSpec | string | undefined): string | undefined {
    if (!spec) return undefined;
    if (typeof spec === 'string') return spec;
    const key = this.normalizeMarkerSpec(spec);
    const existing = this.markerRegistry.get(key);
    if (existing) return existing;
    const id = `marker-${this.hashString(key)}`;
    const svg = this.createMarkerSVG(id, spec);
    this.markerRegistry.set(key, id);
    this.markerDefs.push({ id, svg });
    return id;
  }

  private getMarkerSVGById(id?: string): string | undefined {
    if (!id) return undefined;
    const def = this.markerDefs.find((d) => d.id === id);
    return def?.svg;
  }

  private normalizeMarkerSpec(spec: MarkerSpec): string {
    if (spec.type === 'custom') {
      const { path, width = 20, height = 20, refX = 20, refY = 10, orient = 'auto', color = 'currentColor' } = spec;
      return `custom|p=${path}|w=${width}|h=${height}|rx=${refX}|ry=${refY}|o=${orient}|c=${color}`;
    }
    const { width = 20, height = 20, orient = 'auto', color = 'currentColor' } = spec;
    return `builtin|${spec.type}|w=${width}|h=${height}|o=${orient}|c=${color}`;
  }

  private hashString(input: string): string {
    let h = 0;
    for (let i = 0; i < input.length; i++) h = (h << 5) - h + input.charCodeAt(i), h |= 0;
    return Math.abs(h).toString(36);
  }

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

  private getNodeGeom(nodeId: string): { left: { x: number; y: number }; right: { x: number; y: number } } | null {
    const el = this.renderRoot.querySelector(`flow-node[id="${CSS.escape(nodeId)}"]`) as HTMLElement | null;
    const viewportEl = this.renderRoot.querySelector('.flow-viewport') as HTMLElement | null;
    if (!el || !viewportEl) return null;
    const rect = el.getBoundingClientRect();
    const vpRect = viewportEl.getBoundingClientRect();
    const z = this.viewport.zoom || 1;
    const x = (rect.left - vpRect.left - this.viewport.x) / z;
    const y = (rect.top - vpRect.top - this.viewport.y) / z;
    const w = rect.width / z;
    const h = rect.height / z;
    const cy = y + h / 2;
    return { left: { x: x, y: cy }, right: { x: x + w, y: cy } };
  }

  /**
   * Get handle position in canvas coordinates
   */
  private getHandleCanvasPosition(nodeId: string, handleId: string): { x: number; y: number } | null {
    const nodeEl = this.renderRoot.querySelector(`[id="${CSS.escape(nodeId)}"]`) as HTMLElement | null;
    if (!nodeEl) return null;

    // Find handle element in shadow root or light DOM
    let handleEl: HTMLElement | null = null;
    const shadowRoot = nodeEl.shadowRoot;
    if (shadowRoot) {
      handleEl = shadowRoot.querySelector(`[data-handle-id="${CSS.escape(handleId)}"]`) as HTMLElement;
    }
    if (!handleEl) {
      handleEl = nodeEl.querySelector(`[data-handle-id="${CSS.escape(handleId)}"]`) as HTMLElement;
    }
    if (!handleEl) return null;

    // Get node data
    const node = this.nodes.find(n => n.id === nodeId);
    if (!node) return null;

    // Calculate handle offset within node
    const nodeRect = nodeEl.getBoundingClientRect();
    const handleRect = handleEl.getBoundingClientRect();
    const zoom = this.viewport.zoom || 1;
    
    const offsetX = (handleRect.left + handleRect.width / 2 - nodeRect.left) / zoom;
    const offsetY = (handleRect.top + handleRect.height / 2 - nodeRect.top) / zoom;
    
    return {
      x: node.position.x + offsetX,
      y: node.position.y + offsetY
    };
  }

  private computeLabelCanvasPosition(edge: Edge): { x: number; y: number } | null {
    const sourceNode = this.nodes.find(n => n.id === edge.source);
    const targetNode = this.nodes.find(n => n.id === edge.target);
    if (!sourceNode || !targetNode) return null;
    
    // Try to use specific handle positions if available
    let sourceX: number, sourceY: number;
    let targetX: number, targetY: number;

    if (edge.sourceHandle) {
      const handlePos = this.getHandleCanvasPosition(edge.source, edge.sourceHandle);
      if (handlePos) {
        sourceX = handlePos.x;
        sourceY = handlePos.y;
      } else {
        // Fallback to node edge
        const sourceWidth = sourceNode.measured?.width || sourceNode.width || 150;
        const sourceHeight = sourceNode.measured?.height || sourceNode.height || 50;
        sourceX = sourceNode.position.x + sourceWidth;
        sourceY = sourceNode.position.y + sourceHeight / 2;
      }
    } else {
      const sourceWidth = sourceNode.measured?.width || sourceNode.width || 150;
      const sourceHeight = sourceNode.measured?.height || sourceNode.height || 50;
      sourceX = sourceNode.position.x + sourceWidth;
      sourceY = sourceNode.position.y + sourceHeight / 2;
    }

    if (edge.targetHandle) {
      const handlePos = this.getHandleCanvasPosition(edge.target, edge.targetHandle);
      if (handlePos) {
        targetX = handlePos.x;
        targetY = handlePos.y;
      } else {
        // Fallback to node edge
        targetX = targetNode.position.x;
        const targetHeight = targetNode.measured?.height || targetNode.height || 50;
        targetY = targetNode.position.y + targetHeight / 2;
      }
    } else {
      targetX = targetNode.position.x;
      const targetHeight = targetNode.measured?.height || targetNode.height || 50;
      targetY = targetNode.position.y + targetHeight / 2;
    }
    
    const [, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition: Position.Right,
      targetX,
      targetY,
      targetPosition: Position.Left,
    });
    
    return { x: labelX, y: labelY };
  }

  private computeStartLabelCanvasPosition(edge: Edge): { x: number; y: number } | null {
    const sourceNode = this.nodes.find(n => n.id === edge.source);
    if (!sourceNode) return null;
    
    let sourceX: number, sourceY: number;

    if (edge.sourceHandle) {
      const handlePos = this.getHandleCanvasPosition(edge.source, edge.sourceHandle);
      if (handlePos) {
        sourceX = handlePos.x;
        sourceY = handlePos.y;
      } else {
        const sourceWidth = sourceNode.measured?.width || sourceNode.width || 150;
        const sourceHeight = sourceNode.measured?.height || sourceNode.height || 50;
        sourceX = sourceNode.position.x + sourceWidth;
        sourceY = sourceNode.position.y + sourceHeight / 2;
      }
    } else {
      const sourceWidth = sourceNode.measured?.width || sourceNode.width || 150;
      const sourceHeight = sourceNode.measured?.height || sourceNode.height || 50;
      sourceX = sourceNode.position.x + sourceWidth;
      sourceY = sourceNode.position.y + sourceHeight / 2;
    }
    
    return { x: sourceX + 12, y: sourceY - 10 };
  }

  private computeEndLabelCanvasPosition(edge: Edge): { x: number; y: number } | null {
    const targetNode = this.nodes.find(n => n.id === edge.target);
    if (!targetNode) return null;
    
    let targetX: number, targetY: number;

    if (edge.targetHandle) {
      const handlePos = this.getHandleCanvasPosition(edge.target, edge.targetHandle);
      if (handlePos) {
        targetX = handlePos.x;
        targetY = handlePos.y;
      } else {
        const targetHeight = targetNode.measured?.height || targetNode.height || 50;
        targetX = targetNode.position.x;
        targetY = targetNode.position.y + targetHeight / 2;
      }
    } else {
      const targetHeight = targetNode.measured?.height || targetNode.height || 50;
      targetX = targetNode.position.x;
      targetY = targetNode.position.y + targetHeight / 2;
    }
    
    return { x: targetX - 12, y: targetY - 10 };
  }

  instance: FlowInstance;
  private unsubscribe?: () => void;

  constructor() {
    super();
    this.instance = new FlowInstance({ nodes: this.nodes, edges: this.edges });
  }

  firstUpdated() {
    const container = this.renderRoot.querySelector('.flow-container') as HTMLElement;
    if (container) {
      this.instance.mount(container);
      this.unsubscribe = this.instance.subscribe((state) => {
        this.nodes = state.nodes;
        this.edges = state.edges;
        this.viewport = state.viewport;
        this.requestUpdate();
      });
      container.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe?.();
    this.instance.destroy();
    const container = this.renderRoot.querySelector('.flow-container') as HTMLElement | null;
    container?.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  /**
   * Renders a node with dynamic tag name based on node type
   * Falls back to 'flow-node' if type is not registered
   */
  private renderNode(node: Node) {
    // Get the tag name for this node type, or use default 'flow-node'
    const nodeType = node.type || 'default';
    const tagName = this.nodeTypes[nodeType] || 'flow-node';
    
    // Use lit-html's unsafeStatic to render dynamic tag names
    const tag = unsafeStatic(tagName);
    
    return html`
      <${tag}
        .id=${node.id}
        .data=${node.data}
        .position=${node.position}
        .selected=${node.selected || false}
        .draggable=${node.draggable !== false}
        .instance=${this.instance}
        @handle-start=${this.onHandleStart}
      ></${tag}>
    `;
  }

  render() {
    const transform = `translate(${this.viewport.x}px, ${this.viewport.y}px) scale(${this.viewport.zoom})`;
    
    return html`
      <div class="flow-container">
        <slot name="background"></slot>
        <div 
          class="flow-viewport" 
          style=${styleMap({ transform })}
        >
          <div class="flow-edges-layer">
            <svg style="position:absolute;top:0;left:0;width:0;height:0;overflow:visible">
              <defs>
                ${this.markerDefs.map(def => unsafeSVG(def.svg))}
              </defs>
            </svg>
            ${this.edges.map(edge => {
              const sourceNode = this.nodes.find(n => n.id === edge.source);
              const targetNode = this.nodes.find(n => n.id === edge.target);
              
              if (!sourceNode || !targetNode) return null;
              
              const markerStartId = this.getMarkerId(edge.markerStart as any);
              const markerEndId = this.getMarkerId(edge.markerEnd as any);
              const markerStartDef = this.getMarkerSVGById(markerStartId);
              const markerEndDef = this.getMarkerSVGById(markerEndId);
              return html`
                <flow-edge 
                  .id=${edge.id}
                  .source=${edge.source}
                  .target=${edge.target}
                  .sourceHandle=${edge.sourceHandle}
                  .targetHandle=${edge.targetHandle}
                  .sourceNode=${sourceNode}
                  .targetNode=${targetNode}
                  .animated=${edge.animated || false}
                  .label=${(edge as any).label || ''}
                  .markerStartId=${markerStartId}
                  .markerEndId=${markerEndId}
                  .markerStartDef=${markerStartDef}
                  .markerEndDef=${markerEndDef}
                ></flow-edge>
              `;
            })}
            ${this.renderPreviewEdge()}
          </div>
          <div class="flow-nodes-layer">
            ${this.nodes.map(node => this.renderNode(node))}
          </div>
          <div class="flow-labels-overlay">
            ${this.edges.map(edge => {
              const labelHtml = (edge.data && (edge.data as any).labelHtml) as string | undefined;
              const labelText = (edge.data && (edge.data as any).label) as string | undefined;
              const hasCenter = !!labelHtml || !!labelText;
              if (!hasCenter) return null;
              const pos = this.computeLabelCanvasPosition(edge);
              if (!pos) return null;
              const style = `transform: translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px);`;
              return labelHtml
                ? html`<div class="edge-label" style="${style}" .innerHTML=${labelHtml}></div>`
                : html`<div class="edge-label" style="${style}">${labelText}</div>`;
            })}
            ${this.edges.map(edge => {
              const startHtml = (edge.data && (edge.data as any).startLabelHtml) as string | undefined;
              const startText = (edge.data && (edge.data as any).startLabel) as string | undefined;
              if (!startHtml && !startText) return null;
              const pos = this.computeStartLabelCanvasPosition(edge);
              if (!pos) return null;
              const style = `transform: translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px);`;
              return startHtml
                ? html`<div class="edge-label" style="${style}" .innerHTML=${startHtml}></div>`
                : html`<div class="edge-label" style="${style}">${startText}</div>`;
            })}
            ${this.edges.map(edge => {
              const endHtml = (edge.data && (edge.data as any).endLabelHtml) as string | undefined;
              const endText = (edge.data && (edge.data as any).endLabel) as string | undefined;
              if (!endHtml && !endText) return null;
              const pos = this.computeEndLabelCanvasPosition(edge);
              if (!pos) return null;
              const style = `transform: translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px);`;
              return endHtml
                ? html`<div class="edge-label" style="${style}" .innerHTML=${endHtml}></div>`
                : html`<div class="edge-label" style="${style}">${endText}</div>`;
            })}
          </div>
        </div>
        <slot></slot>
      </div>
    `;
  }

  private screenToCanvas(x: number, y: number) {
    const container = this.renderRoot.querySelector('.flow-container') as HTMLElement | null;
    if (!container) return { x, y };
    const rect = container.getBoundingClientRect();
    const vx = this.viewport.x;
    const vy = this.viewport.y;
    const z = this.viewport.zoom || 1;
    return { x: (x - rect.left - vx) / z, y: (y - rect.top - vy) / z };
  }

  private onHandleStart = (e: CustomEvent<{ nodeId: string; type: 'source' | 'target'; handleId?: string }>) => {
    const { nodeId, type, handleId } = e.detail;
    if (type === 'source') {
      this.connection = { from: { nodeId, handleId } };
    } else {
      this.connection = { to: { nodeId, handleId } };
    }
  };

  private onMouseMove = (e: MouseEvent) => {
    if (!this.connection) return;
    const p = this.screenToCanvas(e.clientX, e.clientY);
    this.connection.preview = p;
    this.requestUpdate();
  };

  private onMouseUp = (e: MouseEvent) => {
    if (!this.connection) return;

    const path = e.composedPath() as EventTarget[];
    let targetEl: HTMLElement | null = null;
    let targetHandleId: string | undefined;
    
    // Find target node element (can be flow-node or any custom node type)
    for (const t of path) {
      if (t instanceof HTMLElement) {
        const tagName = t.tagName.toLowerCase();
        // Check if it's a node element (flow-node or any registered custom node type)
        if (tagName === 'flow-node' || Object.values(this.nodeTypes).some(tag => tag === tagName)) {
          targetEl = t;
          break;
        }
        // Check if it's a handle element
        if (t.dataset.handleId) {
          targetHandleId = t.dataset.handleId;
        }
      }
    }
    const targetId = targetEl?.getAttribute('id') || undefined;

    if (this.connection.from && targetId && targetId !== this.connection.from.nodeId) {
      const newEdgeId = `e-${this.connection.from.nodeId}-${targetId}-${Date.now()}`;
      this.instance.addEdge({ 
        id: newEdgeId, 
        source: this.connection.from.nodeId, 
        target: targetId, 
        sourceHandle: this.connection.from.handleId,
        targetHandle: targetHandleId,
        data: {} 
      });
    }

    if (this.connection.to && targetId && targetId !== this.connection.to.nodeId) {
      const newEdgeId = `e-${targetId}-${this.connection.to.nodeId}-${Date.now()}`;
      this.instance.addEdge({ 
        id: newEdgeId, 
        source: targetId, 
        target: this.connection.to.nodeId, 
        sourceHandle: targetHandleId,
        targetHandle: this.connection.to.handleId,
        data: {} 
      });
    }

    this.connection = null;
    this.requestUpdate();
  };

  private renderPreviewEdge() {
    if (!this.connection || !this.connection.preview) return null;

    const preview = this.connection.preview;
    const nodeFrom = this.connection.from ? this.nodes.find(n => n.id === this.connection!.from!.nodeId) : null;
    const nodeTo = this.connection.to ? this.nodes.find(n => n.id === this.connection!.to!.nodeId) : null;

    if (nodeFrom) {
      return html`
        <flow-edge
          .id=${'preview'}
          .source=${nodeFrom.id}
          .target=${'__preview__'}
          .sourceHandle=${this.connection.from?.handleId}
          .sourceNode=${{ ...nodeFrom, position: nodeFrom.position } as any}
          .targetNode=${{ id: '__preview__', position: { x: preview.x, y: preview.y }, width: 1, height: 1, data: {} } as any}
          .animated=${true}
          .label=${''}
        ></flow-edge>
      `;
    }

    if (nodeTo) {
      return html`
        <flow-edge
          .id=${'preview'}
          .source=${'__preview__'}
          .target=${nodeTo.id}
          .sourceNode=${{ id: '__preview__', position: { x: preview.x, y: preview.y }, width: 1, height: 1, data: {} } as any}
          .targetHandle=${this.connection.to?.handleId}
          .targetNode=${{ ...nodeTo, position: nodeTo.position } as any}
          .animated=${true}
          .label=${''}
        ></flow-edge>
      `;
    }

    return null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flow-canvas': FlowCanvas;
  }
}

