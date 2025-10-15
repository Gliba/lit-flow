/**
 * FlowNode - Basic node component
 * Represents a draggable node in the flow diagram
 */

import { LitElement, html, css, CSSResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { XYPosition } from '../core/types';
import type { FlowInstance } from '../core/flow-instance';

@customElement('flow-node')
export class FlowNode extends LitElement {
  static styles: CSSResult | CSSResult[] = css`
    :host {
      position: absolute;
      border: 1px solid var(--flow-node-border, #ddd);
      border-radius: 8px;
      background: var(--flow-node-background, white);
      padding: 10px 20px;
      cursor: grab;
      user-select: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.2s;
      transform-origin: 0 0;
      will-change: transform;
      pointer-events: auto;
    }

    :host([dragging]) {
      cursor: grabbing;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
    }

    :host(:hover) {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    }

    :host([selected]) {
      border-color: var(--flow-node-selected-border, #1a73e8);
      box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.3);
    }

    .node-content {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .handle {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--flow-handle-bg, #fff);
      border: 1px solid var(--flow-handle-border, #1a73e8);
      box-shadow: 0 0 0 1px rgba(26, 115, 232, 0.15);
      cursor: crosshair;
      pointer-events: auto;
    }

    .handle.source {
      right: -5px;
      top: 50%;
      transform: translateY(-50%);
    }

    .handle.target {
      left: -5px;
      top: 50%;
      transform: translateY(-50%);
    }
  `;

  @property({ type: String, reflect: true }) id = '';
  @property({ type: Object }) data: any = {};
  @property({ type: Object }) position: XYPosition = { x: 0, y: 0 };
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean, reflect: true }) dragging = false;
  @property({ type: Boolean }) draggable = true;
  @property({ type: Object }) instance?: FlowInstance;

  private isDragging = false;
  private dragStart: XYPosition = { x: 0, y: 0 };
  private nodeStart: XYPosition = { x: 0, y: 0 };
  private lastMeasured: { width: number; height: number } | null = null;

  firstUpdated() {
    if (this.draggable) {
      this.addEventListener('mousedown', this.handleMouseDown);
    }
    this.addEventListener('click', this.handleClick);
    this.updateMeasuredSize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mousedown', this.handleMouseDown);
    this.removeEventListener('click', this.handleClick);
    this.cleanup();
  }

  private handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (!this.isDragging && this.instance) {
      // Toggle selection
      const newSelected = !this.selected;
      this.instance.updateNode(this.id, { selected: newSelected });
      
      // Dispatch selection event
      this.dispatchEvent(new CustomEvent('node-select', {
        detail: { 
          nodeId: this.id, 
          selected: newSelected,
          node: {
            id: this.id,
            data: this.data,
            position: this.position,
            selected: newSelected
          }
        },
        bubbles: true,
        composed: true
      }));
    }
  };

  private handleMouseDown = (e: MouseEvent) => {
    if (!this.draggable || e.button !== 0) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    this.isDragging = false;
    this.dragStart = { x: e.clientX, y: e.clientY };
    this.nodeStart = { ...this.position };

    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  };

  private handleMouseMove = (e: MouseEvent) => {
    const dx = e.clientX - this.dragStart.x;
    const dy = e.clientY - this.dragStart.y;
    
    // Start dragging if moved more than 3px
    if (!this.isDragging && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
      this.isDragging = true;
      this.dragging = true;
      if (this.instance) {
        this.instance.updateNode(this.id, { dragging: true });
      }
    }

    if (this.isDragging && this.instance) {
      const viewport = this.instance.getViewport();
      const newPosition = {
        x: this.nodeStart.x + dx / viewport.zoom,
        y: this.nodeStart.y + dy / viewport.zoom
      };
      
      this.instance.updateNode(this.id, { position: newPosition });
    }
  };

  private handleMouseUp = () => {
    if (this.isDragging && this.instance) {
      this.instance.updateNode(this.id, { dragging: false });
    }
    
    this.cleanup();
    
    // Small delay to prevent click event after drag
    setTimeout(() => {
      this.isDragging = false;
      this.dragging = false;
    }, 0);
  };

  private cleanup() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    return html`
      <div class="node-content">
        ${this.data?.label || 'Node'}
      </div>
      <div 
        class="handle target" 
        data-handle="target" 
        data-node-id=${this.id}
        @mousedown=${this.onHandleMouseDown('target')}
      ></div>
      <div 
        class="handle source" 
        data-handle="source" 
        data-node-id=${this.id}
        @mousedown=${this.onHandleMouseDown('source')}
      ></div>
    `;
  }

  updated() {
    this.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    this.updateMeasuredSize();
  }

  private updateMeasuredSize() {
    if (!this.instance) return;
    const rect = this.getBoundingClientRect();
    const zoom = this.instance.getViewport().zoom || 1;
    const width = rect.width / zoom;
    const height = rect.height / zoom;

    const changed =
      !this.lastMeasured ||
      Math.abs(this.lastMeasured.width - width) > 0.5 ||
      Math.abs(this.lastMeasured.height - height) > 0.5;

    if (changed) {
      this.lastMeasured = { width, height };
      this.instance.updateNode(this.id, { measured: { width, height }, width, height });
    }
  }

  private onHandleMouseDown(type: 'source' | 'target') {
    return (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      this.dispatchEvent(new CustomEvent('handle-start', {
        detail: { nodeId: this.id, type },
        bubbles: true,
        composed: true
      }));
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flow-node': FlowNode;
  }
}

