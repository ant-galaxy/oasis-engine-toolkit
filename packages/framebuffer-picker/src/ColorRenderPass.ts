import { Camera, Engine, Layer, RenderPass, RenderTarget, Texture2D } "@galacean/engine";
import { ColorMaterial } from "./ColorMaterial";

/**
 * Color render Pass, used to render marker.
 */
class ColorRenderPass extends RenderPass {
  private _needPick: boolean;
  private _pickPos: [number, number];
  /** @internal */
  _pickResolve: Function;

  constructor(name: string, priority: number, renderTarget: RenderTarget, mask: Layer, engine?: Engine) {
    super(name, priority, renderTarget, new ColorMaterial(engine), mask);

    this._needPick = false;
  }

  /**
   * Determine whether need to render pass, reset state.
   * @override
   */
  preRender() {
    if (this._needPick) {
      this.enabled = true;
      (this.replaceMaterial as ColorMaterial).reset();
    } else {
      this.enabled = false;
    }
  }

  /**
   * Determine whether to pick up.
   * @override
   */
  postRender(camera: Camera) {
    if (this._needPick) {
      const color = this.readColorFromRenderTarget(camera);
      const renderElement = (this.replaceMaterial as ColorMaterial).getObjectByColor(color);
      this._needPick = false;

      if (this._pickResolve) this._pickResolve(renderElement);
    }
  }

  /**
   * Pick up coordinate pixels.
   */
  pick(x: number, y: number) {
    this._pickPos = [x, y];
    this._needPick = true;
  }

  /**
   * Get pixel color value from framebuffer.
   */
  readColorFromRenderTarget(camera: Camera) {
    const gl = camera.engine._hardwareRenderer.gl;
    const screenPoint = this._pickPos;
    const canvasWidth = gl.drawingBufferWidth;
    const canvasHeight = gl.drawingBufferHeight;

    const px = screenPoint[0];
    const py = screenPoint[1];

    const viewport = camera.viewport;
    const viewWidth = (viewport.z - viewport.x) * canvasWidth;
    const viewHeight = (viewport.w - viewport.y) * canvasHeight;

    const nx = (px - viewport.x) / viewWidth;
    const ny = (py - viewport.y) / viewHeight;
    const left = Math.floor(nx * (this.renderTarget.width - 1));
    const bottom = Math.floor((1 - ny) * (this.renderTarget.height - 1));
    const pixel = new Uint8Array(4);

    (<Texture2D>this.renderTarget.getColorTexture()).getPixelBuffer(left, bottom, 1, 1, 0, pixel);
    return pixel;
  }
}

export { ColorRenderPass };
