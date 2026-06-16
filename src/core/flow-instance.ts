/**
 * FlowInstance - Core wrapper around @xyflow/system
 * This class provides the main API for interacting with the flow
 */

import { XYPanZoom } from '@xyflow/system';
import type { PanOnScrollMode, Transform } from '@xyflow/system';
import type { Node, Edge, FlowOptions, FlowState, InternalNode, Viewport, XYPosition } from './types';
import type { PanZoomUpdateOptions } from '@xyflow/system';

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

  // Coalesces bursts of synchronous state mutations (e.g. the initial
  // measurement storm where every node reports its size at once) into a
  // single subscriber notification per microtask checkpoint.
  private notifyScheduled = false;

  // Viewport-fitting state. A fit requested before nodes are measured (or
  // before the container has a size) is deferred and retried once those
  // become available — see maybeRunPendingFit / scheduleFitFallback.
  private pendingFit: { padding: number } | null = null;
  private fitFallbackTimer: ReturnType<typeof setTimeout> | null = null;
  private didInitFit = false;

  // Render-settle tracking. `renderToken` is bumped on every structural change
  // (set/add/remove of nodes or edges); once every node in that revision has a
  // measured size, we emit a render-complete signal exactly once per revision.
  private renderToken = 0;
  private settledToken = -1;
  private renderCompleteCallbacks: Set<(state: FlowState) => void> = new Set();
  
  // Store current pan/zoom update options for reuse
  private panZoomUpdateOptions: PanZoomUpdateOptions | null = null;

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
    this.panZoomUpdateOptions = {
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
      zoomOnDoubleClick: this.options.zoomOnDoubleClick ?? false,
      zoomActivationKeyPressed: false,
      lib: 'lit-flow',
      onTransformChange: (_t: Transform) => {},
      connectionInProgress: false,
    };
    this.panZoomInstance.update(this.panZoomUpdateOptions);

    this.maybeInitFit();
    this.notifySubscribers();
  }

  /**
   * Enable or disable panning on drag
   */
  setPanOnDrag(enabled: boolean) {
    if (this.panZoomInstance && this.panZoomUpdateOptions) {
      this.panZoomUpdateOptions = {
        ...this.panZoomUpdateOptions,
        panOnDrag: enabled
      };
      this.panZoomInstance.update(this.panZoomUpdateOptions);
    }
  }

  destroy() {
    this.clearFitFallback();
    this.pendingFit = null;
    this.panZoomInstance?.destroy();
    this.panZoomInstance = null;
    this.container = null;
    this.subscribers.clear();
    this.renderCompleteCallbacks.clear();
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
    this.armRender();
    this.maybeInitFit();
    this.notifySubscribers();
  }

  setEdges(edges: Edge[]) {
    this.state.edges = edges;
    this.updateLookups();
    this.armRender();
    this.notifySubscribers();
  }

  updateNode(id: string, updates: Partial<Node>) {
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

  /**
   * Add a node to the flow.
   *
   * If `position` is omitted, it will be auto-calculated based on the current
   * viewport and container size, trying to avoid overlapping existing nodes.
   */
  addNode(node: Omit<Node, 'position'> & { position?: XYPosition }) {
    const nodeWithPosition: Node =
      node.position ? (node as Node) : ({ ...(node as Node), position: this.getAutoNodePosition(node as Partial<Node>) } as Node);

    this.state.nodes = [...this.state.nodes, nodeWithPosition];
    this.updateLookups();
    this.armRender();
    this.notifySubscribers();
  }

  removeNode(id: string) {
    this.state.nodes = this.state.nodes.filter(node => node.id !== id);
    // Also remove connected edges
    this.state.edges = this.state.edges.filter(
      edge => edge.source !== id && edge.target !== id
    );
    this.updateLookups();
    this.armRender();
    this.notifySubscribers();
  }

  addEdge(edge: Edge) {
    this.state.edges = [...this.state.edges, edge];
    this.updateLookups();
    this.armRender();
    this.notifySubscribers();
  }

  removeEdge(id: string) {
    this.state.edges = this.state.edges.filter(edge => edge.id !== id);
    this.updateLookups();
    this.armRender();
    this.notifySubscribers();
  }

  subscribe(callback: (state: FlowState) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  /**
   * Register a callback that fires once after a batch of data (set/add/remove of
   * nodes or edges) has finished rendering — i.e. every node has been measured
   * and edges have been laid out at their final positions. Fires once per
   * structural revision. Returns an unsubscribe function.
   */
  onRenderComplete(callback: (state: FlowState) => void): () => void {
    this.renderCompleteCallbacks.add(callback);
    return () => this.renderCompleteCallbacks.delete(callback);
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

  /**
   * Center and zoom the viewport so every node is visible.
   *
   * @param options.padding     Gap (px) to leave around the content (default 50).
   * @param options.awaitMeasure When true, if the nodes aren't measured yet or
   *   the container has no size, the fit is deferred and retried automatically
   *   once measurements land — use this for fit-on-load.
   */
  fitView(options?: { padding?: number; awaitMeasure?: boolean }) {
    const padding = options?.padding ?? 50;

    if (this.state.nodes.length === 0 || !this.container) return;

    // Defer until nodes are measured / the container is laid out, so we never
    // fit to the 150x50 fallback or to a 0x0 container (which throws the
    // viewport off-screen).
    if (options?.awaitMeasure && !this.canFitAccurately()) {
      this.pendingFit = { padding };
      this.scheduleFitFallback();
      return;
    }

    const containerWidth = this.container.clientWidth;
    const containerHeight = this.container.clientHeight;
    if (containerWidth <= 0 || containerHeight <= 0) {
      // Container has no layout yet; defer and retry.
      this.pendingFit = { padding };
      this.scheduleFitFallback();
      return;
    }

    // Calculate bounds of all nodes
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    this.state.nodes.forEach(node => {
      const { width, height } = this.getNodeSize(node);
      minX = Math.min(minX, node.position.x);
      minY = Math.min(minY, node.position.y);
      maxX = Math.max(maxX, node.position.x + width);
      maxY = Math.max(maxY, node.position.y + height);
    });

    // Guard against a single node / zero-area bounds.
    const boundsWidth = Math.max(maxX - minX, 1);
    const boundsHeight = Math.max(maxY - minY, 1);

    const minZoom = this.options.minZoom ?? 0.5;
    const maxZoom = this.options.maxZoom ?? 2;

    const zoomX = (containerWidth - padding * 2) / boundsWidth;
    const zoomY = (containerHeight - padding * 2) / boundsHeight;
    // Clamp to BOTH bounds: without the minZoom floor, XYPanZoom would clamp
    // the zoom back up while x/y stay computed for the smaller zoom, leaving
    // the content off-centre.
    let zoom = Math.min(zoomX, zoomY, maxZoom);
    zoom = Math.max(zoom, minZoom);
    if (!isFinite(zoom) || zoom <= 0) zoom = 1;

    const x = (containerWidth - boundsWidth * zoom) / 2 - minX * zoom;
    const y = (containerHeight - boundsHeight * zoom) / 2 - minY * zoom;

    this.clearFitFallback();
    this.pendingFit = null;
    this.setViewport({ x, y, zoom });
  }

  /** Effective rendered size of a node, falling back through measured → explicit → shape data → default. */
  private getNodeSize(node: Node): { width: number; height: number } {
    const data = node.data as any;
    const width = node.measured?.width ?? node.width ?? data?.size?.width ?? 150;
    const height = node.measured?.height ?? node.height ?? data?.size?.height ?? 50;
    return { width, height };
  }

  /** True once every node has a real size and the container has been laid out. */
  private canFitAccurately(): boolean {
    if (!this.container) return false;
    if (this.container.clientWidth <= 0 || this.container.clientHeight <= 0) return false;
    return this.areNodesMeasured();
  }

  /** True once every node has a real (non-fallback) size. */
  private areNodesMeasured(): boolean {
    return this.state.nodes.every(n =>
      n.measured?.width != null ||
      typeof n.width === 'number' ||
      (n as any).type === 'shape' ||
      (n.data as any)?.size
    );
  }

  /** Mark a new structural revision whose render we should wait to settle. */
  private armRender() {
    this.renderToken++;
  }

  /**
   * Emit render-complete once the current revision's nodes are all measured.
   * Called from the batched notify, so it sees the measurements that just
   * landed. Defers two frames so edges resolve their handle positions and
   * paint before we report "done".
   */
  private maybeEmitRenderComplete() {
    if (this.renderCompleteCallbacks.size === 0) return;
    if (this.settledToken === this.renderToken) return;
    if (this.state.nodes.length > 0 && !this.areNodesMeasured()) return;

    this.settledToken = this.renderToken;
    const raf: (cb: () => void) => void =
      typeof requestAnimationFrame !== 'undefined'
        ? (cb) => requestAnimationFrame(cb)
        : (cb) => { setTimeout(cb, 16); };
    raf(() => raf(() => {
      // Guard against a newer revision having superseded this one in the meantime.
      if (this.settledToken !== this.renderToken) return;
      this.renderCompleteCallbacks.forEach(cb => cb(this.state));
    }));
  }

  /** Run a deferred fit once nodes are measured. Called from the batched notify. */
  private maybeRunPendingFit() {
    if (!this.pendingFit) return;
    if (!this.canFitAccurately()) return;
    const { padding } = this.pendingFit;
    this.pendingFit = null;
    this.clearFitFallback();
    this.fitView({ padding });
  }

  /**
   * Safety net: if measurements never complete (e.g. a node errors), force the
   * deferred fit with whatever sizes are available rather than leaving the
   * viewport unfit.
   */
  private scheduleFitFallback() {
    if (this.fitFallbackTimer != null) return;
    this.fitFallbackTimer = setTimeout(() => {
      this.fitFallbackTimer = null;
      if (!this.pendingFit) return;
      const { padding } = this.pendingFit;
      this.pendingFit = null;
      if (this.container && this.container.clientWidth > 0 && this.container.clientHeight > 0) {
        this.fitView({ padding });
      }
    }, 400);
  }

  private clearFitFallback() {
    if (this.fitFallbackTimer != null) {
      clearTimeout(this.fitFallbackTimer);
      this.fitFallbackTimer = null;
    }
  }

  /** Trigger the one-time fit-on-load when `fitViewOnInit` (or legacy `fitView`) is set. */
  private maybeInitFit() {
    if (this.didInitFit) return;
    if (!(this.options.fitViewOnInit || this.options.fitView)) return;
    if (!this.container || this.state.nodes.length === 0) return;
    this.didInitFit = true;
    this.fitView({ awaitMeasure: true });
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

  private getAutoNodePosition(node?: Partial<Node>): XYPosition {
    const viewport = this.state.viewport;
    const zoom = viewport.zoom || 1;

    const nodeWidth = node?.measured?.width || node?.width || 150;
    const nodeHeight = node?.measured?.height || node?.height || 50;

    // If we don't have a mounted container yet, fall back to a simple offset
    // from the last node (or origin).
    if (!this.container) {
      const last = this.state.nodes[this.state.nodes.length - 1];
      if (!last) return { x: 0, y: 0 };
      const lastW = last.measured?.width || last.width || 150;
      return { x: last.position.x + lastW + 40, y: last.position.y };
    }

    // Center of the viewport in canvas coordinates, then convert to top-left
    const centerX = (this.container.clientWidth / 2 - viewport.x) / zoom;
    const centerY = (this.container.clientHeight / 2 - viewport.y) / zoom;
    const baseX = centerX - nodeWidth / 2;
    const baseY = centerY - nodeHeight / 2;

    const step = this.options.snapToGrid ? (this.options.snapGrid?.[0] ?? 20) : 20;
    const maxIterations = 900;

    const isOverlapping = (pos: XYPosition) => {
      const a = { x: pos.x, y: pos.y, w: nodeWidth, h: nodeHeight };
      return this.state.nodes.some(n => {
        const w = n.measured?.width || n.width || 150;
        const h = n.measured?.height || n.height || 50;
        const b = { x: n.position.x, y: n.position.y, w, h };
        const separated =
          a.x + a.w <= b.x ||
          b.x + b.w <= a.x ||
          a.y + a.h <= b.y ||
          b.y + b.h <= a.y;
        return !separated;
      });
    };

    // Square spiral search around the base position
    let gx = 0;
    let gy = 0;
    let dx = 0;
    let dy = -1;

    for (let i = 0; i < maxIterations; i++) {
      const candidate = { x: baseX + gx * step, y: baseY + gy * step };

      if (!isOverlapping(candidate)) {
        return this.options.snapToGrid ? this.snapPositionToGrid(candidate) : candidate;
      }

      // Rotate direction at spiral corners
      if (gx === gy || (gx < 0 && gx === -gy) || (gx > 0 && gx === 1 - gy)) {
        const tmp = dx;
        dx = -dy;
        dy = tmp;
      }

      gx += dx;
      gy += dy;
    }

    // If all else fails, return the base position
    const fallback = { x: baseX, y: baseY };
    return this.options.snapToGrid ? this.snapPositionToGrid(fallback) : fallback;
  }

  private snapPositionToGrid(pos: XYPosition): XYPosition {
    const [gx, gy] = this.options.snapGrid ?? [20, 20];
    return {
      x: Math.round(pos.x / gx) * gx,
      y: Math.round(pos.y / gy) * gy,
    };
  }

  private notifySubscribers() {
    if (this.notifyScheduled) return;
    this.notifyScheduled = true;
    queueMicrotask(() => {
      this.notifyScheduled = false;
      // Retry a deferred fit-on-load now that this batch's measurements landed.
      this.maybeRunPendingFit();
      this.subscribers.forEach(callback => callback(this.state));
      // Emit render-complete if this revision's nodes are now all measured.
      this.maybeEmitRenderComplete();
    });
  }
}

