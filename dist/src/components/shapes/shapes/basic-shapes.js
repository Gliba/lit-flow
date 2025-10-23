/**
 * Basic shape definitions for Lit Flow
 */
export const basicShapes = [
    {
        type: 'circle',
        name: 'Circle',
        category: 'basic',
        path: 'M 100 100 m -95 0 a 95 95 0 1 1 190 0 a 95 95 0 1 1 -190 0',
        viewBox: '0 0 200 200',
        defaultSize: { width: 200, height: 200 },
        centerPoint: { x: 100, y: 100 }
    },
    {
        type: 'rectangle',
        name: 'Rectangle',
        category: 'basic',
        path: 'M 5 5 L 195 5 L 195 195 L 5 195 Z',
        viewBox: '0 0 200 200',
        defaultSize: { width: 200, height: 200 },
        centerPoint: { x: 100, y: 100 }
    },
    {
        type: 'diamond',
        name: 'Diamond',
        category: 'basic',
        path: 'M 100 5 L 195 100 L 100 195 L 5 100 Z',
        viewBox: '0 0 200 200',
        defaultSize: { width: 200, height: 200 },
        centerPoint: { x: 100, y: 100 }
    },
    {
        type: 'triangle',
        name: 'Triangle',
        category: 'basic',
        path: 'M 100 5 L 195 195 L 5 195 Z',
        viewBox: '0 0 200 200',
        defaultSize: { width: 200, height: 200 },
        centerPoint: { x: 100, y: 100 }
    }
];
//# sourceMappingURL=basic-shapes.js.map