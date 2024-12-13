import "./style.css";
import { World } from "./World/World";

function main() {
  const container = document.querySelector("#scene-container");

  if (container) {
    const world = new World(container);
    world.animate();
  }
}

main();
