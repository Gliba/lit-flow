/**
 * NodeResizer - A modular resize component that can be added to any node
 * Inspired by React Flow's NodeResizer component
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let NodeResizer = class NodeResizer extends LitElement {
    constructor() {
        super(...arguments);
        this.visible = false;
        this.minWidth = 10;
        this.minHeight = 10;
        this.maxWidth = Number.MAX_VALUE;
        this.maxHeight = Number.MAX_VALUE;
        this.keepAspectRatio = false;
        this.isResizing = false;
        this.resizeStart = { x: 0, y: 0, width: 0, height: 0 };
        this.resizeHandle = '';
        this.handleMouseDown = (e) => {
            const target = e.target;
            console.log('NodeResizer handleMouseDown:', target, target.classList);
            // Check if the target is a resize handle
            // If target is the host element, check if the event originated from a resize handle in shadow DOM
            let isResizeHandle = target.classList.contains('resize-handle');
            if (!isResizeHandle && target === this) {
                // If target is the host element, check if the event came from a resize handle
                const path = e.composedPath();
                isResizeHandle = path.some(el => el instanceof HTMLElement && el.classList.contains('resize-handle'));
            }
            console.log('Is resize handle:', isResizeHandle);
            if (!isResizeHandle)
                return;
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            this.isResizing = true;
            // Get the parent element (host of the shadow root)
            const parentElement = this.getRootNode().host;
            this.resizeStart = {
                x: e.clientX,
                y: e.clientY,
                width: parentElement?.offsetWidth || 0,
                height: parentElement?.offsetHeight || 0
            };
            // Get the handle direction from the actual resize handle element
            let resizeHandleEl = null;
            if (target.classList.contains('resize-handle')) {
                resizeHandleEl = target;
            }
            else if (target === this) {
                // Find the resize handle in the composed path
                const path = e.composedPath();
                resizeHandleEl = path.find(el => el instanceof HTMLElement && el.classList.contains('resize-handle')) || null;
            }
            if (resizeHandleEl) {
                const classes = Array.from(resizeHandleEl.classList);
                this.resizeHandle = classes.find(cls => cls !== 'resize-handle') || '';
                console.log('Resize handle direction:', this.resizeHandle);
            }
            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mouseup', this.handleMouseUp);
            console.log({
                width: this.resizeStart.width,
                height: this.resizeStart.height
            });
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
        this.handleMouseMove = (e) => {
            if (!this.isResizing)
                return;
            // Get the parent element (host of the shadow root)
            const parentElement = this.getRootNode().host;
            if (!parentElement)
                return;
            console.log('NodeResizer handleMouseMove:', e);
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
                }
                else {
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
        this.handleMouseUp = () => {
            if (!this.isResizing)
                return;
            this.isResizing = false;
            this.cleanup();
            // Get the parent element for final dimensions
            const parentElement = this.getRootNode().host;
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
    }
    static { this.styles = css `
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
  `; }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('mousedown', this.handleMouseDown);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('mousedown', this.handleMouseDown);
        this.cleanup();
    }
    cleanup() {
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }
    render() {
        if (!this.visible)
            return html ``;
        return html `
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
};
__decorate([
    property({ type: Boolean, reflect: true })
], NodeResizer.prototype, "visible", void 0);
__decorate([
    property({ type: Number })
], NodeResizer.prototype, "minWidth", void 0);
__decorate([
    property({ type: Number })
], NodeResizer.prototype, "minHeight", void 0);
__decorate([
    property({ type: Number })
], NodeResizer.prototype, "maxWidth", void 0);
__decorate([
    property({ type: Number })
], NodeResizer.prototype, "maxHeight", void 0);
__decorate([
    property({ type: Boolean })
], NodeResizer.prototype, "keepAspectRatio", void 0);
NodeResizer = __decorate([
    customElement('node-resizer')
], NodeResizer);
export { NodeResizer };
//# sourceMappingURL=node-resizer.js.map