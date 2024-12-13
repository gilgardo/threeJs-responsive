import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  MeshBasicMaterial,
} from "three";

function createCube(geo = "basic", pos = [0, 0, 0], spec = { color: "white" }) {
  // create a geometry
  const geometry = new BoxGeometry(2, 2, 2);

  const material =
    geo === "standard"
      ? new MeshStandardMaterial(spec)
      : new MeshBasicMaterial(spec);

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);

  cube.rotation.set(0, 1, 0);
  cube.position.set(pos[0], pos[1], pos[2]);
  return cube;
}

export { createCube };
