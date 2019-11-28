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
  name: 'demo16',
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
    // let geometry = new three.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    // let material = new three.MeshLambertMaterial({
    //   color: 0x0099ff,
    // });
    // this.mesh = new three.Mesh(geometry, material);
    // this.scene.add(this.mesh);



    /**
    * 创建网格模型
    */
   var geometry2 = new three.ConeGeometry(20, 50, 4, true);
   var material2 = new three.MeshBasicMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.5,
    wireframe:false
    //    wireframe: true
    //    透明度
    //    是否透明
   });
   //   material.x = -100;
   var mesh2 = new three.Mesh(geometry2, material2);
   console.log(geometry2);
   var material3 = new three.LineBasicMaterial({
    //    color: 0x00ff00,
    color: 0x00ff00,
    linewidth: 10,
    wireframe:false
    //    线宽
    //    线颜色
   });
   //   material.x = -100;
  //  var geometry3 = new three.Geometry(); 
   var geometry3 = new three.EdgesGeometry( geometry2 );
  //  var geometry3 = new three.WireframeGeometry( geometry2 );
    // setFromPoints方法从points中提取数据改变几何体的顶点属性verticess
    // geometry3.setFromPoints(geometry2.vertices);
   var mesh3 = new three.Line(geometry3, material3);
   var group1 = new three.Group();
   group1.add(mesh2, mesh3);
   //   mesh.rotateY(Math.PI);
   var vec = new three.Vector3(1, 0, 1);
   vec.normalize();
   group1.rotateOnAxis(vec, Math.PI);
   this.scene.add(group1);
    // this.mesh.scale.set(0.5,1.5,2);

    // this.mesh.position.set(100,100,100);

    // this.mesh.translateX(100);


    //向量Vector3对象表示方向
    var axis = new three.Vector3(1,1,1);
    axis.normalize();//向量归一化
    // this.mesh.translateOnAxis(axis,200);

    // this.mesh.rotateY(Math.PI/4);
    // this.mesh.rotateOnAxis(axis,Math.PI/4);

        // 光源设置
        // 点光源
        /**
     * 光源设置
     */
    // 点光源
    var point = new three.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    this.scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new three.AmbientLight(0x444444);
    this.scene.add(ambient);


        let sphereSize = 50;
        let pointLightHelper = new three.PointLightHelper( point, sphereSize );
        this.scene.add( pointLightHelper );

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
        let s = 150;  //三维显示范围控制系数 ,系数越大,显示的范围越大,  (视图上系数越大,三维模型显示越小)

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
    document.title = "demo16----旋转平移缩放";
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