/**
 * Base Node UI components (Lit)
 * Similar to React Flow UI Base Node: header, content, footer wrappers
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
let BaseNode = class BaseNode extends LitElement {
    static { this.styles = css `
    :host {
      display: block;
      border: 1px solid var(--flow-node-border, #e5e7eb);
      border-radius: 8px;
      background: var(--flow-node-background, #ffffff);
      color: var(--flow-node-foreground, #111827);
      overflow: hidden;
    }
  `; }
    render() {
        return html `<slot></slot>`;
    }
};
BaseNode = __decorate([
    customElement('base-node')
], BaseNode);
export { BaseNode };
let BaseNodeHeader = class BaseNodeHeader extends LitElement {
    static { this.styles = css `
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-header-bg, #f9fafb);
      border-bottom: 1px solid var(--flow-node-border, #e5e7eb);
      font-weight: 600;
    }
  `; }
    render() {
        return html `<slot></slot>`;
    }
};
BaseNodeHeader = __decorate([
    customElement('base-node-header')
], BaseNodeHeader);
export { BaseNodeHeader };
let BaseNodeHeaderTitle = class BaseNodeHeaderTitle extends LitElement {
    static { this.styles = css `
    :host { display: contents; }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--base-node-title, #111827);
    }
  `; }
    render() {
        return html `<span class="title"><slot></slot></span>`;
    }
};
BaseNodeHeaderTitle = __decorate([
    customElement('base-node-header-title')
], BaseNodeHeaderTitle);
export { BaseNodeHeaderTitle };
let BaseNodeContent = class BaseNodeContent extends LitElement {
    static { this.styles = css `
    :host {
      display: block;
      padding: 12px;
    }
  `; }
    render() {
        return html `<slot></slot>`;
    }
};
BaseNodeContent = __decorate([
    customElement('base-node-content')
], BaseNodeContent);
export { BaseNodeContent };
let BaseNodeFooter = class BaseNodeFooter extends LitElement {
    static { this.styles = css `
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-footer-bg, #fafafa);
      border-top: 1px solid var(--flow-node-border, #e5e7eb);
    }
  `; }
    render() {
        return html `<slot></slot>`;
    }
};
BaseNodeFooter = __decorate([
    customElement('base-node-footer')
], BaseNodeFooter);
export { BaseNodeFooter };
//# sourceMappingURL=base-node.js.map