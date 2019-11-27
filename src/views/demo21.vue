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
  name: 'demo21',
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
    // 头部网格模型和组
    var headMesh = sphereMesh(10, 0, 0, 0);
    headMesh.name = "脑壳"
    var leftEyeMesh = sphereMesh(1, 8, 5, 4);
    leftEyeMesh.name = "左眼"
    var rightEyeMesh = sphereMesh(1, 8, 5, -4);
    rightEyeMesh.name = "右眼"
    var headGroup = new three.Group();
    headGroup.name = "头部"
    headGroup.add(headMesh, leftEyeMesh, rightEyeMesh);
    // 身体网格模型和组
    var neckMesh = cylinderMesh(3, 10, 0, -15, 0);
    neckMesh.name = "脖子"
    var bodyMesh = cylinderMesh(14, 30, 0, -35, 0);
    bodyMesh.name = "腹部"
    var leftLegMesh = cylinderMesh(4, 60, 0, -80, -7);
    leftLegMesh.name = "左腿"
    var rightLegMesh = cylinderMesh(4, 60, 0, -80, 7);
    rightLegMesh.name = "右腿"
    var legGroup = new three.Group();
    legGroup.name = "腿"
    legGroup.add(leftLegMesh, rightLegMesh);
    var bodyGroup = new three.Group();
    bodyGroup.name = "身体"
    bodyGroup.add(neckMesh, bodyMesh, legGroup);
    // 人Group
    var personGroup = new three.Group();
    personGroup.name = "人"
    personGroup.add(headGroup, bodyGroup)
    personGroup.translateY(50)
    this.scene.add(personGroup);
    console.log(this.scene);
    // 遍历场景对象scene  obj：每次遍历的对象
    this.scene.traverse(function(obj) {
      if (obj.type === "Group") {
        console.log(obj.name);
      }
      if (obj.type === "Mesh") {
        console.log('  ' + obj.name);
        obj.material.color.set(0xffff00);
      }
      if (obj.name === "左眼" | obj.name === "右眼") {
        obj.material.color.set(0x000000)
      }
      // 打印id属性
      // console.log(obj.id);
      // 打印该对象的父对象
      // console.log(obj.parent);
      // 打印该对象的子对象
      // console.log(obj.children);
    })
    // 打印场景id号   id号和创建对象的顺序有关
    // console.log(scene.id);
    // console.log(headMesh.id);
    // console.log(leftEyeMesh.id);
    // console.log(rightEyeMesh.id);


    // 遍历查找对象的子对象，返回name对应的对象（name是可以重名的，返回第一个）
    var nameNode = this.scene.getObjectByName ( "左腿" );
    nameNode.material.color.set(0xff0000);
    // 遍历查找对象的子对象，并返回id对应的对象
    var idNode = this.scene.getObjectById ( 4 );
    console.log(idNode);
    // 球体网格模型创建函数
    function sphereMesh(R, x, y, z) {
      var geometry = new three.SphereGeometry(R, 25, 25); //球体几何体
      var material = new three.MeshPhongMaterial({
        color: 0x0000ff
      }); //材质对象Material
      var mesh = new three.Mesh(geometry, material); // 创建网格模型对象
      mesh.position.set(x, y, z);
      return mesh;
    }
    // 圆柱体网格模型创建函数
    function cylinderMesh(R, h, x, y, z) {
      var geometry = new three.CylinderGeometry(R, R, h, 25, 25); //球体几何体
      var material = new three.MeshPhongMaterial({
        color: 0x0000ff
      }); //材质对象Material
      var mesh = new three.Mesh(geometry, material); // 创建网格模型对象
      mesh.position.set(x, y, z);
      return mesh;
    }
    // 坐标系辅助显示
    // var axesHelper = new three.AxesHelper(200);
    // this.scene.add(axesHelper);
    /**
     * 光源设置
     */
    //点光源
    var point = new three.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    this.scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new three.AmbientLight(0x444444);
    this.scene.add(ambient);
    // console.log(point.id);
    // console.log(ambient.id);

        //坐标轴对象模拟   红色：x轴  绿色： Y轴  蓝： z轴
        let axesHelper = new three.AxesHelper( 500 );
        this.scene.add( axesHelper );

        // 相机设置
        let width = window.innerWidth;
        let height = window.innerHeight;
        let k = width/height; //宽高比
        let s = 150;  //三维显示范围控制系数 ,系数越大,显示的范围越大,  (视图上系数越大,三维模型显示越小)

        this.camera = new three.OrthographicCamera(-s*k,s*k,s,-s,1,1000);
        this.camera.position.set(200,300,200);
        this.camera.lookAt(this.scene.position);
        // this.scene.add(this.camera);


        // 创建渲染器对象
        this.renderer = new three.WebGLRenderer();
        this.renderer.setSize(width,height); //设置渲染尺寸大小
        this.renderer.setClearColor(0xb9d3ff,1);  //设置背景颜色
        this.renderer.shadowMap.enabled = true;
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
    document.title = "demo21----对象节点命名，查找，遍历";
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