/**
 * FlowInstance - Core wrapper around @xyflow/system
 * This class provides the main API for interacting with the flow
 */

import { XYPanZoom } from '@xyflow/system';
import type { PanOnScrollMode, Transform } from '@xyflow/system';
import type { Node, Edge, FlowOptions, FlowState, InternalNode, Viewport } from './types';

export class FlowInstance {
  private container: HTMLElement | null = null;
  private state: FlowState = {
    nodes: [],
    edges: [],
    viewport: { x: 0, y: 0, zoom: 1 },
    nodeLookup: new Map(),
    edgeLookup: new Map()
  };
  private subscribers: Set<(state: FlowState) => void> = new Set();
  private panZoomInstance: ReturnType<typeof XYPanZoom> | null = null;
  private options: FlowOptions;

  constructor(options: FlowOptions = {}) {
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

  mount(container: HTMLElement) {
    this.container = container;
    
    // Initialize XYPanZoom for viewport control
    this.panZoomInstance = XYPanZoom({
      domNode: container,
      minZoom: this.options.minZoom || 0.5,
      maxZoom: this.options.maxZoom || 2,
      paneClickDistance: 0,
      translateExtent: [[-Infinity, -Infinity], [Infinity, Infinity]],
      viewport: this.state.viewport,
      onDraggingChange: (isDragging: boolean) => {
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
    this.panZoomInstance.update({
      noWheelClassName: 'nowheel',
      noPanClassName: 'nopan',
      onPaneContextMenu: undefined,
      preventScrolling: true,
      panOnScroll: true,
      panOnDrag: true,
      panOnScrollMode: 'free' as unknown as PanOnScrollMode,
      panOnScrollSpeed: 0.8,
      userSelectionActive: false,
      zoomOnPinch: true,
      zoomOnScroll: true,
      zoomOnDoubleClick: true,
      zoomActivationKeyPressed: false,
      lib: 'lit-flow',
      onTransformChange: (_t: Transform) => {},
      connectionInProgress: false,
    });

    this.notifySubscribers();
  }

  destroy() {
    this.panZoomInstance?.destroy();
    this.panZoomInstance = null;
    this.container = null;
    this.subscribers.clear();
  }

  getState(): FlowState {
    return this.state;
  }

  get nodes(): Node[] {
    return this.state.nodes;
  }

  get edges(): Edge[] {
    return this.state.edges;
  }

  getViewport(): Viewport {
    return this.state.viewport;
  }

  setViewport(viewport: Viewport) {
    this.state.viewport = viewport;
    this.panZoomInstance?.setViewport?.(viewport);
    this.notifySubscribers();
  }

  setNodes(nodes: Node[]) {
    this.state.nodes = nodes;
    this.updateLookups();
    this.notifySubscribers();
  }

  setEdges(edges: Edge[]) {
    this.state.edges = edges;
    this.updateLookups();
    this.notifySubscribers();
  }

  updateNode(id: string, updates: Partial<Node>) {
    console.log('updateNode', id, updates);
    console.log('state.nodes', this.state.nodes);
    this.state.nodes = this.state.nodes.map(node => 
      node.id === id ? { ...node, ...updates } : node
    );
    this.updateLookups();
    this.notifySubscribers();
  }

  updateEdge(id: string, updates: Partial<Edge>) {
    this.state.edges = this.state.edges.map(edge => 
      edge.id === id ? { ...edge, ...updates } : edge
    );
    this.updateLookups();
    this.notifySubscribers();
  }

  addNode(node: Node) {
    this.state.nodes = [...this.state.nodes, node];
    this.updateLookups();
    this.notifySubscribers();
  }

  removeNode(id: string) {
    this.state.nodes = this.state.nodes.filter(node => node.id !== id);
    // Also remove connected edges
    this.state.edges = this.state.edges.filter(
      edge => edge.source !== id && edge.target !== id
    );
    this.updateLookups();
    this.notifySubscribers();
  }

  addEdge(edge: Edge) {
    this.state.edges = [...this.state.edges, edge];
    this.updateLookups();
    this.notifySubscribers();
  }

  removeEdge(id: string) {
    this.state.edges = this.state.edges.filter(edge => edge.id !== id);
    this.updateLookups();
    this.notifySubscribers();
  }

  subscribe(callback: (state: FlowState) => void): () => void {
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
    if (this.state.nodes.length === 0 || !this.container) return;

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

  private updateLookups() {
    // Update node lookup
    this.state.nodeLookup.clear();
    this.state.nodes.forEach(node => {
      const internalNode: InternalNode = {
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

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.state));
  }
}

