import { XYPanZoom, getBezierPath as getBezierPath$1, getSmoothStepPath as getSmoothStepPath$1, getStraightPath as getStraightPath$1, Position } from "@xyflow/system";
import { Position as Position2 } from "@xyflow/system";
import { css, LitElement, html as html$1, svg, render } from "lit";
import { unsafeStatic, html } from "lit/static-html.js";
import { property, customElement } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
class FlowInstance {
  constructor(options = {}) {
    this.container = null;
    this.state = {
      nodes: [],
      edges: [],
      viewport: { x: 0, y: 0, zoom: 1 },
      nodeLookup: /* @__PURE__ */ new Map(),
      edgeLookup: /* @__PURE__ */ new Map()
    };
    this.subscribers = /* @__PURE__ */ new Set();
    this.panZoomInstance = null;
    this.pendingNodes = [];
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
    this.panZoomInstance = XYPanZoom({
      domNode: container,
      minZoom: this.options.minZoom || 0.5,
      maxZoom: this.options.maxZoom || 2,
      paneClickDistance: 0,
      translateExtent: [[-Infinity, -Infinity], [Infinity, Infinity]],
      viewport: this.state.viewport,
      onDraggingChange: (isDragging) => {
        this.container?.classList.toggle("panning", isDragging);
      },
      onPanZoom: (_event, viewport) => {
        this.state.viewport = viewport;
        this.notifySubscribers();
      },
      onPanZoomStart: (_event, _viewport) => {
      },
      onPanZoomEnd: (_event, _viewport) => {
      }
    });
    this.panZoomUpdateOptions = {
      noWheelClassName: "nowheel",
      noPanClassName: "nopan",
      onPaneContextMenu: void 0,
      preventScrolling: true,
      panOnScroll: true,
      panOnDrag: true,
      panOnScrollMode: "free",
      panOnScrollSpeed: 0.8,
      userSelectionActive: false,
      zoomOnPinch: true,
      zoomOnScroll: true,
      zoomOnDoubleClick: true,
      zoomActivationKeyPressed: false,
      lib: "lit-flow",
      onTransformChange: (_t) => {
      },
      connectionInProgress: false
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
    this.pendingNodes.push(...nodes.map((node) => node.id));
    this.state.nodes = nodes;
    this.updateLookups();
    this.notifySubscribers();
  }
  setEdges(edges) {
    this.retryEdgeRendering(edges);
  }
  updateNode(id, updates) {
    this.state.nodes = this.state.nodes.map(
      (node) => node.id === id ? { ...node, ...updates } : node
    );
    this.updateLookups();
    this.notifySubscribers();
  }
  updateEdge(id, updates) {
    this.state.edges = this.state.edges.map(
      (edge) => edge.id === id ? { ...edge, ...updates } : edge
    );
    this.updateLookups();
    this.notifySubscribers();
  }
  addNode(node) {
    this.state.nodes = [...this.state.nodes, node];
    this.updateLookups();
    this.notifySubscribers();
  }
  removeNode(id) {
    this.state.nodes = this.state.nodes.filter((node) => node.id !== id);
    this.state.edges = this.state.edges.filter(
      (edge) => edge.source !== id && edge.target !== id
    );
    this.updateLookups();
    this.notifySubscribers();
  }
  addEdge(edge) {
    this.state.edges = [...this.state.edges, edge];
    this.updateLookups();
    this.notifySubscribers();
  }
  removeEdge(id) {
    this.state.edges = this.state.edges.filter((edge) => edge.id !== id);
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
    if (this.state.nodes.length === 0 || !this.container) return;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    this.state.nodes.forEach((node) => {
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
    this.state.nodeLookup.clear();
    this.state.nodes.forEach((node) => {
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
    this.state.edgeLookup.clear();
    this.state.edges.forEach((edge) => {
      this.state.edgeLookup.set(edge.id, edge);
    });
  }
  /**
   * Check if a node is fully rendered
   */
  isNodeRendered(nodeId) {
    if (!this.container) return false;
    const nodeEl = this.container.querySelector(`[id="${CSS.escape(nodeId)}"]`);
    if (!nodeEl) return false;
    const rect = nodeEl.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }
  /**
   * Check if any of the required nodes are still pending
   */
  hasPendingNodes(nodeIds) {
    return nodeIds.some((id) => this.pendingNodes.includes(id) || !this.isNodeRendered(id));
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
    const allNodeIds = edges.flatMap((edge) => [edge.source, edge.target]);
    const uniqueNodeIds = [...new Set(allNodeIds)];
    if (this.hasPendingNodes(uniqueNodeIds) && retryCount < maxRetries) {
      setTimeout(() => {
        this.retryEdgeRendering(edges, retryCount + 1, maxRetries);
      }, 100);
    } else {
      this.state.edges = edges;
      this.updateLookups();
      this.notifySubscribers();
      uniqueNodeIds.forEach((id) => this.markNodeAsRendered(id));
    }
  }
  notifySubscribers() {
    this.subscribers.forEach((callback) => callback(this.state));
  }
}
function createStore(initialState = {}) {
  const state = {
    nodes: initialState.nodes || [],
    edges: initialState.edges || [],
    viewport: initialState.viewport || { x: 0, y: 0, zoom: 1 },
    nodeLookup: /* @__PURE__ */ new Map(),
    edgeLookup: /* @__PURE__ */ new Map()
  };
  const listeners = /* @__PURE__ */ new Set();
  const updateLookups = () => {
    state.nodeLookup.clear();
    state.nodes.forEach((node) => {
      const internalNode = {
        ...node,
        measured: node.measured || { width: node.width, height: node.height },
        internals: {
          positionAbsolute: node.position,
          z: node.zIndex || 0,
          userNode: node
        }
      };
      state.nodeLookup.set(node.id, internalNode);
    });
    state.edgeLookup.clear();
    state.edges.forEach((edge) => {
      state.edgeLookup.set(edge.id, edge);
    });
  };
  updateLookups();
  return {
    getState: () => state,
    setState: (updates) => {
      Object.assign(state, updates);
      updateLookups();
      listeners.forEach((listener) => listener(state));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}
function getDistance(a, b) {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}
function getCenter(a, b) {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2
  };
}
function getBezierPath(params) {
  return getBezierPath$1(params);
}
function getSmoothStepPath(params) {
  return getSmoothStepPath$1(params);
}
function getStraightPath(params) {
  return getStraightPath$1(params);
}
function isPointInRect(point, rect) {
  return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height;
}
var __defProp$8 = Object.defineProperty;
var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor;
var __decorateClass$a = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$9(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$8(target, key, result);
  return result;
};
let FlowCanvas = class extends LitElement {
  constructor() {
    super();
    this.nodes = [];
    this.edges = [];
    this.viewport = { x: 0, y: 0, zoom: 1 };
    this.nodeTypes = {
      "default": "flow-node",
      "shape": "shape-node",
      "erd-table": "erd-table-node"
    };
    this.connection = null;
    this.isHoveringNode = false;
    this.onHandleStart = (e) => {
      const { nodeId, type, handleId } = e.detail;
      this.connection = { from: { nodeId, handleId } };
    };
    this.onMouseMove = (e) => {
      if (!this.connection) return;
      const p = this.screenToCanvas(e.clientX, e.clientY);
      this.connection.preview = p;
      this.requestUpdate();
    };
    this.onMouseUp = (e) => {
      if (!this.connection) return;
      const path = e.composedPath();
      let targetEl = null;
      let targetHandleId;
      for (const t of path) {
        if (t instanceof HTMLElement) {
          const tagName = t.tagName.toLowerCase();
          if (tagName === "flow-node" || Object.values(this.nodeTypes).some((tag) => tag === tagName)) {
            targetEl = t;
            break;
          }
          if (t.dataset.handleId) {
            targetHandleId = t.dataset.handleId;
          }
        }
      }
      const targetId = targetEl?.getAttribute("id") || void 0;
      if (this.connection.from && targetId && targetId !== this.connection.from.nodeId) {
        const newEdgeId = `e-${this.connection.from.nodeId}-${targetId}-${Date.now()}`;
        const sourceNodeId = this.connection.from.nodeId;
        const sourceHandleId = this.connection.from.handleId;
        let finalTargetHandleId = targetHandleId;
        if (!finalTargetHandleId) {
          const targetNode = this.nodes.find((n) => n.id === targetId);
          if (targetNode && targetNode.type === "shape") {
            finalTargetHandleId = this.determineBestTargetHandle(sourceNodeId, targetId);
            console.log("Auto-determined target handle:", { sourceNodeId, targetId, finalTargetHandleId });
          }
        }
        this.instance.addEdge({
          id: newEdgeId,
          source: sourceNodeId,
          target: targetId,
          sourceHandle: sourceHandleId,
          targetHandle: finalTargetHandleId,
          data: {}
        });
      }
      this.connection = null;
      this.requestUpdate();
    };
    this.onNodeMouseEnter = (e) => {
      const target = e.target;
      const nodeTypes = ["flow-node", ...Object.values(this.nodeTypes)];
      let nodeElement = null;
      for (const nodeType of nodeTypes) {
        const element = target.closest(nodeType);
        if (element && element.id) {
          if (this.nodes.some((node) => node.id === element.id)) {
            nodeElement = element;
            break;
          }
        }
      }
      if (nodeElement && !this.isHoveringNode) {
        this.isHoveringNode = true;
        this.instance.setPanOnDrag(false);
      }
    };
    this.onNodeMouseLeave = (e) => {
      const target = e.target;
      const nodeTypes = ["flow-node", ...Object.values(this.nodeTypes)];
      let nodeElement = null;
      for (const nodeType of nodeTypes) {
        const element = target.closest(nodeType);
        if (element && element.id && this.nodes.some((node) => node.id === element.id)) {
          nodeElement = element;
          break;
        }
      }
      if (nodeElement && this.isHoveringNode) {
        setTimeout(() => {
          const pointElement = document.elementFromPoint(e.clientX, e.clientY);
          if (!pointElement || !(pointElement instanceof HTMLElement) || !this.isElementNode(pointElement)) {
            this.isHoveringNode = false;
            this.instance.setPanOnDrag(true);
          }
        }, 10);
      }
    };
    this.onNodeSelect = (e) => {
      const { nodeId, selected, node } = e.detail;
      this.instance.updateNode(nodeId, { selected });
      this.dispatchEvent(new CustomEvent("node-selected", {
        detail: {
          nodeId,
          selected,
          node,
          allSelectedNodes: this.nodes.filter((n) => n.selected)
        },
        bubbles: true,
        composed: true
      }));
    };
    this.onEdgeSelect = (e) => {
      const { edgeId, selected, edge } = e.detail;
      this.instance.updateEdge(edgeId, { selected });
      this.dispatchEvent(new CustomEvent("edge-selected", {
        detail: {
          edgeId,
          selected,
          edge,
          allSelectedEdges: this.edges.filter((e2) => e2.selected)
        },
        bubbles: true,
        composed: true
      }));
    };
    this.instance = new FlowInstance({ nodes: this.nodes, edges: this.edges });
  }
  createRenderRoot() {
    return super.createRenderRoot();
  }
  getNodeGeom(nodeId) {
    const el = this.renderRoot.querySelector(`flow-node[id="${CSS.escape(nodeId)}"]`);
    const viewportEl = this.renderRoot.querySelector(".flow-viewport");
    if (!el || !viewportEl) return null;
    const rect = el.getBoundingClientRect();
    const vpRect = viewportEl.getBoundingClientRect();
    const z = this.viewport.zoom || 1;
    const x = (rect.left - vpRect.left - this.viewport.x) / z;
    const y = (rect.top - vpRect.top - this.viewport.y) / z;
    const w = rect.width / z;
    const h = rect.height / z;
    const cy = y + h / 2;
    return { left: { x, y: cy }, right: { x: x + w, y: cy } };
  }
  /**
   * Get handle position in canvas coordinates
   */
  getHandleCanvasPosition(nodeId, handleId) {
    const nodeEl = this.renderRoot.querySelector(`[id="${CSS.escape(nodeId)}"]`);
    if (!nodeEl) return null;
    let handleEl = null;
    const shadowRoot = nodeEl.shadowRoot;
    if (shadowRoot) {
      handleEl = shadowRoot.querySelector(`[data-handle-id="${CSS.escape(handleId)}"]`);
    }
    if (!handleEl) {
      handleEl = nodeEl.querySelector(`[data-handle-id="${CSS.escape(handleId)}"]`);
    }
    if (!handleEl) return null;
    const node = this.nodes.find((n) => n.id === nodeId);
    if (!node) return null;
    if (node.type === "shape") {
      console.log("getHandleCanvasPosition for shape node:", { nodeId, handleId, node });
      return this.getShapeHandlePosition(node, handleId);
    }
    const nodeRect = nodeEl.getBoundingClientRect();
    const handleRect = handleEl.getBoundingClientRect();
    const zoom = this.viewport.zoom || 1;
    const offsetX = (handleRect.left + handleRect.width / 2 - nodeRect.left) / zoom;
    const offsetY = (handleRect.top + handleRect.height / 2 - nodeRect.top) / zoom;
    return {
      x: node.position.x + offsetX,
      y: node.position.y + offsetY
    };
  }
  /**
   * Get handle position for shape nodes based on shape size and handle type
   */
  getShapeHandlePosition(node, handleId) {
    const shapeData = node.data;
    if (!shapeData) return null;
    const size = shapeData.size || { width: 200, height: 200 };
    const width = size.width;
    const height = size.height;
    const parts = handleId.split("-");
    const handleType = parts[parts.length - 1];
    console.log("getShapeHandlePosition:", { handleId, parts, handleType, node: node.id, size });
    let offsetX = 0;
    let offsetY = 0;
    switch (handleType) {
      case "right":
        offsetX = width;
        offsetY = height / 2;
        break;
      case "left":
        offsetX = 0;
        offsetY = height / 2;
        break;
      case "top":
        offsetX = width / 2;
        offsetY = 0;
        break;
      case "bottom":
        offsetX = width / 2;
        offsetY = height;
        break;
      default:
        offsetX = width / 2;
        offsetY = height / 2;
    }
    const result = {
      x: node.position.x + offsetX,
      y: node.position.y + offsetY
    };
    console.log("getShapeHandlePosition result:", {
      nodeId: node.id,
      position: node.position,
      offsetX,
      offsetY,
      result
    });
    return result;
  }
  setNodes(nodes) {
    this.instance.setNodes(nodes);
  }
  setEdges(edges) {
    this.instance.setEdges(edges);
  }
  /**
   * Determine the best target handle for a shape node based on connection direction
   */
  determineBestTargetHandle(sourceNodeId, targetNodeId) {
    const sourceNode = this.nodes.find((n) => n.id === sourceNodeId);
    const targetNode = this.nodes.find((n) => n.id === targetNodeId);
    if (!sourceNode || !targetNode) return `${targetNodeId}-target-left`;
    const sourceX = sourceNode.position.x;
    const sourceY = sourceNode.position.y;
    const targetX = targetNode.position.x;
    const targetY = targetNode.position.y;
    const targetData = targetNode.data;
    const targetWidth = targetData?.size?.width || 200;
    const targetHeight = targetData?.size?.height || 200;
    const sourceCenterX = sourceX + (sourceNode.width || 150) / 2;
    const sourceCenterY = sourceY + (sourceNode.height || 50) / 2;
    const targetCenterX = targetX + targetWidth / 2;
    const targetCenterY = targetY + targetHeight / 2;
    const deltaX = targetCenterX - sourceCenterX;
    const deltaY = targetCenterY - sourceCenterY;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 0 ? `${targetNodeId}-target-left` : `${targetNodeId}-target-right`;
    } else {
      return deltaY > 0 ? `${targetNodeId}-target-top` : `${targetNodeId}-target-bottom`;
    }
  }
  computeLabelCanvasPosition(edge) {
    const sourceNode = this.nodes.find((n) => n.id === edge.source);
    const targetNode = this.nodes.find((n) => n.id === edge.target);
    if (!sourceNode || !targetNode) return null;
    let sourceX, sourceY;
    let targetX, targetY;
    if (edge.sourceHandle) {
      const handlePos = this.getHandleCanvasPosition(edge.source, edge.sourceHandle);
      if (handlePos) {
        sourceX = handlePos.x;
        sourceY = handlePos.y;
      } else {
        const sourceWidth = sourceNode.measured?.width || sourceNode.width || 150;
        const sourceHeight = sourceNode.measured?.height || sourceNode.height || 50;
        sourceX = sourceNode.position.x + sourceWidth;
        sourceY = sourceNode.position.y + sourceHeight / 2;
      }
    } else {
      const sourceWidth = sourceNode.measured?.width || sourceNode.width || 150;
      const sourceHeight = sourceNode.measured?.height || sourceNode.height || 50;
      sourceX = sourceNode.position.x + sourceWidth;
      sourceY = sourceNode.position.y + sourceHeight / 2;
    }
    if (edge.targetHandle) {
      const handlePos = this.getHandleCanvasPosition(edge.target, edge.targetHandle);
      if (handlePos) {
        targetX = handlePos.x;
        targetY = handlePos.y;
      } else {
        targetX = targetNode.position.x;
        const targetHeight = targetNode.measured?.height || targetNode.height || 50;
        targetY = targetNode.position.y + targetHeight / 2;
      }
    } else {
      targetX = targetNode.position.x;
      const targetHeight = targetNode.measured?.height || targetNode.height || 50;
      targetY = targetNode.position.y + targetHeight / 2;
    }
    const [, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition: Position.Right,
      targetX,
      targetY,
      targetPosition: Position.Left
    });
    return { x: labelX, y: labelY };
  }
  computeStartLabelCanvasPosition(edge) {
    const sourceNode = this.nodes.find((n) => n.id === edge.source);
    if (!sourceNode) return null;
    let sourceX, sourceY;
    if (edge.sourceHandle) {
      const handlePos = this.getHandleCanvasPosition(edge.source, edge.sourceHandle);
      if (handlePos) {
        sourceX = handlePos.x;
        sourceY = handlePos.y;
      } else {
        const sourceWidth = sourceNode.measured?.width || sourceNode.width || 150;
        const sourceHeight = sourceNode.measured?.height || sourceNode.height || 50;
        sourceX = sourceNode.position.x + sourceWidth;
        sourceY = sourceNode.position.y + sourceHeight / 2;
      }
    } else {
      const sourceWidth = sourceNode.measured?.width || sourceNode.width || 150;
      const sourceHeight = sourceNode.measured?.height || sourceNode.height || 50;
      sourceX = sourceNode.position.x + sourceWidth;
      sourceY = sourceNode.position.y + sourceHeight / 2;
    }
    return { x: sourceX + 12, y: sourceY - 10 };
  }
  computeEndLabelCanvasPosition(edge) {
    const targetNode = this.nodes.find((n) => n.id === edge.target);
    if (!targetNode) return null;
    let targetX, targetY;
    if (edge.targetHandle) {
      const handlePos = this.getHandleCanvasPosition(edge.target, edge.targetHandle);
      if (handlePos) {
        targetX = handlePos.x;
        targetY = handlePos.y;
      } else {
        const targetHeight = targetNode.measured?.height || targetNode.height || 50;
        targetX = targetNode.position.x;
        targetY = targetNode.position.y + targetHeight / 2;
      }
    } else {
      const targetHeight = targetNode.measured?.height || targetNode.height || 50;
      targetX = targetNode.position.x;
      targetY = targetNode.position.y + targetHeight / 2;
    }
    return { x: targetX - 12, y: targetY - 10 };
  }
  firstUpdated() {
    const container = this.renderRoot.querySelector(".flow-container");
    if (container) {
      this.instance.mount(container);
      this.unsubscribe = this.instance.subscribe((state) => {
        this.nodes = state.nodes;
        this.edges = state.edges;
        this.viewport = state.viewport;
        this.requestUpdate();
      });
      container.addEventListener("mousemove", this.onMouseMove);
      window.addEventListener("mouseup", this.onMouseUp);
      container.addEventListener("node-select", this.onNodeSelect);
      document.addEventListener("edge-select", this.onEdgeSelect);
      container.addEventListener("mouseenter", this.onNodeMouseEnter, true);
      container.addEventListener("mouseleave", this.onNodeMouseLeave, true);
      requestAnimationFrame(() => {
        const event = new CustomEvent("flow-ready", {
          bubbles: true,
          composed: true,
          cancelable: false,
          detail: { instance: this.instance }
        });
        this.dispatchEvent(event);
      });
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe?.();
    this.instance.destroy();
    const container = this.renderRoot.querySelector(".flow-container");
    container?.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
    container?.removeEventListener("node-select", this.onNodeSelect);
    document.removeEventListener("edge-select", this.onEdgeSelect);
    container?.removeEventListener("mouseenter", this.onNodeMouseEnter, true);
    container?.removeEventListener("mouseleave", this.onNodeMouseLeave, true);
  }
  /**
   * Renders a node with dynamic tag name based on node type
   * Falls back to 'flow-node' if type is not registered
   */
  renderNode(node) {
    const nodeType = node.type || "default";
    const tagName = this.nodeTypes[nodeType] || "flow-node";
    const tag = unsafeStatic(tagName);
    return html`
      <${tag}
        .id=${node.id}
        .data=${node.data}
        .position=${node.position}
        .selected=${node.selected || false}
        .draggable=${node.draggable !== false}
        .connectable=${node.connectable !== false}
        .resizable=${node.resizable || false}
        .drag_handle_selector=${node.drag_handle_selector || null}
        .instance=${this.instance}
        @handle-start=${this.onHandleStart}
      ></${tag}>
    `;
  }
  render() {
    const transform = `translate(${this.viewport.x}px, ${this.viewport.y}px) scale(${this.viewport.zoom})`;
    return html`
      <div class="flow-container">
        <slot name="background"></slot>
        <div 
          class="flow-viewport" 
          style=${styleMap({ transform })}
        >
          <div class="flow-edges-layer">
            ${this.edges.map((edge) => {
      const sourceNode = this.nodes.find((n) => n.id === edge.source);
      const targetNode = this.nodes.find((n) => n.id === edge.target);
      if (!sourceNode || !targetNode) return null;
      return html`
                <flow-edge 
                  .id=${edge.id}
                  .source=${edge.source}
                  .target=${edge.target}
                  .sourceHandle=${edge.sourceHandle}
                  .targetHandle=${edge.targetHandle}
                  .sourceNode=${sourceNode}
                  .targetNode=${targetNode}
                  .animated=${edge.animated || false}
                  .label=${edge.label || ""}
                  .type=${edge.type || "default"}
                  .markerStart=${edge.markerStart}
                  .markerEnd=${edge.markerEnd}
                ></flow-edge>
              `;
    })}
            ${this.renderPreviewEdge()}
          </div>
          <div class="flow-nodes-layer">
            ${this.nodes.map((node) => this.renderNode(node))}
          </div>
          <div class="flow-labels-overlay">
            ${this.edges.map((edge) => {
      const labelWidget = edge.data && edge.data.labelWidget;
      const labelData = edge.data && edge.data.labelData;
      const labelHtml = edge.data && edge.data.labelHtml;
      const labelText = edge.data && edge.data.label;
      const hasCenter = !!labelWidget || !!labelHtml || !!labelText;
      if (!hasCenter) return null;
      const pos = this.computeLabelCanvasPosition(edge);
      if (!pos) return null;
      const style = `transform: translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px);`;
      if (labelWidget) {
        const tag = unsafeStatic(labelWidget);
        return html`<div class="edge-label" style="${style}"><${tag} .data=${labelData}></${tag}></div>`;
      }
      return labelHtml ? html`<div class="edge-label" style="${style}" .innerHTML=${labelHtml}></div>` : html`<div class="edge-label" style="${style}">${labelText}</div>`;
    })}
            ${this.edges.map((edge) => {
      const startWidget = edge.data && edge.data.startLabelWidget;
      const startLabelData = edge.data && edge.data.startLabelData;
      const startHtml = edge.data && edge.data.startLabelHtml;
      const startText = edge.data && edge.data.startLabel;
      if (!startWidget && !startHtml && !startText) return null;
      const pos = this.computeStartLabelCanvasPosition(edge);
      if (!pos) return null;
      const style = `transform: translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px);`;
      if (startWidget) {
        const tag = unsafeStatic(startWidget);
        return html`<div class="edge-label" style="${style}"><${tag} .data=${startLabelData}></${tag}></div>`;
      }
      return startHtml ? html`<div class="edge-label" style="${style}" .innerHTML=${startHtml}></div>` : html`<div class="edge-label" style="${style}">${startText}</div>`;
    })}
            ${this.edges.map((edge) => {
      const endWidget = edge.data && edge.data.endLabelWidget;
      const endLabelData = edge.data && edge.data.endLabelData;
      const endHtml = edge.data && edge.data.endLabelHtml;
      const endText = edge.data && edge.data.endLabel;
      if (!endWidget && !endHtml && !endText) return null;
      const pos = this.computeEndLabelCanvasPosition(edge);
      if (!pos) return null;
      const style = `transform: translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px);`;
      if (endWidget) {
        const tag = unsafeStatic(endWidget);
        return html`<div class="edge-label" style="${style}"><${tag} .data=${endLabelData}></${tag}></div>`;
      }
      return endHtml ? html`<div class="edge-label" style="${style}" .innerHTML=${endHtml}></div>` : html`<div class="edge-label" style="${style}">${endText}</div>`;
    })}
          </div>
        </div>
        <slot></slot>
      </div>
    `;
  }
  screenToCanvas(x, y) {
    const container = this.renderRoot.querySelector(".flow-container");
    if (!container) return { x, y };
    const rect = container.getBoundingClientRect();
    const vx = this.viewport.x;
    const vy = this.viewport.y;
    const z = this.viewport.zoom || 1;
    return { x: (x - rect.left - vx) / z, y: (y - rect.top - vy) / z };
  }
  isElementNode(element) {
    if (!element) return false;
    const nodeTypes = ["flow-node", ...Object.values(this.nodeTypes)];
    for (const nodeType of nodeTypes) {
      const nodeElement = element.closest(nodeType);
      if (nodeElement && nodeElement.id) {
        return this.nodes.some((node) => node.id === nodeElement.id);
      }
    }
    return false;
  }
  renderPreviewEdge() {
    if (!this.connection || !this.connection.preview) return null;
    const preview = this.connection.preview;
    const nodeFrom = this.connection.from ? this.nodes.find((n) => n.id === this.connection.from.nodeId) : null;
    const nodeTo = this.connection.to ? this.nodes.find((n) => n.id === this.connection.to.nodeId) : null;
    if (nodeFrom) {
      return html`
        <flow-edge
          .id=${"preview"}
          .source=${nodeFrom.id}
          .target=${"__preview__"}
          .sourceHandle=${this.connection.from?.handleId}
          .sourceNode=${{ ...nodeFrom, position: nodeFrom.position }}
          .targetNode=${{ id: "__preview__", position: { x: preview.x, y: preview.y }, width: 1, height: 1, data: {} }}
          .animated=${true}
          .label=${""}
        ></flow-edge>
      `;
    }
    if (nodeTo) {
      return html`
        <flow-edge
          .id=${"preview"}
          .source=${"__preview__"}
          .target=${nodeTo.id}
          .sourceNode=${{ id: "__preview__", position: { x: preview.x, y: preview.y }, width: 1, height: 1, data: {} }}
          .targetHandle=${this.connection.to?.handleId}
          .targetNode=${{ ...nodeTo, position: nodeTo.position }}
          .animated=${true}
          .label=${""}
        ></flow-edge>
      `;
    }
    return null;
  }
};
FlowCanvas.styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      background: var(--flow-background-color, #fafafa);
    }

    .flow-container {
      width: 100%;
      height: 100%;
      position: relative;
      cursor: grab;
    }

    .flow-container.panning {
      cursor: grabbing;
    }

    .flow-viewport {
      width: 100%;
      height: 100%;
      position: relative;
      transform-origin: 0 0;
      will-change: transform;
    }

    .flow-nodes-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .flow-edges-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
       pointer-events: none;
    }

