/**
 * FlowBackground - Background pattern component
 * Provides dots or lines pattern for the flow canvas
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let FlowBackground = class FlowBackground extends LitElement {
    constructor() {
        super(...arguments);
        this.variant = 'dots';
        this.gap = 20;
        this.color = '#ddd';
        this.size = 1;
    }
    static { this.styles = css `
    :host {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  `; }
    render() {
        const patternId = `flow-bg-pattern-${Math.random().toString(36).substr(2, 9)}`;
        return html `
      <svg>
        <defs>
          ${this.variant === 'dots' ? this.renderDotsPattern(patternId) : this.renderLinesPattern(patternId)}
        </defs>
        <rect width="100%" height="100%" fill="url(#${patternId})" />
      </svg>
    `;
    }
    renderDotsPattern(id) {
        return svg `
      <pattern id="${id}" x="0" y="0" width="${this.gap}" height="${this.gap}" patternUnits="userSpaceOnUse">
        <circle cx="${this.size}" cy="${this.size}" r="${this.size}" fill="${this.color}" />
      </pattern>
    `;
    }
    renderLinesPattern(id) {
        return svg `
      <pattern id="${id}" x="0" y="0" width="${this.gap}" height="${this.gap}" patternUnits="userSpaceOnUse">
        <path d="M ${this.gap} 0 L 0 0 0 ${this.gap}" fill="none" stroke="${this.color}" stroke-width="${this.size}" />
      </pattern>
    `;
    }
};
__decorate([
    property({ type: String })
], FlowBackground.prototype, "variant", void 0);
__decorate([
    property({ type: Number })
], FlowBackground.prototype, "gap", void 0);
__decorate([
    property({ type: String })
], FlowBackground.prototype, "color", void 0);
__decorate([
    property({ type: Number })
], FlowBackground.prototype, "size", void 0);
FlowBackground = __decorate([
    customElement('flow-background')
], FlowBackground);
export { FlowBackground };
//# sourceMappingURL=flow-background.js.map