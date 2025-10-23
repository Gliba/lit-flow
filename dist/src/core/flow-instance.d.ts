/**
 * FlowInstance - Core wrapper around @xyflow/system
 * This class provides the main API for interacting with the flow
 */
import type { Node, Edge, FlowOptions, FlowState, Viewport } from './types';
export declare class FlowInstance {
    private container;
    private state;
    private subscribers;
    private panZoomInstance;
    private options;
    private pendingNodes;
    constructor(options?: FlowOptions);
    mount(container: HTMLElement): void;
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
    addNode(node: Node): void;
    removeNode(id: string): void;
    addEdge(edge: Edge): void;
    removeEdge(id: string): void;
    subscribe(callback: (state: FlowState) => void): () => void;
    zoomIn(): void;
    zoomOut(): void;
    fitView(): void;
    private updateLookups;
    /**
     * Check if a node is fully rendered
     */
    private isNodeRendered;
    /**
     * Check if any of the required nodes are still pending
     */
    private hasPendingNodes;
    /**
     * Remove node from pending list when it's rendered
     */
    private markNodeAsRendered;
    /**
     * Retry edge rendering with delay if nodes are still pending
     */
    private retryEdgeRendering;
    private notifySubscribers;
}
//# sourceMappingURL=flow-instance.d.ts.map