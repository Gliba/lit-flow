/**
 * NodeMixin - Provides core node functionality without inheritance
 * Can be applied to any LitElement to add node behavior
 * 
 * Features:
 * - Dragging and positioning
 * - Selection handling
 * - Resizing with configurable constraints
 * - Event dispatching for all interactions
 * 
 * Usage:
 * ```typescript
 * @customElement('my-node')
 * export class MyNode extends NodeMixin(LitElement) {
 *   constructor() {
 *     super();
 *     this.resizable = true;
 *     this.minWidth = 100;
 *     this.minHeight = 50;
 *   }
 * 
 *   render() {
 *     return html`
 *       <div>My node content</div>
 *       ${this.renderResizer()}
 *     `;
 *   }
 * }
 * ```
 */

import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export interface NodeMixinInterface {
  id: string;
  position: { x: number; y: number };
  data: any;
  selected: boolean;
  dragging: boolean;
  instance: any;
  resizable: boolean;
  draggable: boolean;
  connectable: boolean;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  keepAspectRatio: boolean;
  renderResizer(): any;
}

export const NodeMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  class NodeMixinClass extends superClass {
    static styles = [css`
      :host {
        position: absolute;
        cursor: var(--node-cursor, grab);
        user-select: none;
        transform-origin: 0 0;
        will-change: transform;
        pointer-events: auto;
        border: var(--node-border, 1px solid #ddd);
        border-radius: var(--node-border-radius, 8px);
        background: var(--node-background, white);
        box-shadow: var(--node-shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
        transition: var(--node-transition, box-shadow 0.2s);
      }

      :host(:hover) {
        box-shadow: var(--node-hover-shadow, 0 4px 6px rgba(0, 0, 0, 0.15));
      }

      :host([dragging]) {
        cursor: var(--node-dragging-cursor, grabbing);
        box-shadow: var(--node-dragging-shadow, 0 8px 16px rgba(0, 0, 0, 0.25));
      }

      :host([selected]) {
        border-color: var(--node-selected-border, #1a73e8);
        box-shadow: var(--node-selected-shadow, 0 0 0 2px rgba(26, 115, 232, 0.3));
      }

      /* Resizer styles - matching existing components */
      .resize-border {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: var(--resize-border-style, 1px dashed var(--node-selected-border, #1a73e8));
        border-radius: var(--node-border-radius, 8px);
        opacity: var(--resize-border-opacity, 0);
        pointer-events: none;
        transition: var(--resize-transition, opacity 0.2s ease);
      }

      :host([selected]) .resize-border {
        opacity: var(--resize-border-opacity-selected, 1);
      }

      .resize-handle {
        position: absolute;
        background: var(--resize-handle-background, var(--node-selected-border, #1a73e8));
        border: var(--resize-handle-border, 2px solid #fff);
        border-radius: var(--resize-handle-border-radius, 2px);
        width: var(--resize-handle-size, 12px);
        height: var(--resize-handle-size, 12px);
        opacity: var(--resize-handle-opacity, 0);
        transition: var(--resize-transition, opacity 0.2s ease);
        pointer-events: auto;
        box-shadow: var(--resize-handle-shadow, 0 2px 4px rgba(0, 0, 0, 0.2));
        z-index: 10;
      }

      .resize-handle:hover {
        opacity: var(--resize-handle-opacity-hover, 1);
      }

      :host([selected]) .resize-handle {
        opacity: var(--resize-handle-opacity-selected, 1);
      }

      .resize-handle.nw {
        top: var(--resize-handle-offset, -8px);
        left: var(--resize-handle-offset, -8px);
        cursor: nw-resize;
      }

      .resize-handle.ne {
        top: var(--resize-handle-offset, -8px);
        right: var(--resize-handle-offset, -8px);
        cursor: ne-resize;
      }

      .resize-handle.sw {
        bottom: var(--resize-handle-offset, -8px);
        left: var(--resize-handle-offset, -8px);
        cursor: sw-resize;
      }

      .resize-handle.se {
        bottom: var(--resize-handle-offset, -8px);
        right: var(--resize-handle-offset, -8px);
        cursor: se-resize;
      }

      .resize-handle.n {
        top: var(--resize-handle-offset, -8px);
        left: 50%;
        transform: translateX(-50%);
        cursor: n-resize;
      }

      .resize-handle.s {
        bottom: var(--resize-handle-offset, -8px);
        left: 50%;
        transform: translateX(-50%);
        cursor: s-resize;
      }

      .resize-handle.w {
        top: 50%;
        left: var(--resize-handle-offset, -8px);
        transform: translateY(-50%);
        cursor: w-resize;
      }

      .resize-handle.e {
        top: 50%;
        right: var(--resize-handle-offset, -8px);
        transform: translateY(-50%);
        cursor: e-resize;
      }
    `];

    @property({ type: String, reflect: true }) id = '';
    @property({ type: Object }) position = { x: 0, y: 0 };
    @property({ type: Object }) data = {};
    @property({ type: Boolean, reflect: true }) selected = false;
    @property({ type: Boolean, reflect: true }) dragging = false;
    @property({ type: Object }) instance: any = null;
    @property({ type: Boolean }) resizable = false;
    @property({ type: Boolean }) draggable = true;
    @property({ type: Boolean }) connectable = true;
    @property({ type: Number }) minWidth = 10;
    @property({ type: Number }) maxWidth = Number.MAX_VALUE;
    @property({ type: Number }) minHeight = 10;
    @property({ type: Number }) maxHeight = Number.MAX_VALUE;
    @property({ type: Boolean }) keepAspectRatio = false;

    private isDragging = false;
    private dragStart = { x: 0, y: 0 };
    private nodeStart = { x: 0, y: 0 };
    
    // Resizer state
    private isResizing = false;
    private resizeStart = { x: 0, y: 0, width: 0, height: 0 };
    private resizeHandle = '';

    connectedCallback() {
      super.connectedCallback();
      if (this.draggable) {
        this.addEventListener('mousedown', this.handleMouseDown);
      }
      this.addEventListener('click', this.handleClick);
      // Add global click handler for deselection
      document.addEventListener('click', this.handleGlobalClick);
      // Resizer functionality is now handled directly in the mixin
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener('mousedown', this.handleMouseDown);
      this.removeEventListener('click', this.handleClick);
      document.removeEventListener('click', this.handleGlobalClick);
      // Resizer functionality is now handled directly in the mixin
      this.cleanup();
    }

    updated(changedProperties: Map<string | number | symbol, unknown>) {
      super.updated(changedProperties);
      // Apply transform for positioning
      this.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    }

    private handleClick = (e: MouseEvent) => {
      e.stopPropagation();
      if (!this.isDragging) {
        const newSelected = !this.selected;
        this.selected = newSelected;
        
        // Update instance if available
        if (this.instance) {
          this.instance.updateNode(this.id, { selected: newSelected });
        }
        
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
      if (e.button !== 0) return;
      
      const target = e.target as HTMLElement;
      
      // Check if the target is a resize handle or if it's inside a resize handle
      const isFromResizeHandle = target.classList.contains('resize-handle') || 
                                target.closest('.resize-handle') !== null;
      
      if (isFromResizeHandle) {
        this.handleResizeStart(e);
        return;
      }
      
      if (!this.draggable) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      this.isDragging = false;
      this.dragStart = { x: e.clientX, y: e.clientY };
      this.nodeStart = { ...this.position };

      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    };

    private handleMouseMove = (e: MouseEvent) => {
      if (this.isResizing) {
        this.handleResizeMove(e);
        return;
      }
      
      const dx = e.clientX - this.dragStart.x;
      const dy = e.clientY - this.dragStart.y;
      
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
      
      if (this.isResizing) {
        this.handleResizeEnd();
      }
      
      this.cleanup();
      setTimeout(() => {
        this.isDragging = false;
        this.dragging = false;
        this.isResizing = false;
      }, 50);
    };

    private handleResizeStart = (e: MouseEvent, handle?: string) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      this.isResizing = true;
      
      // Get the actual computed dimensions, accounting for any CSS transforms
      const rect = this.getBoundingClientRect();
      const computedStyle = getComputedStyle(this);
      
      // Use the computed width/height if available, otherwise use the bounding rect
      let width = parseFloat(computedStyle.width);
      let height = parseFloat(computedStyle.height);
      
      // If computed values are not available or are 0, use the bounding rect
      if (!width || width === 0) {
        width = rect.width;
      }
      if (!height || height === 0) {
        height = rect.height;
      }
      
      this.resizeStart = {
        x: e.clientX,
        y: e.clientY,
        width: width,
        height: height
      };

      // Use the provided handle or try to detect it
      if (handle) {
        this.resizeHandle = handle;
      } else {
        // Get the handle direction from the target element
        let target = e.target as HTMLElement;
        
        // If the target is not a resize handle, find the closest one
        if (!target.classList.contains('resize-handle')) {
          const resizeHandle = target.closest('.resize-handle') as HTMLElement;
          if (resizeHandle) {
            target = resizeHandle;
          }
        }
        
        const classes = Array.from(target.classList);
        this.resizeHandle = classes.find(cls => cls !== 'resize-handle') || '';
      }

      // console.log('Resize started with handle:', this.resizeHandle);

      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);

      // Dispatch resize start event
      this.dispatchEvent(new CustomEvent('resize-start', {
        detail: {
          width: this.resizeStart.width,
          height: this.resizeStart.height
        },
        bubbles: true,
        composed: true
      }));
    };

    private handleResizeMove = (e: MouseEvent) => {
      if (!this.isResizing) return;

      const deltaX = e.clientX - this.resizeStart.x;
      const deltaY = e.clientY - this.resizeStart.y;

      // console.log('Resizing with handle:', this.resizeHandle, 'delta:', deltaX, deltaY);

      let newWidth = this.resizeStart.width;
      let newHeight = this.resizeStart.height;

      // Calculate new dimensions based on handle direction
      switch (this.resizeHandle) {
        case 'nw':
          newWidth = this.resizeStart.width - deltaX;
          newHeight = this.resizeStart.height - deltaY;
          break;
        case 'ne':
          newWidth = this.resizeStart.width + deltaX;
          newHeight = this.resizeStart.height - deltaY;
          break;
        case 'sw':
          newWidth = this.resizeStart.width - deltaX;
          newHeight = this.resizeStart.height + deltaY;
          break;
        case 'se':
          newWidth = this.resizeStart.width + deltaX;
          newHeight = this.resizeStart.height + deltaY;
          break;
        case 'n':
          newHeight = this.resizeStart.height - deltaY;
          break;
        case 's':
          newHeight = this.resizeStart.height + deltaY;
          break;
        case 'w':
          newWidth = this.resizeStart.width - deltaX;
          break;
        case 'e':
          newWidth = this.resizeStart.width + deltaX;
          break;
      }

      // Apply constraints
      newWidth = Math.max(this.minWidth, Math.min(this.maxWidth, newWidth));
      newHeight = Math.max(this.minHeight, Math.min(this.maxHeight, newHeight));

      // Keep aspect ratio if enabled
      if (this.keepAspectRatio) {
        const aspectRatio = this.resizeStart.width / this.resizeStart.height;
        if (this.resizeHandle.includes('w') || this.resizeHandle.includes('e')) {
          newHeight = newWidth / aspectRatio;
        } else {
          newWidth = newHeight * aspectRatio;
        }
      }

      // Apply new dimensions
      this.style.width = `${newWidth}px`;
      this.style.height = `${newHeight}px`;

      // Dispatch resize event
      this.dispatchEvent(new CustomEvent('resize', {
        detail: {
          width: newWidth,
          height: newHeight,
          handle: this.resizeHandle
        },
        bubbles: true,
        composed: true
      }));

      // Update instance if available
      if (this.instance) {
        this.instance.updateNode(this.id, { 
          width: newWidth,
          height: newHeight,
          measured: { width: newWidth, height: newHeight }
        });
      }
    };

    private handleResizeEnd = () => {
      if (!this.isResizing) return;

      // console.log('Resize ending - final dimensions:', this.offsetWidth, this.offsetHeight);
      this.isResizing = false;

      // Dispatch resize end event
      this.dispatchEvent(new CustomEvent('resize-end', {
        detail: {
          width: this.offsetWidth,
          height: this.offsetHeight
        },
        bubbles: true,
        composed: true
      }));

      // Update instance if available
      if (this.instance) {
        this.instance.updateNode(this.id, { 
          width: this.offsetWidth,
          height: this.offsetHeight,
          measured: { width: this.offsetWidth, height: this.offsetHeight }
        });
      }
    };

    private handleGlobalClick = (e: MouseEvent) => {
      // Check if the click is outside this node
      const target = e.target as HTMLElement;
      const isNodeClick = target.closest(this.tagName.toLowerCase()) !== null;
      
      if (!isNodeClick) {
        // Deselect this node if it's selected
        if (this.selected) {
          this.selected = false;
          
          // Update instance if available
          if (this.instance) {
            this.instance.updateNode(this.id, { selected: false });
          }
          
          // Dispatch deselection event
          this.dispatchEvent(new CustomEvent('node-deselect', {
            detail: { 
              nodeId: this.id, 
              selected: false,
              node: {
                id: this.id,
                data: this.data,
                position: this.position,
                selected: false
              }
            },
            bubbles: true,
            composed: true
          }));
        }
      }
    };

    private cleanup() {
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
    }

    /**
     * Renders the resizer handles and border when the node is resizable and selected
     * Components using this mixin should call this method in their render() method
     */
    public renderResizer() {
      if (!this.resizable || !this.selected) {
        return html``;
      }
      return html`
        <div class="resize-border"></div>
        <div class="resize-handle nw" @mousedown=${this.handleResizeHandleClick('nw')}></div>
        <div class="resize-handle ne" @mousedown=${this.handleResizeHandleClick('ne')}></div>
        <div class="resize-handle sw" @mousedown=${this.handleResizeHandleClick('sw')}></div>
        <div class="resize-handle se" @mousedown=${this.handleResizeHandleClick('se')}></div>
        <div class="resize-handle n" @mousedown=${this.handleResizeHandleClick('n')}></div>
        <div class="resize-handle s" @mousedown=${this.handleResizeHandleClick('s')}></div>
        <div class="resize-handle w" @mousedown=${this.handleResizeHandleClick('w')}></div>
        <div class="resize-handle e" @mousedown=${this.handleResizeHandleClick('e')}></div>
      `;
    }

    private handleResizeHandleClick = (handle: string) => {
      return (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        this.handleResizeStart(e, handle);
      };
    };
  }

  return NodeMixinClass as any;
};

type Constructor<T = {}> = new (...args: any[]) => T;
