/**
 * Base Node UI components (Lit)
 * Similar to React Flow UI Base Node: header, content, footer wrappers
 */
import { LitElement } from 'lit';
export declare class BaseNode extends LitElement {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
export declare class BaseNodeHeader extends LitElement {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
export declare class BaseNodeHeaderTitle extends LitElement {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
export declare class BaseNodeContent extends LitElement {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
export declare class BaseNodeFooter extends LitElement {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'base-node': BaseNode;
        'base-node-header': BaseNodeHeader;
        'base-node-header-title': BaseNodeHeaderTitle;
        'base-node-content': BaseNodeContent;
        'base-node-footer': BaseNodeFooter;
    }
}
//# sourceMappingURL=base-node.d.ts.map