import {
  Mesh,
  Engine,
  PrimitiveMesh,
  ModelMesh,
  Vector3,
  UnlitMaterial,
} from "oasis-engine";
import { createCircleMesh } from "./CircleMesh";

/** @internal */
export class Utils {
  public redMaterial: UnlitMaterial;
  public greenMaterial: UnlitMaterial;
  public blueMaterial: UnlitMaterial;
  public bgMaterial: UnlitMaterial;
  public darkMaterial: UnlitMaterial;

  public axisMesh: Mesh;
  public endMesh: Mesh;
  public endInnerMesh: ModelMesh;
  public bgMesh: ModelMesh;

  public radius: number = 5;
  public endRadius: number = 1;
  public axisLength: number = this.radius - 2 * this.endRadius;
  public endDist: number = this.radius - this.endRadius;

  public xRotateVector: Vector3 = new Vector3();
  public yRotateVector: Vector3 = new Vector3();
  public zRotateVector: Vector3 = new Vector3();

  public xTranslateVector: Vector3 = new Vector3();
  public yTranslateVector: Vector3 = new Vector3();
  public zTranslateVector: Vector3 = new Vector3();

  public xEndTranslateVector: Vector3 = new Vector3();
  public yEndTranslateVector: Vector3 = new Vector3();
  public zEndTranslateVector: Vector3 = new Vector3();

  constructor(engine: Engine) {
    const redMaterial = new UnlitMaterial(engine);
    redMaterial.isTransparent = true;
    redMaterial.baseColor.set(1.0, 0.25, 0.25, 1.0);
    this.redMaterial = redMaterial;

    const greenMaterial = new UnlitMaterial(engine);
    greenMaterial.isTransparent = true;
    greenMaterial.baseColor.set(0.5, 0.8, 0.2, 1.0);
    this.greenMaterial = greenMaterial;

    const blueMaterial = new UnlitMaterial(engine);
    blueMaterial.isTransparent = true;
    blueMaterial.baseColor.set(0.3, 0.5, 1.0, 1.0);
    this.blueMaterial = blueMaterial;

    const bgMaterial = new UnlitMaterial(engine);
    bgMaterial.isTransparent = true;
    bgMaterial.baseColor.set(1, 1, 1, 0.2);
    this.bgMaterial = bgMaterial;

    const darkMaterial = new UnlitMaterial(engine);
    darkMaterial.isTransparent = true;
    darkMaterial.baseColor.set(0.5, 0.5, 0.5, 0.5);
    this.darkMaterial = darkMaterial;

    this.axisMesh = PrimitiveMesh.createCylinder(
      engine,
      0.12,
      0.12,
      this.axisLength
    );
    this.endMesh = createCircleMesh(engine, this.endRadius);
    this.endInnerMesh = createCircleMesh(engine, this.endRadius - 0.24);
    this.bgMesh = createCircleMesh(engine, this.radius, 144);

    this.xRotateVector = new Vector3(0, 0, 90);
    this.yRotateVector = new Vector3(0, 90, 0);
    this.zRotateVector = new Vector3(90, 0, 0);

    this.xTranslateVector = new Vector3(this.axisLength * 0.5, 0, 0);
    this.yTranslateVector = new Vector3(0, this.axisLength * 0.5, 0);
    this.zTranslateVector = new Vector3(0, 0, this.axisLength * 0.5);

    this.xEndTranslateVector = new Vector3(this.endDist, 0, 0);
    this.yEndTranslateVector = new Vector3(0, this.endDist, 0);
    this.zEndTranslateVector = new Vector3(0, 0, this.endDist);
  }
}
