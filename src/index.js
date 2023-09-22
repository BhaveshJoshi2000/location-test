import * as THREE from "three";
import * as THREEx from "../node_modules/@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js";

function main() {
  const canvas = document.getElementById("canvas1");

  const debug = document.getElementById("debug");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas });

  const arjs = new THREEx.LocationBased(scene, camera, { gpsMinAccuracy: 30 });
  const cam = new THREEx.WebcamRenderer(renderer, "#video1");

  const geom = new THREE.BoxGeometry(20, 20, 20);
  const mtl = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const box = new THREE.Mesh(geom, mtl);

  const deviceOrientationControls = new THREEx.DeviceOrientationControls(
    camera
  );

  const first = true;
  arjs.on("gpsupdate", (pos) => {
    if (first) {
      setupObjects(pos.coords.longitude, pos.coords.latitude);
      alert("gps detected");
      console.log("gps detected");
      first = false;
    }
  });

  // Start the GPS
  arjs.startGps();

  // 12.956798781270836, 80.24751979974918;

  function setupObjects(longitude, latitude) {
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    // arjs.add(new THREE.Mesh(geom, material), longitude, latitude + 0.001); // slightly north

    arjs.add(
      new THREE.Mesh(geom, material),
      80.24751979974918,
      12.956798781270836
    ); // slightly north
  }

  function render() {
    if (
      canvas.width != canvas.clientWidth ||
      canvas.height != canvas.clientHeight
    ) {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      const aspect = canvas.clientWidth / canvas.clientHeight;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    }
    deviceOrientationControls.update();

    cam.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();

// function main() {
//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera(80, 2, 0.1, 50000);
//   const renderer = new THREE.WebGLRenderer({
//     canvas: document.querySelector("#canvas1"),
//   });

//   const geom = new THREE.BoxGeometry(20, 20, 20);

//   // const arjs = new THREEx.LocationBased(scene, camera);

//   // You can change the minimum GPS accuracy needed to register a position - by default 1000m
//   // const arjs = new THREEx.LocationBased(scene, camera. { gpsMinAccuracy: 30 } );
//   const cam = new THREEx.WebcamRenderer(renderer, "#video1");

//   const mouseStep = THREE.MathUtils.degToRad(5);

//   let orientationControls;

//   // Orientation controls only work on mobile device
//   if (isMobile()) {
//     orientationControls = new THREEx.DeviceOrientationControls(camera);
//   }

//   let fake = null;
//   let first = true;

//   arjs.on("gpsupdate", (pos) => {
//     if (first) {
//       setupObjects(pos.coords.longitude, pos.coords.latitude);
//       first = false;
//     }
//   });

//   arjs.on("gpserror", (code) => {
//     alert(`GPS error: code ${code}`);
//   });

//   // Uncomment to use a fake GPS location
//   fake = { lat: 51.05, lon: -0.72 };
//   if (fake) {
//     arjs.fakeGps(fake.lon, fake.lat);
//   } else {
//     arjs.startGps();
//   }

//   let mousedown = false,
//     lastX = 0;

//   // Mouse events for testing on desktop machine
//   if (!isMobile()) {
//     window.addEventListener("mousedown", (e) => {
//       mousedown = true;
//     });

//     window.addEventListener("mouseup", (e) => {
//       mousedown = false;
//     });

//     window.addEventListener("mousemove", (e) => {
//       if (!mousedown) return;
//       if (e.clientX < lastX) {
//         camera.rotation.y += mouseStep;
//         if (camera.rotation.y < 0) {
//           camera.rotation.y += 2 * Math.PI;
//         }
//       } else if (e.clientX > lastX) {
//         camera.rotation.y -= mouseStep;
//         if (camera.rotation.y > 2 * Math.PI) {
//           camera.rotation.y -= 2 * Math.PI;
//         }
//       }
//       lastX = e.clientX;
//     });
//   }

//   function isMobile() {
//     if (
//       /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//         navigator.userAgent
//       )
//     ) {
//       // true for mobile device
//       return true;
//     }
//     return false;
//   }

//   function render(time) {
//     resizeUpdate();
//     if (orientationControls) orientationControls.update();
//     cam.update();
//     renderer.render(scene, camera);
//     requestAnimationFrame(render);
//   }

//   function resizeUpdate() {
//     const canvas = renderer.domElement;
//     const width = canvas.clientWidth,
//       height = canvas.clientHeight;
//     if (width != canvas.width || height != canvas.height) {
//       renderer.setSize(width, height, false);
//     }
//     camera.aspect = canvas.clientWidth / canvas.clientHeight;
//     camera.updateProjectionMatrix();
//   }

//   function setupObjects(longitude, latitude) {
//     // Use position of first GPS update (fake or real)
//     const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// arjs.add(new THREE.Mesh(geom, material), longitude, latitude + 0.0001); // slightly north
//   }

//   requestAnimationFrame(render);
// }

// main();
