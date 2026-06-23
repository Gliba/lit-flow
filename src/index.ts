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
  EdgeType,
  XYPosition,
  FlowOptions,
  FlowState,
  Viewport,
  Transform,
  NodeChange,
  EdgeChange,
  ConnectionStartParams,
  ConnectionEndParams,
  EdgeHoverEventDetail,
  EdgeHoverEvent,
} from './core/types';

export type {
  ShapeType,
  ShapeConfig,
  ShapeDefinition,
  AdvancedShapeConfig,
  ShapeNodeData,
} from './components/shapes/types';

export type { BackgroundVariant } from './components/flow-background';
export type { ERDField, ERDTableData } from './components/ui/erd-table-node';

// Mixin exports
export { NodeMixin, type NodeMixinInterface } from './mixins/node-mixin';

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

/**
 * Build marker. Logged once when the library loads so you can confirm in the
 * browser console exactly which build is deployed. Bump `LIT_FLOW_VERSION` /
 * `LIT_FLOW_BUILD` whenever you ship a new vendored copy.
 */
export const LIT_FLOW_VERSION = '0.4.16';
export const LIT_FLOW_BUILD = 'smooth-load+fitview+render-complete';

try {
  // eslint-disable-next-line no-console
  console.info(
    `%c lit-flow %c v${LIT_FLOW_VERSION} %c ${LIT_FLOW_BUILD} `,
    'background:#1a73e8;color:#fff;border-radius:3px 0 0 3px;padding:2px 4px;font-weight:600',
    'background:#111;color:#fff;padding:2px 4px',
    'background:#e8f0fe;color:#1a73e8;border-radius:0 3px 3px 0;padding:2px 4px',
    '\nfeatures: measurement gate · batched notify · keyed repeat · robust fitView · fitViewOnInit · flow-render-complete · nested-aware notifyHandlesUpdated'
  );
} catch {
  /* no console available */
}

