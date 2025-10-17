/**
 * ShapeNode - Component for rendering shape-based nodes
 * Uses a centralized Shape component that renders different SVG paths based on shape type
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ShapeNodeData, ShapeNodeDataDirect } from './types';
import { ShapeRegistry } from './shape-registry';

@customElement('shape-node')
export class ShapeNode extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      display: block;
      pointer-events: auto;
      transform-origin: 0 0;
      will-change: transform;
      transform: translate(var(--position-x, 0px), var(--position-y, 0px));
    }

    .shape-node {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      user-select: none;
      pointer-events: auto;
      width: var(--shape-width, 200px);
      height: var(--shape-height, 200px);
    }

    .shape-node:active {
      cursor: grabbing;
    }

    .shape-node.selected {
      outline: 2px solid var(--flow-node-selected-color, #1a73e8);
      outline-offset: 2px;
    }

    :host([dragging]) .shape-node {
      cursor: grabbing;
      filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.25));
    }

    .shape-svg {
      display: block;
      transition: transform 0.2s ease;
      pointer-events: none;
    }

    .shape-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 1;
    }

    .shape-node:hover .shape-svg {
      transform: scale(1.05);
    }

    .unknown-shape {
      width: 100px;
      height: 100px;
      background: #f0f0f0;
      border: 2px dashed #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
      font-size: 12px;
      pointer-events: none;
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
      z-index: 10;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .handle:hover {
      opacity: 1;
      transform: scale(1.2);
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

    .handle.top {
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
    }

    .handle.bottom {
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
    }

    .shape-node:hover .handle {
      opacity: 1;
    }

    .shape-label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 12px;
      color: #333;
      white-space: nowrap;
      user-select: none;
      pointer-events: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      z-index: 5;
    }

    .shape-label.editable {
      pointer-events: auto;
      cursor: text;
    }

    .shape-label.editable:hover {
      background: rgba(255, 255, 255, 1);
      border-color: var(--flow-node-selected-color, #1a73e8);
    }

    .handle:active {
      opacity: 1;
      transform: scale(1.3);
    }
  `;

  @property({ type: String, reflect: true }) id = '';
  @property({ type: Object }) data!: ShapeNodeDataDirect;
  @property({ 
    type: Object, 
    hasChanged: (newVal: { x: number; y: number }, oldVal: { x: number; y: number }) => {
      return !oldVal || newVal.x !== oldVal.x || newVal.y !== oldVal.y;
    }
  }) position!: { x: number; y: number };
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean, reflect: true }) dragging = false;
  @property({ type: Boolean }) draggable = true;
  @property({ type: Boolean }) connectable = true;
  @property({ type: Object }) instance: any = null;

  private isDragging = false;
  private dragStart = { x: 0, y: 0 };
  private nodeStart = { x: 0, y: 0 };

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    
    // Handle property changes if needed
    if (changedProperties.has('position') && !this.isDragging) {
      // Position updated from outside (not during dragging)
      // This can be used for future features like animation
    }
  }

  /**
   * Get the shape definition from the registry
   */
  private getShapeDefinition() {
    if (!this.data?.type) {
      return undefined;
    }
    return ShapeRegistry.get(this.data.type);
  }

  /**
   * Render the SVG shape
   */
  private renderShape() {
    const shapeDef = this.getShapeDefinition();
    if (!shapeDef) {
      return html`
        <div class="unknown-shape">
          Unknown shape: ${this.data?.type || 'undefined'}
        </div>
      `;
    }

    const config = this.data;
    const size = config.size || shapeDef.defaultSize;
    const fillColor = config.backgroundColor || config.color || '#ffffff';
    const strokeColor = config.strokeColor || '#000000';
    const strokeWidth = config.strokeWidth || 2;
    const rotation = config.rotation || 0;

    return html`
      <svg 
        class="shape-svg"
        width="${size.width}" 
        height="${size.height}" 
        viewBox="${shapeDef.viewBox}"
        style="transform: rotate(${rotation}deg)"
      >
        <path 
          d="${shapeDef.path}" 
          fill="${fillColor}"
          stroke="${strokeColor}"
          stroke-width="${strokeWidth}"
        />
      </svg>
    `;
  }

  /**
   * Render gradient definitions if needed
   */
  private renderGradients() {
    const config = this.data;
    if (config && 'gradient' in config && config.gradient) {
      const gradientId = `gradient-${this.data.type}-${Math.random().toString(36).substr(2, 9)}`;
      const gradient = config.gradient;
      
      if (gradient.type === 'linear') {
        return html`
          <defs>
            <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
              ${gradient.colors.map((color, index) => 
                html`<stop offset="${(index / (gradient.colors.length - 1)) * 100}%" stop-color="${color}"/>`
              )}
            </linearGradient>
          </defs>
        `;
      } else if (gradient.type === 'radial') {
        return html`
          <defs>
            <radialGradient id="${gradientId}" cx="50%" cy="50%" r="50%">
              ${gradient.colors.map((color, index) => 
                html`<stop offset="${(index / (gradient.colors.length - 1)) * 100}%" stop-color="${color}"/>`
              )}
            </radialGradient>
          </defs>
        `;
      }
    }
    return html``;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleClick);
    this.addEventListener('mousedown', this.handleMouseDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('mousedown', this.handleMouseDown);
    this.cleanup();
  }

  private cleanup() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Handle click events
   */
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
    
    this.isDragging = false;
    this.cleanup();
  };

  private handleHandleStart = (e: MouseEvent) => {
    e.stopPropagation();
    
    const handle = e.target as HTMLElement;
    const handleId = handle.dataset.handleId;
    const handleType = handle.dataset.handleType;
    
    if (handleType && handleId) {
      this.dispatchEvent(new CustomEvent('handle-start', {
        detail: {
          nodeId: this.id,
          handleId: handleId,
          handleType: handleType,
          position: this.position
        },
        bubbles: true,
        composed: true
      }));
    }
  };

  render() {
    // Set CSS custom properties on the host element
    this.style.setProperty('--position-x', `${this.position.x}px`);
    this.style.setProperty('--position-y', `${this.position.y}px`);
    
    // Set shape dimensions
    const shapeDef = this.getShapeDefinition();
    const config = this.data;
    const size = config?.size || shapeDef?.defaultSize || { width: 200, height: 200 };
    this.style.setProperty('--shape-width', `${size.width}px`);
    this.style.setProperty('--shape-height', `${size.height}px`);
    
    return html`
      <div class="shape-node ${this.selected ? 'selected' : ''}">
        ${this.renderGradients()}
        ${this.renderShape()}
        <div class="shape-content">
          <slot></slot>
        </div>
        ${this.connectable ? this.renderHandles() : ''}
        ${this.renderLabel()}
      </div>
    `;
  }

  private renderHandles() {
    const nodeId = this.id;
    return html`
      <div 
        class="handle source" 
        data-handle="source" 
        data-node-id="${nodeId}"
        data-handle-id="${nodeId}-source-right"
        data-handle-type="source"
        @mousedown=${this.handleHandleStart}
      ></div>
      <div 
        class="handle target" 
        data-handle="target" 
        data-node-id="${nodeId}"
        data-handle-id="${nodeId}-target-left"
        data-handle-type="target"
        @mousedown=${this.handleHandleStart}
      ></div>
      <div 
        class="handle top" 
        data-handle="source" 
        data-node-id="${nodeId}"
        data-handle-id="${nodeId}-source-top"
        data-handle-type="source"
        @mousedown=${this.handleHandleStart}
      ></div>
      <div 
        class="handle bottom" 
        data-handle="target" 
        data-node-id="${nodeId}"
        data-handle-id="${nodeId}-target-bottom"
        data-handle-type="target"
        @mousedown=${this.handleHandleStart}
      ></div>
    `;
  }

  private renderLabel() {
    const shapeConfig = this.data;
    if (!shapeConfig) return '';

    // Get the label - use provided label or default to shape type
    const label = shapeConfig.label || shapeConfig.type;
    
    return html`
      <div class="shape-label">
        ${label}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'shape-node': ShapeNode;
  }
}
