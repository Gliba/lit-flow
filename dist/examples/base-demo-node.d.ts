/**
 * BaseDemoNode - example node composed with Base Node UI wrappers (examples)
 */
import { type CSSResult } from 'lit';
import { FlowNode } from '../src/components/flow-node';
import '../src/components/ui/base-node';
interface BaseDemoData {
    title?: string;
    subtitle?: string;
    content?: string;
}
export declare class BaseDemoNode extends FlowNode {
    static styles: CSSResult | CSSResult[];
    data: BaseDemoData;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'base-demo-node': BaseDemoNode;
    }
}
export {};
//# sourceMappingURL=base-demo-node.d.ts.map