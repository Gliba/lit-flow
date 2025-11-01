/**
 * FlowCanvas - Main container component for the flow diagram
 * This is the root element that manages the viewport and renders nodes/edges
 */
import { LitElement } from 'lit';
import { FlowInstance } from '../core/flow-instance';
import type { Node, Edge, Viewport } from '../core/types';
export declare class FlowCanvas extends LitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment;
    static styles: import("lit").CSSResult;
    nodes: Node[];
    edges: Edge[];
    viewport: Viewport;
    nodeTypes: Record<string, string>;
    private connection;
    private isHoveringNode;
    private getNodeGeom;
    /**
     * Get handle position in canvas coordinates
     */
    private getHandleCanvasPosition;
    /**
     * Get handle position for shape nodes based on shape size and handle type
     */
    private getShapeHandlePosition;
    setNodes(nodes: Node[]): void;
    setEdges(edges: Edge[]): void;
    /**
     * Determine the best target handle for a shape node based on connection direction
     */
    private determineBestTargetHandle;
    private computeLabelCanvasPosition;
    private computeStartLabelCanvasPosition;
    private computeEndLabelCanvasPosition;
    instance: FlowInstance;
    private unsubscribe?;
    constructor();
    firstUpdated(): void;
    disconnectedCallback(): void;
    /**
     * Renders a node with dynamic tag name based on node type
     * Falls back to 'flow-node' if type is not registered
     */
    private renderNode;
    render(): import("lit-html").TemplateResult;
    private screenToCanvas;
    private onHandleStart;
    private onMouseMove;
    private onMouseUp;
    private onNodeMouseEnter;
    private onNodeMouseLeave;
    private isElementNode;
    private onNodeSelect;
    private onEdgeSelect;
    private renderPreviewEdge;
}
declare global {
    interface HTMLElementTagNameMap {
        'flow-canvas': FlowCanvas;
    }
}
//# sourceMappingURL=flow-canvas.d.ts.map