<!--  -->
<template>
  <div class="canvas-container02" id="canvas-container2"></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import * as THREE from "three";
// import { OrbitControls } from "THREE-orbit-controls";

// import { BoxGeometry, BoxBufferGeometry, DoubleSide } from "THREE";
import  'three-orbitcontrols'
// import { TextureLoader } from 'three';
import earth from '@/assets/images/Earth.png'
// import {
//   Scene,
//   WebGLRenderer,
//   PerspectiveCamera,
//   BoxGeometry,
//   MeshBasicMaterial,
//   Mesh
// } from 'THREE';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'demo25',
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
        this.scene = new THREE.Scene();
        /**
     * 创建网格模型
     */
     var geometry = new THREE.Geometry(); //创建一个空几何体对象
     /**顶点坐标(纹理映射位置)*/
     var p1 = new THREE.Vector3(0,0,0); //顶点1坐标
     var p2 = new THREE.Vector3(160,0,0); //顶点2坐标
     var p3 = new THREE.Vector3(160,80,0); //顶点3坐标
     var p4 = new THREE.Vector3(0,80,0); //顶点4坐标
     geometry.vertices.push(p1,p2,p3,p4); //顶点坐标添加到geometry对象
     /** 三角面1、三角面2*/
     var normal = new THREE.Vector3( 0, 0, 1 ); //三角面法向量
     var face0 = new THREE.Face3( 0, 1, 2, normal); //三角面1
     var face1 = new THREE.Face3( 0, 2, 3, normal); //三角面2
     geometry.faces.push( face0,face1 ); //三角面1、2添加到几何体
     /**纹理坐标*/
     var t0 = new THREE.Vector2(0,0);//图片左下角
     var t1 = new THREE.Vector2(1,0);//图片右下角
     var t2 = new THREE.Vector2(1,1);//图片右上角
     var t3 = new THREE.Vector2(0,1);//图片左上角
     var uv1 = [t0,t1,t2];//选中图片一个三角区域像素——映射到三角面1
     var uv2 = [t0,t2,t3];//选中图片一个三角区域像素——映射到三角面2
     geometry.faceVertexUvs[0].push(uv1,uv2);//纹理坐标传递给纹理三角面属性

    // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
    var textureLoader = new THREE.TextureLoader();
    // 执行load方法，加载纹理贴图成功后，返回一个threejs对象Texture
    var texture = textureLoader.load(earth);
    var material = new THREE.MeshLambertMaterial({
      // 设置纹理贴图：Texture对象作为材质map属性的属性值
      map: texture,
    }); //材质对象Material
    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    this.scene.add(mesh); //网格模型添加到场景中
    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    this.scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    this.scene.add(ambient);

        //坐标轴对象模拟   红色：x轴  绿色： Y轴  蓝： z轴
        let axesHelper = new THREE.AxesHelper( 500 );
        this.scene.add( axesHelper );

        // 相机设置
        let width = window.innerWidth;
        let height = window.innerHeight;
        let k = width/height; //宽高比
        let s = 150;  //三维显示范围控制系数 ,系数越大,显示的范围越大,  (视图上系数越大,三维模型显示越小)

        this.camera = new THREE.OrthographicCamera(-s*k,s*k,s,-s,1,1000);
        this.camera.position.set(200,300,200);
        this.camera.lookAt(this.scene.position);
        // this.scene.add(this.camera);


        // 创建渲染器对象
        this.renderer = new THREE.WebGLRenderer();
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
        // let controls = new THREE.OrbitControls(this.camera,this.renderer.domElement);
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
        let controls = new THREE.OrbitControls(this.camera,this.renderer.domElement);
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
    document.title = "demo25---Geometry创建三角面UV坐标";
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