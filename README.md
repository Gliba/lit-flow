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

