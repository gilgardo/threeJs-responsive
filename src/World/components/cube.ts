import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  MeshBasicMaterial,
  Object3D,
  MathUtils,
} from "three";

function createCube(geo = "basic", pos = [0, 0, 0], spec = { color: "white" }) {
  // create a geometry
  const geometry = new BoxGeometry(2, 2, 2);
  const angularSpeed = Math.PI / 2;
  const radiousOfMotion = 2;
  const material =
    geo === "standard"
      ? new MeshStandardMaterial(spec)
      : new MeshBasicMaterial(spec);

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material) as unknown as Object3D & {
    tick: (delta: number, elapsed: number) => void;
  };

  cube.position.set(pos[0], pos[1], pos[2]);
  cube.rotation.set(0, 1, 0);

  const radSeconds = MathUtils.degToRad(30);

  cube.tick = (delta: number, elapsed: number) => {
    // increase the cube's rotation each frame
    cube.rotation.z += radSeconds * delta;
    cube.rotation.x += radSeconds * delta;
    cube.rotation.y += radSeconds * delta;

    cube.position.z = Math.sin(angularSpeed * elapsed) * radiousOfMotion * 2;
    cube.position.x =
      pos[0] + Math.cos(angularSpeed * elapsed) * radiousOfMotion;
  };

  return cube;
}

export { createCube };
