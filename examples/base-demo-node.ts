/**
 * BaseDemoNode - example node composed with Base Node UI wrappers (examples)
 */

import { html, css, type CSSResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FlowNode } from '../src/components/flow-node';
import '../src/components/ui/base-node';

interface BaseDemoData {
  title?: string;
  subtitle?: string;
  content?: string;
}

@customElement('base-demo-node')
export class BaseDemoNode extends FlowNode {
  static styles: CSSResult | CSSResult[] = [
    ...(Array.isArray(FlowNode.styles) ? (FlowNode.styles as CSSResult[]) : [FlowNode.styles as CSSResult]),
    css`
      :host {
        padding: 0;
        min-width: 220px;
        background: var(--node-bg, #fff);
      }

      .subtitle {
        font-size: 12px;
        color: #6b7280;
        margin-left: auto;
      }

      .handle {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #fff;
        border: 2px solid #2563eb;
        top: 50%;
        transform: translateY(-50%);
        cursor: crosshair;
      }

      .handle.left { left: -5px; }
      .handle.right { right: -5px; }
    `
  ];

  @property({ type: Object }) data: BaseDemoData = {};

  render() {
    const title = this.data?.title ?? 'Base Demo';
    const subtitle = this.data?.subtitle ?? '';
    const content = this.data?.content ?? 'Composable node using Base UI wrappers.';

    return html`
      <base-node>
        <base-node-header>
          <base-node-header-title>${title}</base-node-header-title>
          ${subtitle ? html`<span class="subtitle">${subtitle}</span>` : ''}
        </base-node-header>
        <base-node-content>
          ${content}
        </base-node-content>
        <base-node-footer>
          <button part="action" @click=${(e: MouseEvent) => e.stopPropagation()}>Action</button>
        </base-node-footer>
      </base-node>

      <div class="handle left" data-handle-id="${this.id}-in" @mousedown=${(e: MouseEvent) => { e.stopPropagation(); e.preventDefault(); this.dispatchEvent(new CustomEvent('handle-start', { detail: { nodeId: this.id, type: 'target' }, bubbles: true, composed: true })); }}></div>
      <div class="handle right" data-handle-id="${this.id}-out" @mousedown=${(e: MouseEvent) => { e.stopPropagation(); e.preventDefault(); this.dispatchEvent(new CustomEvent('handle-start', { detail: { nodeId: this.id, type: 'source' }, bubbles: true, composed: true })); }}></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'base-demo-node': BaseDemoNode;
  }
}

