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
    selectable: boolean;
    label: string;
    type: EdgeType;
    markerStart?: MarkerSpec | string;
    markerEnd?: MarkerSpec | string;
    offset?: number;
    pathStyle?: Partial<CSSStyleDeclaration> | string;
    private markerHandleHalf;
    private hovering;
    /** Cached handle positions (from rAF); avoids DOM reads during render. */
    private _cachedSource;
    private _cachedTarget;
    private _handleRafId;
    private _lastPositionKey;
    /**
     * Convert style object to CSS string
     */
    private convertStyleObjToString;
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
    /**
     * Node-only source position (no DOM reads). Use during render when using handles.
     */
    private getSourcePositionNodeOnly;
    /**
     * Node-only target position (no DOM reads). Use during render when using handles.
     */
    private getTargetPositionNodeOnly;
    /**
     * Resolve source/target for render. Uses node-only positions when handles are
     * used (avoids getBoundingClientRect during render). Cached handle positions
     * are applied after rAF in updated().
     */
    private getPositionsForRender;
    private getPositionCacheKey;
    /** True for the live connection-preview edge, which must always render. */
    private get isPreview();
    /**
     * An endpoint is "known" once we have a real size for it — either a measured
     * size or an explicit width. Until then the edge would have to guess (150x50)
     * and visibly snap when the real size arrives, so we hold off rendering.
     */
    private endpointKnown;
    updated(_changed: Map<string, unknown>): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private handleClick;
    private emitHover;
    private handlePointerEnter;
    private handlePointerLeave;
}
declare global {
    interface HTMLElementTagNameMap {
        'flow-edge': FlowEdge;
    }
}
//# sourceMappingURL=flow-edge.d.ts.map