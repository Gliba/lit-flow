/**
 * lit-flow - Flow diagram library for Lit built on @xyflow/system
 *
 * @packageDocumentation
 */

import { CSSResult } from 'lit';
import { EdgeBase } from '@xyflow/system';
import { InternalNodeBase } from '@xyflow/system';
import { LitElement } from 'lit';
import { NodeBase } from '@xyflow/system';
import { Position } from '@xyflow/system';
import { TemplateResult } from 'lit-html';
import { Viewport as Viewport_2 } from '@xyflow/system';
import { XYPosition as XYPosition_2 } from '@xyflow/system';

export declare interface AdvancedShapeConfig extends ShapeConfig {
    gradient?: {
        type: 'linear' | 'radial';
        colors: string[];
        direction?: number;
    };
    pattern?: {
        type: 'dots' | 'lines' | 'grid';
        color: string;
        size: number;
    };
    shadow?: {
        enabled: boolean;
        color: string;
        blur: number;
        offset: {
            x: number;
            y: number;
        };
    };
}

export declare type BackgroundVariant = 'dots' | 'lines' | 'cross';

export declare class BaseNode extends LitElement {
    static styles: CSSResult;
    render(): TemplateResult<1>;
}

export declare class BaseNodeContent extends LitElement {
    static styles: CSSResult;
    render(): TemplateResult<1>;
}

export declare class BaseNodeFooter extends LitElement {
    static styles: CSSResult;
    render(): TemplateResult<1>;
}

export declare class BaseNodeHeader extends LitElement {
    static styles: CSSResult;
    render(): TemplateResult<1>;
}

export declare class BaseNodeHeaderTitle extends LitElement {
    static styles: CSSResult;
    render(): TemplateResult<1>;
}

export declare interface ConnectionEndParams {
    connectionStarted: boolean;
    sourceNodeId?: string;
    sourceHandleId?: string;
    targetNodeId?: string;
    targetHandleId?: string;
    position?: XYPosition;
}

export declare interface ConnectionStartParams {
    nodeId: string;
    handleId?: string;
    handleType?: 'source' | 'target';
}

declare type Constructor<T = {}> = new (...args: any[]) => T;

export declare function createStore(initialState?: Partial<FlowState>): {
    getState: () => FlowState;
    setState: (updates: Partial<FlowState>) => void;
    subscribe: (listener: (state: FlowState) => void) => () => boolean;
};

export declare type Edge<EdgeData extends Record<string, unknown> = Record<string, unknown>, EdgeType extends string | undefined = string | undefined> = EdgeBase<EdgeData, EdgeType> & {
    sourceHandle?: string;
    targetHandle?: string;
    markerStart?: MarkerSpec | string;
    markerEnd?: MarkerSpec | string;
    type?: EdgeType;
    offset?: number;
    pathStyle?: Partial<CSSStyleDeclaration> | string;
    selectable?: boolean;
};

export declare type EdgeChange = {
    type: 'select';
    id: string;
    selected: boolean;
} | {
    type: 'remove';
    id: string;
} | {
    type: 'add';
    item: Edge;
};

export declare interface EdgeHoverEvent extends CustomEvent<EdgeHoverEventDetail> {
}

export declare interface EdgeHoverEventDetail {
    edgeId: string;
    hovered: boolean;
    edge: Edge;
}

export declare type EdgeType = 'default' | 'straight' | 'step' | 'smoothstep' | 'simplebezier';

export declare interface ERDField {
    name: string;
    type: string;
    key?: 'PK' | 'FK' | 'UK';
    nullable?: boolean;
}

export declare interface ERDTableData {
    tableName: string;
    fields: ERDField[];
    color?: string;
    size?: {
        width?: number;
        height?: number;
    };
}

export declare class ERDTableNode extends FlowNode {
    static styles: CSSResult | CSSResult[];
    private appliedInitialSize;
    firstUpdated(): void;
    updated(changedProperties: Map<string | number | symbol, unknown>): void;
    private onFieldHandleMouseDown;
    render(): TemplateResult<1>;
}

