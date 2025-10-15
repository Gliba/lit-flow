/**
 * Symbolic shape definitions for Lit Flow
 */

import type { ShapeDefinition } from '../types';

export const symbolicShapes: ShapeDefinition[] = [
  {
    type: 'heart',
    name: 'Heart',
    category: 'symbolic',
    path: 'M 100 185 C 100 185, 10 95, 10 50 C 10 25, 35 5, 60 5 C 80 5, 100 25, 100 50 C 100 25, 120 5, 140 5 C 165 5, 190 25, 190 50 C 190 95, 100 185, 100 185 Z',
    viewBox: '0 0 200 200',
    defaultSize: { width: 200, height: 200 },
    centerPoint: { x: 100, y: 100 }
  }
];
