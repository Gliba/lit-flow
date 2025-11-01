/**
 * FlowNode - Basic node component
 * Represents a draggable node in the flow diagram
 */
import { LitElement, CSSResult } from 'lit';
import type { XYPosition } from '../core/types';
import type { FlowInstance } from '../core/flow-instance';
import './node-resizer';
export declare class FlowNode extends LitElement {
    static styles: CSSResult | CSSResult[];
    id: string;
    data: any;
    position: XYPosition;
    selected: boolean;
    dragging: boolean;
    draggable: boolean;
    instance?: FlowInstance;
    resizable: boolean;
    private isDragging;
    private dragStart;
    private nodeStart;
    private lastMeasured;
    firstUpdated(): void;
    disconnectedCallback(): void;
    /**
     * Find the nearest scrollable parent element
     */
    private findScrollableElement;
    /**
     * Handle wheel events to prevent panning when scrolling inside scrollable content
     */
    private handleWheel;
    private handleClick;
    private handleResize;
    private handleResizeEnd;
    private handleMouseDown;
    private handleMouseMove;
    private handleMouseUp;
    private cleanup;
    render(): import("lit-html").TemplateResult<1>;
    updated(changedProperties: Map<string | number | symbol, unknown>): void;
    private updateMeasuredSize;
    private onHandleMouseDown;
}
declare global {
    interface HTMLElementTagNameMap {
        'flow-node': FlowNode;
    }
}
//# sourceMappingURL=flow-node.d.ts.map