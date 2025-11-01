/**
 * FlowNode - Basic node component
 * Represents a draggable node in the flow diagram
 */

import { LitElement, html, css, CSSResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { XYPosition } from '../core/types';
import type { FlowInstance } from '../core/flow-instance';
import './node-resizer';

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
  @property({ type: Boolean }) resizable = false;

  private isDragging = false;
  private dragStart: XYPosition = { x: 0, y: 0 };
  private nodeStart: XYPosition = { x: 0, y: 0 };
  private lastMeasured: { width: number; height: number } | null = null;

  firstUpdated() {
    if (this.draggable) {
      this.addEventListener('mousedown', this.handleMouseDown);
    }
    this.addEventListener('click', this.handleClick);
    this.addEventListener('wheel', this.handleWheel, { passive: false });
    if (this.resizable) {
      this.addEventListener('resize', this.handleResize as EventListener);
      this.addEventListener('resize-end', this.handleResizeEnd as EventListener);
    }
    this.updateMeasuredSize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mousedown', this.handleMouseDown);
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('wheel', this.handleWheel);
    if (this.resizable) {
      this.removeEventListener('resize', this.handleResize as EventListener);
      this.removeEventListener('resize-end', this.handleResizeEnd as EventListener);
    }
    this.cleanup();
  }

  /**
   * Find the nearest scrollable parent element
   */
  private findScrollableElement(element: Element | null): HTMLElement | null {
    if (!element || !(element instanceof HTMLElement)) return null;
    
    // Check if element has the nowheel class (explicitly marked as non-pannable)
    if (element.classList.contains('nowheel')) {
      return element;
    }
    
    // Check computed styles for overflow
    const style = window.getComputedStyle(element);
    const overflow = style.overflow + style.overflowX + style.overflowY;
    if (overflow.includes('auto') || overflow.includes('scroll')) {
      // Check if element is actually scrollable (has scrollable content)
      if (element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth) {
        return element;
      }
    }
    
    // Check parent, but stop at this node's boundary (don't traverse outside the component)
    const parent = element.parentElement;
    if (parent && (parent === this || parent.closest('flow-node') === this || this.shadowRoot?.contains(parent))) {
      return this.findScrollableElement(parent);
    }
    
    return null;
  }

  /**
   * Handle wheel events to prevent panning when scrolling inside scrollable content
   */
  private handleWheel = (e: WheelEvent) => {
    // Use composedPath to get the actual event path through shadow boundaries
    const path = e.composedPath();
    
    // Find the first scrollable element in the event path
    let scrollableEl: HTMLElement | null = null;
    for (const element of path) {
      if (element instanceof Element) {
        scrollableEl = this.findScrollableElement(element);
        if (scrollableEl) break;
      }
    }
    
    if (scrollableEl) {
      // Check if the scrollable element can actually scroll in this direction
      const canScrollVertically = 
        (e.deltaY < 0 && scrollableEl.scrollTop > 0) ||
        (e.deltaY > 0 && scrollableEl.scrollTop < scrollableEl.scrollHeight - scrollableEl.clientHeight);
      
      const canScrollHorizontally = 
        (e.deltaX < 0 && scrollableEl.scrollLeft > 0) ||
        (e.deltaX > 0 && scrollableEl.scrollLeft < scrollableEl.scrollWidth - scrollableEl.clientWidth);
      
      // If we can scroll in the direction of the wheel event, prevent panning
      if (canScrollVertically || canScrollHorizontally) {
        // Stop propagation to prevent panning, but allow default scrolling behavior
        e.stopPropagation();
      }
    }
  };

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

  private handleResize = (e: Event) => {
    const { width, height } = (e as CustomEvent).detail;
    
    // Update node dimensions in the instance
    if (this.instance) {
      this.instance.updateNode(this.id, { 
        width: width,
        height: height,
        measured: { width, height }
      });
    }
  };

  private handleResizeEnd = (e: Event) => {
    const { width, height } = (e as CustomEvent).detail;
    
    // Final update with new dimensions
    if (this.instance) {
      this.instance.updateNode(this.id, { 
        width: width,
        height: height,
        measured: { width, height }
      });
    }

    // Dispatch resize end event
    this.dispatchEvent(new CustomEvent('node-resize-end', {
      detail: {
        nodeId: this.id,
        width: width,
        height: height
      },
      bubbles: true,
      composed: true
    }));
  };

  private handleMouseDown = (e: MouseEvent) => {
    if (!this.draggable || e.button !== 0) return;
    
    // Check if the event is coming from a resize handle or node-resizer
    const target = e.target as HTMLElement;
    
    // Check if the event originated from a resize handle or node-resizer
    const isFromResizeHandle = target.classList.contains('resize-handle') || 
                              target.tagName === 'NODE-RESIZER' ||
                              target.closest('node-resizer') !== null;
    
    if (isFromResizeHandle) {
      return; // Don't start dragging if clicking on resize handle
    }
    
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
    }, 50);
  };

  private cleanup() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    return html`
      <div class="node-container">
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
      </div>
      ${this.resizable ? html`
        <node-resizer
          .visible=${this.selected}
          min-width="50"
          min-height="30"
          max-width="500"
          max-height="300"
        ></node-resizer>
      ` : ''}
    `;
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    this.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    this.updateMeasuredSize();
    
    if (changedProperties.has('resizable')) {
      console.log('FlowNode resizable changed:', this.resizable);
    }
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

