import * as THREE from "three"
console.log("JS Is Working!!!")
console.log("THREE = ", THREE)

//1. 创建场景
const scene = new THREE.Scene();
//2. 创建网格（2.1 创建几何图形；2.2创建材质）
const geometry = new THREE.BoxGeometry();
const meshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry,meshBasicMaterial);
scene.add(mesh);
//3. 创建相机
const size = {
    width:800,
    height:600
}
const perspectiveCamera = new THREE.PerspectiveCamera(75,size.width/size.height);
perspectiveCamera.position.x = 1.5
perspectiveCamera.position.y = 3
perspectiveCamera.position.z = 3
perspectiveCamera.lookAt(mesh.position)
scene.add(perspectiveCamera)
//4. 创建渲染器
const canvas = document.getElementById("webgl");
const webGLRenderer = new THREE.WebGLRenderer({
    canvas
});

webGLRenderer.setSize(size.width,size.height)
webGLRenderer.render(scene,perspectiveCamera);
