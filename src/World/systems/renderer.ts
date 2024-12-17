import { WebGLRenderer } from "three";

function createRenderer(): WebGLRenderer {
  const renderer = new WebGLRenderer();
  renderer.domElement.tabIndex = 0;
  renderer.domElement.addEventListener("click", () =>
    renderer.domElement.focus()
  );
  return renderer;
}

export { createRenderer };