    .flow-labels-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .edge-label {
      position: absolute;
      transform: translate(-50%, -50%);
      background: white;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 12px;
      color: #333;
      pointer-events: all;
      white-space: nowrap;
      user-select: none;
    }

    .edge-label:has(*) {
      /* Remove default styling when custom widget is used */
      background: transparent;
      border: none;
      padding: 0;
    }
  `;
__decorateClass$a([
  property({ type: Array })
], FlowCanvas.prototype, "nodes", 2);
__decorateClass$a([
  property({ type: Array })
], FlowCanvas.prototype, "edges", 2);
__decorateClass$a([
  property({ type: Object })
], FlowCanvas.prototype, "viewport", 2);
__decorateClass$a([
  property({ type: Object })
], FlowCanvas.prototype, "nodeTypes", 2);
FlowCanvas = __decorateClass$a([
  customElement("flow-canvas")
], FlowCanvas);
var __defProp$7 = Object.defineProperty;
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
var __decorateClass$9 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$7(target, key, result);
  return result;
};
let NodeResizer = class extends LitElement {
  constructor() {
    super(...arguments);
    this.visible = false;
    this.minWidth = 10;
    this.minHeight = 10;
    this.maxWidth = Number.MAX_VALUE;
    this.maxHeight = Number.MAX_VALUE;
    this.keepAspectRatio = false;
    this.isResizing = false;
    this.resizeStart = { x: 0, y: 0, width: 0, height: 0 };
    this.resizeHandle = "";
    this.handleMouseDown = (e) => {
      const target = e.target;
      console.log("NodeResizer handleMouseDown:", target, target.classList);
      let isResizeHandle = target.classList.contains("resize-handle");
      if (!isResizeHandle && target === this) {
        const path = e.composedPath();
        isResizeHandle = path.some(
          (el) => el instanceof HTMLElement && el.classList.contains("resize-handle")
        );
      }
      console.log("Is resize handle:", isResizeHandle);
      if (!isResizeHandle) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      this.isResizing = true;
      const parentElement = this.getRootNode().host;
      this.resizeStart = {
        x: e.clientX,
        y: e.clientY,
        width: parentElement?.offsetWidth || 0,
        height: parentElement?.offsetHeight || 0
      };
      let resizeHandleEl = null;
      if (target.classList.contains("resize-handle")) {
        resizeHandleEl = target;
      } else if (target === this) {
        const path = e.composedPath();
        resizeHandleEl = path.find(
          (el) => el instanceof HTMLElement && el.classList.contains("resize-handle")
        ) || null;
      }
      if (resizeHandleEl) {
        const classes = Array.from(resizeHandleEl.classList);
        this.resizeHandle = classes.find((cls) => cls !== "resize-handle") || "";
        console.log("Resize handle direction:", this.resizeHandle);
      }
      document.addEventListener("mousemove", this.handleMouseMove);
      document.addEventListener("mouseup", this.handleMouseUp);
      console.log({
        width: this.resizeStart.width,
        height: this.resizeStart.height
      });
      this.dispatchEvent(new CustomEvent("resize-start", {
        detail: {
          width: this.resizeStart.width,
          height: this.resizeStart.height
        },
        bubbles: true,
        composed: true
      }));
    };
    this.handleMouseMove = (e) => {
      if (!this.isResizing) return;
      const parentElement = this.getRootNode().host;
      if (!parentElement) return;
      console.log("NodeResizer handleMouseMove:", e);
      const deltaX = e.clientX - this.resizeStart.x;
      const deltaY = e.clientY - this.resizeStart.y;
      let newWidth = this.resizeStart.width;
      let newHeight = this.resizeStart.height;
      switch (this.resizeHandle) {
        case "nw":
          newWidth = this.resizeStart.width - deltaX;
          newHeight = this.resizeStart.height - deltaY;
          break;
        case "ne":
          newWidth = this.resizeStart.width + deltaX;
          newHeight = this.resizeStart.height - deltaY;
          break;
        case "sw":
          newWidth = this.resizeStart.width - deltaX;
          newHeight = this.resizeStart.height + deltaY;
          break;
        case "se":
          newWidth = this.resizeStart.width + deltaX;
          newHeight = this.resizeStart.height + deltaY;
          break;
        case "n":
          newHeight = this.resizeStart.height - deltaY;
          break;
        case "s":
          newHeight = this.resizeStart.height + deltaY;
          break;
        case "w":
          newWidth = this.resizeStart.width - deltaX;
          break;
        case "e":
          newWidth = this.resizeStart.width + deltaX;
          break;
      }
      newWidth = Math.max(this.minWidth, Math.min(this.maxWidth, newWidth));
      newHeight = Math.max(this.minHeight, Math.min(this.maxHeight, newHeight));
      if (this.keepAspectRatio) {
        const aspectRatio = this.resizeStart.width / this.resizeStart.height;
        if (this.resizeHandle.includes("w") || this.resizeHandle.includes("e")) {
          newHeight = newWidth / aspectRatio;
        } else {
          newWidth = newHeight * aspectRatio;
        }
      }
      parentElement.style.width = `${newWidth}px`;
      parentElement.style.height = `${newHeight}px`;
      this.dispatchEvent(new CustomEvent("resize", {
        detail: {
          width: newWidth,
          height: newHeight,
          handle: this.resizeHandle
        },
        bubbles: true,
        composed: true
      }));
    };
    this.handleMouseUp = () => {
      if (!this.isResizing) return;
      this.isResizing = false;
      this.cleanup();
      const parentElement = this.getRootNode().host;
      this.dispatchEvent(new CustomEvent("resize-end", {
        detail: {
          width: parentElement?.offsetWidth || 0,
          height: parentElement?.offsetHeight || 0
        },
        bubbles: true,
        composed: true
      }));
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("mousedown", this.handleMouseDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("mousedown", this.handleMouseDown);
    this.cleanup();
  }
  cleanup() {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }
  render() {
    if (!this.visible) return html$1``;
    return html$1`
      <div class="resize-border"></div>
      <div class="resize-handle nw"></div>
      <div class="resize-handle ne"></div>
      <div class="resize-handle sw"></div>
      <div class="resize-handle se"></div>
      <div class="resize-handle n"></div>
      <div class="resize-handle s"></div>
      <div class="resize-handle w"></div>
      <div class="resize-handle e"></div>
    `;
  }
};
NodeResizer.styles = css`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 10;
    }

    .resize-handle {
      position: absolute;
      background: var(--flow-node-selected-color, #1a73e8);
      border: 2px solid #fff;
      border-radius: 2px;
      opacity: 0;
      transition: opacity 0.2s ease;
      pointer-events: auto;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .resize-handle:hover {
      opacity: 1;
    }

    :host([visible]) .resize-handle {
      opacity: 1;
    }

    .resize-handle.nw {
      top: -8px;
      left: -8px;
      width: 12px;
      height: 12px;
      cursor: nw-resize;
    }

    .resize-handle.ne {
      top: -8px;
      right: -8px;
      width: 12px;
      height: 12px;
      cursor: ne-resize;
    }

    .resize-handle.sw {
      bottom: -8px;
      left: -8px;
      width: 12px;
      height: 12px;
      cursor: sw-resize;
    }

    .resize-handle.se {
      bottom: -8px;
      right: -8px;
      width: 12px;
      height: 12px;
      cursor: se-resize;
    }

    .resize-handle.n {
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 12px;
      height: 12px;
      cursor: n-resize;
    }

    .resize-handle.s {
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 12px;
      height: 12px;
      cursor: s-resize;
    }

    .resize-handle.w {
      top: 50%;
      left: -8px;
      transform: translateY(-50%);
      width: 12px;
      height: 12px;
      cursor: w-resize;
    }

    .resize-handle.e {
      top: 50%;
      right: -8px;
      transform: translateY(-50%);
      width: 12px;
      height: 12px;
      cursor: e-resize;
    }

    .resize-border {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1px dashed var(--flow-node-selected-color, #1a73e8);
      opacity: 0;
      pointer-events: none;
    }

    :host([visible]) .resize-border {
      opacity: 1;
    }
  `;
__decorateClass$9([
  property({ type: Boolean, reflect: true })
], NodeResizer.prototype, "visible", 2);
__decorateClass$9([
  property({ type: Number })
], NodeResizer.prototype, "minWidth", 2);
__decorateClass$9([
  property({ type: Number })
], NodeResizer.prototype, "minHeight", 2);
__decorateClass$9([
  property({ type: Number })
], NodeResizer.prototype, "maxWidth", 2);
__decorateClass$9([
  property({ type: Number })
], NodeResizer.prototype, "maxHeight", 2);
__decorateClass$9([
  property({ type: Boolean })
], NodeResizer.prototype, "keepAspectRatio", 2);
NodeResizer = __decorateClass$9([
  customElement("node-resizer")
], NodeResizer);
var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$6(target, key, result);
  return result;
};
let FlowNode = class extends LitElement {
  constructor() {
    super(...arguments);
    this.id = "";
    this.data = {};
    this.position = { x: 0, y: 0 };
    this.selected = false;
    this.dragging = false;
    this.draggable = true;
    this.resizable = false;
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.nodeStart = { x: 0, y: 0 };
    this.lastMeasured = null;
    this.handleWheel = (e) => {
      const path = e.composedPath();
      let scrollableEl = null;
      for (const element of path) {
        if (element instanceof Element) {
          scrollableEl = this.findScrollableElement(element);
          if (scrollableEl) break;
        }
      }
      if (scrollableEl) {
        const canScrollVertically = e.deltaY < 0 && scrollableEl.scrollTop > 0 || e.deltaY > 0 && scrollableEl.scrollTop < scrollableEl.scrollHeight - scrollableEl.clientHeight;
        const canScrollHorizontally = e.deltaX < 0 && scrollableEl.scrollLeft > 0 || e.deltaX > 0 && scrollableEl.scrollLeft < scrollableEl.scrollWidth - scrollableEl.clientWidth;
        if (canScrollVertically || canScrollHorizontally) {
          e.stopPropagation();
        }
      }
    };
    this.handleClick = (e) => {
      e.stopPropagation();
      if (!this.isDragging && this.instance) {
        const newSelected = !this.selected;
        this.instance.updateNode(this.id, { selected: newSelected });
        this.dispatchEvent(new CustomEvent("node-select", {
          detail: {
            nodeId: this.id,
            selected: newSelected,
            node: {
              id: this.id,
              data: this.data,
              position: this.position,
              selected: newSelected
            }
          },
          bubbles: true,
          composed: true
        }));
      }
    };
    this.handleResize = (e) => {
      const { width, height } = e.detail;
      if (this.instance) {
        this.instance.updateNode(this.id, {
          width,
          height,
          measured: { width, height }
        });
      }
    };
    this.handleResizeEnd = (e) => {
      const { width, height } = e.detail;
      if (this.instance) {
        this.instance.updateNode(this.id, {
          width,
          height,
          measured: { width, height }
        });
      }
      this.dispatchEvent(new CustomEvent("node-resize-end", {
        detail: {
          nodeId: this.id,
          width,
          height
        },
        bubbles: true,
        composed: true
      }));
    };
    this.handleMouseDown = (e) => {
      if (!this.draggable || e.button !== 0) return;
      const target = e.target;
      const isFromResizeHandle = target.classList.contains("resize-handle") || target.tagName === "NODE-RESIZER" || target.closest("node-resizer") !== null;
      if (isFromResizeHandle) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      this.isDragging = false;
      this.dragStart = { x: e.clientX, y: e.clientY };
      this.nodeStart = { ...this.position };
      document.addEventListener("mousemove", this.handleMouseMove);
      document.addEventListener("mouseup", this.handleMouseUp);
    };
    this.handleMouseMove = (e) => {
      const dx = e.clientX - this.dragStart.x;
      const dy = e.clientY - this.dragStart.y;
      if (!this.isDragging && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
        this.isDragging = true;
        this.dragging = true;
        if (this.instance) {
          this.instance.updateNode(this.id, { dragging: true });
        }
      }
      if (this.isDragging && this.instance) {
        const viewport = this.instance.getViewport();
        const newPosition = {
          x: this.nodeStart.x + dx / viewport.zoom,
          y: this.nodeStart.y + dy / viewport.zoom
        };
        this.instance.updateNode(this.id, { position: newPosition });
      }
    };
    this.handleMouseUp = () => {
      if (this.isDragging && this.instance) {
        this.instance.updateNode(this.id, { dragging: false });
      }
      this.cleanup();
      setTimeout(() => {
        this.isDragging = false;
        this.dragging = false;
      }, 50);
    };
  }
  firstUpdated() {
    if (this.draggable) {
      this.addEventListener("mousedown", this.handleMouseDown);
    }
    this.addEventListener("click", this.handleClick);
    this.addEventListener("wheel", this.handleWheel, { passive: false });
    if (this.resizable) {
      this.addEventListener("resize", this.handleResize);
      this.addEventListener("resize-end", this.handleResizeEnd);
    }
    this.updateMeasuredSize();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("mousedown", this.handleMouseDown);
    this.removeEventListener("click", this.handleClick);
    this.removeEventListener("wheel", this.handleWheel);
    if (this.resizable) {
      this.removeEventListener("resize", this.handleResize);
      this.removeEventListener("resize-end", this.handleResizeEnd);
    }
    this.cleanup();
  }
  /**
   * Find the nearest scrollable parent element
   */
  findScrollableElement(element) {
    if (!element || !(element instanceof HTMLElement)) return null;
    if (element.classList.contains("nowheel")) {
      return element;
    }
    const style = window.getComputedStyle(element);
    const overflow = style.overflow + style.overflowX + style.overflowY;
    if (overflow.includes("auto") || overflow.includes("scroll")) {
      if (element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth) {
        return element;
      }
    }
    const parent = element.parentElement;
    if (parent && (parent === this || parent.closest("flow-node") === this || this.shadowRoot?.contains(parent))) {
      return this.findScrollableElement(parent);
    }
    return null;
  }
  cleanup() {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }
  render() {
    return html$1`
      <div class="node-container">
        <div class="node-content">
          ${this.data?.label || "Node"}
        </div>
        <div 
          class="handle target" 
          data-handle="target" 
          data-node-id=${this.id}
          @mousedown=${this.onHandleMouseDown("target")}
        ></div>
        <div 
          class="handle source" 
          data-handle="source" 
          data-node-id=${this.id}
          @mousedown=${this.onHandleMouseDown("source")}
        ></div>
      </div>
      ${this.resizable ? html$1`
        <node-resizer
          .visible=${this.selected}
          min-width="50"
          min-height="30"
          max-width="500"
          max-height="300"
        ></node-resizer>
      ` : ""}
    `;
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    this.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    this.updateMeasuredSize();
    if (changedProperties.has("resizable")) {
      console.log("FlowNode resizable changed:", this.resizable);
    }
  }
  updateMeasuredSize() {
    if (!this.instance) return;
    const rect = this.getBoundingClientRect();
    const zoom = this.instance.getViewport().zoom || 1;
    const width = rect.width / zoom;
    const height = rect.height / zoom;
    const changed = !this.lastMeasured || Math.abs(this.lastMeasured.width - width) > 0.5 || Math.abs(this.lastMeasured.height - height) > 0.5;
    if (changed) {
      this.lastMeasured = { width, height };
      this.instance.updateNode(this.id, { measured: { width, height }, width, height });
    }
  }
  onHandleMouseDown(type) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.dispatchEvent(new CustomEvent("handle-start", {
        detail: { nodeId: this.id, type },
        bubbles: true,
        composed: true
      }));
    };
  }
};
FlowNode.styles = css`
    :host {
      position: absolute;
      border: 1px solid var(--flow-node-border, #ddd);
      border-radius: 8px;
      background: var(--flow-node-background, white);
      padding: 10px 20px;
      cursor: grab;
      user-select: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.2s;
      transform-origin: 0 0;
      will-change: transform;
      pointer-events: auto;
    }

    :host([dragging]) {
      cursor: grabbing;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
    }

    :host(:hover) {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    }

    :host([selected]) {
      border-color: var(--flow-node-selected-border, #1a73e8);
      box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.3);
    }

    .node-content {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .handle {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--flow-handle-bg, #fff);
      border: 1px solid var(--flow-handle-border, #1a73e8);
      box-shadow: 0 0 0 1px rgba(26, 115, 232, 0.15);
      cursor: crosshair;
      pointer-events: auto;
    }

    .handle.source {
      right: -5px;
      top: 50%;
      transform: translateY(-50%);
    }

    .handle.target {
      left: -5px;
      top: 50%;
      transform: translateY(-50%);
    }
  `;
__decorateClass$8([
  property({ type: String, reflect: true })
], FlowNode.prototype, "id", 2);
__decorateClass$8([
  property({ type: Object })
], FlowNode.prototype, "data", 2);
__decorateClass$8([
  property({ type: Object })
], FlowNode.prototype, "position", 2);
__decorateClass$8([
  property({ type: Boolean, reflect: true })
], FlowNode.prototype, "selected", 2);
__decorateClass$8([
  property({ type: Boolean, reflect: true })
], FlowNode.prototype, "dragging", 2);
__decorateClass$8([
  property({ type: Boolean })
], FlowNode.prototype, "draggable", 2);
__decorateClass$8([
  property({ type: Object })
], FlowNode.prototype, "instance", 2);
__decorateClass$8([
  property({ type: Boolean })
], FlowNode.prototype, "resizable", 2);
FlowNode = __decorateClass$8([
  customElement("flow-node")
], FlowNode);
var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$5(target, key, result);
  return result;
};
let FlowEdge = class extends LitElement {
  constructor() {
    super(...arguments);
    this.id = "";
    this.source = "";
    this.target = "";
    this.animated = false;
    this.selected = false;
    this.label = "";
    this.type = "default";
    this.markerHandleHalf = 5;
  }
  // half of node handle diameter (10px)
  /**
   * Create marker ID from marker spec
   */
  getMarkerId(spec) {
    if (!spec) return void 0;
    if (typeof spec === "string") return spec;
    const key = this.normalizeMarkerSpec(spec);
    return `marker-${this.hashString(key)}`;
  }
  /**
   * Create marker SVG from marker spec
   */
  createMarkerSVG(id, spec) {
    if (spec.type === "custom") {
      const width2 = spec.width ?? 10;
      const height2 = spec.height ?? 10;
      const refX2 = (spec.refX ?? width2) + this.markerHandleHalf;
      const refY2 = spec.refY ?? height2 / 2;
      const color2 = spec.color ?? "currentColor";
      const orient2 = spec.orient ?? "auto";
      return `<marker id="${id}" markerWidth="${width2}" markerHeight="${height2}" refX="${refX2}" refY="${refY2}" orient="${orient2}" markerUnits="userSpaceOnUse"><path d="${spec.path}" fill="${color2}" stroke="${color2}"/></marker>`;
    }
    const width = spec.width ?? 10;
    const height = spec.height ?? 10;
    const orient = spec.orient ?? "auto";
    const color = spec.color ?? "currentColor";
    const refX = (spec.type === "ArrowClosed" ? width : width) + this.markerHandleHalf;
    const refY = height / 2;
    if (spec.type === "ArrowClosed") {
      const path2 = `M0,0 L${width},${refY} L0,${height} Z`;
      return `<marker id="${id}" markerWidth="${width}" markerHeight="${height}" refX="${refX}" refY="${refY}" orient="${orient}" markerUnits="userSpaceOnUse"><path d="${path2}" fill="${color}"/></marker>`;
    }
    const path = `M0,0 L${width},${refY} L0,${height}`;
    return `<marker id="${id}" markerWidth="${width}" markerHeight="${height}" refX="${refX}" refY="${refY}" orient="${orient}" markerUnits="userSpaceOnUse"><path d="${path}" fill="none" stroke="${color}" stroke-width="2"/></marker>`;
  }
  /**
   * Normalize marker spec to a string key for caching
   */
  normalizeMarkerSpec(spec) {
    if (spec.type === "custom") {
      const { path, width: width2 = 20, height: height2 = 20, refX = 20, refY = 10, orient: orient2 = "auto", color: color2 = "currentColor" } = spec;
      return `custom|p=${path}|w=${width2}|h=${height2}|rx=${refX}|ry=${refY}|o=${orient2}|c=${color2}`;
    }
    const { width = 20, height = 20, orient = "auto", color = "currentColor" } = spec;
    return `builtin|${spec.type}|w=${width}|h=${height}|o=${orient}|c=${color}`;
  }
  /**
   * Simple hash function for generating unique IDs
   */
  hashString(input) {
    let h = 0;
    for (let i = 0; i < input.length; i++) {
      h = (h << 5) - h + input.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h).toString(36);
  }
  /**
   * Get path based on edge type
   */
  getPathForType(source, target) {
    const sourceX = source.x;
    const sourceY = source.y;
    const targetX = target.x;
    const targetY = target.y;
    const sourcePosition = source.position;
    const targetPosition = target.position;
    switch (this.type) {
      case "straight":
        return getStraightPath({
          sourceX,
          sourceY,
          targetX,
          targetY
        });
      case "smoothstep":
        return getSmoothStepPath({
          sourceX,
          sourceY,
          sourcePosition,
          targetX,
          targetY,
          targetPosition
        });
      case "step":
        return getSmoothStepPath({
          sourceX,
          sourceY,
          sourcePosition,
          targetX,
          targetY,
          targetPosition,
          borderRadius: 0
          // Step edges have no border radius
        });
      case "simplebezier":
        return getBezierPath({
          sourceX,
          sourceY,
          sourcePosition,
          targetX,
          targetY,
          targetPosition,
          curvature: 0.5
          // Simple bezier with fixed curvature
        });
      case "default":
      default:
        return getBezierPath({
          sourceX,
          sourceY,
          sourcePosition,
          targetX,
          targetY,
          targetPosition
        });
    }
  }
  /** Returns the ShadowRoot of the parent flow-canvas */
  getFlowCanvasRoot() {
    const root = this.getRootNode();
    return root instanceof ShadowRoot ? root : null;
  }
  /** Returns the flow-canvas host element (if available) */
  getFlowCanvasHost() {
    const root = this.getFlowCanvasRoot();
    return root && root.host || null;
  }
  /**
   * Find a specific handle element within a node
   */
  findHandleElement(nodeId, handleId) {
    const canvasRoot = this.getFlowCanvasRoot();
    if (!canvasRoot) return null;
    const node = canvasRoot.querySelector(`[id="${CSS.escape(nodeId)}"]`);
    if (!node) return null;
    const shadowRoot = node.shadowRoot;
    let handle = null;
    if (shadowRoot) {
      handle = shadowRoot.querySelector(`[data-handle-id="${CSS.escape(handleId)}"]`);
    }
    if (!handle) {
      handle = node.querySelector(`[data-handle-id="${CSS.escape(handleId)}"]`);
    }
    return handle;
  }
  /**
   * Get the canvas coordinates of a specific handle
   */
  getHandlePosition(nodeId, handleId) {
    const handleEl = this.findHandleElement(nodeId, handleId);
    if (!handleEl) return null;
    const canvasRoot = this.getFlowCanvasRoot();
    if (!canvasRoot) return null;
    const nodeEl = canvasRoot.querySelector(`[id="${CSS.escape(nodeId)}"]`);
    if (!nodeEl) return null;
    const nodeRect = nodeEl.getBoundingClientRect();
    const handleRect = handleEl.getBoundingClientRect();
    const node = this.sourceNode?.id === nodeId ? this.sourceNode : this.targetNode;
    if (!node) return null;
    node.measured?.width || node.width || 150;
    node.measured?.height || node.height || 50;
    const flowCanvas = this.getFlowCanvasHost();
    const viewport = flowCanvas?.viewport || { zoom: 1 };
    const zoom = viewport.zoom || 1;
    const offsetX = (handleRect.left + handleRect.width / 2 - nodeRect.left) / zoom;
    const offsetY = (handleRect.top + handleRect.height / 2 - nodeRect.top) / zoom;
    return {
      x: node.position.x + offsetX,
      y: node.position.y + offsetY
    };
  }
  /**
   * Get the source position (handle or node edge)
   */
  getSourcePosition() {
    if (this.sourceHandle && this.sourceNode) {
      const handlePos = this.getHandlePosition(this.sourceNode.id, this.sourceHandle);
      if (handlePos) {
        return { ...handlePos, position: Position.Right };
      }
    }
    const sourceWidth = this.sourceNode.measured?.width || this.sourceNode.width || 150;
    const sourceHeight = this.sourceNode.measured?.height || this.sourceNode.height || 50;
    return {
      x: this.sourceNode.position.x + sourceWidth,
      y: this.sourceNode.position.y + sourceHeight / 2,
      position: Position.Right
    };
  }
  /**
   * Get the target position (handle or node edge)
   */
  getTargetPosition() {
    if (this.targetHandle && this.targetNode) {
      const handlePos = this.getHandlePosition(this.targetNode.id, this.targetHandle);
      if (handlePos) {
        return { ...handlePos, position: Position.Left };
      }
    }
    const targetHeight = this.targetNode.measured?.height || this.targetNode.height || 50;
    return {
      x: this.targetNode.position.x,
      y: this.targetNode.position.y + targetHeight / 2,
      position: Position.Left
    };
  }
  render() {
    if (!this.sourceNode || !this.targetNode) {
      return html$1``;
    }
    const source = this.getSourcePosition();
    const target = this.getTargetPosition();
    const [path, labelX, labelY, offsetX, offsetY] = this.getPathForType(source, target);
    const pathClasses = [
      "edge-path",
      this.animated && "animated",
      this.selected && "selected"
    ].filter(Boolean).join(" ");
    const markerStartId = this.getMarkerId(this.markerStart);
    const markerEndId = this.getMarkerId(this.markerEnd);
    const markerStart = markerStartId ? `url(#${markerStartId})` : void 0;
    const markerEnd = markerEndId ? `url(#${markerEndId})` : void 0;
    const dashAttr = this.animated ? "5" : "";
    return html$1`
      <svg style="position:absolute; top:0; left:0; width:100%; height:100%; overflow:visible">
        <defs>
          ${markerStartId && typeof this.markerStart === "object" ? svg`<marker id="${markerStartId}" markerWidth="${this.markerStart.width || 10}" markerHeight="${this.markerStart.height || 10}" refX="${((this.markerStart.type === "custom" ? this.markerStart.refX : void 0) || this.markerStart.width || 10) + this.markerHandleHalf}" refY="${(this.markerStart.type === "custom" ? this.markerStart.refY : void 0) || (this.markerStart.height || 10) / 2}" orient="${this.markerStart.orient || "auto"}" markerUnits="userSpaceOnUse">
              ${this.markerStart.type === "custom" ? svg`<path d="${this.markerStart.path}" fill="${this.markerStart.color || "currentColor"}" stroke="${this.markerStart.color || "currentColor"}"/>` : this.markerStart.type === "ArrowClosed" ? svg`<path d="M0,0 L${this.markerStart.width || 10},${(this.markerStart.height || 10) / 2} L0,${this.markerStart.height || 10} Z" fill="${this.markerStart.color || "currentColor"}"/>` : svg`<path d="M0,0 L${this.markerStart.width || 10},${(this.markerStart.height || 10) / 2} L0,${this.markerStart.height || 10}" fill="none" stroke="${this.markerStart.color || "currentColor"}" stroke-width="2"/>`}
            </marker>` : ""}
          ${markerEndId && typeof this.markerEnd === "object" ? svg`<marker id="${markerEndId}" markerWidth="${this.markerEnd.width || 10}" markerHeight="${this.markerEnd.height || 10}" refX="${((this.markerEnd.type === "custom" ? this.markerEnd.refX : void 0) || this.markerEnd.width || 10) + this.markerHandleHalf}" refY="${(this.markerEnd.type === "custom" ? this.markerEnd.refY : void 0) || (this.markerEnd.height || 10) / 2}" orient="${this.markerEnd.orient || "auto"}" markerUnits="userSpaceOnUse">
              ${this.markerEnd.type === "custom" ? svg`<path d="${this.markerEnd.path}" fill="${this.markerEnd.color || "currentColor"}" stroke="${this.markerEnd.color || "currentColor"}"/>` : this.markerEnd.type === "ArrowClosed" ? svg`<path d="M0,0 L${this.markerEnd.width || 10},${(this.markerEnd.height || 10) / 2} L0,${this.markerEnd.height || 10} Z" fill="${this.markerEnd.color || "currentColor"}"/>` : svg`<path d="M0,0 L${this.markerEnd.width || 10},${(this.markerEnd.height || 10) / 2} L0,${this.markerEnd.height || 10}" fill="none" stroke="${this.markerEnd.color || "currentColor"}" stroke-width="2"/>`}
            </marker>` : ""}
        </defs>
        ${svg`
          <path 
            class="${pathClasses}"
            d="${path}"
            stroke-dasharray="${dashAttr}"
            marker-start="${markerStart ?? ""}"
            marker-end="${markerEnd ?? ""}"
            @click=${this.handleClick}
          />
          ${this.label ? svg`
            <text 
              x="${labelX}" 
              y="${labelY}" 
              text-anchor="middle"
              dy="-5"
              fill="#333"
              style="user-select:none; pointer-events:none; font-size:12px;"
            >
              ${this.label}
            </text>
          ` : ""}
        `}
      </svg>
    `;
  }
  handleClick(e) {
    console.log("handleClick", e);
    e.stopPropagation();
    const newSelected = !this.selected;
    this.selected = newSelected;
    this.dispatchEvent(new CustomEvent("edge-select", {
      detail: {
        edgeId: this.id,
        selected: newSelected,
        edge: {
          id: this.id,
          source: this.source,
          target: this.target,
          sourceHandle: this.sourceHandle,
          targetHandle: this.targetHandle,
          label: this.label,
          animated: this.animated,
          selected: newSelected
        }
      },
      bubbles: true,
      composed: true
    }));
  }
};
FlowEdge.styles = css`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .edge-path {
      fill: none;
      stroke: var(--flow-edge-color, #b1b1b7);
      stroke-width: 3;
      cursor: pointer;
      pointer-events: stroke;
    }

    .edge-path:hover {
      stroke: var(--flow-edge-selected-color, #1a73e8);
    }

    .edge-path.selected {
      stroke: var(--flow-edge-selected-color, #1a73e8);
    }

    .edge-path.animated {
      stroke-dasharray: 5;
      animation: dashdraw 0.5s linear infinite;
    }

    .edge-label {
      pointer-events: none;
      user-select: none;
      fill: #333;
      font-size: 12px;
    }

    @keyframes dashdraw {
      to {
        stroke-dashoffset: -10;
      }
    }
  `;
__decorateClass$7([
  property({ type: String })
], FlowEdge.prototype, "id", 2);
__decorateClass$7([
  property({ type: String })
], FlowEdge.prototype, "source", 2);
__decorateClass$7([
  property({ type: String })
], FlowEdge.prototype, "target", 2);
__decorateClass$7([
  property({ type: String })
], FlowEdge.prototype, "sourceHandle", 2);
__decorateClass$7([
  property({ type: String })
], FlowEdge.prototype, "targetHandle", 2);
__decorateClass$7([
  property({ type: Object })
], FlowEdge.prototype, "sourceNode", 2);
__decorateClass$7([
  property({ type: Object })
], FlowEdge.prototype, "targetNode", 2);
__decorateClass$7([
  property({ type: Boolean })
], FlowEdge.prototype, "animated", 2);
__decorateClass$7([
  property({ type: Boolean })
], FlowEdge.prototype, "selected", 2);
__decorateClass$7([
  property({ type: String })
], FlowEdge.prototype, "label", 2);
__decorateClass$7([
  property({ type: String })
], FlowEdge.prototype, "type", 2);
__decorateClass$7([
  property({ type: Object })
], FlowEdge.prototype, "markerStart", 2);
__decorateClass$7([
  property({ type: Object })
], FlowEdge.prototype, "markerEnd", 2);
FlowEdge = __decorateClass$7([
  customElement("flow-edge")
], FlowEdge);
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$4(target, key, result);
  return result;
};
let FlowBackground = class extends LitElement {
  constructor() {
    super(...arguments);
    this.variant = "dots";
    this.gap = 20;
    this.color = "#ddd";
    this.size = 1;
  }
  render() {
    const patternId = `flow-bg-pattern-${Math.random().toString(36).substr(2, 9)}`;
    return html$1`
      <svg>
        <defs>
          ${this.variant === "dots" ? this.renderDotsPattern(patternId) : this.renderLinesPattern(patternId)}
        </defs>
        <rect width="100%" height="100%" fill="url(#${patternId})" />
      </svg>
    `;
  }
  renderDotsPattern(id) {
    return svg`
      <pattern id="${id}" x="0" y="0" width="${this.gap}" height="${this.gap}" patternUnits="userSpaceOnUse">
        <circle cx="${this.size}" cy="${this.size}" r="${this.size}" fill="${this.color}" />
      </pattern>
    `;
  }
  renderLinesPattern(id) {
    return svg`
      <pattern id="${id}" x="0" y="0" width="${this.gap}" height="${this.gap}" patternUnits="userSpaceOnUse">
        <path d="M ${this.gap} 0 L 0 0 0 ${this.gap}" fill="none" stroke="${this.color}" stroke-width="${this.size}" />
      </pattern>
    `;
  }
};
FlowBackground.styles = css`
    :host {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  `;
__decorateClass$6([
  property({ type: String })
], FlowBackground.prototype, "variant", 2);
__decorateClass$6([
  property({ type: Number })
], FlowBackground.prototype, "gap", 2);
__decorateClass$6([
  property({ type: String })
], FlowBackground.prototype, "color", 2);
__decorateClass$6([
  property({ type: Number })
], FlowBackground.prototype, "size", 2);
FlowBackground = __decorateClass$6([
  customElement("flow-background")
], FlowBackground);
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$3(target, key, result);
  return result;
};
let FlowMinimap = class extends LitElement {
  constructor() {
    super(...arguments);
    this.width = 200;
    this.height = 150;
  }
  render() {
    return html$1`
      <div class="minimap-container">
        <div class="viewport-indicator"></div>
        <slot></slot>
      </div>
    `;
  }
};
FlowMinimap.styles = css`
    :host {
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 200px;
      height: 150px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      z-index: 10;
    }

    .minimap-container {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .viewport-indicator {
      position: absolute;
      border: 2px solid #1a73e8;
      background: rgba(26, 115, 232, 0.1);
      pointer-events: none;
    }
  `;
__decorateClass$5([
  property({ type: Number })
], FlowMinimap.prototype, "width", 2);
__decorateClass$5([
  property({ type: Number })
], FlowMinimap.prototype, "height", 2);
FlowMinimap = __decorateClass$5([
  customElement("flow-minimap")
], FlowMinimap);
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$2(target, key, result);
  return result;
};
let FlowControls = class extends LitElement {
  constructor() {
    super(...arguments);
    this.handleZoomIn = () => {
      this.instance?.zoomIn();
    };
    this.handleZoomOut = () => {
      this.instance?.zoomOut();
    };
    this.handleFitView = () => {
      this.instance?.fitView();
    };
  }
  render() {
    return html$1`
      <button @click=${this.handleZoomIn} title="Zoom In">+</button>
      <button @click=${this.handleZoomOut} title="Zoom Out">−</button>
      <div class="divider"></div>
      <button @click=${this.handleFitView} title="Fit View">⛶</button>
    `;
  }
};
FlowControls.styles = css`
    :host {
      position: absolute;
      bottom: 20px;
      left: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 10;
    }

    button {
      width: 36px;
      height: 36px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      transition: all 0.2s;
    }

    button:hover {
      background: #f5f5f5;
      border-color: #999;
    }

    button:active {
      background: #e0e0e0;
    }

    .divider {
      height: 1px;
      background: #ddd;
      margin: 4px 0;
    }
  `;
__decorateClass$4([
  property({ type: Object })
], FlowControls.prototype, "instance", 2);
FlowControls = __decorateClass$4([
  customElement("flow-controls")
], FlowControls);
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __getProtoOf = Object.getPrototypeOf;
var __reflectGet = Reflect.get;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
};
var __superGet = (cls, obj, key) => __reflectGet(__getProtoOf(cls), key, obj);
let ERDTableNode = class extends FlowNode {
  constructor() {
    super(...arguments);
    this.appliedInitialSize = false;
  }
  firstUpdated() {
    const data = this.data;
    const w = data?.size?.width;
    const h = data?.size?.height;
    if (typeof w === "number" && w > 0 || typeof h === "number" && h > 0) {
      if (typeof w === "number" && w > 0) this.style.width = `${w}px`;
      if (typeof h === "number" && h > 0) this.style.height = `${h}px`;
      if (this.instance) {
        this.instance.updateNode(this.id, {
          width: typeof w === "number" && w > 0 ? w : this.width,
          height: typeof h === "number" && h > 0 ? h : this.height
        });
      }
      this.appliedInitialSize = true;
    }
    super.firstUpdated();
  }
  updated(changedProperties) {
    super.updated(changedProperties);
  }
  onFieldHandleMouseDown(fieldName, side) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      const handleId = `${this.id}-${fieldName}-${side}`;
      this.dispatchEvent(new CustomEvent("handle-start", {
        detail: {
          nodeId: this.id,
          type: side === "left" ? "target" : "source",
          handleId,
          fieldName
        },
        bubbles: true,
        composed: true
      }));
    };
  }
  render() {
    const tableData = this.data;
    const tableName = tableData?.tableName || "Table";
    const fields = tableData?.fields || [];
    return html$1`
      <div class="table-header" style="${tableData.color ? `background: ${tableData.color}` : ""}">
        <span class="table-icon">📊</span>
        <span>${tableName}</span>
      </div>
      
      <div class="table-body nowheel">
        ${fields.map((field) => html$1`
          <div class="field-row" data-field="${field.name}">
            <div class="field-key">
              ${field.key || ""}
            </div>
            <div class="field-name">${field.name}</div>
            <div class="field-type">${field.type}</div>
            <div class="field-nullable">
              ${field.nullable ? "NULL" : ""}
            </div>
            
            <!-- Left handle (input) for this field -->
            <div 
              class="field-handle left"
              data-handle="target"
              data-field="${field.name}"
              data-handle-id="${this.id}-${field.name}-left"
              @mousedown=${this.onFieldHandleMouseDown(field.name, "left")}
            ></div>
            
            <!-- Right handle (output) for this field -->
            <div 
              class="field-handle right"
              data-handle="source"
              data-field="${field.name}"
              data-handle-id="${this.id}-${field.name}-right"
              @mousedown=${this.onFieldHandleMouseDown(field.name, "right")}
            ></div>
          </div>
        `)}
      </div>
      ${this.resizable ? html$1`
        <node-resizer
          .visible=${this.selected}
          min-width="150"
          min-height="80"
          max-width="500"
          max-height="400"
        ></node-resizer>
      ` : ""}
    `;
  }
};
ERDTableNode.styles = [
  ...Array.isArray(__superGet(ERDTableNode, ERDTableNode, "styles")) ? __superGet(ERDTableNode, ERDTableNode, "styles") : [__superGet(ERDTableNode, ERDTableNode, "styles")],
  css`
      :host {
        padding: 0;
        min-width: 200px;
        display: flex;
        flex-direction: column;
        background: var(--erd-table-bg, white);
      }

      .table-header {
        background: var(--erd-table-header-bg, #2563eb);
        color: white;
        padding: 12px 16px;
        font-weight: 600;
        border-radius: 8px 8px 0 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .table-icon {
        font-size: 18px;
      }

      .table-body {
        padding: 0;
        overflow: auto;
        /* Prevent panning when scrolling inside the table body */
      }

      .field-row {
        display: grid;
        grid-template-columns: 30px 1fr auto auto;
        gap: 8px;
        padding: 10px 16px;
        border-bottom: 1px solid var(--erd-border, #e5e7eb);
        align-items: center;
        position: relative;
        background: white;
        transition: background 0.2s;
      }

      .field-row:hover {
        background: var(--erd-row-hover, #f3f4f6);
      }

      .field-row:last-child {
        border-bottom: none;
        border-radius: 0 0 8px 8px;
      }

      .field-key {
        font-size: 10px;
        font-weight: 700;
        color: var(--erd-key-color, #dc2626);
      }

      .field-name {
        font-weight: 500;
        color: var(--erd-text, #1f2937);
      }

      .field-type {
        font-size: 11px;
        color: var(--erd-type-color, #6b7280);
        text-transform: uppercase;
      }

      .field-nullable {
        font-size: 10px;
        color: #9ca3af;
      }

      /* Handles for each field */
      .field-handle {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--flow-handle-bg, #f1f1f1);
        cursor: crosshair;
        pointer-events: auto;
        z-index: 10;
        transition: all 0.2s;
      }

      .field-handle.left {
        left: 3px;
        top: 50%;
        transform: translateY(-50%);
      }

      .field-handle.right {
        right: 3px;
        top: 50%;
        transform: translateY(-50%);
      }

      .field-handle:hover {
        background: var(--flow-handle-border, #2563eb);
        transform: translateY(-50%) scale(1.3);
      }
    `
];
ERDTableNode = __decorateClass$3([
  customElement("erd-table-node")
], ERDTableNode);
const basicShapes = [
  {
    type: "circle",
    name: "Circle",
    category: "basic",
    path: "M 100 100 m -95 0 a 95 95 0 1 1 190 0 a 95 95 0 1 1 -190 0",
    viewBox: "0 0 200 200",
    defaultSize: { width: 200, height: 200 },
    centerPoint: { x: 100, y: 100 }
  },
  {
    type: "rectangle",
    name: "Rectangle",
    category: "basic",
    path: "M 5 5 L 195 5 L 195 195 L 5 195 Z",
    viewBox: "0 0 200 200",
    defaultSize: { width: 200, height: 200 },
    centerPoint: { x: 100, y: 100 }
  },
  {
    type: "diamond",
    name: "Diamond",
    category: "basic",
    path: "M 100 5 L 195 100 L 100 195 L 5 100 Z",
    viewBox: "0 0 200 200",
    defaultSize: { width: 200, height: 200 },
    centerPoint: { x: 100, y: 100 }
  },
  {
    type: "triangle",
    name: "Triangle",
    category: "basic",
    path: "M 100 5 L 195 195 L 5 195 Z",
    viewBox: "0 0 200 200",
    defaultSize: { width: 200, height: 200 },
    centerPoint: { x: 100, y: 100 }
  }
];
const geometricShapes = [
  {
    type: "hexagon",
    name: "Hexagon",
    category: "geometric",
    path: "M 100 5 L 175 52 L 175 148 L 100 195 L 25 148 L 25 52 Z",
    viewBox: "0 0 200 200",
    defaultSize: { width: 200, height: 200 },
    centerPoint: { x: 100, y: 100 }
  },
  {
    type: "octagon",
    name: "Octagon",
    category: "geometric",
    path: "M 100 5 L 175 25 L 195 100 L 175 175 L 100 195 L 25 175 L 5 100 L 25 25 Z",
    viewBox: "0 0 200 200",
    defaultSize: { width: 200, height: 200 },
    centerPoint: { x: 100, y: 100 }
  }
];
const symbolicShapes = [
  {
    type: "heart",
    name: "Heart",
    category: "symbolic",
    path: "M 100 185 C 100 185, 10 95, 10 50 C 10 25, 35 5, 60 5 C 80 5, 100 25, 100 50 C 100 25, 120 5, 140 5 C 165 5, 190 25, 190 50 C 190 95, 100 185, 100 185 Z",
    viewBox: "0 0 200 200",
    defaultSize: { width: 200, height: 200 },
    centerPoint: { x: 100, y: 100 }
  }
];
const _ShapeRegistry = class _ShapeRegistry {
  /**
   * Initialize the registry with default shapes
   */
  static initialize() {
    const allShapes = [...basicShapes, ...geometricShapes, ...symbolicShapes];
    allShapes.forEach((shape) => {
      this.shapes.set(shape.type, shape);
    });
  }
  /**
   * Register a new shape definition
   */
  static register(definition) {
    this.shapes.set(definition.type, definition);
  }
  /**
   * Get a shape definition by type
   */
  static get(shapeType) {
    return this.shapes.get(shapeType);
  }
  /**
   * Get all registered shapes
   */
  static getAll() {
    return Array.from(this.shapes.values());
  }
  /**
   * Get shapes by category
   */
  static getByCategory(category) {
    return Array.from(this.shapes.values()).filter((shape) => shape.category === category);
  }
  /**
   * Check if a shape type is registered
   */
  static has(shapeType) {
    return this.shapes.has(shapeType);
  }
  /**
   * Get all available shape types
   */
  static getShapeTypes() {
    return Array.from(this.shapes.keys());
  }
  /**
   * Clear all registered shapes
   */
  static clear() {
    this.shapes.clear();
  }
  /**
   * Get shape count
   */
  static getCount() {
    return this.shapes.size;
  }
};
_ShapeRegistry.shapes = /* @__PURE__ */ new Map();
let ShapeRegistry = _ShapeRegistry;
ShapeRegistry.initialize();
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
let ShapeNode = class extends LitElement {
  constructor() {
    super(...arguments);
    this.id = "";
    this.selected = false;
    this.dragging = false;
    this.draggable = true;
    this.connectable = true;
    this.instance = null;
    this.resizable = false;
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.nodeStart = { x: 0, y: 0 };
    this.handleClick = (e) => {
      e.stopPropagation();
      if (!this.isDragging && this.instance) {
        const newSelected = !this.selected;
        this.instance.updateNode(this.id, { selected: newSelected });
        this.dispatchEvent(new CustomEvent("node-select", {
          detail: {
            nodeId: this.id,
            selected: newSelected,
            node: {
              id: this.id,
              data: this.data,
              position: this.position,
              selected: newSelected
            }
          },
          bubbles: true,
          composed: true
        }));
      }
    };
    this.handleResize = (e) => {
      const { width, height } = e.detail;
      if (this.data && this.instance) {
        const updatedData = {
          ...this.data,
          size: { width, height }
        };
        this.instance.updateNode(this.id, {
          data: updatedData,
          width,
          height,
          measured: { width, height }
        });
      }
    };
    this.handleResizeEnd = (e) => {
      const { width, height } = e.detail;
      if (this.data && this.instance) {
        const updatedData = {
          ...this.data,
          size: { width, height }
        };
        this.instance.updateNode(this.id, {
          data: updatedData,
          width,
          height,
          measured: { width, height }
        });
      }
      this.dispatchEvent(new CustomEvent("node-resize-end", {
        detail: {
          nodeId: this.id,
          width,
          height
        },
        bubbles: true,
        composed: true
      }));
    };
    this.handleMouseDown = (e) => {
      if (!this.draggable || e.button !== 0) return;
      const target = e.target;
      const isFromResizeHandle = target.classList.contains("resize-handle") || target.tagName === "NODE-RESIZER" || target.closest("node-resizer") !== null;
      if (isFromResizeHandle) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      this.isDragging = false;
      this.dragStart = { x: e.clientX, y: e.clientY };
      this.nodeStart = { ...this.position };
      document.addEventListener("mousemove", this.handleMouseMove);
      document.addEventListener("mouseup", this.handleMouseUp);
    };
    this.handleMouseMove = (e) => {
      const dx = e.clientX - this.dragStart.x;
      const dy = e.clientY - this.dragStart.y;
      if (!this.isDragging && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
        this.isDragging = true;
        if (this.instance) {
          this.instance.updateNode(this.id, { dragging: true });
        }
      }
      if (this.isDragging && this.instance) {
        const viewport = this.instance.getViewport();
        const newPosition = {
          x: this.nodeStart.x + dx / viewport.zoom,
          y: this.nodeStart.y + dy / viewport.zoom
        };
        this.instance.updateNode(this.id, { position: newPosition });
      }
    };
    this.handleMouseUp = () => {
      console.log("handleMouseUp");
      if (this.isDragging && this.instance) {
        this.instance.updateNode(this.id, { dragging: false });
      }
      this.isDragging = false;
      this.cleanup();
    };
    this.handleHandleStart = (e) => {
      console.log("handleHandleStart", e);
      e.stopPropagation();
      this.isDragging = false;
      const handle = e.target;
      const handleId = handle.dataset.handleId;
      const handleType = handle.dataset.handleType;
      if (handleType && handleId) {
        this.dispatchEvent(new CustomEvent("handle-start", {
          detail: {
            nodeId: this.id,
            handleId,
            handleType,
            position: this.position
          },
          bubbles: true,
          composed: true
        }));
      }
    };
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("position") && !this.isDragging) ;
    if (changedProperties.has("resizable")) {
      console.log("ShapeNode resizable changed:", this.resizable);
    }
  }
  /**
   * Get the shape definition from the registry
   */
  getShapeDefinition() {
    if (!this.data?.type) {
      return void 0;
    }
    return ShapeRegistry.get(this.data.type);
  }
  /**
   * Render the SVG shape
   */
  renderShape() {
    const shapeDef = this.getShapeDefinition();
    if (!shapeDef) {
      return html$1`
        <div class="unknown-shape">
          Unknown shape: ${this.data?.type || "undefined"}
        </div>
      `;
    }
    const config = this.data;
    const size = config.size || shapeDef.defaultSize;
    const fillColor = config.backgroundColor || config.color || "#ffffff";
    const strokeColor = config.strokeColor || "#000000";
    const strokeWidth = config.strokeWidth || 2;
    const rotation = config.rotation || 0;
    return html$1`
      <svg 
        class="shape-svg"
        width="${size.width}" 
        height="${size.height}" 
        viewBox="${shapeDef.viewBox}"
        style="transform: rotate(${rotation}deg)"
      >
        <path 
          d="${shapeDef.path}" 
          fill="${fillColor}"
          stroke="${strokeColor}"
          stroke-width="${strokeWidth}"
        />
      </svg>
    `;
  }
  /**
   * Render gradient definitions if needed
   */
  renderGradients() {
    const config = this.data;
    if (config && "gradient" in config && config.gradient) {
      const gradientId = `gradient-${this.data.type}-${Math.random().toString(36).substr(2, 9)}`;
      const gradient = config.gradient;
      if (gradient.type === "linear") {
        return html$1`
          <defs>
            <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
              ${gradient.colors.map(
          (color, index) => html$1`<stop offset="${index / (gradient.colors.length - 1) * 100}%" stop-color="${color}"/>`
        )}
            </linearGradient>
          </defs>
        `;
      } else if (gradient.type === "radial") {
        return html$1`
          <defs>
            <radialGradient id="${gradientId}" cx="50%" cy="50%" r="50%">
              ${gradient.colors.map(
          (color, index) => html$1`<stop offset="${index / (gradient.colors.length - 1) * 100}%" stop-color="${color}"/>`
        )}
            </radialGradient>
          </defs>
        `;
      }
    }
    return html$1``;
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this.handleClick);
    this.addEventListener("mousedown", this.handleMouseDown);
    if (this.resizable) {
      this.addEventListener("resize", this.handleResize);
      this.addEventListener("resize-end", this.handleResizeEnd);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.handleClick);
    this.removeEventListener("mousedown", this.handleMouseDown);
    if (this.resizable) {
      this.removeEventListener("resize", this.handleResize);
      this.removeEventListener("resize-end", this.handleResizeEnd);
    }
    this.cleanup();
  }
  cleanup() {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }
  render() {
    this.style.setProperty("--position-x", `${this.position.x}px`);
    this.style.setProperty("--position-y", `${this.position.y}px`);
    const shapeDef = this.getShapeDefinition();
    const config = this.data;
    const size = config?.size || shapeDef?.defaultSize || { width: 200, height: 200 };
    this.style.setProperty("--shape-width", `${size.width}px`);
    this.style.setProperty("--shape-height", `${size.height}px`);
    return html$1`
      <div class="shape-node ${this.selected ? "selected" : ""}">
        ${this.renderGradients()}
        ${this.renderShape()}
        <div class="shape-content">
          <slot></slot>
        </div>
        ${this.connectable ? this.renderHandles() : ""}
        ${this.renderLabel()}
      </div>
      ${this.resizable ? html$1`
        <node-resizer
          .visible=${this.selected}
          min-width="50"
          min-height="50"
          max-width="500"
          max-height="500"
        ></node-resizer>
      ` : ""}
    `;
  }
  renderHandles() {
    const nodeId = this.id;
    return html$1`
      <div 
        class="handle source" 
        data-handle="source" 
        data-node-id="${nodeId}"
        data-handle-id="${nodeId}-source-right"
        data-handle-type="source"
        @mousedown=${this.handleHandleStart}
      ></div>
      <div 
        class="handle target" 
        data-handle="target" 
        data-node-id="${nodeId}"
        data-handle-id="${nodeId}-target-left"
        data-handle-type="target"
        @mousedown=${this.handleHandleStart}
      ></div>
      <div 
        class="handle top" 
        data-handle="source" 
        data-node-id="${nodeId}"
        data-handle-id="${nodeId}-source-top"
        data-handle-type="source"
        @mousedown=${this.handleHandleStart}
      ></div>
      <div 
        class="handle bottom" 
        data-handle="target" 
        data-node-id="${nodeId}"
        data-handle-id="${nodeId}-target-bottom"
        data-handle-type="target"
        @mousedown=${this.handleHandleStart}
      ></div>
    `;
  }
  renderLabel() {
    const shapeConfig = this.data;
    if (!shapeConfig) return "";
    const label = shapeConfig.label || shapeConfig.type;
    return html$1`
      <div class="shape-label">
        ${label}
      </div>
    `;
  }
};
ShapeNode.styles = css`
    :host {
      position: absolute;
      display: block;
      pointer-events: auto;
      transform-origin: 0 0;
      will-change: transform;
      transform: translate(var(--position-x, 0px), var(--position-y, 0px));
    }

    .shape-node {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      user-select: none;
      pointer-events: auto;
      width: var(--shape-width, 200px);
      height: var(--shape-height, 200px);
    }

    .shape-node:active {
      cursor: grabbing;
    }

    .shape-node.selected {
      outline: 2px solid var(--flow-node-selected-color, #1a73e8);
      outline-offset: 2px;
    }

    :host([dragging]) .shape-node {
      cursor: grabbing;
      filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.25));
    }

    .shape-svg {
      display: block;
      transition: transform 0.2s ease;
      pointer-events: none;
    }

    .shape-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 1;
    }

    .shape-node:hover .shape-svg {
      transform: scale(1.05);
    }

    .unknown-shape {
      width: 100px;
      height: 100px;
      background: #f0f0f0;
      border: 2px dashed #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
      font-size: 12px;
      pointer-events: none;
    }

    .handle {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--flow-handle-bg, #fff);
      border: 1px solid var(--flow-handle-border, #1a73e8);
      box-shadow: 0 0 0 1px rgba(26, 115, 232, 0.15);
      cursor: crosshair;
      pointer-events: auto;
      z-index: 10;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .handle:hover {
      opacity: 1;
      transform: scale(1.2);
    }

    .handle.source {
      right: -5px;
      top: 50%;
      transform: translateY(-50%);
    }

    .handle.target {
      left: -5px;
      top: 50%;
      transform: translateY(-50%);
    }

    .handle.top {
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
    }

    .handle.bottom {
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
    }

    .shape-node:hover .handle {
      opacity: 1;
    }

    .shape-label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 12px;
      color: #333;
      white-space: nowrap;
      user-select: none;
      pointer-events: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      z-index: 5;
    }

    .shape-label.editable {
      pointer-events: auto;
      cursor: text;
    }

    .shape-label.editable:hover {
      background: rgba(255, 255, 255, 1);
      border-color: var(--flow-node-selected-color, #1a73e8);
    }

    .handle:active {
      opacity: 1;
      transform: scale(1.3);
    }
  `;
