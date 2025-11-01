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
 * 
 * The mixin automatically appends the resizer to the DOM when resizable=true and selected=true.
 * Components can use any render method - the resizer will be automatically added.
 * 
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
 *   // Any render method works - resizer is automatically appended
 *   render() {
 *     return html`<div>My node content</div>`;
 *   }
 * }
 * ```
 * 
 * To restrict dragging to a specific element (e.g., only header):
 * ```typescript
 * @customElement('my-node')
 * export class MyNode extends NodeMixin(LitElement) {
 *   constructor() {
 *     super();
 *     this.dragHandleSelector = '.node-header'; // Only header can be used to drag
 *   }
 * 
 *   render() {
 *     return html`
 *       <div class="node-header">Header - drag from here</div>
 *       <div class="node-body">
 *         Body content - interactive elements here won't trigger dragging
 *       </div>
 *     `;
 *   }
 * }
 * ```
 * 
 * For manual control, you can also use:
 * ```typescript
 * render() {
 *   return html`
 *     <div>My node content</div>
 *     ${this.getResizer()}
 *   `;
 * }
 * ```
 */

import { LitElement, html, css, render } from 'lit';
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
  dragHandleSelector: string | null;
  connectable: boolean;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  keepAspectRatio: boolean;
  maxInitialHeight: number;
  renderComponent(): any;
  getResizer(): any;
  adjustHeightToContent(): void;
  notifyHandlesUpdated(options?: { handleIds?: string[]; updateDimensions?: boolean }): Promise<void>;
}

export const NodeMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  class NodeMixinClass extends superClass {
    static get styles() {
      return [css`
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

      /* When dragHandleSelector is set, default cursor is normal (not grab) */
      :host([data-drag-handle-selector]) {
        cursor: default;
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
    }

    @property({ type: String, reflect: true }) id = '';
    @property({ type: Object }) position = { x: 0, y: 0 };
    @property({ type: Object }) data = {};
    @property({ type: Boolean, reflect: true }) selected = false;
    @property({ type: Boolean, reflect: true }) dragging = false;
    @property({ type: Object }) instance: any = null;
    @property({ type: Boolean }) resizable = false;
    @property({ type: Boolean }) draggable = true;
    @property({ type: String }) dragHandleSelector: string | null = null;
    @property({ type: Boolean }) connectable = true;
    @property({ type: Number }) minWidth = 10;
    @property({ type: Number }) maxWidth = Number.MAX_VALUE;
    @property({ type: Number }) minHeight = 10;
    @property({ type: Number }) maxHeight = Number.MAX_VALUE;
    @property({ type: Boolean }) keepAspectRatio = false;
    @property({ type: Number }) maxInitialHeight = 0; // 0 = no initial height limit, otherwise sets max height if content exceeds

    private isDragging = false;
    private dragStart = { x: 0, y: 0 };
    private nodeStart = { x: 0, y: 0 };
    
    // Resizer state
    private isResizing = false;
    private resizeStart = { x: 0, y: 0, width: 0, height: 0 };
    private resizeHandle = '';
    
    // Drag handle element reference
    private dragHandleElement: HTMLElement | null = null;

    connectedCallback() {
      super.connectedCallback();
      // Only attach mousedown to entire node if no dragHandleSelector is set
      if (this.draggable && !this.dragHandleSelector) {
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
      // Clean up drag handle listener
      this.removeDragHandleListener();
      // Resizer functionality is now handled directly in the mixin
      this.cleanup();
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
      
      // If dragHandleSelector is set, the listener is only on the drag handle element
      // So if we reach here, it means the click was on the drag handle or node (if no selector set)
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
        // Update cursor on drag handle element if it exists
        if (this.dragHandleElement) {
          this.dragHandleElement.style.cursor = 'grabbing';
        }
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
      
      // Restore cursor on drag handle element when dragging ends
      if (this.dragHandleElement && this.isDragging) {
        this.dragHandleElement.style.cursor = 'grab';
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
     * This is now called automatically by the mixin's render method
     */
    private renderResizer() {
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

    /**
     * Helper method to get just the resizer HTML
     * Use this in components that override render() method
     */
    protected getResizer() {
      return this.renderResizer();
    }

    /**
     * Automatically append resizer to DOM after rendering
     * This works even when components override render() method
     */
    firstUpdated() {
      this.appendResizerToDOM();
      
      // Set data attribute for CSS cursor styling
      if (this.dragHandleSelector) {
        this.setAttribute('data-drag-handle-selector', '');
      }
      
      // Wait for DOM to be fully rendered before attaching drag handle listener
      Promise.resolve().then(() => {
        this.attachDragHandleListener();
        this.adjustHeightToContent();
      });
    }

    updated(changedProperties: Map<string | number | symbol, unknown>) {
      super.updated(changedProperties);
      // Apply transform for positioning
      this.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
      
      // Adjust height to content if maxInitialHeight changed (only if not resizing)
      if (changedProperties.has('maxInitialHeight') && !this.isResizing) {
        // Wait a tick for content to render, then adjust height
        Promise.resolve().then(() => {
          this.adjustHeightToContent();
        });
      }
      
      // Re-append resizer if resizable or selected state changed
      if (changedProperties.has('resizable') || changedProperties.has('selected')) {
        this.appendResizerToDOM();
      }
      
      // Re-attach drag handle listener if dragHandleSelector or draggable changed
      if (changedProperties.has('dragHandleSelector') || changedProperties.has('draggable')) {
        Promise.resolve().then(() => {
          this.attachDragHandleListener();
        });
      }
      
      // Update cursor style based on dragHandleSelector
      if (changedProperties.has('dragHandleSelector')) {
        if (this.dragHandleSelector) {
          this.setAttribute('data-drag-handle-selector', '');
        } else {
          this.removeAttribute('data-drag-handle-selector');
        }
      }
    }

    private appendResizerToDOM() {
      // Remove existing resizer if it exists
      this.removeExistingResizer();
      
      // Only append resizer if resizable and selected
      if (this.resizable && this.selected) {
        const resizerTemplate = this.renderResizer();
        if (resizerTemplate) {
          // Create a container for the resizer
          const resizerContainer = document.createElement('div');
          resizerContainer.className = 'mixin-resizer-container';
          resizerContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 10;
          `;
          
          // Append to shadow DOM
          this.shadowRoot?.appendChild(resizerContainer);
          
          // Render the resizer content using Lit's render function
          render(resizerTemplate, resizerContainer);
        }
      }
    }

    private removeExistingResizer() {
      const existingResizer = this.shadowRoot?.querySelector('.mixin-resizer-container');
      if (existingResizer) {
        existingResizer.remove();
      }
    }

    /**
     * Attach mousedown listener to the drag handle element if dragHandleSelector is set
     */
    private attachDragHandleListener() {
      // Remove existing listener first
      this.removeDragHandleListener();
      
      // Only attach if draggable and dragHandleSelector is set
      if (!this.draggable || !this.dragHandleSelector) {
        return;
      }
      
      const shadowRoot = this.shadowRoot;
      if (!shadowRoot) {
        // Shadow root not ready yet, try again after a short delay
        setTimeout(() => this.attachDragHandleListener(), 0);
        return;
      }
      
      // Find the drag handle element in shadow root
      const dragHandleElement = shadowRoot.querySelector(this.dragHandleSelector) as HTMLElement;
      
      if (dragHandleElement) {
        this.dragHandleElement = dragHandleElement;
        // Attach the mousedown listener directly to the drag handle element
        dragHandleElement.addEventListener('mousedown', this.handleMouseDown);
        
        // Set cursor style on the drag handle - it will show grab cursor
        dragHandleElement.style.cursor = 'grab';
      }
    }

    /**
     * Remove mousedown listener from the drag handle element
     */
    private removeDragHandleListener() {
      if (this.dragHandleElement) {
        this.dragHandleElement.removeEventListener('mousedown', this.handleMouseDown);
        this.dragHandleElement.style.cursor = '';
        this.dragHandleElement = null;
      }
    }

    private handleResizeHandleClick = (handle: string) => {
      return (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        this.handleResizeStart(e, handle);
      };
    };

    /**
     * Adjusts node height to fit content up to maxInitialHeight
     * If maxInitialHeight is 0, this method does nothing
     * If content height > maxInitialHeight: sets height to maxInitialHeight (content will scroll)
     * If content height <= maxInitialHeight: doesn't set height (lets it fit to content)
     * Called automatically in firstUpdated, but can be called manually after content loads
     */
    protected adjustHeightToContent() {
      // Only apply logic if maxInitialHeight is set (> 0)
      if (this.maxInitialHeight <= 0) return;
      
      // Don't adjust if currently resizing or if instance/node not ready
      if (!this.instance || !this.id || this.isResizing) return;
      
      // Temporarily remove height constraint to measure actual content height
      const originalHeight = this.style.height;
      this.style.height = 'auto';
      
      // Force a reflow to ensure content is measured
      this.offsetHeight;
      
      // Measure the actual content height (scrollHeight includes all content)
      const contentHeight = this.scrollHeight || this.getBoundingClientRect().height;
      
      // Only set height if content exceeds maxInitialHeight
      if (contentHeight > this.maxInitialHeight) {
        // Content exceeds limit - set height to maxInitialHeight
        this.style.height = `${this.maxInitialHeight}px`;
        
        // Update instance with calculated height
        this.instance.updateNode(this.id, {
          height: this.maxInitialHeight,
          measured: { 
            width: this.offsetWidth || this.getBoundingClientRect().width,
            height: this.maxInitialHeight 
          }
        });
      } else {
        // Content fits within limit - don't set height, let it fit naturally
        // But restore original height style if it was set
        if (originalHeight) {
          this.style.height = originalHeight;
        } else {
          // Clear height to let content determine size
          this.style.height = '';
        }
        
        // Update instance with actual content height
        if (contentHeight > 0) {
          this.instance.updateNode(this.id, {
            height: contentHeight,
            measured: { 
              width: this.offsetWidth || this.getBoundingClientRect().width,
              height: contentHeight 
            }
          });
        }
      }
    }

    /**
     * Notifies the flow instance that handles have been dynamically added/updated
     * Call this after using Lit's render() to add handles dynamically (e.g., after API data loads)
     * 
     * This method:
     * 1. Waits for DOM update to complete
     * 2. Updates node dimensions to trigger handle position recalculation
     * 3. Dispatches a custom event for flow canvas to listen to
     * 
     * @example
     * ```typescript
     * async loadFields() {
     *   const fields = await fetchFields();
     *   const container = this.shadowRoot.querySelector('.fields-container');
     *   render(fieldsTemplate, container);
     *   
     *   // Notify flow instance after handles are rendered
     *   this.notifyHandlesUpdated();
     * }
     * ```
     */
    protected async notifyHandlesUpdated(options?: {
      /** Optional list of handle IDs that were added/updated */
      handleIds?: string[];
      /** Whether to update node dimensions (default: true) */
      updateDimensions?: boolean;
    }) {
      const { handleIds, updateDimensions = true } = options || {};
      
      // Wait for any pending DOM updates
      await this.updateComplete;
      
      // Small delay to ensure handles are fully rendered in the DOM
      await new Promise(resolve => setTimeout(resolve, 0));
      
      if (this.instance && this.id) {
        // Update node dimensions to trigger flow canvas recalculation
        // This forces the flow canvas to recalculate handle positions
        if (updateDimensions) {
          const rect = this.getBoundingClientRect();
          const currentWidth = rect.width;
          const currentHeight = rect.height;
          
          this.instance.updateNode(this.id, {
            width: currentWidth,
            height: currentHeight,
            measured: { width: currentWidth, height: currentHeight }
          });
        }
        
        // Dispatch custom event that flow canvas can listen to
        this.dispatchEvent(new CustomEvent('node-handles-updated', {
          detail: { 
            nodeId: this.id,
            handleIds: handleIds || [],
            timestamp: Date.now()
          },
          bubbles: true,
          composed: true
        }));
      }
    }
  }

  return NodeMixinClass as any;
};

type Constructor<T = {}> = new (...args: any[]) => T;
