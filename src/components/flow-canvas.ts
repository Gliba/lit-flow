/**
 * FlowCanvas - Main container component for the flow diagram
 * This is the root element that manages the viewport and renders nodes/edges
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { FlowInstance } from '../core/flow-instance';
import type { Node, Edge, Viewport } from '../core/types';

@customElement('flow-canvas')
export class FlowCanvas extends LitElement {
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
            ${this.edges.map(edge => {
              const sourceNode = this.nodes.find(n => n.id === edge.source);
              const targetNode = this.nodes.find(n => n.id === edge.target);
              
              if (!sourceNode || !targetNode) return null;
              
              return html`
                <flow-edge 
                  .id=${edge.id}
                  .source=${edge.source}
                  .target=${edge.target}
                  .sourceNode=${sourceNode}
                  .targetNode=${targetNode}
                  .animated=${edge.animated || false}
                  .label=${edge.data?.label || ''}
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

