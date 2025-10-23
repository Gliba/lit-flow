/**
 * NodeResizer - A modular resize component that can be added to any node
 * Inspired by React Flow's NodeResizer component
 */
import { LitElement } from 'lit';
export declare class NodeResizer extends LitElement {
    static styles: import("lit").CSSResult;
    visible: boolean;
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;
    keepAspectRatio: boolean;
    private isResizing;
    private resizeStart;
    private resizeHandle;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private cleanup;
    private handleMouseDown;
    private handleMouseMove;
    private handleMouseUp;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'node-resizer': NodeResizer;
    }
}
//# sourceMappingURL=node-resizer.d.ts.map