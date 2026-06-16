/**
 * FlowInstance - Core wrapper around @xyflow/system
 * This class provides the main API for interacting with the flow
 */
import type { Node, Edge, FlowOptions, FlowState, Viewport, XYPosition } from './types';
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
    get nodes(): Node[];
    get edges(): Edge[];
    getViewport(): Viewport;
    setViewport(viewport: Viewport): void;
    setNodes(nodes: Node[]): void;
    setEdges(edges: Edge[]): void;
    updateNode(id: string, updates: Partial<Node>): void;
    updateEdge(id: string, updates: Partial<Edge>): void;
    /**
     * Add a node to the flow.
     *
     * If `position` is omitted, it will be auto-calculated based on the current
     * viewport and container size, trying to avoid overlapping existing nodes.
     */
    addNode(node: Omit<Node, 'position'> & {
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
//# sourceMappingURL=flow-instance.d.ts.map