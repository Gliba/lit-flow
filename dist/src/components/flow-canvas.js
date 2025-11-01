/**
 * FlowCanvas - Main container component for the flow diagram
 * This is the root element that manages the viewport and renders nodes/edges
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { FlowInstance } from '../core/flow-instance';
import { getBezierPath, Position } from '../utils/geometry';
let FlowCanvas = class FlowCanvas extends LitElement {
    createRenderRoot() {
        return super.createRenderRoot();
    }
    static { this.styles = css `
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
  `; }
    getNodeGeom(nodeId) {
        const el = this.renderRoot.querySelector(`flow-node[id="${CSS.escape(nodeId)}"]`);
        const viewportEl = this.renderRoot.querySelector('.flow-viewport');
        if (!el || !viewportEl)
            return null;
        const rect = el.getBoundingClientRect();
        const vpRect = viewportEl.getBoundingClientRect();
        const z = this.viewport.zoom || 1;
        const x = (rect.left - vpRect.left - this.viewport.x) / z;
        const y = (rect.top - vpRect.top - this.viewport.y) / z;
        const w = rect.width / z;
        const h = rect.height / z;
        const cy = y + h / 2;
        return { left: { x: x, y: cy }, right: { x: x + w, y: cy } };
    }
    /**
     * Get handle position in canvas coordinates
     */
    getHandleCanvasPosition(nodeId, handleId) {
        const nodeEl = this.renderRoot.querySelector(`[id="${CSS.escape(nodeId)}"]`);
        if (!nodeEl)
            return null;
        // Find handle element in shadow root or light DOM
        let handleEl = null;
        const shadowRoot = nodeEl.shadowRoot;
        if (shadowRoot) {
            handleEl = shadowRoot.querySelector(`[data-handle-id="${CSS.escape(handleId)}"]`);
        }
        if (!handleEl) {
            handleEl = nodeEl.querySelector(`[data-handle-id="${CSS.escape(handleId)}"]`);
        }
        if (!handleEl)
            return null;
        // Get node data
        const node = this.nodes.find(n => n.id === nodeId);
        if (!node)
            return null;
        // For shape nodes, calculate handle position based on shape size and handle type
        if (node.type === 'shape') {
            console.log('getHandleCanvasPosition for shape node:', { nodeId, handleId, node });
            return this.getShapeHandlePosition(node, handleId);
        }
        // For regular nodes, use the existing method
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
        if (!shapeData)
            return null;
        const size = shapeData.size || { width: 200, height: 200 };
        const width = size.width;
        const height = size.height;
        // Parse handle ID to determine position
        // Handle IDs are like: "shape-1-source-right", "shape-1-target-left", etc.
        const parts = handleId.split('-');
        const handleType = parts[parts.length - 1]; // Get last part (right, left, top, bottom)
        console.log('getShapeHandlePosition:', { handleId, parts, handleType, node: node.id, size });
        let offsetX = 0;
        let offsetY = 0;
        switch (handleType) {
            case 'right':
                offsetX = width;
                offsetY = height / 2;
                break;
            case 'left':
                offsetX = 0;
                offsetY = height / 2;
                break;
            case 'top':
                offsetX = width / 2;
                offsetY = 0;
                break;
            case 'bottom':
                offsetX = width / 2;
                offsetY = height;
                break;
            default:
                // Fallback to center
                offsetX = width / 2;
                offsetY = height / 2;
        }
        const result = {
            x: node.position.x + offsetX,
            y: node.position.y + offsetY
        };
        console.log('getShapeHandlePosition result:', {
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
        const sourceNode = this.nodes.find(n => n.id === sourceNodeId);
        const targetNode = this.nodes.find(n => n.id === targetNodeId);
        if (!sourceNode || !targetNode)
            return `${targetNodeId}-target-left`;
        // Calculate relative positions
        const sourceX = sourceNode.position.x;
        const sourceY = sourceNode.position.y;
        const targetX = targetNode.position.x;
        const targetY = targetNode.position.y;
        // Get target node dimensions
        const targetData = targetNode.data;
        const targetWidth = targetData?.size?.width || 200;
        const targetHeight = targetData?.size?.height || 200;
        // Calculate center positions
        const sourceCenterX = sourceX + (sourceNode.width || 150) / 2;
        const sourceCenterY = sourceY + (sourceNode.height || 50) / 2;
        const targetCenterX = targetX + targetWidth / 2;
        const targetCenterY = targetY + targetHeight / 2;
        // Determine connection direction
        const deltaX = targetCenterX - sourceCenterX;
        const deltaY = targetCenterY - sourceCenterY;
        // Choose target handle based on direction
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal connection
            return deltaX > 0 ? `${targetNodeId}-target-left` : `${targetNodeId}-target-right`;
        }
        else {
            // Vertical connection
            return deltaY > 0 ? `${targetNodeId}-target-top` : `${targetNodeId}-target-bottom`;
        }
    }
    computeLabelCanvasPosition(edge) {
        const sourceNode = this.nodes.find(n => n.id === edge.source);
        const targetNode = this.nodes.find(n => n.id === edge.target);
        if (!sourceNode || !targetNode)
            return null;
        // Try to use specific handle positions if available
        let sourceX, sourceY;
        let targetX, targetY;
        if (edge.sourceHandle) {
            const handlePos = this.getHandleCanvasPosition(edge.source, edge.sourceHandle);
            if (handlePos) {
                sourceX = handlePos.x;
                sourceY = handlePos.y;
            }
            else {
                // Fallback to node edge
                const sourceWidth = sourceNode.measured?.width || sourceNode.width || 150;
                const sourceHeight = sourceNode.measured?.height || sourceNode.height || 50;
                sourceX = sourceNode.position.x + sourceWidth;
                sourceY = sourceNode.position.y + sourceHeight / 2;
            }
        }
        else {
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
            }
            else {
                // Fallback to node edge
                targetX = targetNode.position.x;
                const targetHeight = targetNode.measured?.height || targetNode.height || 50;
                targetY = targetNode.position.y + targetHeight / 2;
            }
        }
        else {
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
            targetPosition: Position.Left,
        });
        return { x: labelX, y: labelY };
    }
    computeStartLabelCanvasPosition(edge) {
        const sourceNode = this.nodes.find(n => n.id === edge.source);
        if (!sourceNode)
            return null;
        let sourceX, sourceY;
        if (edge.sourceHandle) {
            const handlePos = this.getHandleCanvasPosition(edge.source, edge.sourceHandle);
            if (handlePos) {
                sourceX = handlePos.x;
                sourceY = handlePos.y;
            }
            else {
                const sourceWidth = sourceNode.measured?.width || sourceNode.width || 150;
                const sourceHeight = sourceNode.measured?.height || sourceNode.height || 50;
                sourceX = sourceNode.position.x + sourceWidth;
                sourceY = sourceNode.position.y + sourceHeight / 2;
            }
        }
        else {
            const sourceWidth = sourceNode.measured?.width || sourceNode.width || 150;
            const sourceHeight = sourceNode.measured?.height || sourceNode.height || 50;
            sourceX = sourceNode.position.x + sourceWidth;
            sourceY = sourceNode.position.y + sourceHeight / 2;
        }
        return { x: sourceX + 12, y: sourceY - 10 };
    }
    computeEndLabelCanvasPosition(edge) {
        const targetNode = this.nodes.find(n => n.id === edge.target);
        if (!targetNode)
            return null;
        let targetX, targetY;
        if (edge.targetHandle) {
            const handlePos = this.getHandleCanvasPosition(edge.target, edge.targetHandle);
            if (handlePos) {
                targetX = handlePos.x;
                targetY = handlePos.y;
            }
            else {
                const targetHeight = targetNode.measured?.height || targetNode.height || 50;
                targetX = targetNode.position.x;
                targetY = targetNode.position.y + targetHeight / 2;
            }
        }
        else {
            const targetHeight = targetNode.measured?.height || targetNode.height || 50;
            targetX = targetNode.position.x;
            targetY = targetNode.position.y + targetHeight / 2;
        }
        return { x: targetX - 12, y: targetY - 10 };
    }
    constructor() {
        super();
        this.nodes = [];
        this.edges = [];
        this.viewport = { x: 0, y: 0, zoom: 1 };
        // Node type registry (maps type name to tag name)
        this.nodeTypes = {
            'default': 'flow-node',
            'shape': 'shape-node',
            'erd-table': 'erd-table-node'
        };
        this.connection = null;
        this.onHandleStart = (e) => {
            const { nodeId, type, handleId } = e.detail;
            // Always start a connection FROM this handle, regardless of its type
            // The handle type will be determined by the connection direction
            this.connection = { from: { nodeId, handleId } };
        };
        this.onMouseMove = (e) => {
            if (!this.connection)
                return;
            const p = this.screenToCanvas(e.clientX, e.clientY);
            this.connection.preview = p;
            this.requestUpdate();
        };
        this.onMouseUp = (e) => {
            if (!this.connection)
                return;
            const path = e.composedPath();
            let targetEl = null;
            let targetHandleId;
            // Find target node element (can be flow-node or any custom node type)
            for (const t of path) {
                if (t instanceof HTMLElement) {
                    const tagName = t.tagName.toLowerCase();
                    // Check if it's a node element (flow-node or any registered custom node type)
                    if (tagName === 'flow-node' || Object.values(this.nodeTypes).some(tag => tag === tagName)) {
                        targetEl = t;
                        break;
                    }
                    // Check if it's a handle element
                    if (t.dataset.handleId) {
                        targetHandleId = t.dataset.handleId;
                    }
                }
            }
            const targetId = targetEl?.getAttribute('id') || undefined;
            // Handle connection completion - always from a source handle to a target handle
            if (this.connection.from && targetId && targetId !== this.connection.from.nodeId) {
                const newEdgeId = `e-${this.connection.from.nodeId}-${targetId}-${Date.now()}`;
                const sourceNodeId = this.connection.from.nodeId;
                const sourceHandleId = this.connection.from.handleId;
                // If no target handle was found, determine the best target handle for shape nodes
                let finalTargetHandleId = targetHandleId;
                if (!finalTargetHandleId) {
                    const targetNode = this.nodes.find(n => n.id === targetId);
                    if (targetNode && targetNode.type === 'shape') {
                        finalTargetHandleId = this.determineBestTargetHandle(sourceNodeId, targetId);
                        console.log('Auto-determined target handle:', { sourceNodeId, targetId, finalTargetHandleId });
                    }
                }
                // Use the instance method which handles retry logic automatically
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
        this.onNodeSelect = (e) => {
            const { nodeId, selected, node } = e.detail;
            // Update the node selection state in the instance
            this.instance.updateNode(nodeId, { selected });
            // Dispatch a higher-level selection event from flow-canvas
            this.dispatchEvent(new CustomEvent('node-selected', {
                detail: {
                    nodeId,
                    selected,
                    node,
                    allSelectedNodes: this.nodes.filter(n => n.selected)
                },
                bubbles: true,
                composed: true
            }));
        };
        this.onEdgeSelect = (e) => {
            const { edgeId, selected, edge } = e.detail;
            // Update the edge selection state in the instance
            this.instance.updateEdge(edgeId, { selected });
            // Dispatch a higher-level selection event from flow-canvas
            this.dispatchEvent(new CustomEvent('edge-selected', {
                detail: {
                    edgeId,
                    selected,
                    edge,
                    allSelectedEdges: this.edges.filter(e => e.selected)
                },
                bubbles: true,
                composed: true
            }));
        };
        this.instance = new FlowInstance({ nodes: this.nodes, edges: this.edges });
    }
    firstUpdated() {
        const container = this.renderRoot.querySelector('.flow-container');
        if (container) {
            this.instance.mount(container);
            this.unsubscribe = this.instance.subscribe((state) => {
                this.nodes = state.nodes;
                this.edges = state.edges;
                this.viewport = state.viewport;
                this.requestUpdate();
            });
            container.addEventListener('mousemove', this.onMouseMove);
            window.addEventListener('mouseup', this.onMouseUp);
            // Add selection event listeners
            container.addEventListener('node-select', this.onNodeSelect);
            // Edge events come from light DOM, so listen on document
            document.addEventListener('edge-select', this.onEdgeSelect);
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.unsubscribe?.();
        this.instance.destroy();
        const container = this.renderRoot.querySelector('.flow-container');
        container?.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);
        container?.removeEventListener('node-select', this.onNodeSelect);
        document.removeEventListener('edge-select', this.onEdgeSelect);
    }
    /**
     * Renders a node with dynamic tag name based on node type
     * Falls back to 'flow-node' if type is not registered
     */
    renderNode(node) {
        // Get the tag name for this node type, or use default 'flow-node'
        const nodeType = node.type || 'default';
        const tagName = this.nodeTypes[nodeType] || 'flow-node';
        // Use lit-html's unsafeStatic to render dynamic tag names
        const tag = unsafeStatic(tagName);
        return html `
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
        return html `
      <div class="flow-container">
        <slot name="background"></slot>
        <div 
          class="flow-viewport" 
          style=${styleMap({ transform })}
        >
          <div class="flow-edges-layer">
            ${this.edges.map(edge => {
            const sourceNode = this.nodes.find(n => n.id === edge.source);
            const targetNode = this.nodes.find(n => n.id === edge.target);
            if (!sourceNode || !targetNode)
                return null;
            return html `
                <flow-edge 
                  .id=${edge.id}
                  .source=${edge.source}
                  .target=${edge.target}
                  .sourceHandle=${edge.sourceHandle}
                  .targetHandle=${edge.targetHandle}
                  .sourceNode=${sourceNode}
                  .targetNode=${targetNode}
                  .animated=${edge.animated || false}
                  .label=${edge.label || ''}
                  .type=${edge.type || 'default'}
                  .markerStart=${edge.markerStart}
                  .markerEnd=${edge.markerEnd}
                ></flow-edge>
              `;
        })}
            ${this.renderPreviewEdge()}
          </div>
          <div class="flow-nodes-layer">
            ${this.nodes.map(node => this.renderNode(node))}
          </div>
          <div class="flow-labels-overlay">
            ${this.edges.map(edge => {
            const labelHtml = (edge.data && edge.data.labelHtml);
            const labelText = (edge.data && edge.data.label);
            const hasCenter = !!labelHtml || !!labelText;
            if (!hasCenter)
                return null;
            const pos = this.computeLabelCanvasPosition(edge);
            if (!pos)
                return null;
            const style = `transform: translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px);`;
            return labelHtml
                ? html `<div class="edge-label" style="${style}" .innerHTML=${labelHtml}></div>`
                : html `<div class="edge-label" style="${style}">${labelText}</div>`;
        })}
            ${this.edges.map(edge => {
            const startHtml = (edge.data && edge.data.startLabelHtml);
            const startText = (edge.data && edge.data.startLabel);
            if (!startHtml && !startText)
                return null;
            const pos = this.computeStartLabelCanvasPosition(edge);
            if (!pos)
                return null;
            const style = `transform: translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px);`;
            return startHtml
                ? html `<div class="edge-label" style="${style}" .innerHTML=${startHtml}></div>`
                : html `<div class="edge-label" style="${style}">${startText}</div>`;
        })}
            ${this.edges.map(edge => {
            const endHtml = (edge.data && edge.data.endLabelHtml);
            const endText = (edge.data && edge.data.endLabel);
            if (!endHtml && !endText)
                return null;
            const pos = this.computeEndLabelCanvasPosition(edge);
            if (!pos)
                return null;
            const style = `transform: translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px);`;
            return endHtml
                ? html `<div class="edge-label" style="${style}" .innerHTML=${endHtml}></div>`
                : html `<div class="edge-label" style="${style}">${endText}</div>`;
        })}
          </div>
        </div>
        <slot></slot>
      </div>
    `;
    }
    screenToCanvas(x, y) {
        const container = this.renderRoot.querySelector('.flow-container');
        if (!container)
            return { x, y };
        const rect = container.getBoundingClientRect();
        const vx = this.viewport.x;
        const vy = this.viewport.y;
        const z = this.viewport.zoom || 1;
        return { x: (x - rect.left - vx) / z, y: (y - rect.top - vy) / z };
    }
    renderPreviewEdge() {
        if (!this.connection || !this.connection.preview)
            return null;
        const preview = this.connection.preview;
        const nodeFrom = this.connection.from ? this.nodes.find(n => n.id === this.connection.from.nodeId) : null;
        const nodeTo = this.connection.to ? this.nodes.find(n => n.id === this.connection.to.nodeId) : null;
        if (nodeFrom) {
            return html `
        <flow-edge
          .id=${'preview'}
          .source=${nodeFrom.id}
          .target=${'__preview__'}
          .sourceHandle=${this.connection.from?.handleId}
          .sourceNode=${{ ...nodeFrom, position: nodeFrom.position }}
          .targetNode=${{ id: '__preview__', position: { x: preview.x, y: preview.y }, width: 1, height: 1, data: {} }}
          .animated=${true}
          .label=${''}
        ></flow-edge>
      `;
        }
        if (nodeTo) {
            return html `
        <flow-edge
          .id=${'preview'}
          .source=${'__preview__'}
          .target=${nodeTo.id}
          .sourceNode=${{ id: '__preview__', position: { x: preview.x, y: preview.y }, width: 1, height: 1, data: {} }}
          .targetHandle=${this.connection.to?.handleId}
          .targetNode=${{ ...nodeTo, position: nodeTo.position }}
          .animated=${true}
          .label=${''}
        ></flow-edge>
      `;
        }
        return null;
    }
};
__decorate([
    property({ type: Array })
], FlowCanvas.prototype, "nodes", void 0);
__decorate([
    property({ type: Array })
], FlowCanvas.prototype, "edges", void 0);
__decorate([
    property({ type: Object })
], FlowCanvas.prototype, "viewport", void 0);
__decorate([
    property({ type: Object })
], FlowCanvas.prototype, "nodeTypes", void 0);
FlowCanvas = __decorate([
    customElement('flow-canvas')
], FlowCanvas);
export { FlowCanvas };
//# sourceMappingURL=flow-canvas.js.map