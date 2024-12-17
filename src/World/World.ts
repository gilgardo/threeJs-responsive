import { createCamera } from "./components/camera.ts";
import { createScene } from "./components/scene.ts";
import { createLights } from "./components/lights.ts";
import { createRenderer } from "./systems/renderer.ts";
import { Resizer } from "./systems/Resizer.ts";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { Loop } from "./systems/Loop.ts";
import createControls from "./systems/controls.ts";
import { createMeshGroup } from "./components/group.ts";

// These variables are module-scoped: we cannot access them
// from outside the module
class World {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private loop;
  constructor(container: Element) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    container.append(this.renderer.domElement);

    const light = createLights();
    const controls = createControls(
      this.camera,
      this.renderer.domElement,
      light
    );

    const meshGroup = createMeshGroup();

    this.scene.add(meshGroup, light);
    this.loop.addItem(meshGroup, controls);

    new Resizer(container, this.camera, this.renderer);
  }
  start = () => {
    this.loop.start();
  };

  stop = () => {
    this.loop.stop();
  };
}

export { World };
