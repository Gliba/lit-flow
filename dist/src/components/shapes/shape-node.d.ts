/**
 * ShapeNode - Component for rendering shape-based nodes
 * Uses a centralized Shape component that renders different SVG paths based on shape type
 */
import { LitElement } from 'lit';
import type { ShapeNodeDataDirect } from './types';
import '../node-resizer';
export declare class ShapeNode extends LitElement {
    static styles: import("lit").CSSResult;
    id: string;
    data: ShapeNodeDataDirect;
    position: {
        x: number;
        y: number;
    };
    selected: boolean;
    dragging: boolean;
    draggable: boolean;
    connectable: boolean;
    instance: any;
    resizable: boolean;
    private isDragging;
    private dragStart;
    private nodeStart;
    updated(changedProperties: Map<string | number | symbol, unknown>): void;
    /**
     * Get the shape definition from the registry
     */
    private getShapeDefinition;
    /**
     * Render the SVG shape
     */
    private renderShape;
    /**
     * Render gradient definitions if needed
     */
    private renderGradients;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private cleanup;
    /**
     * Handle click events
     */
    private handleClick;
    private handleResize;
    private handleResizeEnd;
    private handleMouseDown;
    private handleMouseMove;
    private handleMouseUp;
    private handleHandleStart;
    render(): import("lit-html").TemplateResult<1>;
    private renderHandles;
    private renderLabel;
}
declare global {
    interface HTMLElementTagNameMap {
        'shape-node': ShapeNode;
    }
}
//# sourceMappingURL=shape-node.d.ts.map