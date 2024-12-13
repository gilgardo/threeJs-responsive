import { createCamera } from "./components/camera.ts";
import { createCube } from "./components/cube.ts";
import { createScene } from "./components/scene.ts";
import { createLights } from "./components/lights.ts";
import { createRenderer } from "./systems/renderer.ts";
import { Resizer } from "./systems/Resizer.ts";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

// These variables are module-scoped: we cannot access them
// from outside the module
class World {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;

  constructor(container: Element) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    container.append(this.renderer.domElement);

    const cube = createCube("basic", [2, 0, 0], { color: "purple" });
    cube.name = "Cube1";
    const cube2 = createCube("standard", [-2, 0, 0], { color: "yellow" });
    cube2.name = "Cube2";

    const light = createLights();

    this.scene.add(cube, cube2, light);

    new Resizer(container, this.camera, this.renderer);
  }

  animate = () => {
    const cube1 = this.scene?.getObjectByName("Cube1");
    const cube2 = this.scene?.getObjectByName("Cube2");

    cube1?.rotateX(0.03);
    cube1?.rotateY(0.01);
    cube2?.rotateX(0.03);
    cube2?.rotateY(-0.01);

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  };
}

export { World };
