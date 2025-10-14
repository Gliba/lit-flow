/**
 * ERDTableNode - Database table node with field-level handles
 * Example of a custom node type for ERD diagrams
 */

import { html, css, CSSResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { FlowNode } from '../flow-node';

export interface ERDField {
  name: string;
  type: string;
  key?: 'PK' | 'FK' | 'UK';
  nullable?: boolean;
}

export interface ERDTableData {
  tableName: string;
  fields: ERDField[];
  color?: string;
}

@customElement('erd-table-node')
export class ERDTableNode extends FlowNode {
  static styles: CSSResult | CSSResult[] = [
    ...(Array.isArray(super.styles) ? super.styles : [super.styles]),
    css`
      :host {
        padding: 0;
        min-width: 200px;
        background: var(--erd-table-bg, white);
      }

      .table-header {
        background: var(--erd-table-header-bg, #2563eb);
        color: white;
        padding: 12px 16px;
        font-weight: 600;
        border-radius: 8px 8px 0 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .table-icon {
        font-size: 18px;
      }

      .table-body {
        padding: 0;
      }

      .field-row {
        display: grid;
        grid-template-columns: 30px 1fr auto auto;
        gap: 8px;
        padding: 10px 16px;
        border-bottom: 1px solid var(--erd-border, #e5e7eb);
        align-items: center;
        position: relative;
        background: white;
        transition: background 0.2s;
      }

      .field-row:hover {
        background: var(--erd-row-hover, #f3f4f6);
      }

      .field-row:last-child {
        border-bottom: none;
        border-radius: 0 0 8px 8px;
      }

      .field-key {
        font-size: 10px;
        font-weight: 700;
        color: var(--erd-key-color, #dc2626);
      }

      .field-name {
        font-weight: 500;
        color: var(--erd-text, #1f2937);
      }

      .field-type {
        font-size: 11px;
        color: var(--erd-type-color, #6b7280);
        text-transform: uppercase;
      }

      .field-nullable {
        font-size: 10px;
        color: #9ca3af;
      }

      /* Handles for each field */
      .field-handle {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--flow-handle-bg, #fff);
        border: 2px solid var(--flow-handle-border, #2563eb);
        cursor: crosshair;
        pointer-events: auto;
        z-index: 10;
        transition: all 0.2s;
      }

      .field-handle.left {
        left: -5px;
        top: 50%;
        transform: translateY(-50%);
      }

      .field-handle.right {
        right: -5px;
        top: 50%;
        transform: translateY(-50%);
      }

      .field-handle:hover {
        background: var(--flow-handle-border, #2563eb);
        transform: translateY(-50%) scale(1.3);
      }
    `
  ];

  private onFieldHandleMouseDown(fieldName: string, side: 'left' | 'right') {
    return (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      
      // Generate unique handle ID
      const handleId = `${this.id}-${fieldName}-${side}`;
      
      // Dispatch handle-start event with field information
      this.dispatchEvent(new CustomEvent('handle-start', {
        detail: { 
          nodeId: this.id, 
          type: side === 'left' ? 'target' : 'source',
          handleId,
          fieldName
        },
        bubbles: true,
        composed: true
      }));
    };
  }

  render() {
    const tableData = this.data as ERDTableData;
    const tableName = tableData?.tableName || 'Table';
    const fields = tableData?.fields || [];

    return html`
      <div class="table-header" style="${tableData.color ? `background: ${tableData.color}` : ''}">
        <span class="table-icon">📊</span>
        <span>${tableName}</span>
      </div>
      
      <div class="table-body">
        ${fields.map(field => html`
          <div class="field-row" data-field="${field.name}">
            <div class="field-key">
              ${field.key || ''}
            </div>
            <div class="field-name">${field.name}</div>
            <div class="field-type">${field.type}</div>
            <div class="field-nullable">
              ${field.nullable ? 'NULL' : ''}
            </div>
            
            <!-- Left handle (input) for this field -->
            <div 
              class="field-handle left"
              data-handle="target"
              data-field="${field.name}"
              data-handle-id="${this.id}-${field.name}-left"
              @mousedown=${this.onFieldHandleMouseDown(field.name, 'left')}
            ></div>
            
            <!-- Right handle (output) for this field -->
            <div 
              class="field-handle right"
              data-handle="source"
              data-field="${field.name}"
              data-handle-id="${this.id}-${field.name}-right"
              @mousedown=${this.onFieldHandleMouseDown(field.name, 'right')}
            ></div>
          </div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'erd-table-node': ERDTableNode;
  }
}

