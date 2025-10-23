/**
 * FlowMinimap - Miniature overview component
 * Shows a small overview of the entire flow with viewport indicator
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let FlowMinimap = class FlowMinimap extends LitElement {
    constructor() {
        super(...arguments);
        this.width = 200;
        this.height = 150;
    }
    static { this.styles = css `
    :host {
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 200px;
      height: 150px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      z-index: 10;
    }

    .minimap-container {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .viewport-indicator {
      position: absolute;
      border: 2px solid #1a73e8;
      background: rgba(26, 115, 232, 0.1);
      pointer-events: none;
    }
  `; }
    render() {
        return html `
      <div class="minimap-container">
        <div class="viewport-indicator"></div>
        <slot></slot>
      </div>
    `;
    }
};
__decorate([
    property({ type: Number })
], FlowMinimap.prototype, "width", void 0);
__decorate([
    property({ type: Number })
], FlowMinimap.prototype, "height", void 0);
FlowMinimap = __decorate([
    customElement('flow-minimap')
], FlowMinimap);
export { FlowMinimap };
//# sourceMappingURL=flow-minimap.js.map