/**
 * Shape-specific type definitions for Lit Flow
 */
export type ShapeType = 'circle' | 'rectangle' | 'diamond' | 'triangle' | 'hexagon' | 'octagon' | 'heart';
export interface ShapeConfig {
    type: ShapeType;
    color?: string;
    backgroundColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    size?: {
        width: number;
        height: number;
    };
    rotation?: number;
    label?: string;
}
export interface ShapeDefinition {
    type: ShapeType;
    name: string;
    category: 'basic' | 'geometric' | 'symbolic';
    path: string;
    viewBox: string;
    defaultSize: {
        width: number;
        height: number;
    };
    centerPoint: {
        x: number;
        y: number;
    };
}
export interface AdvancedShapeConfig extends ShapeConfig {
    gradient?: {
        type: 'linear' | 'radial';
        colors: string[];
        direction?: number;
    };
    pattern?: {
        type: 'dots' | 'lines' | 'grid';
        color: string;
        size: number;
    };
    shadow?: {
        enabled: boolean;
        color: string;
        blur: number;
        offset: {
            x: number;
            y: number;
        };
    };
}
export interface ShapeNodeData {
    type: 'shape';
    data: ShapeConfig | AdvancedShapeConfig;
}
export type ShapeNodeDataDirect = ShapeConfig | AdvancedShapeConfig;
//# sourceMappingURL=types.d.ts.map