export declare class FlowBackground extends LitElement {
    static styles: CSSResult;
    variant: BackgroundVariant;
    gap: number;
    color: string;
    size: number;
    render(): TemplateResult<1>;
    private renderDotsPattern;
    private renderLinesPattern;
}

export declare class FlowCanvas extends LitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment;
    static styles: CSSResult;
    nodes: Node_2[];
    edges: Edge[];
    viewport: Viewport;
    onConnectStart?: (params: ConnectionStartParams) => void;
    onConnectEnd?: (params: ConnectionEndParams) => void;
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
    setNodes(nodes: Node_2[]): void;
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
    private unsubscribeRenderComplete?;
    constructor();
    firstUpdated(): void;
    disconnectedCallback(): void;
    /**
     * Renders a node with dynamic tag name based on node type
     * Falls back to 'flow-node' if type is not registered
     */
    private renderNode;
    render(): TemplateResult;
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

export declare class FlowControls extends LitElement {
    static styles: CSSResult;
    instance?: FlowInstance;
    render(): TemplateResult<1>;
    private handleZoomIn;
    private handleZoomOut;
    private handleFitView;
}

export declare class FlowEdge extends LitElement {
    static styles: CSSResult;
    id: string;
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
    sourceNode?: Node_2;
    targetNode?: Node_2;
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
    render(): TemplateResult<1>;
    private handleClick;
    private emitHover;
    private handlePointerEnter;
    private handlePointerLeave;
}

export declare class FlowInstance {
    private container;
    private state;
    private subscribers;
    private panZoomInstance;
    private options;
    private notifyScheduled;
    private pendingFit;
    private fitFallbackTimer;
    private didInitFit;
    private renderToken;
    private settledToken;
    private renderCompleteCallbacks;
    private panZoomUpdateOptions;
    constructor(options?: FlowOptions);
    mount(container: HTMLElement): void;
    /**
     * Enable or disable panning on drag
     */
    setPanOnDrag(enabled: boolean): void;
    destroy(): void;
    getState(): FlowState;
    get nodes(): Node_2[];
    get edges(): Edge[];
    getViewport(): Viewport;
    setViewport(viewport: Viewport): void;
    setNodes(nodes: Node_2[]): void;
    setEdges(edges: Edge[]): void;
    updateNode(id: string, updates: Partial<Node_2>): void;
    updateEdge(id: string, updates: Partial<Edge>): void;
    /**
     * Add a node to the flow.
     *
     * If `position` is omitted, it will be auto-calculated based on the current
     * viewport and container size, trying to avoid overlapping existing nodes.
     */
    addNode(node: Omit<Node_2, 'position'> & {
        position?: XYPosition;
    }): void;
    removeNode(id: string): void;
    addEdge(edge: Edge): void;
    removeEdge(id: string): void;
    subscribe(callback: (state: FlowState) => void): () => void;
    /**
     * Register a callback that fires once after a batch of data (set/add/remove of
     * nodes or edges) has finished rendering — i.e. every node has been measured
     * and edges have been laid out at their final positions. Fires once per
     * structural revision. Returns an unsubscribe function.
     */
    onRenderComplete(callback: (state: FlowState) => void): () => void;
    zoomIn(): void;
    zoomOut(): void;
    /**
     * Center and zoom the viewport so every node is visible.
     *
     * @param options.padding     Gap (px) to leave around the content (default 50).
     * @param options.awaitMeasure When true, if the nodes aren't measured yet or
     *   the container has no size, the fit is deferred and retried automatically
     *   once measurements land — use this for fit-on-load.
     */
    fitView(options?: {
        padding?: number;
        awaitMeasure?: boolean;
    }): void;
    /** Effective rendered size of a node, falling back through measured → explicit → shape data → default. */
    private getNodeSize;
    /** True once every node has a real size and the container has been laid out. */
    private canFitAccurately;
    /** True once every node has a real (non-fallback) size. */
    private areNodesMeasured;
    /** Mark a new structural revision whose render we should wait to settle. */
    private armRender;
    /**
     * Emit render-complete once the current revision's nodes are all measured.
     * Called from the batched notify, so it sees the measurements that just
     * landed. Defers two frames so edges resolve their handle positions and
     * paint before we report "done".
     */
    private maybeEmitRenderComplete;
    /** Run a deferred fit once nodes are measured. Called from the batched notify. */
    private maybeRunPendingFit;
    /**
     * Safety net: if measurements never complete (e.g. a node errors), force the
     * deferred fit with whatever sizes are available rather than leaving the
     * viewport unfit.
     */
    private scheduleFitFallback;
    private clearFitFallback;
    /** Trigger the one-time fit-on-load when `fitViewOnInit` (or legacy `fitView`) is set. */
    private maybeInitFit;
    private updateLookups;
    private getAutoNodePosition;
    private snapPositionToGrid;
    private notifySubscribers;
}

