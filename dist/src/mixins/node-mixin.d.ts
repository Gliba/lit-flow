/**
 * NodeMixin - Provides core node functionality without inheritance
 * Can be applied to any LitElement to add node behavior
 *
 * Features:
 * - Dragging and positioning
 * - Selection handling
 * - Resizing with configurable constraints
 * - Event dispatching for all interactions
 *
 * Usage:
 *
 * The mixin automatically appends the resizer to the DOM when resizable=true and selected=true.
 * Components can use any render method - the resizer will be automatically added.
 *
 * ```typescript
 * @customElement('my-node')
 * export class MyNode extends NodeMixin(LitElement) {
 *   constructor() {
 *     super();
 *     this.resizable = true;
 *     this.minWidth = 100;
 *     this.minHeight = 50;
 *   }
 *
 *   // Any render method works - resizer is automatically appended
 *   render() {
 *     return html`<div>My node content</div>`;
 *   }
 * }
 * ```
 *
 * For manual control, you can also use:
 * ```typescript
 * render() {
 *   return html`
 *     <div>My node content</div>
 *     ${this.getResizer()}
 *   `;
 * }
 * ```
 */
import { LitElement } from 'lit';
export interface NodeMixinInterface {
    id: string;
    position: {
        x: number;
        y: number;
    };
    data: any;
    selected: boolean;
    dragging: boolean;
    instance: any;
    resizable: boolean;
    draggable: boolean;
    connectable: boolean;
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
    keepAspectRatio: boolean;
    renderComponent(): any;
    getResizer(): any;
    notifyHandlesUpdated(options?: {
        handleIds?: string[];
        updateDimensions?: boolean;
    }): Promise<void>;
}
export declare const NodeMixin: <T extends Constructor<LitElement>>(superClass: T) => any;
type Constructor<T = {}> = new (...args: any[]) => T;
export {};
//# sourceMappingURL=node-mixin.d.ts.map