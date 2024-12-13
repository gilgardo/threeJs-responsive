import {
  Clock,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
interface Object3DWithTick extends Object3D {
  tick: (delta: number, elapsed: number) => void;
}

const clock = new Clock();

class Loop {
  camera: PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
  updatables: Object3DWithTick[];
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

  addItem = (...item: Object3DWithTick[]) => {
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
