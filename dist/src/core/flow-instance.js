/**
 * FlowInstance - Core wrapper around @xyflow/system
 * This class provides the main API for interacting with the flow
 */
import { XYPanZoom } from '@xyflow/system';
export class FlowInstance {
    constructor(options = {}) {
        this.container = null;
        this.state = {
            nodes: [],
            edges: [],
            viewport: { x: 0, y: 0, zoom: 1 },
            nodeLookup: new Map(),
            edgeLookup: new Map()
        };
        this.subscribers = new Set();
        this.panZoomInstance = null;
        // Track nodes that are pending rendering
        this.pendingNodes = [];
        // Store current pan/zoom update options for reuse
        this.panZoomUpdateOptions = null;
        this.options = {
            minZoom: 0.5,
            maxZoom: 2,
            defaultZoom: 1,
            nodesDraggable: true,
            nodesConnectable: true,
            elementsSelectable: true,
            ...options
        };
        this.state.nodes = options.nodes || [];
        this.state.edges = options.edges || [];
        this.updateLookups();
    }
    mount(container) {
        this.container = container;
        // Initialize XYPanZoom for viewport control
        this.panZoomInstance = XYPanZoom({
            domNode: container,
            minZoom: this.options.minZoom || 0.5,
            maxZoom: this.options.maxZoom || 2,
            paneClickDistance: 0,
            translateExtent: [[-Infinity, -Infinity], [Infinity, Infinity]],
            viewport: this.state.viewport,
            onDraggingChange: (isDragging) => {
                // Toggle panning cursor
                this.container?.classList.toggle('panning', isDragging);
            },
            onPanZoom: (_event, viewport) => {
                this.state.viewport = viewport;
                this.notifySubscribers();
            },
            onPanZoomStart: (_event, _viewport) => {
                // Handle pan/zoom start
            },
            onPanZoomEnd: (_event, _viewport) => {
                // Handle pan/zoom end
            }
        });
        // Enable panning/zooming interactions
        this.panZoomUpdateOptions = {
            noWheelClassName: 'nowheel',
            noPanClassName: 'nopan',
            onPaneContextMenu: undefined,
            preventScrolling: true,
            panOnScroll: true,
            panOnDrag: true,
            panOnScrollMode: 'free',
            panOnScrollSpeed: 0.8,
            userSelectionActive: false,
            zoomOnPinch: true,
            zoomOnScroll: true,
            zoomOnDoubleClick: true,
            zoomActivationKeyPressed: false,
            lib: 'lit-flow',
            onTransformChange: (_t) => { },
            connectionInProgress: false,
        };
        this.panZoomInstance.update(this.panZoomUpdateOptions);
        this.notifySubscribers();
    }
    /**
     * Enable or disable panning on drag
     */
    setPanOnDrag(enabled) {
        if (this.panZoomInstance && this.panZoomUpdateOptions) {
            this.panZoomUpdateOptions = {
                ...this.panZoomUpdateOptions,
                panOnDrag: enabled
            };
            this.panZoomInstance.update(this.panZoomUpdateOptions);
        }
    }
    destroy() {
        this.panZoomInstance?.destroy();
        this.panZoomInstance = null;
        this.container = null;
        this.subscribers.clear();
    }
    getState() {
        return this.state;
    }
    get nodes() {
        return this.state.nodes;
    }
    get edges() {
        return this.state.edges;
    }
    getViewport() {
        return this.state.viewport;
    }
    setViewport(viewport) {
        this.state.viewport = viewport;
        this.panZoomInstance?.setViewport?.(viewport);
        this.notifySubscribers();
    }
    setNodes(nodes) {
        // Register all node IDs as pending
        this.pendingNodes.push(...nodes.map(node => node.id));
        this.state.nodes = nodes;
        this.updateLookups();
        this.notifySubscribers();
    }
    setEdges(edges) {
        this.retryEdgeRendering(edges);
    }
    updateNode(id, updates) {
        this.state.nodes = this.state.nodes.map(node => node.id === id ? { ...node, ...updates } : node);
        this.updateLookups();
        this.notifySubscribers();
    }
    updateEdge(id, updates) {
        this.state.edges = this.state.edges.map(edge => edge.id === id ? { ...edge, ...updates } : edge);
        this.updateLookups();
        this.notifySubscribers();
    }
    addNode(node) {
        this.state.nodes = [...this.state.nodes, node];
        this.updateLookups();
        this.notifySubscribers();
    }
    removeNode(id) {
        this.state.nodes = this.state.nodes.filter(node => node.id !== id);
        // Also remove connected edges
        this.state.edges = this.state.edges.filter(edge => edge.source !== id && edge.target !== id);
        this.updateLookups();
        this.notifySubscribers();
    }
    addEdge(edge) {
        this.state.edges = [...this.state.edges, edge];
        this.updateLookups();
        this.notifySubscribers();
    }
    removeEdge(id) {
        this.state.edges = this.state.edges.filter(edge => edge.id !== id);
        this.updateLookups();
        this.notifySubscribers();
    }
    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }
    zoomIn() {
        const currentZoom = this.state.viewport.zoom;
        const newZoom = Math.min(currentZoom * 1.2, this.options.maxZoom || 2);
        this.setViewport({ ...this.state.viewport, zoom: newZoom });
    }
    zoomOut() {
        const currentZoom = this.state.viewport.zoom;
        const newZoom = Math.max(currentZoom / 1.2, this.options.minZoom || 0.5);
        this.setViewport({ ...this.state.viewport, zoom: newZoom });
    }
    fitView() {
        if (this.state.nodes.length === 0 || !this.container)
            return;
        // Calculate bounds of all nodes
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        this.state.nodes.forEach(node => {
            const width = node.measured?.width || node.width || 150;
            const height = node.measured?.height || node.height || 50;
            minX = Math.min(minX, node.position.x);
            minY = Math.min(minY, node.position.y);
            maxX = Math.max(maxX, node.position.x + width);
            maxY = Math.max(maxY, node.position.y + height);
        });
        const bounds = {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
        };
        const containerWidth = this.container.clientWidth;
        const containerHeight = this.container.clientHeight;
        const padding = 50;
        const zoomX = (containerWidth - padding * 2) / bounds.width;
        const zoomY = (containerHeight - padding * 2) / bounds.height;
        const zoom = Math.min(zoomX, zoomY, this.options.maxZoom || 2);
        const x = (containerWidth - bounds.width * zoom) / 2 - bounds.x * zoom;
        const y = (containerHeight - bounds.height * zoom) / 2 - bounds.y * zoom;
        this.setViewport({ x, y, zoom });
    }
    updateLookups() {
        // Update node lookup
        this.state.nodeLookup.clear();
        this.state.nodes.forEach(node => {
            const internalNode = {
                ...node,
                measured: node.measured || { width: node.width, height: node.height },
                internals: {
                    positionAbsolute: node.position,
                    z: node.zIndex || 0,
                    userNode: node
                }
            };
            this.state.nodeLookup.set(node.id, internalNode);
        });
        // Update edge lookup
        this.state.edgeLookup.clear();
        this.state.edges.forEach(edge => {
            this.state.edgeLookup.set(edge.id, edge);
        });
    }
    /**
     * Check if a node is fully rendered
     */
    isNodeRendered(nodeId) {
        if (!this.container)
            return false;
        const nodeEl = this.container.querySelector(`[id="${CSS.escape(nodeId)}"]`);
        if (!nodeEl)
            return false;
        const rect = nodeEl.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
    }
    /**
     * Check if any of the required nodes are still pending
     */
    hasPendingNodes(nodeIds) {
        return nodeIds.some(id => this.pendingNodes.includes(id) || !this.isNodeRendered(id));
    }
    /**
     * Remove node from pending list when it's rendered
     */
    markNodeAsRendered(nodeId) {
        const index = this.pendingNodes.indexOf(nodeId);
        if (index > -1) {
            this.pendingNodes.splice(index, 1);
        }
    }
    /**
     * Retry edge rendering with delay if nodes are still pending
     */
    retryEdgeRendering(edges, retryCount = 0, maxRetries = 10) {
        const allNodeIds = edges.flatMap(edge => [edge.source, edge.target]);
        const uniqueNodeIds = [...new Set(allNodeIds)];
        if (this.hasPendingNodes(uniqueNodeIds) && retryCount < maxRetries) {
            setTimeout(() => {
                this.retryEdgeRendering(edges, retryCount + 1, maxRetries);
            }, 100);
        }
        else {
            // All nodes are rendered, proceed with edge rendering
            this.state.edges = edges;
            this.updateLookups();
            this.notifySubscribers();
            // Mark nodes as rendered
            uniqueNodeIds.forEach(id => this.markNodeAsRendered(id));
        }
    }
    notifySubscribers() {
        this.subscribers.forEach(callback => callback(this.state));
    }
}
//# sourceMappingURL=flow-instance.js.map