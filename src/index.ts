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
export {
  BaseNode,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
  BaseNodeContent,
  BaseNodeFooter,
} from './components/ui/base-node';

// Type exports
export type {
  Node,
  Edge,
  XYPosition,
  FlowOptions,
  FlowState,
  Viewport,
  Transform,
  NodeChange,
  EdgeChange,
} from './core/types';

export type { BackgroundVariant } from './components/flow-background';
export type { ERDField, ERDTableData } from './components/ui/erd-table-node';

// Utility exports
export {
  getDistance,
  getCenter,
  getBezierPath,
  getSmoothStepPath,
  getStraightPath,
  isPointInRect,
  Position,
} from './utils/geometry';

// Import base styles
import './styles/base.css';

