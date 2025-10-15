/**
 * Shape Registry - Centralized shape definitions and management
 */

import type { ShapeType, ShapeDefinition } from './types';
import { basicShapes } from './shapes/basic-shapes';
import { geometricShapes } from './shapes/geometric-shapes';
import { symbolicShapes } from './shapes/symbolic-shapes';

export class ShapeRegistry {
  private static shapes = new Map<ShapeType, ShapeDefinition>();

  /**
   * Initialize the registry with default shapes
   */
  static initialize(): void {
    // Register all default shapes
    const allShapes = [...basicShapes, ...geometricShapes, ...symbolicShapes];
    allShapes.forEach(shape => {
      this.shapes.set(shape.type, shape);
    });
  }

  /**
   * Register a new shape definition
   */
  static register(definition: ShapeDefinition): void {
    this.shapes.set(definition.type, definition);
  }

  /**
   * Get a shape definition by type
   */
  static get(shapeType: ShapeType): ShapeDefinition | undefined {
    return this.shapes.get(shapeType);
  }

  /**
   * Get all registered shapes
   */
  static getAll(): ShapeDefinition[] {
    return Array.from(this.shapes.values());
  }

  /**
   * Get shapes by category
   */
  static getByCategory(category: string): ShapeDefinition[] {
    return Array.from(this.shapes.values()).filter(shape => shape.category === category);
  }

  /**
   * Check if a shape type is registered
   */
  static has(shapeType: ShapeType): boolean {
    return this.shapes.has(shapeType);
  }

  /**
   * Get all available shape types
   */
  static getShapeTypes(): ShapeType[] {
    return Array.from(this.shapes.keys());
  }

  /**
   * Clear all registered shapes
   */
  static clear(): void {
    this.shapes.clear();
  }

  /**
   * Get shape count
   */
  static getCount(): number {
    return this.shapes.size;
  }
}

// Initialize the registry when the module is loaded
ShapeRegistry.initialize();
