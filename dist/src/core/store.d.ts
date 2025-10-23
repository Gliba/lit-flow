/**
 * Store utilities for managing flow state
 * Placeholder for future state management integration with @xyflow/system
 */
import type { FlowState } from './types';
export declare function createStore(initialState?: Partial<FlowState>): {
    getState: () => FlowState;
    setState: (updates: Partial<FlowState>) => void;
    subscribe: (listener: (state: FlowState) => void) => () => boolean;
};
//# sourceMappingURL=store.d.ts.map