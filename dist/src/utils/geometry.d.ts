/**
 * Geometry utilities for calculating positions, paths, and intersections
 * Wraps @xyflow/system utilities for Lit integration
 */
import { Position } from '@xyflow/system';
import type { XYPosition } from '../core/types';
/**
 * Calculate distance between two points
 */
export declare function getDistance(a: XYPosition, b: XYPosition): number;
/**
 * Calculate the center point between two positions
 */
export declare function getCenter(a: XYPosition, b: XYPosition): XYPosition;
/**
 * Generate a bezier curve path between two points
 * Uses @xyflow/system's getBezierPath utility
 */
export declare function getBezierPath(params: {
    sourceX: number;
    sourceY: number;
    sourcePosition?: Position;
    targetX: number;
    targetY: number;
    targetPosition?: Position;
    curvature?: number;
}): [path: string, labelX: number, labelY: number, offsetX: number, offsetY: number];
/**
 * Generate a smooth step path between two points
 * Uses @xyflow/system's getSmoothStepPath utility
 */
export declare function getSmoothStepPath(params: {
    sourceX: number;
    sourceY: number;
    sourcePosition?: Position;
    targetX: number;
    targetY: number;
    targetPosition?: Position;
    borderRadius?: number;
    offset?: number;
}): [path: string, labelX: number, labelY: number, offsetX: number, offsetY: number];
/**
 * Generate a straight line path
 * Uses @xyflow/system's getStraightPath utility
 */
export declare function getStraightPath(params: {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
}): [path: string, labelX: number, labelY: number, offsetX: number, offsetY: number];
/**
 * Check if a point is inside a rectangle
 */
export declare function isPointInRect(point: XYPosition, rect: {
    x: number;
    y: number;
    width: number;
    height: number;
}): boolean;
export { Position };
//# sourceMappingURL=geometry.d.ts.map