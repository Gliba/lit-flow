/**
 * FlowNode - Basic node component
 * Represents a draggable node in the flow diagram
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './node-resizer';
let FlowNode = class FlowNode extends LitElement {
    constructor() {
        super(...arguments);
        this.id = '';
        this.data = {};
        this.position = { x: 0, y: 0 };
        this.selected = false;
        this.dragging = false;
        this.draggable = true;
        this.resizable = false;
        this.isDragging = false;
        this.dragStart = { x: 0, y: 0 };
        this.nodeStart = { x: 0, y: 0 };
        this.lastMeasured = null;
        /**
         * Handle wheel events to prevent panning when scrolling inside scrollable content
         */
        this.handleWheel = (e) => {
            // Use composedPath to get the actual event path through shadow boundaries
            const path = e.composedPath();
            // Find the first scrollable element in the event path
            let scrollableEl = null;
            for (const element of path) {
                if (element instanceof Element) {
                    scrollableEl = this.findScrollableElement(element);
                    if (scrollableEl)
                        break;
                }
            }
            if (scrollableEl) {
                // Check if the scrollable element can actually scroll in this direction
                const canScrollVertically = (e.deltaY < 0 && scrollableEl.scrollTop > 0) ||
                    (e.deltaY > 0 && scrollableEl.scrollTop < scrollableEl.scrollHeight - scrollableEl.clientHeight);
                const canScrollHorizontally = (e.deltaX < 0 && scrollableEl.scrollLeft > 0) ||
                    (e.deltaX > 0 && scrollableEl.scrollLeft < scrollableEl.scrollWidth - scrollableEl.clientWidth);
                // If we can scroll in the direction of the wheel event, prevent panning
                if (canScrollVertically || canScrollHorizontally) {
                    // Stop propagation to prevent panning, but allow default scrolling behavior
                    e.stopPropagation();
                }
            }
        };
        this.handleClick = (e) => {
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
        this.handleResize = (e) => {
            const { width, height } = e.detail;
            // Update node dimensions in the instance
            if (this.instance) {
                this.instance.updateNode(this.id, {
                    width: width,
                    height: height,
                    measured: { width, height }
                });
            }
        };
        this.handleResizeEnd = (e) => {
            const { width, height } = e.detail;
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
        this.handleMouseDown = (e) => {
            if (!this.draggable || e.button !== 0)
                return;
            // Check if the event is coming from a resize handle or node-resizer
            const target = e.target;
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
        this.handleMouseMove = (e) => {
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
        this.handleMouseUp = () => {
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
    }
    static { this.styles = css `
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
  `; }
    firstUpdated() {
        if (this.draggable) {
            this.addEventListener('mousedown', this.handleMouseDown);
        }
        this.addEventListener('click', this.handleClick);
        this.addEventListener('wheel', this.handleWheel, { passive: false });
        if (this.resizable) {
            this.addEventListener('resize', this.handleResize);
            this.addEventListener('resize-end', this.handleResizeEnd);
        }
        this.updateMeasuredSize();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('mousedown', this.handleMouseDown);
        this.removeEventListener('click', this.handleClick);
        this.removeEventListener('wheel', this.handleWheel);
        if (this.resizable) {
            this.removeEventListener('resize', this.handleResize);
            this.removeEventListener('resize-end', this.handleResizeEnd);
        }
        this.cleanup();
    }
    /**
     * Find the nearest scrollable parent element
     */
    findScrollableElement(element) {
        if (!element || !(element instanceof HTMLElement))
            return null;
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
    cleanup() {
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }
    render() {
        return html `
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
      ${this.resizable ? html `
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
    updated(changedProperties) {
        super.updated(changedProperties);
        this.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
        this.updateMeasuredSize();
        if (changedProperties.has('resizable')) {
            console.log('FlowNode resizable changed:', this.resizable);
        }
    }
    updateMeasuredSize() {
        if (!this.instance)
            return;
        const rect = this.getBoundingClientRect();
        const zoom = this.instance.getViewport().zoom || 1;
        const width = rect.width / zoom;
        const height = rect.height / zoom;
        const changed = !this.lastMeasured ||
            Math.abs(this.lastMeasured.width - width) > 0.5 ||
            Math.abs(this.lastMeasured.height - height) > 0.5;
        if (changed) {
            this.lastMeasured = { width, height };
            this.instance.updateNode(this.id, { measured: { width, height }, width, height });
        }
    }
    onHandleMouseDown(type) {
        return (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('handle-start', {
                detail: { nodeId: this.id, type },
                bubbles: true,
                composed: true
            }));
        };
    }
};
__decorate([
    property({ type: String, reflect: true })
], FlowNode.prototype, "id", void 0);
__decorate([
    property({ type: Object })
], FlowNode.prototype, "data", void 0);
__decorate([
    property({ type: Object })
], FlowNode.prototype, "position", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], FlowNode.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], FlowNode.prototype, "dragging", void 0);
__decorate([
    property({ type: Boolean })
], FlowNode.prototype, "draggable", void 0);
__decorate([
    property({ type: Object })
], FlowNode.prototype, "instance", void 0);
__decorate([
    property({ type: Boolean })
], FlowNode.prototype, "resizable", void 0);
FlowNode = __decorate([
    customElement('flow-node')
], FlowNode);
export { FlowNode };
//# sourceMappingURL=flow-node.js.map