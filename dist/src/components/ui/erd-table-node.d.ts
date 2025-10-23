/**
 * ERDTableNode - Database table node with field-level handles
 * Example of a custom node type for ERD diagrams
 */
import { CSSResult } from 'lit';
import { FlowNode } from '../flow-node';
import '../node-resizer';
export interface ERDField {
    name: string;
    type: string;
    key?: 'PK' | 'FK' | 'UK';
    nullable?: boolean;
}
export interface ERDTableData {
    tableName: string;
    fields: ERDField[];
    color?: string;
    size?: {
        width?: number;
        height?: number;
    };
}
export declare class ERDTableNode extends FlowNode {
    static styles: CSSResult | CSSResult[];
    private appliedInitialSize;
    firstUpdated(): void;
    updated(changedProperties: Map<string | number | symbol, unknown>): void;
    private onFieldHandleMouseDown;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'erd-table-node': ERDTableNode;
    }
}
//# sourceMappingURL=erd-table-node.d.ts.map