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

