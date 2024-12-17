import {
  SphereGeometry,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  Object3DEventMap,
} from "three";

function createMeshGroup() {
  const geometry = new SphereGeometry(0.25, 16, 16);
  const material = new MeshStandardMaterial({ color: "indigo" });
  const group = new Group() as Group<Object3DEventMap> & {
    tick: (delta: number, elapsed: number) => void;
  };

  // Prototype sphere with oscillating z-position
  const protoSphere = new Mesh(geometry, material);
  let velocity = 2;
  protoSphere.position.set(0, -0.5, 2);
  protoSphere.tick = (delta: number) => {
    protoSphere.position.z += velocity * delta;
    if (protoSphere.position.z >= 6 || protoSphere.position.z <= -6) {
      velocity *= -1;
    }
  };
  group.add(protoSphere);

  // Cloned spheres in a circular arrangement
  const radSeconds = 4;
  for (let i = 0; i < 1; i += 0.05) {
    const sphere = protoSphere.clone();
    sphere.position.x += Math.cos(2 * Math.PI * i);
    sphere.position.y += Math.sin(2 * Math.PI * i);
    sphere.position.z += (i - 0.5) * 6;
    sphere.scale.multiplyScalar(0.01 + i);

    // Circular animation for cloned spheres
    sphere.tick = (delta: number, elapsed: number) => {
      const speed = 1;
      const radius = Math.sqrt(sphere.position.x ** 2 + sphere.position.y ** 2);
      sphere.position.x = radius * Math.cos(speed * elapsed + i * Math.PI * 2);
      sphere.position.y = radius * Math.sin(speed * elapsed + i * Math.PI * 2);
      sphere.rotation.y += radSeconds * delta;
    };

    group.add(sphere);
  }

  // Group's tick updates all children
  group.tick = (delta: number, elapsed: number) => {
    group.children.forEach((child) => {
      if (child.tick) {
        child.tick(delta, elapsed);
      }
    });
  };

  return group;
}

export { createMeshGroup };
