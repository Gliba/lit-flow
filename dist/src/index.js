/**
 * lit-flow - Flow diagram library for Lit built on @xyflow/system
 *
 * @packageDocumentation
 */
// Core exports
export { FlowInstance } from './core/flow-instance';
export { createStore } from './core/store';
// Component exports
export { FlowCanvas } from './components/flow-canvas';
export { FlowNode } from './components/flow-node';
export { FlowEdge } from './components/flow-edge';
export { FlowBackground } from './components/flow-background';
export { FlowMinimap } from './components/flow-minimap';
export { FlowControls } from './components/flow-controls';
export { ERDTableNode } from './components/ui/erd-table-node';
export { ShapeNode } from './components/shapes/shape-node';
export { ShapeRegistry } from './components/shapes/shape-registry';
export { NodeResizer } from './components/node-resizer';
export { BaseNode, BaseNodeHeader, BaseNodeHeaderTitle, BaseNodeContent, BaseNodeFooter, } from './components/ui/base-node';
// Mixin exports
export { NodeMixin } from './mixins/node-mixin';
// Utility exports
export { getDistance, getCenter, getBezierPath, getSmoothStepPath, getStraightPath, isPointInRect, Position, } from './utils/geometry';
// Import base styles
import './styles/base.css';
// Import components to ensure they're registered
import './components/node-resizer';
//# sourceMappingURL=index.js.map