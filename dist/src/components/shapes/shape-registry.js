/**
 * Shape Registry - Centralized shape definitions and management
 */
import { basicShapes } from './shapes/basic-shapes';
import { geometricShapes } from './shapes/geometric-shapes';
import { symbolicShapes } from './shapes/symbolic-shapes';
export class ShapeRegistry {
    static { this.shapes = new Map(); }
    /**
     * Initialize the registry with default shapes
     */
    static initialize() {
        // Register all default shapes
        const allShapes = [...basicShapes, ...geometricShapes, ...symbolicShapes];
        allShapes.forEach(shape => {
            this.shapes.set(shape.type, shape);
        });
    }
    /**
     * Register a new shape definition
     */
    static register(definition) {
        this.shapes.set(definition.type, definition);
    }
    /**
     * Get a shape definition by type
     */
    static get(shapeType) {
        return this.shapes.get(shapeType);
    }
    /**
     * Get all registered shapes
     */
    static getAll() {
        return Array.from(this.shapes.values());
    }
    /**
     * Get shapes by category
     */
    static getByCategory(category) {
        return Array.from(this.shapes.values()).filter(shape => shape.category === category);
    }
    /**
     * Check if a shape type is registered
     */
    static has(shapeType) {
        return this.shapes.has(shapeType);
    }
    /**
     * Get all available shape types
     */
    static getShapeTypes() {
        return Array.from(this.shapes.keys());
    }
    /**
     * Clear all registered shapes
     */
    static clear() {
        this.shapes.clear();
    }
    /**
     * Get shape count
     */
    static getCount() {
        return this.shapes.size;
    }
}
// Initialize the registry when the module is loaded
ShapeRegistry.initialize();
//# sourceMappingURL=shape-registry.js.map