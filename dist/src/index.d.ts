/**
 * lit-flow - Flow diagram library for Lit built on @xyflow/system
 *
 * @packageDocumentation
 */
export { FlowInstance } from './core/flow-instance';
export { createStore } from './core/store';
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
export type { Node, Edge, EdgeType, XYPosition, FlowOptions, FlowState, Viewport, Transform, NodeChange, EdgeChange, } from './core/types';
export type { ShapeType, ShapeConfig, ShapeDefinition, AdvancedShapeConfig, ShapeNodeData, } from './components/shapes/types';
export type { BackgroundVariant } from './components/flow-background';
export type { ERDField, ERDTableData } from './components/ui/erd-table-node';
export { NodeMixin, type NodeMixinInterface } from './mixins/node-mixin';
export { getDistance, getCenter, getBezierPath, getSmoothStepPath, getStraightPath, isPointInRect, Position, } from './utils/geometry';
import './styles/base.css';
import './components/node-resizer';
//# sourceMappingURL=index.d.ts.map