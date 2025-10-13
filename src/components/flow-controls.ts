/**
 * FlowControls - Zoom and pan controls component
 * Provides UI buttons for viewport manipulation
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { FlowInstance } from '../core/flow-instance';

@customElement('flow-controls')
export class FlowControls extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      bottom: 20px;
      left: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 10;
    }

    button {
      width: 36px;
      height: 36px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      transition: all 0.2s;
    }

    button:hover {
      background: #f5f5f5;
      border-color: #999;
    }

    button:active {
      background: #e0e0e0;
    }

    .divider {
      height: 1px;
      background: #ddd;
      margin: 4px 0;
    }
  `;

  @property({ type: Object }) instance?: FlowInstance;

  render() {
    return html`
      <button @click=${this.handleZoomIn} title="Zoom In">+</button>
      <button @click=${this.handleZoomOut} title="Zoom Out">−</button>
      <div class="divider"></div>
      <button @click=${this.handleFitView} title="Fit View">⛶</button>
    `;
  }

  private handleZoomIn = () => {
    this.instance?.zoomIn();
  };

  private handleZoomOut = () => {
    this.instance?.zoomOut();
  };

  private handleFitView = () => {
    this.instance?.fitView();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'flow-controls': FlowControls;
  }
}

