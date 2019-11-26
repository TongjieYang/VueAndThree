<!--  -->
<template>
  <div class="canvas-container02" id="canvas-container2"></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import * as three from "three";
// import { OrbitControls } from "three-orbit-controls";

// import { BoxGeometry, BoxBufferGeometry, DoubleSide } from "three";
import  'three-orbitcontrols'

// import {
//   Scene,
//   WebGLRenderer,
//   PerspectiveCamera,
//   BoxGeometry,
//   MeshBasicMaterial,
//   Mesh
// } from 'three';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'demo18',
  components: {},
  data() {
    //这里存放数据
    return {
        scene: null,
        mesh: null,
        camera: null,
        renderer: null
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      init: function(){
        let canvasContainer = document.getElementById('canvas-container2');
        //   创建场景
        this.scene = new three.Scene();
        /**
     * 创建网格模型
     */
    let geometry = new three.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    let material = new three.MeshLambertMaterial({
      color: 0x0099ff,
    });
    var mesh1 = new three.Mesh(geometry, material);
    this.scene.add(mesh1);
    mesh1.translateX(-150);
    var mesh2 = new three.Mesh(geometry, material);
    this.scene.add(mesh2);
    mesh2.translateX(150);
    // var newMesh = mesh.clone();
    //   newMesh.translateX(i*25);
    //   this.scene.add(newMesh);
    // console.log(this.scene);
    // this.mesh.scale.set(0.5,1.5,2);

    // this.mesh.position.set(100,100,100);

    // this.mesh.translateX(100);


    //向量Vector3对象表示方向
    // var axis = new three.Vector3(1,1,1);
    // axis.normalize();//向量归一化
    // this.mesh.translateOnAxis(axis,200);

    // this.mesh.rotateY(Math.PI/4);
    // this.mesh.rotateOnAxis(axis,Math.PI/4);

        // 光源设置
        // 点光源
        /**
     * 光源设置
     */
    // 点光源
      var spotLight = new three.SpotLight(0xffffff);
      spotLight.position.set(200,200,200);
      // spotLight.target = mesh2;
       var targetObject = new three.Object3D();
    targetObject.translateX(150);
    console.log('打印targetObject',targetObject);
    this.scene.add(targetObject);
    spotLight.target = targetObject;
      spotLight.angle = Math.PI/6;
      this.scene.add(spotLight);

      // 方向光
      // var directionalLight = new three.DirectionalLight(0xffffff,1);
      // directionalLight.position.set(80,100,50);
      // directionalLight.target = mesh2;
      // this.scene.add(directionalLight);

        // // 环境光
        // let ambient = new three.AmbientLight(0x444444);
        // // 环境光添加到场景中
        // this.scene.add(ambient);

        //坐标轴对象模拟   红色：x轴  绿色： Y轴  蓝： z轴
        let axesHelper = new three.AxesHelper( 200 );
        this.scene.add( axesHelper );

        // 相机设置
        let width = window.innerWidth;
        let height = window.innerHeight;
        let k = width/height; //宽高比
        let s = 300;  //三维显示范围控制系数 ,系数越大,显示的范围越大,  (视图上系数越大,三维模型显示越小)

        this.camera = new three.OrthographicCamera(-s*k,s*k,s,-s,1,1000);
        this.camera.position.set(200,300,200);
        this.camera.lookAt(this.scene.position);
        // this.scene.add(this.camera);


        // 创建渲染器对象
        this.renderer = new three.WebGLRenderer();
        this.renderer.setSize(width,height); //设置渲染尺寸大小
        this.renderer.setClearColor(0xb9d3ff,1);  //设置背景颜色

        console.log(this.scene);
        canvasContainer.appendChild(this.renderer.domElement); //body元素中插入canvas对象

        

        // 框架1  start
        // let render = function render(){
        //     that.renderer.render(that.scene,that.camera);
        //     // that.mesh.rotateY(0.01);
        //     requestAnimationFrame(render);
        // }
        // render();
        // //创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
        // let controls = new three.OrbitControls(this.camera,this.renderer.domElement);
        // console.log(controls);
        // 框架1  end


        // 框架2  start
        let that = this;
        let render = function render(){
            that.renderer.render(that.scene,that.camera);
            // that.mesh.rotateY(0.01);
            // requestAnimationFrame(render);
        }
        render();
        //创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
        let controls = new three.OrbitControls(this.camera,this.renderer.domElement);
        console.log(controls);
        //监听鼠标事件，触发渲染函数，更新canvas画布渲染效果
        controls.addEventListener('change', render);
        // 框架  end


        
      },
    //   animate: function(){
    //       this.renderer.render(this.scene,this.camera);
    //   }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    document.title = "demo18----聚光光源，方向光";
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      this.init();
      // console.log(OrbitControls);
    //   this.animate();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
</style>