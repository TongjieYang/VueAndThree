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
  name: 'demo09',
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
        var geometry = new three.Geometry(); //声明一个几何体对象Geometry

        var p1 = new three.Vector3(0, 0, 0); //顶点1坐标
    var p2 = new three.Vector3(0, 100, 0); //顶点2坐标
    var p3 = new three.Vector3(50, 0, 0); //顶点3坐标
    var p4 = new three.Vector3(0, 0, 100); //顶点4坐标
    //顶点坐标添加到geometry对象
    geometry.vertices.push(p1, p2, p3, p4);

    // Color对象表示顶点颜色数据
    var color1 = new three.Color(0x00ff00); //顶点1颜色——绿色
    var color2 = new three.Color(0xff0000); //顶点2颜色——红色
    var color3 = new three.Color(0x0000ff); //顶点3颜色——蓝色
    var color4 = new three.Color(0xffff00); //顶点3颜色——黄色
    //顶点颜色数据添加到geometry对象
    geometry.colors.push(color1, color2, color3, color4);

    // Face3构造函数创建一个三角面
    var face1 = new three.Face3(0, 1, 2);
    //设置三角面face1每个顶点的法向量
    var n1 = new three.Vector3(0, 0, -1);
    var n2 = new three.Vector3(0, 0, -1);
    var n3 = new three.Vector3(0, 0, -1);
    // 设置三角面Face3三个顶点的法向量
    face1.vertexNormals.push(n1, n2, n3);
    // 设置三角面face1三个顶点的颜色
    // face1.vertexColors = [
    //   new three.Color(0xffff00),
    //   new three.Color(0xff00ff),
    //   new three.Color(0x00ffff),
    // ]

    // 三角面2
    var face2 = new three.Face3(0, 2, 3);
    // 设置三角面法向量
    face2.normal = new three.Vector3(0, -1, 0);
    // face2.color = new three.Color(0x00ff00);

    //三角面face1、face2添加到几何体中
    geometry.faces.push(face1, face2);

    //材质对象
    var material = new three.MeshLambertMaterial({
      // color: 0xffff00,
      vertexColors: three.VertexColors, //以顶点颜色为准
      // vertexColors: three.FaceColors,
      side: three.DoubleSide, //两面可见
    });
    //网格模型对象
    var mesh = new three.Mesh(geometry, material);
    this.scene.add(mesh); //网格模型对象添加到场景中

        // 光源设置
        // 点光源
        let point = new three.PointLight(0xffffff);
        point.position.set(-400,-200,-300); //点光源位置
        console.log(point);
        // 点光源添加到场景中
        this.scene.add(point);


        let sphereSize = 50;
        let pointLightHelper = new three.PointLightHelper( point, sphereSize );
        this.scene.add( pointLightHelper );

        // 环境光
        let ambient = new three.AmbientLight(0x444444);
        // 环境光添加到场景中
        this.scene.add(ambient);

        //坐标轴对象模拟   红色：x轴  绿色： Y轴  蓝： z轴
        let axesHelper = new three.AxesHelper( 200 );
        this.scene.add( axesHelper );

        // 相机设置
        let width = window.innerWidth;
        let height = window.innerHeight;
        let k = width/height; //宽高比
        let s = 150;  //三维显示范围控制系数 ,系数越大,显示的范围越大,  (视图上系数越大,三维模型显示越小)

        this.camera = new three.OrthographicCamera(-s*k,s*k,-s,s,1,1000);
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
    document.title = "demo09---设置Face3 顶点索引，法向量";
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