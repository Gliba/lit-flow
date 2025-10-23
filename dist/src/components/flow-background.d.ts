/**
 * FlowBackground - Background pattern component
 * Provides dots or lines pattern for the flow canvas
 */
import { LitElement } from 'lit';
export type BackgroundVariant = 'dots' | 'lines' | 'cross';
export declare class FlowBackground extends LitElement {
    static styles: import("lit").CSSResult;
    variant: BackgroundVariant;
    gap: number;
    color: string;
    size: number;
    render(): import("lit-html").TemplateResult<1>;
    private renderDotsPattern;
    private renderLinesPattern;
}
declare global {
    interface HTMLElementTagNameMap {
        'flow-background': FlowBackground;
    }
}
//# sourceMappingURL=flow-background.d.ts.map