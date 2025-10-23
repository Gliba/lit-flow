/**
 * Geometric shape definitions for Lit Flow
 */
export const geometricShapes = [
    {
        type: 'hexagon',
        name: 'Hexagon',
        category: 'geometric',
        path: 'M 100 5 L 175 52 L 175 148 L 100 195 L 25 148 L 25 52 Z',
        viewBox: '0 0 200 200',
        defaultSize: { width: 200, height: 200 },
        centerPoint: { x: 100, y: 100 }
    },
    {
        type: 'octagon',
        name: 'Octagon',
        category: 'geometric',
        path: 'M 100 5 L 175 25 L 195 100 L 175 175 L 100 195 L 25 175 L 5 100 L 25 25 Z',
        viewBox: '0 0 200 200',
        defaultSize: { width: 200, height: 200 },
        centerPoint: { x: 100, y: 100 }
    }
];
//# sourceMappingURL=geometric-shapes.js.map