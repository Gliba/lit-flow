/**
 * Base Node UI components (Lit)
 * Similar to React Flow UI Base Node: header, content, footer wrappers
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('base-node')
export class BaseNode extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: 1px solid var(--flow-node-border, #e5e7eb);
      border-radius: 8px;
      background: var(--flow-node-background, #ffffff);
      color: var(--flow-node-foreground, #111827);
      overflow: hidden;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

@customElement('base-node-header')
export class BaseNodeHeader extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-header-bg, #f9fafb);
      border-bottom: 1px solid var(--flow-node-border, #e5e7eb);
      font-weight: 600;
    }
  `;
  render() {
    return html`<slot></slot>`;
  }
}

@customElement('base-node-header-title')
export class BaseNodeHeaderTitle extends LitElement {
  static styles = css`
    :host { display: contents; }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--base-node-title, #111827);
    }
  `;
  render() {
    return html`<span class="title"><slot></slot></span>`;
  }
}

@customElement('base-node-content')
export class BaseNodeContent extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 12px;
    }
  `;
  render() {
    return html`<slot></slot>`;
  }
}

@customElement('base-node-footer')
export class BaseNodeFooter extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-footer-bg, #fafafa);
      border-top: 1px solid var(--flow-node-border, #e5e7eb);
    }
  `;
  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'base-node': BaseNode;
    'base-node-header': BaseNodeHeader;
    'base-node-header-title': BaseNodeHeaderTitle;
    'base-node-content': BaseNodeContent;
    'base-node-footer': BaseNodeFooter;
  }
}


