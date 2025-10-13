/**
 * Store utilities for managing flow state
 * Placeholder for future state management integration with @xyflow/system
 */

import type { FlowState, InternalNode, Node, Edge } from './types';

export function createStore(initialState: Partial<FlowState> = {}) {
  const state: FlowState = {
    nodes: initialState.nodes || [],
    edges: initialState.edges || [],
    viewport: initialState.viewport || { x: 0, y: 0, zoom: 1 },
    nodeLookup: new Map(),
    edgeLookup: new Map()
  };

  const listeners = new Set<(state: FlowState) => void>();

  const updateLookups = () => {
    state.nodeLookup.clear();
    state.nodes.forEach((node: Node) => {
      const internalNode: InternalNode = {
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
    state.edges.forEach((edge: Edge) => {
      state.edgeLookup.set(edge.id, edge);
    });
  };

  // initialize lookups based on provided initial state
  updateLookups();

  return {
    getState: () => state,
    setState: (updates: Partial<FlowState>) => {
      Object.assign(state, updates);
      updateLookups();
      listeners.forEach(listener => listener(state));
    },
    subscribe: (listener: (state: FlowState) => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}

