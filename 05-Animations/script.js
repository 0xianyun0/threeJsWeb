import * as THREE from "three"

const canvas = document.getElementById("webgl");


const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry();

const meshBasicMaterial = new THREE.MeshBasicMaterial({color: 0xff0000,});
const mesh = new THREE.Mesh(geometry, meshBasicMaterial);


console.log("场景中心到物体的距离（归一之前）：" + mesh.position.length())
mesh.position.normalize()
console.log("场景中心到物体的距离（归一之后）：" + mesh.position.length())

const axesHelper = new THREE.AxesHelper(1);


scene.add(axesHelper);
scene.add(mesh);


const size = {
    width: 800,
    height: 600
}
const perspectiveCamera = new THREE.PerspectiveCamera(75, size.width / size.height);
//mesh.position.distanceTo(perspectiveCamera.position) 相机到物体之间的距离
console.log("相机到物体的距离（z = 0）：" + mesh.position.distanceTo(perspectiveCamera.position))


perspectiveCamera.position.z = 4


console.log("相机到物体的距离（z = 3）：" + mesh.position.distanceTo(perspectiveCamera.position))


scene.add(perspectiveCamera)

const webGLRenderer = new THREE.WebGLRenderer({
    canvas
});

webGLRenderer.setSize(size.width, size.height)
webGLRenderer.render(scene, perspectiveCamera);