export declare class FlowMinimap extends LitElement {
    static styles: CSSResult;
    width: number;
    height: number;
    render(): TemplateResult<1>;
}

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
    render(): TemplateResult<1>;
    updated(changedProperties: Map<string | number | symbol, unknown>): void;
    private updateMeasuredSize;
    private onHandleMouseDown;
}

export declare interface FlowOptions {
    nodes?: Node_2[];
    edges?: Edge[];
    /** @deprecated Use `fitViewOnInit`. Kept as an alias for backwards compatibility. */
    fitView?: boolean;
    /** When true, fit the viewport to all nodes once on first load (after they're measured). Off by default. */
    fitViewOnInit?: boolean;
    minZoom?: number;
    maxZoom?: number;
    defaultZoom?: number;
    snapToGrid?: boolean;
    snapGrid?: [number, number];
    nodesDraggable?: boolean;
    nodesConnectable?: boolean;
    elementsSelectable?: boolean;
    zoomOnDoubleClick?: boolean;
}

export declare interface FlowState {
    nodes: Node_2[];
    edges: Edge[];
    viewport: Viewport;
    nodeLookup: Map<string, InternalNode>;
    edgeLookup: Map<string, Edge>;
}

/**
 * Generate a bezier curve path between two points
 * Uses @xyflow/system's getBezierPath utility
 */
export declare function getBezierPath(params: {
    sourceX: number;
    sourceY: number;
    sourcePosition?: Position;
    targetX: number;
    targetY: number;
    targetPosition?: Position;
    curvature?: number;
}): [path: string, labelX: number, labelY: number, offsetX: number, offsetY: number];

/**
 * Calculate the center point between two positions
 */
export declare function getCenter(a: XYPosition, b: XYPosition): XYPosition;

/**
 * Calculate distance between two points
 */
export declare function getDistance(a: XYPosition, b: XYPosition): number;

/**
 * Generate a smooth step path between two points
 * Uses @xyflow/system's getSmoothStepPath utility
 */
export declare function getSmoothStepPath(params: {
    sourceX: number;
    sourceY: number;
    sourcePosition?: Position;
    targetX: number;
    targetY: number;
    targetPosition?: Position;
    borderRadius?: number;
    offset?: number;
}): [path: string, labelX: number, labelY: number, offsetX: number, offsetY: number];

/**
 * Generate a straight line path
 * Uses @xyflow/system's getStraightPath utility
 */
export declare function getStraightPath(params: {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
}): [path: string, labelX: number, labelY: number, offsetX: number, offsetY: number];

declare type InternalNode<T extends NodeBase = NodeBase> = InternalNodeBase<T>;

/**
 * Check if a point is inside a rectangle
 */
export declare function isPointInRect(point: XYPosition, rect: {
    x: number;
    y: number;
    width: number;
    height: number;
}): boolean;

export declare const LIT_FLOW_BUILD = "smooth-load+fitview+render-complete";

/**
 * Build marker. Logged once when the library loads so you can confirm in the
 * browser console exactly which build is deployed. Bump `LIT_FLOW_VERSION` /
 * `LIT_FLOW_BUILD` whenever you ship a new vendored copy.
 */
export declare const LIT_FLOW_VERSION = "0.4.16";

declare type MarkerBuiltin = 'Arrow' | 'ArrowClosed';

declare type MarkerOrient = 'auto' | 'auto-start-reverse';