__decorateClass$2([
  property({ type: String, reflect: true })
], ShapeNode.prototype, "id", 2);
__decorateClass$2([
  property({ type: Object })
], ShapeNode.prototype, "data", 2);
__decorateClass$2([
  property({
    type: Object,
    hasChanged: (newVal, oldVal) => {
      return !oldVal || newVal.x !== oldVal.x || newVal.y !== oldVal.y;
    }
  })
], ShapeNode.prototype, "position", 2);
__decorateClass$2([
  property({ type: Boolean, reflect: true })
], ShapeNode.prototype, "selected", 2);
__decorateClass$2([
  property({ type: Boolean, reflect: true })
], ShapeNode.prototype, "dragging", 2);
__decorateClass$2([
  property({ type: Boolean })
], ShapeNode.prototype, "draggable", 2);
__decorateClass$2([
  property({ type: Boolean })
], ShapeNode.prototype, "connectable", 2);
__decorateClass$2([
  property({ type: Object })
], ShapeNode.prototype, "instance", 2);
__decorateClass$2([
  property({ type: Boolean })
], ShapeNode.prototype, "resizable", 2);
ShapeNode = __decorateClass$2([
  customElement("shape-node")
], ShapeNode);
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
};
let BaseNode = class extends LitElement {
  render() {
    return html$1`<slot></slot>`;
  }
};
BaseNode.styles = css`
    :host {
      display: block;
      border: 1px solid var(--flow-node-border, #e5e7eb);
      border-radius: 8px;
      background: var(--flow-node-background, #ffffff);
      color: var(--flow-node-foreground, #111827);
      overflow: hidden;
    }
  `;
