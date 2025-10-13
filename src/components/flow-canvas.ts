/**
 * FlowCanvas - Main container component for the flow diagram
 * This is the root element that manages the viewport and renders nodes/edges
 */

import { LitElement, html, css, svg } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { FlowInstance } from '../core/flow-instance';
import type { Node, Edge, Viewport, MarkerSpec, MarkerBuiltin, MarkerOrient } from '../core/types';

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
  `;

  @property({ type: Array }) nodes: Node[] = [];
  @property({ type: Array }) edges: Edge[] = [];
  @property({ type: Object }) viewport: Viewport = { x: 0, y: 0, zoom: 1 };

  private connection: { from?: { nodeId: string }; to?: { nodeId: string }; preview?: { x: number; y: number } } | null = null;

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
                  .sourceNode=${sourceNode}
                  .targetNode=${targetNode}
                  .animated=${edge.animated || false}
                  .label=${edge.data?.label || ''}
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
            ${this.nodes.map(node => html`
              <flow-node 
                .id=${node.id}
                .data=${node.data}
                .position=${node.position}
                .selected=${node.selected || false}
                .draggable=${node.draggable !== false}
                .instance=${this.instance}
                @handle-start=${this.onHandleStart}
              ></flow-node>
            `)}
          </div>
        </div>
        <slot></slot>
      </div>
    `;
  }

  private screenToCanvas(x: number, y: number) {
    const viewportEl = this.renderRoot.querySelector('.flow-viewport') as HTMLElement | null;
    if (!viewportEl) return { x, y };
    const rect = viewportEl.getBoundingClientRect();
    const vx = this.viewport.x;
    const vy = this.viewport.y;
    const z = this.viewport.zoom || 1;
    return { x: (x - rect.left - vx) / z, y: (y - rect.top - vy) / z };
  }

  private onHandleStart = (e: CustomEvent<{ nodeId: string; type: 'source' | 'target' }>) => {
    const { nodeId, type } = e.detail;
    if (type === 'source') {
      this.connection = { from: { nodeId } };
    } else {
      this.connection = { to: { nodeId } };
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
    for (const t of path) {
      if (t instanceof HTMLElement && t.tagName.toLowerCase() === 'flow-node') {
        targetEl = t;
        break;
      }
    }
    const targetId = targetEl?.getAttribute('id') || undefined;

    if (this.connection.from && targetId && targetId !== this.connection.from.nodeId) {
      const newEdgeId = `e-${this.connection.from.nodeId}-${targetId}-${Date.now()}`;
      this.instance.addEdge({ id: newEdgeId, source: this.connection.from.nodeId, target: targetId, data: {} });
    }

    if (this.connection.to && targetId && targetId !== this.connection.to.nodeId) {
      const newEdgeId = `e-${targetId}-${this.connection.to.nodeId}-${Date.now()}`;
      this.instance.addEdge({ id: newEdgeId, source: targetId, target: this.connection.to.nodeId, data: {} });
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

