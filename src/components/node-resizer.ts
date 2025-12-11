/**
 * NodeResizer - A modular resize component that can be added to any node
 * Inspired by React Flow's NodeResizer component
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('node-resizer')
export class NodeResizer extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 10;
    }

    .resize-handle {
      position: absolute;
      background: var(--flow-node-selected-color, #1a73e8);
      border: 2px solid #fff;
      border-radius: 2px;
      opacity: 0;
      transition: opacity 0.2s ease;
      pointer-events: auto;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .resize-handle:hover {
      opacity: 1;
    }

    :host([visible]) .resize-handle {
      opacity: 1;
    }

    .resize-handle.nw {
      top: -8px;
      left: -8px;
      width: 12px;
      height: 12px;
      cursor: nw-resize;
    }

    .resize-handle.ne {
      top: -8px;
      right: -8px;
      width: 12px;
      height: 12px;
      cursor: ne-resize;
    }

    .resize-handle.sw {
      bottom: -8px;
      left: -8px;
      width: 12px;
      height: 12px;
      cursor: sw-resize;
    }

    .resize-handle.se {
      bottom: -8px;
      right: -8px;
      width: 12px;
      height: 12px;
      cursor: se-resize;
    }

    .resize-handle.n {
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 12px;
      height: 12px;
      cursor: n-resize;
    }

    .resize-handle.s {
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 12px;
      height: 12px;
      cursor: s-resize;
    }

    .resize-handle.w {
      top: 50%;
      left: -8px;
      transform: translateY(-50%);
      width: 12px;
      height: 12px;
      cursor: w-resize;
    }

    .resize-handle.e {
      top: 50%;
      right: -8px;
      transform: translateY(-50%);
      width: 12px;
      height: 12px;
      cursor: e-resize;
    }

    .resize-border {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1px dashed var(--flow-node-selected-color, #1a73e8);
      opacity: 0;
      pointer-events: none;
    }

    :host([visible]) .resize-border {
      opacity: 1;
    }
  `;

  @property({ type: Boolean, reflect: true }) visible = false;
  @property({ type: Number }) minWidth = 10;
  @property({ type: Number }) minHeight = 10;
  @property({ type: Number }) maxWidth = Number.MAX_VALUE;
  @property({ type: Number }) maxHeight = Number.MAX_VALUE;
  @property({ type: Boolean }) keepAspectRatio = false;

  private isResizing = false;
  private resizeStart = { x: 0, y: 0, width: 0, height: 0 };
  private resizeHandle = '';

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('mousedown', this.handleMouseDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mousedown', this.handleMouseDown);
    this.cleanup();
  }

  private cleanup() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  private handleMouseDown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check if the target is a resize handle
    // If target is the host element, check if the event originated from a resize handle in shadow DOM
    let isResizeHandle = target.classList.contains('resize-handle');
    
    if (!isResizeHandle && target === this) {
      // If target is the host element, check if the event came from a resize handle
      const path = e.composedPath();
      isResizeHandle = path.some(el => 
        el instanceof HTMLElement && el.classList.contains('resize-handle')
      );
    }
    
    if (!isResizeHandle) return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    this.isResizing = true;
    
    // Get the parent element (host of the shadow root)
    const parentElement = (this.getRootNode() as ShadowRoot).host as HTMLElement;
    
    this.resizeStart = {
      x: e.clientX,
      y: e.clientY,
      width: parentElement?.offsetWidth || 0,
      height: parentElement?.offsetHeight || 0
    };
    // Get the handle direction from the actual resize handle element
    let resizeHandleEl: HTMLElement | null = null;
    
    if (target.classList.contains('resize-handle')) {
      resizeHandleEl = target;
    } else if (target === this) {
      // Find the resize handle in the composed path
      const path = e.composedPath();
      resizeHandleEl = path.find(el => 
        el instanceof HTMLElement && el.classList.contains('resize-handle')
      ) as HTMLElement || null;
    }
    
    if (resizeHandleEl) {
      const classes = Array.from(resizeHandleEl.classList);
      this.resizeHandle = classes.find(cls => cls !== 'resize-handle') || '';
    }

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

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isResizing) return;
    
    // Get the parent element (host of the shadow root)
    const parentElement = (this.getRootNode() as ShadowRoot).host as HTMLElement;
    if (!parentElement) return;

    const deltaX = e.clientX - this.resizeStart.x;
    const deltaY = e.clientY - this.resizeStart.y;

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

    // Apply new dimensions to parent element
    parentElement.style.width = `${newWidth}px`;
    parentElement.style.height = `${newHeight}px`;

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
  };

  private handleMouseUp = () => {
    if (!this.isResizing) return;

    this.isResizing = false;
    this.cleanup();

    // Get the parent element for final dimensions
    const parentElement = (this.getRootNode() as ShadowRoot).host as HTMLElement;
    
    // Dispatch resize end event
    this.dispatchEvent(new CustomEvent('resize-end', {
      detail: {
        width: parentElement?.offsetWidth || 0,
        height: parentElement?.offsetHeight || 0
      },
      bubbles: true,
      composed: true
    }));
  };

  render() {
    if (!this.visible) return html``;

    return html`
      <div class="resize-border"></div>
      <div class="resize-handle nw"></div>
      <div class="resize-handle ne"></div>
      <div class="resize-handle sw"></div>
      <div class="resize-handle se"></div>
      <div class="resize-handle n"></div>
      <div class="resize-handle s"></div>
      <div class="resize-handle w"></div>
      <div class="resize-handle e"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'node-resizer': NodeResizer;
  }
}