BaseNode = __decorateClass$1([
  customElement("base-node")
], BaseNode);
let BaseNodeHeader = class extends LitElement {
  render() {
    return html$1`<slot></slot>`;
  }
};
BaseNodeHeader.styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-header-bg, #f9fafb);
      border-bottom: 1px solid var(--flow-node-border, #e5e7eb);
      font-weight: 600;
    }
  `;
BaseNodeHeader = __decorateClass$1([
  customElement("base-node-header")
], BaseNodeHeader);
let BaseNodeHeaderTitle = class extends LitElement {
  render() {
    return html$1`<span class="title"><slot></slot></span>`;
  }
};
BaseNodeHeaderTitle.styles = css`
    :host { display: contents; }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--base-node-title, #111827);
    }
  `;
BaseNodeHeaderTitle = __decorateClass$1([
  customElement("base-node-header-title")
], BaseNodeHeaderTitle);
let BaseNodeContent = class extends LitElement {
  render() {
    return html$1`<slot></slot>`;
  }
};
BaseNodeContent.styles = css`
    :host {
      display: block;
      padding: 12px;
    }
  `;
BaseNodeContent = __decorateClass$1([
  customElement("base-node-content")
], BaseNodeContent);
let BaseNodeFooter = class extends LitElement {
  render() {
    return html$1`<slot></slot>`;
  }
};
BaseNodeFooter.styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-footer-bg, #fafafa);
      border-top: 1px solid var(--flow-node-border, #e5e7eb);
    }
  `;
