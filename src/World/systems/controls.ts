import { DirectionalLight, PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

function createControls(
  camera: PerspectiveCamera,
  canvas: HTMLElement,
  light: DirectionalLight
) {
  const controls = new OrbitControls(
    camera,
    canvas
  ) as unknown as OrbitControls & {
    tick: () => void;
  };

  // damping and auto rotation require
  // the controls to be updated each frame

  controls.enableDamping = true;
  controls.keys = {
    LEFT: "ArrowLeft", //left arrow
    UP: "ArrowUp", // up arrow
    RIGHT: "ArrowRight", // right arrow
    BOTTOM: "ArrowDown", // down arrow
  };

  controls.tick = () => {
    light.position.set(camera.position.x, camera.position.y, camera.position.z);
    controls.update();
  };

  return controls;
}

export default createControls;
