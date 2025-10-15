/**
 * Core type definitions for lit-flow
 * These types extend @xyflow/system types for Lit integration
 */

import type { 
  NodeBase, 
  EdgeBase, 
  XYPosition as SystemXYPosition,
  Viewport as SystemViewport,
  InternalNodeBase
} from '@xyflow/system';

// Re-export system types
export type XYPosition = SystemXYPosition;
export type Viewport = SystemViewport;

// Lit-specific node type (extends system NodeBase)
export type Node<
  NodeData extends Record<string, unknown> = Record<string, unknown>,
  NodeType extends string | undefined = string | undefined
> = NodeBase<NodeData, NodeType> & {
  type?: string; // 'default', 'shape', 'erd-table', 'custom', etc.
};

// Lit-specific edge type (extends system EdgeBase)
export type MarkerOrient = 'auto' | 'auto-start-reverse';

export type MarkerBuiltin = 'Arrow' | 'ArrowClosed';

export type MarkerSpec =
  | { type: MarkerBuiltin; width?: number; height?: number; color?: string; orient?: MarkerOrient }
  | { type: 'custom'; id?: string; path: string; refX?: number; refY?: number; width?: number; height?: number; color?: string; orient?: MarkerOrient };

export type EdgeType = 'default' | 'straight' | 'step' | 'smoothstep' | 'simplebezier';

export type Edge<
  EdgeData extends Record<string, unknown> = Record<string, unknown>,
  EdgeType extends string | undefined = string | undefined
> = EdgeBase<EdgeData, EdgeType> & {
  sourceHandle?: string;  // Specific handle ID on source node
  targetHandle?: string;  // Specific handle ID on target node
  markerStart?: MarkerSpec | string;
  markerEnd?: MarkerSpec | string;
  type?: EdgeType;  // Edge type: 'default', 'straight', 'step', 'smoothstep', 'simplebezier'
};

export type InternalNode<T extends NodeBase = NodeBase> = InternalNodeBase<T>;

export interface FlowOptions {
  nodes?: Node[];
  edges?: Edge[];
  fitView?: boolean;
  minZoom?: number;
  maxZoom?: number;
  defaultZoom?: number;
  snapToGrid?: boolean;
  snapGrid?: [number, number];
  nodesDraggable?: boolean;
  nodesConnectable?: boolean;
  elementsSelectable?: boolean;
}

export interface FlowState {
  nodes: Node[];
  edges: Edge[];
  viewport: Viewport;
  nodeLookup: Map<string, InternalNode>;
  edgeLookup: Map<string, Edge>;
}

export interface Transform {
  x: number;
  y: number;
  zoom: number;
}

export type NodeChange = 
  | { type: 'position'; id: string; position: XYPosition }
  | { type: 'dimensions'; id: string; dimensions: { width: number; height: number } }
  | { type: 'select'; id: string; selected: boolean }
  | { type: 'remove'; id: string }
  | { type: 'add'; item: Node };

export type EdgeChange =
  | { type: 'select'; id: string; selected: boolean }
  | { type: 'remove'; id: string }
  | { type: 'add'; item: Edge };

// Selection event types
export interface NodeSelectEventDetail {
  nodeId: string;
  selected: boolean;
  node: Node;
  allSelectedNodes?: Node[];
}

export interface EdgeSelectEventDetail {
  edgeId: string;
  selected: boolean;
  edge: Edge;
  allSelectedEdges?: Edge[];
}

export interface NodeSelectEvent extends CustomEvent<NodeSelectEventDetail> {}
export interface EdgeSelectEvent extends CustomEvent<EdgeSelectEventDetail> {}

// Handle event types
export interface HandleStartEventDetail {
  nodeId: string;
  type: 'source' | 'target';
  handleId?: string;
  fieldName?: string;
}

export interface HandleStartEvent extends CustomEvent<HandleStartEventDetail> {}

