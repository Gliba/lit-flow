/**
 * FlowBackground - Background pattern component
 * Provides dots or lines pattern for the flow canvas
 */

import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type BackgroundVariant = 'dots' | 'lines' | 'cross';

@customElement('flow-background')
export class FlowBackground extends LitElement {
  static styles = css`
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
  `;

  @property({ type: String }) variant: BackgroundVariant = 'dots';
  @property({ type: Number }) gap = 20;
  @property({ type: String }) color = '#ddd';
  @property({ type: Number }) size = 1;

  render() {
    const patternId = `flow-bg-pattern-${Math.random().toString(36).substr(2, 9)}`;
    
    return html`
      <svg>
        <defs>
          ${this.variant === 'dots' ? this.renderDotsPattern(patternId) : this.renderLinesPattern(patternId)}
        </defs>
        <rect width="100%" height="100%" fill="url(#${patternId})" />
      </svg>
    `;
  }

  private renderDotsPattern(id: string) {
    return svg`
      <pattern id="${id}" x="0" y="0" width="${this.gap}" height="${this.gap}" patternUnits="userSpaceOnUse">
        <circle cx="${this.size}" cy="${this.size}" r="${this.size}" fill="${this.color}" />
      </pattern>
    `;
  }

  private renderLinesPattern(id: string) {
    return svg`
      <pattern id="${id}" x="0" y="0" width="${this.gap}" height="${this.gap}" patternUnits="userSpaceOnUse">
        <path d="M ${this.gap} 0 L 0 0 0 ${this.gap}" fill="none" stroke="${this.color}" stroke-width="${this.size}" />
      </pattern>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flow-background': FlowBackground;
  }
}