declare type MarkerSpec = {
    type: MarkerBuiltin;
    width?: number;
    height?: number;
    color?: string;
    orient?: MarkerOrient;
} | {
    type: 'custom';
    id?: string;
    path: string;
    refX?: number;
    refY?: number;
    width?: number;
    height?: number;
    color?: string;
    orient?: MarkerOrient;
};

declare type Node_2<NodeData extends Record<string, unknown> = Record<string, unknown>, NodeType extends string | undefined = string | undefined> = NodeBase<NodeData, NodeType> & {
    type?: string;
    resizable?: boolean;
};
export { Node_2 as Node }

export declare type NodeChange = {
    type: 'position';
    id: string;
    position: XYPosition;
} | {
    type: 'dimensions';
    id: string;
    dimensions: {
        width: number;
        height: number;
    };
} | {
    type: 'select';
    id: string;
    selected: boolean;
} | {
    type: 'remove';
    id: string;
} | {
    type: 'add';
    item: Node_2;
};

export declare const NodeMixin: <T extends Constructor<LitElement>>(superClass: T) => any;

export declare interface NodeMixinInterface {
    id: string;
    position: {
        x: number;
        y: number;
    };
    data: any;
    selected: boolean;
    dragging: boolean;
    instance: any;
    resizable: boolean;
    draggable: boolean;
    drag_handle_selector: string | null;
    connectable: boolean;
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
    keepAspectRatio: boolean;
    maxInitialHeight: number;
    width: number | undefined;
    height: number | undefined;
    renderComponent(): any;
    getResizer(): any;
    adjustHeightToContent(): void;
    notifyHandlesUpdated(options?: {
        handleIds?: string[];
        updateDimensions?: boolean;
    }): Promise<void>;
}

export declare class NodeResizer extends LitElement {
    static styles: CSSResult;
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
    render(): TemplateResult<1>;
}

export { Position }

export declare interface ShapeConfig {
    type: ShapeType;
    color?: string;
    backgroundColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    size?: {
        width: number;
        height: number;
    };
    rotation?: number;
    label?: string;
}

export declare interface ShapeDefinition {
    type: ShapeType;
    name: string;
    category: 'basic' | 'geometric' | 'symbolic';
    path: string;
    viewBox: string;
    defaultSize: {
        width: number;
        height: number;
    };
    centerPoint: {
        x: number;
        y: number;
    };
}

export declare class ShapeNode extends LitElement {
    static styles: CSSResult;
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
    firstUpdated(): void;
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
    render(): TemplateResult<1>;
    private renderHandles;
    private renderLabel;
}

export declare interface ShapeNodeData {
    type: 'shape';
    data: ShapeConfig | AdvancedShapeConfig;
}

declare type ShapeNodeDataDirect = ShapeConfig | AdvancedShapeConfig;

export declare class ShapeRegistry {
    private static shapes;
    /**
     * Initialize the registry with default shapes
     */
    static initialize(): void;
    /**
     * Register a new shape definition
     */
    static register(definition: ShapeDefinition): void;
    /**
     * Get a shape definition by type
     */
    static get(shapeType: ShapeType): ShapeDefinition | undefined;
    /**
     * Get all registered shapes
     */
    static getAll(): ShapeDefinition[];
    /**
     * Get shapes by category
     */
    static getByCategory(category: string): ShapeDefinition[];
    /**
     * Check if a shape type is registered
     */
    static has(shapeType: ShapeType): boolean;
    /**
     * Get all available shape types
     */
    static getShapeTypes(): ShapeType[];
    /**
     * Clear all registered shapes
     */
    static clear(): void;
    /**
     * Get shape count
     */
    static getCount(): number;
}

/**
 * Shape-specific type definitions for Lit Flow
 */
export declare type ShapeType = 'circle' | 'rectangle' | 'diamond' | 'triangle' | 'hexagon' | 'octagon' | 'heart';

export declare interface Transform {
    x: number;
    y: number;
    zoom: number;
}

export declare type Viewport = Viewport_2;

export declare type XYPosition = XYPosition_2;

export { }
