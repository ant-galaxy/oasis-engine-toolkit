## Installation

To install, use:

```sh
npm install @galacean/engine-xr-webxr
```

This will allow you to import engine entirely using:

```javascript
import * as WEBXR from "@galacean/engine-xr-webxr";
```

or individual classes using:

```javascript
import { WebXRDevice } from "@galacean/engine-xr-webxr";
```

## Usage

```typescript
// Create engine by passing in the HTMLCanvasElement
const engine = await WebGLEngine.create({ canvas: "canvas-id", xr: WebXRDevice});
......

// Run engine.
engine.run();
```
