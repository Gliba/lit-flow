# 🌊 lit-flow

> Flow diagram library for Lit built on @xyflow/system

A customizable Lit web component for building node-based editors and interactive diagrams. Powered by the same core engine as React Flow.

[![npm version](https://img.shields.io/npm/v/lit-flow.svg)](https://www.npmjs.com/package/lit-flow)
[![license](https://img.shields.io/npm/l/lit-flow.svg)](https://github.com/srdjang/lit-flow/blob/main/LICENSE)

## ✨ Features

- 🎯 **Built with Lit** - Lightweight, fast, and standards-based web components
- ⚡ **Powered by @xyflow/system** - Same engine as React Flow
- 🎨 **Fully Customizable** - Custom nodes, edges, and styling
- 📱 **Touch Support** - Works on mobile and tablet devices
- ♿ **Accessible** - Keyboard navigation and screen reader support
- 🎭 **Dark Mode Ready** - Built-in theming support
- 📦 **Tree-shakeable** - Only bundle what you use

## 📦 Installation

```bash
npm install lit-flow
```

Or with other package managers:

```bash
pnpm add lit-flow
# or
yarn add lit-flow
```

## 🚀 Quick Start

### Basic Usage

Use with a bundler (Vite/Webpack/etc):

```ts
// main.ts
import 'lit-flow';
```

```html
<flow-canvas id="flow" style="width: 100%; height: 600px;">
  <flow-background slot="background" variant="dots"></flow-background>
  <flow-controls id="controls"></flow-controls>
  <flow-minimap width="180" height="120"></flow-minimap>
  <flow-node id="1"></flow-node>
  <flow-node id="2"></flow-node>
  <!-- Or manage nodes/edges via the instance as below -->
  
  <script type="module">
    const flowCanvas = document.getElementById('flow');
    const flowControls = document.getElementById('controls');
    
    customElements.whenDefined('flow-canvas').then(() => {
      flowControls.instance = flowCanvas.instance;

      flowCanvas.instance.setNodes([
        { id: '1', position: { x: 100, y: 100 }, data: { label: 'Start' }, width: 150, height: 50 },
        { id: '2', position: { x: 400, y: 100 }, data: { label: 'End' }, width: 150, height: 50 },
      ]);

      flowCanvas.instance.setEdges([
        { id: 'e1-2', source: '1', target: '2', animated: true },
      ]);
    });
  </script>
</flow-canvas>
```

Without a bundler (CDN):

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/lit-flow/dist/lit-flow.js"></script>
```

### With Background Pattern

```html
<flow-canvas>
  <flow-background variant="dots" gap="20" color="#ddd"></flow-background>
</flow-canvas>
```

### With Minimap

```html
<flow-canvas>
  <flow-minimap width="200" height="150"></flow-minimap>
  <flow-controls></flow-controls>
  <flow-background variant="dots"></flow-background>
  <!-- Nodes/edges are managed via the instance as shown above -->
  <script type="module">
    // attach and manage via flowCanvas.instance
  </script>
  
</flow-canvas>
```

## 📚 API Reference

### Components

#### `<flow-canvas>`

The main container component for your flow diagram.

**Properties:**
- `nodes` (Array): Array of node objects
- `edges` (Array): Array of edge objects

**Instance Methods:**
- `setNodes(nodes)` - Set all nodes
- `setEdges(edges)` - Set all edges
- `addNode(node)` - Add a single node
- `removeNode(id)` - Remove a node by id
- `updateNode(id, updates)` - Update a node
- `fitView()` - Fit the view to show all nodes

#### `<flow-node>`

Basic node component.

**Properties:**
- `id` (String): Unique identifier
- `data` (Object): Node data
- `position` (Object): { x, y } position
- `selected` (Boolean): Selection state

#### `<flow-edge>`

Edge component for connecting nodes.

**Properties:**
- `id` (String): Unique identifier
- `source` (String): Source node id
- `target` (String): Target node id
- `animated` (Boolean): Animate the edge
- `label` (String): Edge label
- `markerStart` | `markerEnd` (Object | String): SVG marker configuration or registered id

### Markers

You can add arrowheads and custom markers to edges. Markers are defined per edge using `markerStart`/`markerEnd`.

Built-ins:
- `Arrow` (open)
- `ArrowClosed` (filled triangle)

Example:
```ts
flowCanvas.instance.setEdges([
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    markerEnd: { type: 'Arrow' },                   // open arrow
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    markerStart: { type: 'ArrowClosed', orient: 'auto-start-reverse' },
    markerEnd:   { type: 'ArrowClosed' },           // closed arrow
  },
]);
```

Options for built-ins:
- `width`/`height` (default 10)
- `color` (default `currentColor` to match edge stroke)
- `orient` ('auto' | 'auto-start-reverse')

Custom marker:
```ts
flowCanvas.instance.setEdges([
  {
    id: 'e-custom',
    source: '1',
    target: '2',
    markerEnd: {
      type: 'custom',
      path: 'M0,0 L10,5 L0,10 Z',   // triangle path
      width: 10,
      height: 10,
      refX: 10,                     // tip alignment (defaults adjusted to avoid handle overlap)
      refY: 5,
      color: '#1A192B'
    }
  }
]);
```

Notes:
- Markers are deduplicated and defined once per canvas in an SVG `<defs>`.
- The edge path references markers via `marker-start`/`marker-end` with fragment IDs.

### Edge Labels

There are two ways to render labels:

- SVG text on the path: use the root `label` field on the edge
```ts
{ id: 'e1-2', source: '1', target: '2', label: 'On Path' }
```

- HTML overlay labels (portal-like): use `edge.data`
```ts
{
  id: 'e2-3', source: '2', target: '3',
  data: {
    labelHtml: '<b>Center</b>',   // rendered at the path midpoint
    startLabel: 'Start',          // near the source side
    endLabel: 'End'               // near the target side
  }
}
```

The overlay labels are absolutely positioned in screen space and update with pan/zoom. Style them via the `.edge-label` class.

## 🎭 Custom Nodes

lit-flow supports custom node types, allowing you to create specialized components for different use cases like database tables, process steps, or any custom UI.

### Node Type System

Register custom node types by passing a `nodeTypes` object to `flow-canvas`:

```html
<flow-canvas id="flow" nodeTypes='{"erd-table": "erd-table-node", "custom": "my-custom-node"}'>
  <!-- your flow content -->
</flow-canvas>
```

### Creating Custom Nodes

Custom nodes must extend the `FlowNode` base class:

```typescript
import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { FlowNode } from 'lit-flow';

@customElement('my-custom-node')
export class MyCustomNode extends FlowNode {
  static styles = [
    ...(Array.isArray(super.styles) ? super.styles : [super.styles]),
    css`
      :host {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        padding: 16px;
        color: white;
        min-width: 120px;
      }
    `
  ];

  render() {
    return html`
      <div>
        <h3>${this.data?.title || 'Custom Node'}</h3>
        <p>${this.data?.description || ''}</p>
      </div>
    `;
  }
}
```

### Multiple Connection Handles

Create nodes with multiple connection points using handles:

```typescript
@customElement('erd-table-node')
export class ERDTableNode extends FlowNode {
  private onFieldHandleMouseDown(fieldName: string, side: 'left' | 'right') {
    return (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      
      const handleId = `${this.id}-${fieldName}-${side}`;
      
      this.dispatchEvent(new CustomEvent('handle-start', {
        detail: { 
          nodeId: this.id, 
          type: side === 'left' ? 'target' : 'source',
          handleId,
          fieldName
        },
        bubbles: true,
        composed: true
      }));
    };
  }

  render() {
    const fields = this.data?.fields || [];
    
    return html`
      <div class="table-header">
        <h3>${this.data?.tableName || 'Table'}</h3>
      </div>
      
      <div class="table-body">
        ${fields.map(field => html`
          <div class="field-row">
            <div class="field-name">${field.name}</div>
            <div class="field-type">${field.type}</div>
            
            <!-- Left handle (input) -->
            <div 
              class="field-handle left"
              data-handle-id="${this.id}-${field.name}-left"
              @mousedown=${this.onFieldHandleMouseDown(field.name, 'left')}
            ></div>
            
            <!-- Right handle (output) -->
            <div 
              class="field-handle right"
              data-handle-id="${this.id}-${field.name}-right"
              @mousedown=${this.onFieldHandleMouseDown(field.name, 'right')}
            ></div>
          </div>
        `)}
      </div>
    `;
  }
}
```

### Handle Styling

Style your handles with CSS:

```css
.field-handle {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--flow-handle-bg, #fff);
  border: 2px solid var(--flow-handle-border, #2563eb);
  cursor: crosshair;
  pointer-events: auto;
  z-index: 10;
}

.field-handle.left {
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
}

.field-handle.right {
  right: -5px;
  top: 50%;
  transform: translateY(-50%);
}
```

### Using Custom Nodes

Add nodes with the `type` property:

```javascript
flowCanvas.instance.setNodes([
  {
    id: '1',
    type: 'erd-table',
    position: { x: 100, y: 100 },
    data: {
      tableName: 'Users',
      fields: [
        { name: 'id', type: 'INT', key: 'PK' },
        { name: 'name', type: 'VARCHAR' },
        { name: 'email', type: 'VARCHAR' }
      ]
    }
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 400, y: 100 },
    data: {
      title: 'Process Step',
      description: 'Custom business logic'
    }
  }
]);
```

### Edge Connections with Handles

When using multiple handles, specify which handle to connect:

```javascript
flowCanvas.instance.setEdges([
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    sourceHandle: '1-name-right',    // Connect from 'name' field's right handle
    targetHandle: '2-in'             // Connect to 'in' handle on target
  }
]);
```

### Built-in UI Components

lit-flow provides reusable UI components for building custom nodes:

```typescript
import { 
  BaseNode, 
  BaseNodeHeader, 
  BaseNodeHeaderTitle, 
  BaseNodeContent, 
  BaseNodeFooter 
} from 'lit-flow';

@customElement('base-demo-node')
export class BaseDemoNode extends BaseNode {
  render() {
    return html`
      <base-node-header>
        <base-node-header-title>${this.data?.title || 'Demo'}</base-node-header-title>
      </base-node-header>
      
      <base-node-content>
        <p>${this.data?.description || 'Content goes here'}</p>
      </base-node-content>
      
      <base-node-footer>
        <button>Action</button>
      </base-node-footer>
      
      <!-- Handles -->
      <div class="handle left" data-handle-id="${this.id}-in"></div>
      <div class="handle right" data-handle-id="${this.id}-out"></div>
    `;
  }
}
```

## 🧩 NodeMixin - Advanced Custom Node Development

For more advanced custom node development, lit-flow provides the `NodeMixin` - a powerful mixin that adds core node functionality to any LitElement without requiring inheritance from a base class.

### Why Use NodeMixin?

- **Flexible Architecture** - Apply node behavior to any existing component
- **No Inheritance Required** - Works with any LitElement-based component
- **Comprehensive Features** - Dragging, selection, resizing, and event handling
- **Reusable** - Mix and match with other mixins and components
- **TypeScript Support** - Full type safety and IntelliSense

### Basic Usage

```typescript
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { NodeMixin } from 'lit-flow';

@customElement('my-custom-node')
export class MyCustomNode extends NodeMixin(LitElement) {
  constructor() {
    super();
    // Configure node behavior
    this.resizable = true;
    this.draggable = true;
    this.connectable = true;
    
    // Set resize constraints
    this.minWidth = 100;
    this.minHeight = 50;
    this.maxWidth = 400;
    this.maxHeight = 300;
    this.keepAspectRatio = false;
  }

  static styles = [
    ...(super.styles || []),
    css`
      :host {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        padding: 16px;
        color: white;
        min-width: 120px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      :host([selected]) {
        box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.3);
      }
    `
  ];

  render() {
    return html`
      <div class="node-content">
        <h3>${this.data?.title || 'Custom Node'}</h3>
        <p>${this.data?.description || 'Node description'}</p>
        <div class="node-actions">
          <button>Action 1</button>
          <button>Action 2</button>
        </div>
      </div>
      
      <!-- Render resize handles (automatically shown when selected) -->
      ${this.renderResizer()}
    `;
  }
}
```

### NodeMixin Features

#### Core Properties

```typescript
interface NodeMixinInterface {
  // Node identification
  id: string;
  position: { x: number; y: number };
  data: any;
  
  // Behavior flags
  selected: boolean;
  dragging: boolean;
  resizable: boolean;
  draggable: boolean;
  drag_handle_selector: string | null;  // CSS selector for drag handle element
  connectable: boolean;
  
  // Resize constraints
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  keepAspectRatio: boolean;
  maxInitialHeight: number;
  
  // Flow instance
  instance: any;
}
```

#### Automatic Behaviors

- **Selection Management** - Click to select, click outside to deselect
- **Drag & Drop** - Smooth dragging with viewport zoom support
- **Resizing** - 8-point resize handles with constraints
- **Event Dispatching** - Comprehensive event system for all interactions
- **Global Deselection** - Automatic deselection when clicking outside

#### Restricted Drag Handle

By default, the entire node can be used to drag it around the canvas. However, you can restrict dragging to a specific element using the `drag_handle_selector` property. This is useful when you want users to interact with buttons, inputs, or other interactive elements in the node body without triggering dragging.

**Usage:**

```typescript
@customElement('my-node')
export class MyNode extends NodeMixin(LitElement) {
  constructor() {
    super();
    this.draggable = true;
    // Only allow dragging from the header element
    this.drag_handle_selector = '.node-header';
  }

  render() {
    return html`
      <div class="node-header">
        Header - drag from here
      </div>
      <div class="node-body">
        <button>Click me</button>
        <input type="text" placeholder="Type here" />
        <!-- These won't trigger dragging -->
      </div>
    `;
  }
}
```

**Setting via Node Data:**

```javascript
flowCanvas.instance.setNodes([
  {
    id: 'node-1',
    type: 'my-node',
    position: { x: 100, y: 100 },
    drag_handle_selector: '.node-header',  // Only header can drag
    data: {
      title: 'Draggable Node'
    }
  }
]);
```

When `drag_handle_selector` is set:
- Only clicks within the specified element (or its children) will initiate dragging
- Clicks elsewhere in the node body will not trigger dragging
- Interactive elements like buttons, inputs, and links will work normally
- The drag handle element will automatically get a `grab` cursor

#### Resize Configuration

```typescript
constructor() {
  super();
  
  // Enable resizing
  this.resizable = true;
  
  // Set size constraints
  this.minWidth = 80;
  this.minHeight = 60;
  this.maxWidth = 500;
  this.maxHeight = 400;
  
  // Keep aspect ratio during resize
  this.keepAspectRatio = true;
}
```

#### Initial Height Control

The `maxInitialHeight` property allows you to control the initial height of a node based on its content. This is particularly useful when content is loaded dynamically or varies in size.

**Behavior:**
- If `maxInitialHeight` is `0` (default): Height adjustment is disabled, node fits to content naturally
- If content height **exceeds** `maxInitialHeight`: Node height is capped at `maxInitialHeight`, and content becomes scrollable
- If content height **fits within** `maxInitialHeight`: Node height fits to content (no height constraint applied)

**Usage:**

```typescript
@customElement('content-node')
export class ContentNode extends NodeMixin(LitElement) {
  connectedCallback() {
    super.connectedCallback();
    
    // Set maxInitialHeight from data if provided
    const data = this.data as { maxInitialHeight?: number };
    if (data?.maxInitialHeight !== undefined) {
      this.maxInitialHeight = data.maxInitialHeight;
    }
  }

  render() {
    const items = this.data?.items || [];
    
    return html`
      <div class="node-content">
        <div class="header">${this.data?.title || 'Node'}</div>
        <!-- Scrollable content area -->
        <div class="content-area">
          ${items.map(item => html`<div class="item">${item}</div>`)}
        </div>
      </div>
    `;
  }
  
  static styles = [
    ...(super.styles || []),
    css`
      .content-area {
        overflow-y: auto;
        overflow-x: hidden;
        flex: 1;
        min-height: 0;
      }
    `
  ];
}
```

**Setting from Data:**

```javascript
flowCanvas.instance.setNodes([
  {
    id: 'node-1',
    type: 'content-node',
    position: { x: 100, y: 100 },
    data: {
      title: 'Items List',
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
      maxInitialHeight: 200  // Will cap at 200px if content exceeds
    }
  }
]);
```

**Manual Height Adjustment:**

You can also manually trigger height adjustment after content loads:

```typescript
async loadData() {
  const data = await fetch('/api/data').then(r => r.json());
  // Render content...
  
  // After content is rendered, adjust height if needed
  await this.updateComplete;
  this.adjustHeightToContent();
}
```

**Important Notes:**
- Height adjustment only applies if `maxInitialHeight > 0`
- The adjustment happens automatically in `firstUpdated()` lifecycle
- Height adjustment respects resize constraints (`minHeight`, `maxHeight`)
- After initial sizing, users can still resize the node manually if `resizable` is enabled
- Make sure your content area has `overflow-y: auto` for scrolling when content exceeds the limit

### Event System

The NodeMixin dispatches comprehensive events for all interactions:

```typescript
// Selection events
this.addEventListener('node-select', (e) => {
  console.log('Node selected:', e.detail);
});

this.addEventListener('node-deselect', (e) => {
  console.log('Node deselected:', e.detail);
});

// Resize events
this.addEventListener('resize-start', (e) => {
  console.log('Resize started:', e.detail);
});

this.addEventListener('resize', (e) => {
  console.log('Resizing:', e.detail);
});

this.addEventListener('resize-end', (e) => {
  console.log('Resize ended:', e.detail);
});
```

### Dynamic Handle Updates

When adding handles dynamically (e.g., after loading API data or rendering fields), you need to notify the flow instance so it can recalculate edge positions. The `notifyHandlesUpdated()` method makes this easy:

```typescript
import { LitElement, html, render } from 'lit';
import { NodeMixin } from 'lit-flow';

@customElement('dynamic-handles-node')
export class DynamicHandlesNode extends NodeMixin(LitElement) {
  private async loadFields() {
    // Fetch fields from API
    const fields = await fetch('/api/fields').then(r => r.json());
    
    // Render fields with handles
    const container = this.shadowRoot.querySelector('.fields-container');
    const fieldsTemplate = html`
      ${fields.map(field => html`
        <div class="field-row">
          <div class="field-name">${field.name}</div>
          <!-- Left handle -->
          <div 
            class="field-handle left"
            data-handle-id="${this.id}-${field.name}-left"
            @mousedown=${this.onHandleMouseDown(field.name, 'left')}
          ></div>
          <!-- Right handle -->
          <div 
            class="field-handle right"
            data-handle-id="${this.id}-${field.name}-right"
            @mousedown=${this.onHandleMouseDown(field.name, 'right')}
          ></div>
        </div>
      `)}
    `;
    
    render(fieldsTemplate, container);
    
    // ✨ Notify flow instance that handles are ready
    // This ensures connections update properly after dynamic content loads
    await this.notifyHandlesUpdated({
      handleIds: fields.flatMap(f => [
        `${this.id}-${f.name}-left`,
        `${this.id}-${f.name}-right`
      ])
    });
  }
}
```

**Method Signature:**

```typescript
protected async notifyHandlesUpdated(options?: {
  /** Optional list of handle IDs that were added/updated */
  handleIds?: string[];
  /** Whether to update node dimensions (default: true) */
  updateDimensions?: boolean;
}): Promise<void>
```

**What it does:**

1. **Waits for DOM update** - Ensures handles are fully rendered before notifying
2. **Updates node dimensions** - Triggers flow canvas to recalculate handle positions
3. **Dispatches event** - Sends `node-handles-updated` event for flow canvas to listen to

**Usage Examples:**

```typescript
// Basic usage - just notify after handles are added
await this.notifyHandlesUpdated();

// With handle IDs for better tracking
await this.notifyHandlesUpdated({
  handleIds: ['handle-1', 'handle-2', 'handle-3']
});

// Skip dimension update if you only want to dispatch event
await this.notifyHandlesUpdated({
  updateDimensions: false,
  handleIds: ['handle-1']
});
```

**Important:** Always call `notifyHandlesUpdated()` after using Lit's `render()` function to dynamically add handles. Without this, connections may not render correctly until the node is manually resized or moved.

### Advanced Example - Database Table Node

```typescript
@customElement('database-table-node')
export class DatabaseTableNode extends NodeMixin(LitElement) {
  constructor() {
    super();
    this.resizable = true;
    this.minWidth = 200;
    this.minHeight = 100;
    this.maxWidth = 400;
    this.maxHeight = 300;
  }

  static styles = [
    ...(super.styles || []),
    css`
      :host {
        background: white;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        font-family: 'Monaco', 'Menlo', monospace;
        font-size: 12px;
      }
      
      .table-header {
        background: #f3f4f6;
        padding: 8px 12px;
        border-bottom: 1px solid #e5e7eb;
        font-weight: bold;
      }
      
      .field-row {
        display: flex;
        align-items: center;
        padding: 4px 12px;
        border-bottom: 1px solid #f3f4f6;
        position: relative;
      }
      
      .field-name {
        flex: 1;
        font-weight: 500;
      }
      
      .field-type {
        color: #6b7280;
        margin-left: 8px;
      }
      
      .field-key {
        background: #fbbf24;
        color: #92400e;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 10px;
        margin-left: 8px;
      }
    `
  ];

  render() {
    const fields = this.data?.fields || [];
    
    return html`
      <div class="table-header">
        ${this.data?.tableName || 'Table'}
      </div>
      
      <div class="table-body">
        ${fields.map(field => html`
          <div class="field-row">
            <div class="field-name">${field.name}</div>
            <div class="field-type">${field.type}</div>
            ${field.key ? html`<span class="field-key">${field.key}</span>` : ''}
          </div>
        `)}
      </div>
      
      <!-- Resize handles (automatically managed) -->
      ${this.renderResizer()}
    `;
  }
}
```

### Integration with Flow Canvas

```javascript
// Register the custom node type
const flowCanvas = document.getElementById('flow');

customElements.whenDefined('flow-canvas').then(() => {
  flowCanvas.instance.setNodes([
    {
      id: 'users-table',
      type: 'database-table',
      position: { x: 100, y: 100 },
      data: {
        tableName: 'Users',
        fields: [
          { name: 'id', type: 'INT', key: 'PK' },
          { name: 'username', type: 'VARCHAR' },
          { name: 'email', type: 'VARCHAR' },
          { name: 'created_at', type: 'TIMESTAMP' }
        ]
      }
    }
  ]);
});
```

### Mixin Composition

The NodeMixin can be combined with other mixins for even more functionality:

```typescript
import { NodeMixin } from 'lit-flow';
import { SomeOtherMixin } from './other-mixin';

@customElement('advanced-node')
export class AdvancedNode extends NodeMixin(SomeOtherMixin(LitElement)) {
  // Combines node functionality with other behaviors
}
```

### Best Practices

1. **Always call `super()` in constructor** to initialize mixin properties
2. **Include `renderResizer()` in your render method** for resize functionality
3. **Use CSS custom properties** for consistent theming
4. **Handle events properly** by listening to the dispatched events
5. **Set appropriate constraints** for resize behavior
6. **Test with different data structures** to ensure robustness

The NodeMixin provides a powerful, flexible foundation for building sophisticated custom nodes while maintaining clean, reusable code architecture.

## 🎨 Shape Nodes

lit-flow includes a powerful shape node system that allows you to create nodes with various geometric shapes using SVG rendering. Shape nodes are perfect for creating visual diagrams, flowcharts, and process maps.

### Features

- **7 Built-in Shapes** - Circle, Rectangle, Diamond, Triangle, Hexagon, Octagon, and Heart
- **SVG Rendering** - Crisp, scalable shapes that look great at any size
- **Full Customization** - Colors, strokes, gradients, rotation, and sizing
- **Shape Registry** - Extensible system for adding custom shapes
- **Interactive** - Drag, select, and connect with handles
- **TypeScript Support** - Full type safety for shape configurations

### Available Shape Types

#### Basic Shapes
- **Circle** - Perfect circle for start/end points
- **Rectangle** - Standard rectangular shapes
- **Diamond** - Diamond/rhombus for decision points
- **Triangle** - Triangle for directional flow

#### Geometric Shapes
- **Hexagon** - Six-sided polygon for process steps
- **Octagon** - Eight-sided polygon for special operations

#### Symbolic Shapes
- **Heart** - Heart shape for user-related elements

### Basic Usage

Create shape nodes by setting the `type` to `'shape'` and providing shape configuration data:

```javascript
flowCanvas.instance.setNodes([
  {
    id: 'circle-1',
    type: 'shape',
    position: { x: 100, y: 100 },
    data: {
      type: 'shape',
      data: {
        type: 'circle',
        backgroundColor: '#3b82f6',
        strokeColor: '#1e40af',
        strokeWidth: 2,
        label: 'Start'
      }
    }
  },
  {
    id: 'diamond-1',
    type: 'shape',
    position: { x: 300, y: 100 },
    data: {
      type: 'shape',
      data: {
        type: 'diamond',
        backgroundColor: '#f59e0b',
        strokeColor: '#d97706',
        strokeWidth: 2,
        size: { width: 120, height: 120 },
        label: 'Decision'
      }
    }
  }
]);
```

### Shape Configuration

Shape nodes accept a comprehensive configuration object:

```typescript
interface ShapeConfig {
  type: ShapeType;                    // Required: shape type
  backgroundColor?: string;           // Fill color
  strokeColor?: string;              // Border color
  strokeWidth?: number;              // Border width (default: 2)
  size?: { width: number; height: number }; // Custom size
  rotation?: number;                 // Rotation in degrees
  label?: string;                    // Display label
}
```

### Advanced Configuration

For more advanced styling, you can use the extended configuration:

```javascript
{
  id: 'advanced-shape',
  type: 'shape',
  position: { x: 500, y: 100 },
  data: {
    type: 'shape',
    data: {
      type: 'hexagon',
      backgroundColor: '#8b5cf6',
      strokeColor: '#7c3aed',
      strokeWidth: 3,
      size: { width: 150, height: 150 },
      rotation: 15,
      label: 'Process',
      gradient: {
        type: 'radial',
        colors: ['#8b5cf6', '#a78bfa', '#c4b5fd']
      }
    }
  }
}
```

### Shape Registry API

The Shape Registry allows you to extend the system with custom shapes:

```javascript
import { ShapeRegistry } from 'lit-flow';

// Register a custom shape
ShapeRegistry.register({
  type: 'star',
  name: 'Star',
  category: 'symbolic',
  path: 'M 50 5 L 61 35 L 95 35 L 68 57 L 79 91 L 50 70 L 21 91 L 32 57 L 5 35 L 39 35 Z',
  viewBox: '0 0 100 100',
  defaultSize: { width: 100, height: 100 },
  centerPoint: { x: 50, y: 50 }
});

// Get all available shapes
const allShapes = ShapeRegistry.getAll();

// Get shapes by category
const basicShapes = ShapeRegistry.getByCategory('basic');
```

### Shape Node Properties

#### `<shape-node>`

Shape node component with the following properties:

**Properties:**
- `id` (String): Unique identifier
- `data` (Object): Shape configuration data
- `position` (Object): { x, y } position
- `selected` (Boolean): Selection state
- `draggable` (Boolean): Enable/disable dragging
- `connectable` (Boolean): Show/hide connection handles

**Events:**
- `node-select` - Fired when node is selected/deselected
- `handle-start` - Fired when connection handle is activated

### Complete Shape Example

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="https://cdn.jsdelivr.net/npm/lit-flow/dist/lit-flow.js"></script>
</head>
<body>
  <flow-canvas id="flow" nodeTypes='{"shape": "shape-node"}'>
    <flow-background variant="dots"></flow-background>
    <flow-controls></flow-controls>
    
    <script type="module">
      import './src/components/shapes/shape-node.ts';
      
      const flowCanvas = document.getElementById('flow');
      
      customElements.whenDefined('flow-canvas').then(() => {
        // Create a flowchart with different shapes
        flowCanvas.instance.setNodes([
          {
            id: 'start',
            type: 'shape',
            position: { x: 100, y: 50 },
            data: {
              type: 'shape',
              data: {
                type: 'circle',
                backgroundColor: '#10b981',
                strokeColor: '#059669',
                label: 'Start'
              }
            }
          },
          {
            id: 'process',
            type: 'shape',
            position: { x: 300, y: 50 },
            data: {
              type: 'shape',
              data: {
                type: 'rectangle',
                backgroundColor: '#3b82f6',
                strokeColor: '#1e40af',
                size: { width: 150, height: 80 },
                label: 'Process Data'
              }
            }
          },
          {
            id: 'decision',
            type: 'shape',
            position: { x: 500, y: 50 },
            data: {
              type: 'shape',
              data: {
                type: 'diamond',
                backgroundColor: '#f59e0b',
                strokeColor: '#d97706',
                size: { width: 120, height: 120 },
                label: 'Valid?'
              }
            }
          },
          {
            id: 'end',
            type: 'shape',
            position: { x: 700, y: 50 },
            data: {
              type: 'shape',
              data: {
                type: 'circle',
                backgroundColor: '#ef4444',
                strokeColor: '#dc2626',
                label: 'End'
              }
            }
          }
        ]);

        // Connect the shapes
        flowCanvas.instance.setEdges([
          { id: 'e1', source: 'start', target: 'process' },
          { id: 'e2', source: 'process', target: 'decision' },
          { id: 'e3', source: 'decision', target: 'end' }
        ]);
      });
    </script>
  </flow-canvas>
</body>
</html>
```

### Available Node Types

lit-flow includes several built-in node types:

- **`default`** - Basic rectangular node (default)
- **`shape`** - Geometric shape nodes with SVG rendering
- **`erd-table`** - Database table with field-level handles
- **Custom types** - Any registered custom component

### Complete Example

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="https://cdn.jsdelivr.net/npm/lit-flow/dist/lit-flow.js"></script>
</head>
<body>
  <flow-canvas id="flow" nodeTypes='{"erd-table": "erd-table-node"}'>
    <flow-background variant="dots"></flow-background>
    
    <script type="module">
      import { ERDTableNode } from 'lit-flow';
      
      // Register custom node
      customElements.define('erd-table-node', ERDTableNode);
      
      const flowCanvas = document.getElementById('flow');
      
      customElements.whenDefined('flow-canvas').then(() => {
        flowCanvas.instance.setNodes([
          {
            id: 'users',
            type: 'erd-table',
            position: { x: 100, y: 100 },
            data: {
              tableName: 'Users',
              fields: [
                { name: 'id', type: 'INT', key: 'PK' },
                { name: 'username', type: 'VARCHAR' },
                { name: 'email', type: 'VARCHAR' }
              ]
            }
          }
        ]);
      });
    </script>
  </flow-canvas>
</body>
</html>
```

#### `<flow-background>`

Background pattern component.

**Properties:**
- `variant` (String): 'dots' | 'lines' | 'cross'
- `gap` (Number): Pattern spacing (default: 20)
- `color` (String): Pattern color (default: '#ddd')
- `size` (Number): Pattern size (default: 1)

#### `<flow-minimap>`

Miniature overview component.

**Properties:**
- `width` (Number): Width in pixels (default: 200)
- `height` (Number): Height in pixels (default: 150)

### TypeScript Support

Full TypeScript definitions are included:

```typescript
import type { Node, Edge, FlowOptions, XYPosition } from 'lit-flow';

const node: Node = {
  id: '1',
  position: { x: 0, y: 0 },
  data: { label: 'My Node' }
};
```

## 🎨 Theming

lit-flow supports CSS custom properties for theming:

```css
flow-canvas {
  --flow-background-color: #fafafa;
  --flow-node-background: #ffffff;
  --flow-node-border: #dddddd;
  --flow-node-selected-border: #1a73e8;
  --flow-edge-color: #b1b1b7;
}
```

Dark mode: set CSS variables based on a class or media query.

```css
@media (prefers-color-scheme: dark) {
  flow-canvas {
    --flow-background-color: #0f1115;
    --flow-node-background: #1a1d24;
    --flow-node-border: #2b2f3a;
    --flow-node-selected-border: #5b9bff;
    --flow-edge-color: #5a5a66;
  }
}
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📄 License

MIT © AnyBuild

## 🙏 Acknowledgments

- Built with [Lit](https://lit.dev)
- Powered by [@xyflow/system](https://www.npmjs.com/package/@xyflow/system)
- Inspired by [React Flow](https://reactflow.dev)

## 🔗 Links

- [Documentation](#) (Coming soon)
- [Examples](#) (Coming soon)
- [GitHub](https://github.com/srdjang/lit-flow)
- [npm](https://www.npmjs.com/package/lit-flow)

---

Made with ❤️ by AnyBuild

