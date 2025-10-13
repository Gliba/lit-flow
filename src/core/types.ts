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
> = NodeBase<NodeData, NodeType>;

// Lit-specific edge type (extends system EdgeBase)
export type Edge<
  EdgeData extends Record<string, unknown> = Record<string, unknown>,
  EdgeType extends string | undefined = string | undefined
> = EdgeBase<EdgeData, EdgeType>;

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

