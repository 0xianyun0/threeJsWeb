const viewSize = {
    width:800,
    height:600
}


//场景
const scene  = new THREE.Scene();

//几何体
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
//材质
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
//三维网格
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

//相机
/*THREE.PerspectiveCamera(params1,params2);
    params1是FOV（Field Of View），即视野。视野越小，看地越远。视野越大，看得越多，边缘越畸形。
    params2是宽高比：宽除以高度
*/
const camera = new THREE.PerspectiveCamera(75, viewSize.width / viewSize.height);
/*
相机的默认坐标是（0，0，0）。网格的坐标也是三维坐标系原点。
    默认z轴方向是从屏幕指向自己的
    默认x轴方向是右边
    默认y轴方向是向上
 */
camera.position.z = 3;
camera.position.x = 1.5
camera.position.y = -1
scene.add(camera);


const canvas = document.querySelector(".webgl");
//渲染器
const renderer = new THREE.WebGLRenderer({
    canvas
});
//设置渲染器的尺寸
renderer.setSize(viewSize.width, viewSize.height);
//根据相机渲染场景
renderer.render(scene, camera);