BaseNodeFooter = __decorateClass$1([
  customElement("base-node-footer")
], BaseNodeFooter);
var __defProp = Object.defineProperty;
var __decorateClass = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(target, key, result) || result;
  if (result) __defProp(target, key, result);
  return result;
};
const NodeMixin = (superClass) => {
  class NodeMixinClass extends superClass {
    constructor() {
      super(...arguments);
      this.id = "";
      this.position = { x: 0, y: 0 };
      this.data = {};
      this.selected = false;
      this.dragging = false;
      this.instance = null;
      this.resizable = false;
      this.draggable = true;
      this.drag_handle_selector = null;
      this.connectable = true;
      this.minWidth = 10;
      this.maxWidth = Number.MAX_VALUE;
      this.minHeight = 10;
      this.maxHeight = Number.MAX_VALUE;
      this.keepAspectRatio = false;
      this.maxInitialHeight = 0;
      this.isDragging = false;
      this.dragStart = { x: 0, y: 0 };
      this.nodeStart = { x: 0, y: 0 };
      this.isResizing = false;
      this.resizeStart = { x: 0, y: 0, width: 0, height: 0 };
      this.resizeHandle = "";
      this.dragHandleElement = null;
      this.handleClick = (e) => {
        e.stopPropagation();
        if (!this.isDragging) {
          const newSelected = !this.selected;
          this.selected = newSelected;
          if (this.instance) {
            this.instance.updateNode(this.id, { selected: newSelected });
          }
          this.dispatchEvent(new CustomEvent("node-select", {
            detail: {
              nodeId: this.id,
              selected: newSelected,
              node: {
                id: this.id,
                data: this.data,
                position: this.position,
                selected: newSelected
              }
            },
            bubbles: true,
            composed: true
          }));
        }
      };
      this.handleWheel = (e) => {
        const path = e.composedPath();
        let scrollableEl = null;
        for (const element of path) {
          if (element instanceof Element) {
            scrollableEl = this.findScrollableElement(element);
            if (scrollableEl) break;
          }
        }
        if (scrollableEl) {
          const canScrollVertically = e.deltaY < 0 && scrollableEl.scrollTop > 0 || e.deltaY > 0 && scrollableEl.scrollTop < scrollableEl.scrollHeight - scrollableEl.clientHeight;
          const canScrollHorizontally = e.deltaX < 0 && scrollableEl.scrollLeft > 0 || e.deltaX > 0 && scrollableEl.scrollLeft < scrollableEl.scrollWidth - scrollableEl.clientWidth;
          if (canScrollVertically || canScrollHorizontally) {
            e.stopPropagation();
          }
        }
      };
      this.handleMouseDown = (e) => {
        if (e.button !== 0) return;
        const target = e.target;
        const isFromResizeHandle = target.classList.contains("resize-handle") || target.closest(".resize-handle") !== null;
        if (isFromResizeHandle) {
          this.handleResizeStart(e);
          return;
        }
        if (!this.draggable) return;
        e.preventDefault();
        e.stopPropagation();
        this.isDragging = false;
        this.dragStart = { x: e.clientX, y: e.clientY };
        this.nodeStart = { ...this.position };
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);
      };
      this.handleMouseMove = (e) => {
        if (this.isResizing) {
          this.handleResizeMove(e);
          return;
        }
        const dx = e.clientX - this.dragStart.x;
        const dy = e.clientY - this.dragStart.y;
        if (!this.isDragging && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
          this.isDragging = true;
          this.dragging = true;
          if (this.dragHandleElement) {
            this.dragHandleElement.style.cursor = "grabbing";
          }
          if (this.instance) {
            this.instance.updateNode(this.id, { dragging: true });
          }
        }
        if (this.isDragging && this.instance) {
          const viewport = this.instance.getViewport();
          const newPosition = {
            x: this.nodeStart.x + dx / viewport.zoom,
            y: this.nodeStart.y + dy / viewport.zoom
          };
          this.instance.updateNode(this.id, { position: newPosition });
        }
      };
      this.handleMouseUp = () => {
        if (this.isDragging && this.instance) {
          this.instance.updateNode(this.id, { dragging: false });
        }
        if (this.dragHandleElement && this.isDragging) {
          this.dragHandleElement.style.cursor = "grab";
        }
        if (this.isResizing) {
          this.handleResizeEnd();
        }
        this.cleanup();
        setTimeout(() => {
          this.isDragging = false;
          this.dragging = false;
          this.isResizing = false;
        }, 50);
      };
      this.handleResizeStart = (e, handle) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        this.isResizing = true;
        const rect = this.getBoundingClientRect();
        const computedStyle = getComputedStyle(this);
        let width = parseFloat(computedStyle.width);
        let height = parseFloat(computedStyle.height);
        if (!width || width === 0) {
          width = rect.width;
        }
        if (!height || height === 0) {
          height = rect.height;
        }
        this.resizeStart = {
          x: e.clientX,
          y: e.clientY,
          width,
          height
        };
        if (handle) {
          this.resizeHandle = handle;
        } else {
          let target = e.target;
          if (!target.classList.contains("resize-handle")) {
            const resizeHandle = target.closest(".resize-handle");
            if (resizeHandle) {
              target = resizeHandle;
            }
          }
          const classes = Array.from(target.classList);
          this.resizeHandle = classes.find((cls) => cls !== "resize-handle") || "";
        }
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);
        this.dispatchEvent(new CustomEvent("resize-start", {
          detail: {
            width: this.resizeStart.width,
            height: this.resizeStart.height
          },
          bubbles: true,
          composed: true
        }));
      };
      this.handleResizeMove = (e) => {
        if (!this.isResizing) return;
        const deltaX = e.clientX - this.resizeStart.x;
        const deltaY = e.clientY - this.resizeStart.y;
        let newWidth = this.resizeStart.width;
        let newHeight = this.resizeStart.height;
        switch (this.resizeHandle) {
          case "nw":
            newWidth = this.resizeStart.width - deltaX;
            newHeight = this.resizeStart.height - deltaY;
            break;
          case "ne":
            newWidth = this.resizeStart.width + deltaX;
            newHeight = this.resizeStart.height - deltaY;
            break;
          case "sw":
            newWidth = this.resizeStart.width - deltaX;
            newHeight = this.resizeStart.height + deltaY;
            break;
          case "se":
            newWidth = this.resizeStart.width + deltaX;
            newHeight = this.resizeStart.height + deltaY;
            break;
          case "n":
            newHeight = this.resizeStart.height - deltaY;
            break;
          case "s":
            newHeight = this.resizeStart.height + deltaY;
            break;
          case "w":
            newWidth = this.resizeStart.width - deltaX;
            break;
          case "e":
            newWidth = this.resizeStart.width + deltaX;
            break;
        }
        newWidth = Math.max(this.minWidth, Math.min(this.maxWidth, newWidth));
        newHeight = Math.max(this.minHeight, Math.min(this.maxHeight, newHeight));
        if (this.keepAspectRatio) {
          const aspectRatio = this.resizeStart.width / this.resizeStart.height;
          if (this.resizeHandle.includes("w") || this.resizeHandle.includes("e")) {
            newHeight = newWidth / aspectRatio;
          } else {
            newWidth = newHeight * aspectRatio;
          }
        }
        this.style.width = `${newWidth}px`;
        this.style.height = `${newHeight}px`;
        this.dispatchEvent(new CustomEvent("resize", {
          detail: {
            width: newWidth,
            height: newHeight,
            handle: this.resizeHandle
          },
          bubbles: true,
          composed: true
        }));
        if (this.instance) {
          this.instance.updateNode(this.id, {
            width: newWidth,
            height: newHeight,
            measured: { width: newWidth, height: newHeight }
          });
        }
      };
      this.handleResizeEnd = () => {
        if (!this.isResizing) return;
        this.isResizing = false;
        this.dispatchEvent(new CustomEvent("resize-end", {
          detail: {
            width: this.offsetWidth,
            height: this.offsetHeight
          },
          bubbles: true,
          composed: true
        }));
        if (this.instance) {
          this.instance.updateNode(this.id, {
            width: this.offsetWidth,
            height: this.offsetHeight,
            measured: { width: this.offsetWidth, height: this.offsetHeight }
          });
        }
      };
      this.handleGlobalClick = (e) => {
        const target = e.target;
        const isNodeClick = target.closest(this.tagName.toLowerCase()) !== null;
        if (!isNodeClick) {
          if (this.selected) {
            this.selected = false;
            if (this.instance) {
              this.instance.updateNode(this.id, { selected: false });
            }
            this.dispatchEvent(new CustomEvent("node-deselect", {
              detail: {
                nodeId: this.id,
                selected: false,
                node: {
                  id: this.id,
                  data: this.data,
                  position: this.position,
                  selected: false
                }
              },
              bubbles: true,
              composed: true
            }));
          }
        }
      };
      this.handleResizeHandleClick = (handle) => {
        return (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          this.handleResizeStart(e, handle);
        };
      };
    }
    static get styles() {
      return [css`
      :host {
        position: absolute;
        cursor: var(--node-cursor, grab);
        user-select: none;
        transform-origin: 0 0;
        will-change: transform;
        pointer-events: auto;
        border: var(--node-border, 1px solid #ddd);
        border-radius: var(--node-border-radius, 8px);
        background: var(--node-background, white);
        box-shadow: var(--node-shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
        transition: var(--node-transition, box-shadow 0.2s);
      }

      /* When drag_handle_selector is set, default cursor is normal (not grab) */
      :host([data-drag-handle-selector]) {
        cursor: default;
      }

      :host(:hover) {
        box-shadow: var(--node-hover-shadow, 0 4px 6px rgba(0, 0, 0, 0.15));
      }

      :host([dragging]) {
        cursor: var(--node-dragging-cursor, grabbing);
        box-shadow: var(--node-dragging-shadow, 0 8px 16px rgba(0, 0, 0, 0.25));
      }

      :host([selected]) {
        border-color: var(--node-selected-border, #1a73e8);
        box-shadow: var(--node-selected-shadow, 0 0 0 2px rgba(26, 115, 232, 0.3));
      }

      /* Resizer styles - matching existing components */
      .resize-border {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: var(--resize-border-style, 1px dashed var(--node-selected-border, #1a73e8));
        border-radius: var(--node-border-radius, 8px);
        opacity: var(--resize-border-opacity, 0);
        pointer-events: none;
        transition: var(--resize-transition, opacity 0.2s ease);
      }

      :host([selected]) .resize-border {
        opacity: var(--resize-border-opacity-selected, 1);
      }

      .resize-handle {
        position: absolute;
        background: var(--resize-handle-background, var(--node-selected-border, #1a73e8));
        border: var(--resize-handle-border, 2px solid #fff);
        border-radius: var(--resize-handle-border-radius, 2px);
        width: var(--resize-handle-size, 12px);
        height: var(--resize-handle-size, 12px);
        opacity: var(--resize-handle-opacity, 0);
        transition: var(--resize-transition, opacity 0.2s ease);
        pointer-events: auto;
        box-shadow: var(--resize-handle-shadow, 0 2px 4px rgba(0, 0, 0, 0.2));
        z-index: 10;
      }

      .resize-handle:hover {
        opacity: var(--resize-handle-opacity-hover, 1);
      }

      :host([selected]) .resize-handle {
        opacity: var(--resize-handle-opacity-selected, 1);
      }

      .resize-handle.nw {
        top: var(--resize-handle-offset, -8px);
        left: var(--resize-handle-offset, -8px);
        cursor: nw-resize;
      }

      .resize-handle.ne {
        top: var(--resize-handle-offset, -8px);
        right: var(--resize-handle-offset, -8px);
        cursor: ne-resize;
      }

      .resize-handle.sw {
        bottom: var(--resize-handle-offset, -8px);
        left: var(--resize-handle-offset, -8px);
        cursor: sw-resize;
      }

      .resize-handle.se {
        bottom: var(--resize-handle-offset, -8px);
        right: var(--resize-handle-offset, -8px);
        cursor: se-resize;
      }

      .resize-handle.n {
        top: var(--resize-handle-offset, -8px);
        left: 50%;
        transform: translateX(-50%);
        cursor: n-resize;
      }

      .resize-handle.s {
        bottom: var(--resize-handle-offset, -8px);
        left: 50%;
        transform: translateX(-50%);
        cursor: s-resize;
      }

      .resize-handle.w {
        top: 50%;
        left: var(--resize-handle-offset, -8px);
        transform: translateY(-50%);
        cursor: w-resize;
      }

      .resize-handle.e {
        top: 50%;
        right: var(--resize-handle-offset, -8px);
        transform: translateY(-50%);
        cursor: e-resize;
      }
      `];
    }
    connectedCallback() {
      super.connectedCallback();
      if (this.draggable && !this.drag_handle_selector) {
        this.addEventListener("mousedown", this.handleMouseDown);
      }
      this.addEventListener("click", this.handleClick);
      this.addEventListener("wheel", this.handleWheel, { passive: false });
      document.addEventListener("click", this.handleGlobalClick);
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("mousedown", this.handleMouseDown);
      this.removeEventListener("click", this.handleClick);
      this.removeEventListener("wheel", this.handleWheel);
      document.removeEventListener("click", this.handleGlobalClick);
      this.removeDragHandleListener();
      this.cleanup();
    }
    /**
     * Find the nearest scrollable parent element
     */
    findScrollableElement(element) {
      if (!element || !(element instanceof HTMLElement)) return null;
      if (element.classList.contains("nowheel")) {
        return element;
      }
      const style = window.getComputedStyle(element);
      const overflow = style.overflow + style.overflowX + style.overflowY;
      if (overflow.includes("auto") || overflow.includes("scroll")) {
        if (element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth) {
          return element;
        }
      }
      const parent = element.parentElement;
      if (parent && (parent === this || this.shadowRoot?.contains(parent))) {
        return this.findScrollableElement(parent);
      }
      return null;
    }
    cleanup() {
      document.removeEventListener("mousemove", this.handleMouseMove);
      document.removeEventListener("mouseup", this.handleMouseUp);
    }
    /**
     * Renders the resizer handles and border when the node is resizable and selected
     * This is now called automatically by the mixin's render method
     */
    renderResizer() {
      if (!this.resizable || !this.selected) {
        return html$1``;
      }
      return html$1`
        <div class="resize-border"></div>
        <div class="resize-handle nw" @mousedown=${this.handleResizeHandleClick("nw")}></div>
        <div class="resize-handle ne" @mousedown=${this.handleResizeHandleClick("ne")}></div>
        <div class="resize-handle sw" @mousedown=${this.handleResizeHandleClick("sw")}></div>
        <div class="resize-handle se" @mousedown=${this.handleResizeHandleClick("se")}></div>
        <div class="resize-handle n" @mousedown=${this.handleResizeHandleClick("n")}></div>
        <div class="resize-handle s" @mousedown=${this.handleResizeHandleClick("s")}></div>
        <div class="resize-handle w" @mousedown=${this.handleResizeHandleClick("w")}></div>
        <div class="resize-handle e" @mousedown=${this.handleResizeHandleClick("e")}></div>
      `;
    }
    /**
     * Helper method to get just the resizer HTML
     * Use this in components that override render() method
     */
    getResizer() {
      return this.renderResizer();
    }
    /**
     * Automatically append resizer to DOM after rendering
     * This works even when components override render() method
     */
    firstUpdated() {
      this.appendResizerToDOM();
      if (this.drag_handle_selector) {
        this.setAttribute("data-drag-handle-selector", "");
      }
      Promise.resolve().then(() => {
        this.attachDragHandleListener();
        this.adjustHeightToContent();
      });
    }
    updated(changedProperties) {
      super.updated(changedProperties);
      this.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
      if (changedProperties.has("maxInitialHeight") && !this.isResizing) {
        Promise.resolve().then(() => {
          this.adjustHeightToContent();
        });
      }
      if (changedProperties.has("resizable") || changedProperties.has("selected")) {
        this.appendResizerToDOM();
      }
      if (changedProperties.has("drag_handle_selector") || changedProperties.has("draggable")) {
        Promise.resolve().then(() => {
          this.attachDragHandleListener();
        });
      }
      if (changedProperties.has("drag_handle_selector")) {
        if (this.drag_handle_selector) {
          this.setAttribute("data-drag-handle-selector", "");
        } else {
          this.removeAttribute("data-drag-handle-selector");
        }
      }
    }
    appendResizerToDOM() {
      this.removeExistingResizer();
      if (this.resizable && this.selected) {
        const resizerTemplate = this.renderResizer();
        if (resizerTemplate) {
          const resizerContainer = document.createElement("div");
          resizerContainer.className = "mixin-resizer-container";
          resizerContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 10;
          `;
          this.shadowRoot?.appendChild(resizerContainer);
          render(resizerTemplate, resizerContainer);
        }
      }
    }
    removeExistingResizer() {
      const existingResizer = this.shadowRoot?.querySelector(".mixin-resizer-container");
      if (existingResizer) {
        existingResizer.remove();
      }
    }
    /**
     * Attach mousedown listener to the drag handle element if drag_handle_selector is set
     */
    attachDragHandleListener() {
      this.removeDragHandleListener();
      if (!this.draggable || !this.drag_handle_selector) {
        return;
      }
      const shadowRoot = this.shadowRoot;
      if (!shadowRoot) {
        setTimeout(() => this.attachDragHandleListener(), 0);
        return;
      }
      const dragHandleElement = shadowRoot.querySelector(this.drag_handle_selector);
      if (dragHandleElement) {
        this.dragHandleElement = dragHandleElement;
        dragHandleElement.addEventListener("mousedown", this.handleMouseDown);
        dragHandleElement.style.cursor = "grab";
      }
    }
    /**
     * Remove mousedown listener from the drag handle element
     */
    removeDragHandleListener() {
      if (this.dragHandleElement) {
        this.dragHandleElement.removeEventListener("mousedown", this.handleMouseDown);
        this.dragHandleElement.style.cursor = "";
        this.dragHandleElement = null;
      }
    }
    /**
     * Adjusts node height to fit content up to maxInitialHeight
     * If maxInitialHeight is 0, this method does nothing
     * If content height > maxInitialHeight: sets height to maxInitialHeight (content will scroll)
     * If content height <= maxInitialHeight: doesn't set height (lets it fit to content)
     * Called automatically in firstUpdated, but can be called manually after content loads
     */
    adjustHeightToContent() {
      if (this.maxInitialHeight <= 0) return;
      if (!this.instance || !this.id || this.isResizing) return;
      const originalHeight = this.style.height;
      this.style.height = "auto";
      this.offsetHeight;
      const contentHeight = this.scrollHeight || this.getBoundingClientRect().height;
      if (contentHeight > this.maxInitialHeight) {
        this.style.height = `${this.maxInitialHeight}px`;
        this.instance.updateNode(this.id, {
          height: this.maxInitialHeight,
          measured: {
            width: this.offsetWidth || this.getBoundingClientRect().width,
            height: this.maxInitialHeight
          }
        });
      } else {
        if (originalHeight) {
          this.style.height = originalHeight;
        } else {
          this.style.height = "";
        }
        if (contentHeight > 0) {
          this.instance.updateNode(this.id, {
            height: contentHeight,
            measured: {
              width: this.offsetWidth || this.getBoundingClientRect().width,
              height: contentHeight
            }
          });
        }
      }
    }
    /**
     * Notifies the flow instance that handles have been dynamically added/updated
     * Call this after using Lit's render() to add handles dynamically (e.g., after API data loads)
     * 
     * This method:
     * 1. Waits for DOM update to complete
     * 2. Updates node dimensions to trigger handle position recalculation
     * 3. Dispatches a custom event for flow canvas to listen to
     * 
     * @example
     * ```typescript
     * async loadFields() {
     *   const fields = await fetchFields();
     *   const container = this.shadowRoot.querySelector('.fields-container');
     *   render(fieldsTemplate, container);
     *   
     *   // Notify flow instance after handles are rendered
     *   this.notifyHandlesUpdated();
     * }
     * ```
     */
    async notifyHandlesUpdated(options) {
      const { handleIds, updateDimensions = true } = options || {};
      await this.updateComplete;
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (this.instance && this.id) {
        if (updateDimensions) {
          const rect = this.getBoundingClientRect();
          const currentWidth = rect.width;
          const currentHeight = rect.height;
          this.instance.updateNode(this.id, {
            width: currentWidth,
            height: currentHeight,
            measured: { width: currentWidth, height: currentHeight }
          });
        }
        this.dispatchEvent(new CustomEvent("node-handles-updated", {
          detail: {
            nodeId: this.id,
            handleIds: handleIds || [],
            timestamp: Date.now()
          },
          bubbles: true,
          composed: true
        }));
      }
    }
  }
  __decorateClass([
    property({ type: String, reflect: true })
  ], NodeMixinClass.prototype, "id");
  __decorateClass([
    property({ type: Object })
  ], NodeMixinClass.prototype, "position");
  __decorateClass([
    property({ type: Object })
  ], NodeMixinClass.prototype, "data");
  __decorateClass([
    property({ type: Boolean, reflect: true })
  ], NodeMixinClass.prototype, "selected");
  __decorateClass([
    property({ type: Boolean, reflect: true })
  ], NodeMixinClass.prototype, "dragging");
  __decorateClass([
    property({ type: Object })
  ], NodeMixinClass.prototype, "instance");
  __decorateClass([
    property({ type: Boolean })
  ], NodeMixinClass.prototype, "resizable");
  __decorateClass([
    property({ type: Boolean })
  ], NodeMixinClass.prototype, "draggable");
  __decorateClass([
    property({ type: String })
  ], NodeMixinClass.prototype, "drag_handle_selector");
  __decorateClass([
    property({ type: Boolean })
  ], NodeMixinClass.prototype, "connectable");
  __decorateClass([
    property({ type: Number })
  ], NodeMixinClass.prototype, "minWidth");
  __decorateClass([
    property({ type: Number })
  ], NodeMixinClass.prototype, "maxWidth");
  __decorateClass([
    property({ type: Number })
  ], NodeMixinClass.prototype, "minHeight");
  __decorateClass([
    property({ type: Number })
  ], NodeMixinClass.prototype, "maxHeight");
  __decorateClass([
    property({ type: Boolean })
  ], NodeMixinClass.prototype, "keepAspectRatio");
  __decorateClass([
    property({ type: Number })
  ], NodeMixinClass.prototype, "maxInitialHeight");
  return NodeMixinClass;
};
export {
  BaseNode,
  BaseNodeContent,
  BaseNodeFooter,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
  ERDTableNode,
  FlowBackground,
  FlowCanvas,
  FlowControls,
  FlowEdge,
  FlowInstance,
  FlowMinimap,
  FlowNode,
  NodeMixin,
  NodeResizer,
  Position2 as Position,
  ShapeNode,
  ShapeRegistry,
  createStore,
  getBezierPath,
  getCenter,
  getDistance,
  getSmoothStepPath,
  getStraightPath,
  isPointInRect
};
//# sourceMappingURL=lit-flow.js.map
