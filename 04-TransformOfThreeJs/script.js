import * as THREE from "three"
const canvas = document.getElementById("webgl");


const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry();

const meshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000,});
const mesh = new THREE.Mesh(geometry,meshBasicMaterial);
// 写法一
// mesh.position.z = 0
// mesh.position.x = 1
// mesh.position.y = -1
//写法二
mesh.position.set(1,-1,0)

console.log("场景中心到物体的距离（归一之前）：" + mesh.position.length())

/*
mesh.position.z = -1
mesh.position.x = 1
mesh.position.y = -1
注意移动物体相关的代码应该放在渲染之前，渲染就相当于用渲染器给空间中的物体拍照定格，
定格之后，移动物体，拍的照片上是观察不到的。
 */
/*
归一化：会保持物体相对于原点的方向不变，并将它移动到距离原点为 1 的位置。
 */
mesh.position.normalize()
// mesh.position.length() 物体到场景中心的距离
console.log("场景中心到物体的距离（归一之后）：" + mesh.position.length())

//轴辅助工具：红轴是x，绿轴是y，蓝色是z轴.可以传入数字，参数 1 表示坐标轴的长度为 1 个世界单位，AxesHelper
// 会据此绘制长度相等的 X、Y、Z 三条辅助轴。
const axesHelper = new THREE.AxesHelper(1);

//缩放
// mesh.scale.x = 2
// mesh.scale.y = 2
// mesh.scale.z = 2
mesh.scale.set(2,1,0.5)

//旋转
//改变默认旋转的顺序,注意参数需要大写，小写的话，无法被识别
mesh.rotation.reorder('XZY')
mesh.rotation.x = Math.PI/3;
mesh.rotation.y = Math.PI/3;
mesh.rotation.z = Math.PI/3;

/*
 * 将多个物体放到同一个分组中进行控制。
 *
 */
const group = new THREE.Group();
group.add(mesh);
const cub = new THREE.Mesh(
    new THREE.BoxGeometry(-1,0.5,-1),
    new THREE.MeshBasicMaterial({ color: 0xff0000}))
group.add(cub)
group.position.set(1,0,0)


scene.add(axesHelper);
// scene.add(mesh);
scene.add(group);

const size = {
    width:800,
    height:600
}
const perspectiveCamera = new THREE.PerspectiveCamera(75,size.width/size.height);
//mesh.position.distanceTo(perspectiveCamera.position) 相机到物体之间的距离
console.log("相机到物体的距离（z = 0）：" + mesh.position.distanceTo(perspectiveCamera.position))


perspectiveCamera.position.z = 3


console.log("相机到物体的距离（z = 3）：" + mesh.position.distanceTo(perspectiveCamera.position))


scene.add(perspectiveCamera)

const webGLRenderer = new THREE.WebGLRenderer({
    canvas
});

webGLRenderer.setSize(size.width,size.height)
webGLRenderer.render(scene,perspectiveCamera);

