/**
 * FlowEdge - Edge component for connecting nodes
 * Renders SVG paths between nodes
 */
import { LitElement } from 'lit';
import type { Node, MarkerSpec, EdgeType } from '../core/types';
export declare class FlowEdge extends LitElement {
    static styles: import("lit").CSSResult;
    id: string;
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
    sourceNode?: Node;
    targetNode?: Node;
    animated: boolean;
    selected: boolean;
    label: string;
    type: EdgeType;
    markerStart?: MarkerSpec | string;
    markerEnd?: MarkerSpec | string;
    offset?: number;
    private markerHandleHalf;
    /**
     * Create marker ID from marker spec
     */
    private getMarkerId;
    /**
     * Create marker SVG from marker spec
     */
    private createMarkerSVG;
    /**
     * Normalize marker spec to a string key for caching
     */
    private normalizeMarkerSpec;
    /**
     * Simple hash function for generating unique IDs
     */
    private hashString;
    /**
     * Get path based on edge type
     */
    private getPathForType;
    /** Returns the ShadowRoot of the parent flow-canvas */
    private getFlowCanvasRoot;
    /** Returns the flow-canvas host element (if available) */
    private getFlowCanvasHost;
    /**
     * Find a specific handle element within a node
     */
    private findHandleElement;
    /**
     * Get the canvas coordinates of a specific handle
     */
    private getHandlePosition;
    /**
     * Get the source position (handle or node edge)
     */
    private getSourcePosition;
    /**
     * Get the target position (handle or node edge)
     */
    private getTargetPosition;
    render(): import("lit-html").TemplateResult<1>;
    private handleClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'flow-edge': FlowEdge;
    }
}
//# sourceMappingURL=flow-edge.d.ts.map