/**
 * BaseDemoNode - example node composed with Base Node UI wrappers (examples)
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FlowNode } from '../src/components/flow-node';
import '../src/components/ui/base-node';
let BaseDemoNode = class BaseDemoNode extends FlowNode {
    constructor() {
        super(...arguments);
        this.data = {};
    }
    static { this.styles = [
        ...(Array.isArray(FlowNode.styles) ? FlowNode.styles : [FlowNode.styles]),
        css `
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
    ]; }
    render() {
        const title = this.data?.title ?? 'Base Demo';
        const subtitle = this.data?.subtitle ?? '';
        const content = this.data?.content ?? 'Composable node using Base UI wrappers.';
        return html `
      <base-node>
        <base-node-header>
          <base-node-header-title>${title}</base-node-header-title>
          ${subtitle ? html `<span class="subtitle">${subtitle}</span>` : ''}
        </base-node-header>
        <base-node-content>
          ${content}
        </base-node-content>
        <base-node-footer>
          <button part="action" @click=${(e) => e.stopPropagation()}>Action</button>
        </base-node-footer>
      </base-node>

      <div class="handle left" data-handle-id="${this.id}-in" @mousedown=${(e) => { e.stopPropagation(); e.preventDefault(); this.dispatchEvent(new CustomEvent('handle-start', { detail: { nodeId: this.id, type: 'target' }, bubbles: true, composed: true })); }}></div>
      <div class="handle right" data-handle-id="${this.id}-out" @mousedown=${(e) => { e.stopPropagation(); e.preventDefault(); this.dispatchEvent(new CustomEvent('handle-start', { detail: { nodeId: this.id, type: 'source' }, bubbles: true, composed: true })); }}></div>
    `;
    }
};
__decorate([
    property({ type: Object })
], BaseDemoNode.prototype, "data", void 0);
BaseDemoNode = __decorate([
    customElement('base-demo-node')
], BaseDemoNode);
export { BaseDemoNode };
//# sourceMappingURL=base-demo-node.js.map