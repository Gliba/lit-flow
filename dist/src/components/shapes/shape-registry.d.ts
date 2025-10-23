/**
 * Shape Registry - Centralized shape definitions and management
 */
import type { ShapeType, ShapeDefinition } from './types';
export declare class ShapeRegistry {
    private static shapes;
    /**
     * Initialize the registry with default shapes
     */
    static initialize(): void;
    /**
     * Register a new shape definition
     */
    static register(definition: ShapeDefinition): void;
    /**
     * Get a shape definition by type
     */
    static get(shapeType: ShapeType): ShapeDefinition | undefined;
    /**
     * Get all registered shapes
     */
    static getAll(): ShapeDefinition[];
    /**
     * Get shapes by category
     */
    static getByCategory(category: string): ShapeDefinition[];
    /**
     * Check if a shape type is registered
     */
    static has(shapeType: ShapeType): boolean;
    /**
     * Get all available shape types
     */
    static getShapeTypes(): ShapeType[];
    /**
     * Clear all registered shapes
     */
    static clear(): void;
    /**
     * Get shape count
     */
    static getCount(): number;
}
//# sourceMappingURL=shape-registry.d.ts.map