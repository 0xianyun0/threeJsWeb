import * as THREE from "three"
const canvas = document.getElementById("webgl");


const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry();

const meshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000,});
const mesh = new THREE.Mesh(geometry,meshBasicMaterial);


console.log("场景中心到物体的距离（归一之前）：" + mesh.position.length())
mesh.position.normalize()
console.log("场景中心到物体的距离（归一之后）：" + mesh.position.length())

const axesHelper = new THREE.AxesHelper(1);





scene.add(axesHelper);
scene.add(mesh);


const size = {
    width:800,
    height:600
}
const perspectiveCamera = new THREE.PerspectiveCamera(75,size.width/size.height);
//mesh.position.distanceTo(perspectiveCamera.position) 相机到物体之间的距离
console.log("相机到物体的距离（z = 0）：" + mesh.position.distanceTo(perspectiveCamera.position))


perspectiveCamera.position.z = 4


console.log("相机到物体的距离（z = 3）：" + mesh.position.distanceTo(perspectiveCamera.position))


scene.add(perspectiveCamera)

const webGLRenderer = new THREE.WebGLRenderer({
    canvas
});

webGLRenderer.setSize(size.width,size.height)


/*
通过帧的回调函数，来制作动画。
window.requestAnimationFrame 每帧输出的重绘之前会被浏览器调用
 */
/*
通过计算每帧之间的时间差，来对帧率动画进行补偿。
    因为帧率越高，deltaTime 越小，此时转动角度也越小。
    帧率越低，deltaTime 越大，此时转动角度越大。刚好可以补偿因帧率过低，而导致转动角度小的问题。
 */
//region 时间差补偿法
// let time = Date.now();
// const deltaTimeCompensationTick = ()=>{
//     const currentTime = Date.now();
//     const deltaTime = currentTime - time;
//     time = currentTime;
//     console.log(deltaTime)
//
//     console.log("tick is running")
//     // mesh.position.x += 0.001
//     // mesh.position.y += 0.001
//     // mesh.position.z += 0.001
//     // mesh.scale.x += 0.001
//     mesh.rotation.x += 0.001 * deltaTime;
//     //渲染
//     webGLRenderer.render(scene,perspectiveCamera);
//
//     window.requestAnimationFrame(tick);
// }
// deltaTimeCompensationTick()
//endregion

//region THREE.clock()
const clock = new THREE.Clock();//每次初始化的时候，都会从0重新开始计时
const clockTick = () => {
    const elapsedTime = clock.getElapsedTime();//从 clock 中获取消逝的时间
    console.log(elapsedTime)
    // mesh.rotation.y = elapsedTime;
    //让几何体一秒中，以y轴为旋转轴，旋转一周。
    /*
    弧度和角度的关系：π 弧度 = 180°
    弧度转角度：弧度 * （180° / π）
    角度转弧度：角度 * （π / 180°）
     */
    mesh.rotation.y = elapsedTime * (Math.PI * 2);
    webGLRenderer.render(scene, perspectiveCamera);
    window.requestAnimationFrame( clockTick );
}
clockTick();
//endregion
