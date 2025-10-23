/**
 * FlowControls - Zoom and pan controls component
 * Provides UI buttons for viewport manipulation
 */
import { LitElement } from 'lit';
import type { FlowInstance } from '../core/flow-instance';
export declare class FlowControls extends LitElement {
    static styles: import("lit").CSSResult;
    instance?: FlowInstance;
    render(): import("lit-html").TemplateResult<1>;
    private handleZoomIn;
    private handleZoomOut;
    private handleFitView;
}
declare global {
    interface HTMLElementTagNameMap {
        'flow-controls': FlowControls;
    }
}
//# sourceMappingURL=flow-controls.d.ts.map