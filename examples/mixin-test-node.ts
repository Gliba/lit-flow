/**
 * MixinTestNode - Test node using NodeMixin instead of extending FlowNode
 * Demonstrates composition over inheritance
 */

import { LitElement, html, css } from 'lit';

// Import NodeMixin directly from source to avoid loading the entire library
import { NodeMixin } from '../src/mixins/node-mixin.js';

interface MixinTestData {
  title?: string;
  description?: string;
  color?: string;
  icon?: string;
}

export class MixinTestNode extends NodeMixin(LitElement) {
  // Type assertion to access mixin properties
  declare id: string;
  declare position: { x: number; y: number };
  declare data: any;
  declare selected: boolean;
  declare dragging: boolean;
  declare instance: any;
  declare resizable: boolean;
  declare draggable: boolean;
  declare connectable: boolean;
  declare minWidth: number;
  declare maxWidth: number;
  declare minHeight: number;
  declare maxHeight: number;
  declare keepAspectRatio: boolean;
  
  constructor() {
    super();
    // Set resizer properties
    this.resizable = true;
    this.minWidth = 120;
    this.minHeight = 80;
    this.maxWidth = 400;
    this.maxHeight = 300;
    this.keepAspectRatio = false;
    
  }
  static styles = [
    ...(super.styles ? (Array.isArray(super.styles) ? super.styles : [super.styles]) : []),
    css`
      :host {
        border: 2px solid var(--node-color, #1fa2ff);
        border-radius: 12px;
        background: white;
        padding: 16px;
        min-width: 150px;
        min-height: 100px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      :host(:hover) {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      :host([selected]) {
        border-color: #1a73e8;
        box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.2);
      }

      .node-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
        height: 100%;
      }

      .node-header {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .node-icon {
        font-size: 18px;
        color: var(--node-color, #1fa2ff);
      }

      .node-title {
        font-weight: 600;
        color: #1f2937;
        font-size: 14px;
      }

      .node-description {
        font-size: 12px;
        color: #6b7280;
        line-height: 1.4;
      }

      .node-footer {
        margin-top: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .node-badge {
        background: var(--node-color, #1fa2ff);
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: 500;
      }

      .node-actions {
        display: flex;
        gap: 4px;
      }

      .action-btn {
        background: #f3f4f6;
        border: none;
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 10px;
        cursor: pointer;
        transition: background 0.2s;
      }

      .action-btn:hover {
        background: #e5e7eb;
      }

      /* Handles */
      .handle {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: white;
        border: 2px solid var(--node-color, #1fa2ff);
        cursor: crosshair;
        opacity: 0;
        transition: opacity 0.2s;
        z-index: 10;
      }

      .handle.left {
        left: -5px;
        top: 50%;
        transform: translateY(-50%);
      }

      .handle.right {
        right: -5px;
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

      :host(:hover) .handle {
        opacity: 1;
      }

      .handle:hover {
        transform: translateY(-50%) scale(1.2);
        border-color: #1a73e8;
      }

      .handle.top:hover,
      .handle.bottom:hover {
        transform: translateX(-50%) scale(1.2);
      }
    `
  ];

  render() {
    const data = this.data as MixinTestData;
    const title = data?.title || 'Mixin Node';
    const description = data?.description || 'This node uses NodeMixin for functionality';
    const color = data?.color || '#1fa2ff';
    const icon = data?.icon || '🔧';

    // Set CSS custom property for color
    (this as any).style.setProperty('--node-color', color);

    return html`
      <div class="node-content">
        <div class="node-header">
          <span class="node-icon">${icon}</span>
          <div class="node-title">${title}</div>
        </div>
        
        <div class="node-description">${description}</div>
        
        <div class="node-footer">
          <span class="node-badge">Mixin</span>
          <div class="node-actions">
            <button class="action-btn" @click=${this.handleAction}>Action</button>
          </div>
        </div>
      </div>

      <!-- Connection handles -->
      ${this.connectable ? html`
        <div 
          class="handle left" 
          data-handle-id="${this.id}-target-left"
          @mousedown=${this.handleHandleStart('target', 'left')}
        ></div>
        <div 
          class="handle right" 
          data-handle-id="${this.id}-source-right"
          @mousedown=${this.handleHandleStart('source', 'right')}
        ></div>
        <div 
          class="handle top" 
          data-handle-id="${this.id}-source-top"
          @mousedown=${this.handleHandleStart('source', 'top')}
        ></div>
        <div 
          class="handle bottom" 
          data-handle-id="${this.id}-target-bottom"
          @mousedown=${this.handleHandleStart('target', 'bottom')}
        ></div>
      ` : ''}

      <!-- Resizer -->
      ${(this as any).renderResizer()}
    `;
  }

  private handleAction = (e: MouseEvent) => {
    e.stopPropagation();
    console.log('Action clicked on mixin node:', this.id);
    
    // Dispatch custom event
    (this as any).dispatchEvent(new CustomEvent('node-action', {
      detail: { 
        nodeId: this.id, 
        action: 'button-click',
        data: this.data 
      },
      bubbles: true,
      composed: true
    }));
  };

  private handleHandleStart = (type: 'source' | 'target', side: string) => {
    return (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      
      (this as any).dispatchEvent(new CustomEvent('handle-start', {
        detail: { 
          nodeId: this.id, 
          type: type,
          handleId: `${this.id}-${type}-${side}`,
          side: side
        },
        bubbles: true,
        composed: true
      }));
    };
  };

}

// Register the custom element
customElements.define('mixin-test-node', MixinTestNode as any);

declare global {
  interface HTMLElementTagNameMap {
    'mixin-test-node': MixinTestNode;
  }
}