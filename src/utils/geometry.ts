/**
 * Geometry utilities for calculating positions, paths, and intersections
 * Wraps @xyflow/system utilities for Lit integration
 */

import { 
  getBezierPath as getSystemBezierPath,
  getSmoothStepPath as getSystemSmoothStepPath,
  getStraightPath as getSystemStraightPath,
  Position
} from '@xyflow/system';
import type { XYPosition } from '../core/types';

/**
 * Calculate distance between two points
 */
export function getDistance(a: XYPosition, b: XYPosition): number {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

/**
 * Calculate the center point between two positions
 */
export function getCenter(a: XYPosition, b: XYPosition): XYPosition {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
}

/**
 * Generate a bezier curve path between two points
 * Uses @xyflow/system's getBezierPath utility
 */
export function getBezierPath(params: {
  sourceX: number;
  sourceY: number;
  sourcePosition?: Position;
  targetX: number;
  targetY: number;
  targetPosition?: Position;
  curvature?: number;
}): [path: string, labelX: number, labelY: number, offsetX: number, offsetY: number] {
  return getSystemBezierPath(params);
}

/**
 * Generate a smooth step path between two points
 * Uses @xyflow/system's getSmoothStepPath utility
 */
export function getSmoothStepPath(params: {
  sourceX: number;
  sourceY: number;
  sourcePosition?: Position;
  targetX: number;
  targetY: number;
  targetPosition?: Position;
  borderRadius?: number;
  offset?: number;
}): [path: string, labelX: number, labelY: number, offsetX: number, offsetY: number] {
  return getSystemSmoothStepPath(params);
}

/**
 * Generate a straight line path
 * Uses @xyflow/system's getStraightPath utility
 */
export function getStraightPath(params: {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}): [path: string, labelX: number, labelY: number, offsetX: number, offsetY: number] {
  return getSystemStraightPath(params);
}

/**
 * Check if a point is inside a rectangle
 */
export function isPointInRect(
  point: XYPosition,
  rect: { x: number; y: number; width: number; height: number }
): boolean {
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  );
}

// Re-export Position enum from @xyflow/system
export { Position };

