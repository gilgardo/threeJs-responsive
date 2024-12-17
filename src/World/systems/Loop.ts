import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { Tickable } from "../../types/Tickable";

const clock = new Clock();

class Loop {
  camera: PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
  updatables: Tickable[];
  constructor(
    camera: PerspectiveCamera,
    scene: Scene,
    renderer: WebGLRenderer
  ) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  addItem = (...item: Tickable[]) => {
    this.updatables = this.updatables.concat(item);
  };

  start = () => {
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
    });
  };

  stop = () => {
    this.renderer.setAnimationLoop(null);
  };

  tick = () => {
    const delta = clock.getDelta();
    const elapsed = clock.elapsedTime;
    for (const object of this.updatables) {
      object.tick(delta, elapsed);
    }
  };
}

export { Loop };
