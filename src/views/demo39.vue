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
// import run from '@/assets/images/run.jpg';
// import earth from '@/assets/images/Earth.png';
// import modelData from "@/assets/data/model.json";
// import videoUrl from "@/assets/media/1086x716.mp4";
// import sintel from "@/assets/media/sintel.mp4";
// import normalImg from '@/assets/images/3_256.jpg';
// import earthDiffuse from "@/assets/images/earth_diffuse.png";
// import earthSpecular from "@/assets/images/earth_specular.png";
import px from "@/assets/images/px.jpg";
import nx from "@/assets/images/nx.jpg";
import py from "@/assets/images/py.jpg";
import ny from "@/assets/images/ny.jpg";
import pz from "@/assets/images/pz.jpg";
import nz from "@/assets/images/nz.jpg";
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
  name: 'demo39',
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
        let that = this;
        let canvasContainer = document.getElementById('canvas-container2');
        //   创建场景
        this.scene = new THREE.Scene();
      // var geometry = new THREE.PlaneGeometry(512, 256); //矩形平面
      // var geometry = new THREE.BoxGeometry(100,100,100);

      // 创建网格模型对象
      // var geometry = new THREE.BoxGeometry(100, 100, 100); //立方体
      // var geometry = new THREE.PlaneGeometry(204, 102); //矩形平面
      // var geometry = new THREE.SphereGeometry(100, 100, 100); //球体
      var geometry = new THREE.PlaneGeometry(128,128);
      // 创建纹理对象的像素数据
      var  dataWidth = 32;   //纹理宽度
      var dataHeight = 32;    //纹理高度
      var size = dataWidth * dataHeight;  //像素大小
      var data = new Uint8Array(size*4);
      console.log('打印scene1',this.scene);
      for (var i = 0; i < size*4 ; i += 4){
        data[i] = 255*Math.random();
        data[i+1] = 255*Math.random();
        data[i+2] = 255*Math.random();
        data[i+3] =  255*0.5;
      }
      // var data = new Float32Array(size*4);
      // console.log('打印scene1',this.scene);
      // for (var i = 0; i < size*4 ; i += 4){
      //   data[i] = Math.floor(255*Math.random())
      //   data[i+1] = Math.floor(255*Math.random());
      //   data[i+2] = Math.floor(255*Math.random());
      //   data[i+3] =  Math.random().toFixed(1);
      // }
      // 创建数据纹理对象   RGB格式 THRR.RGBFormat
      var texture = new THREE.DataTexture(data, dataWidth, dataHeight, THREE.RGBAFormat);
      texture.needsUpdate = true;

      
      var material = new THREE.MeshPhongMaterial({
        // shininess: 70,
        map: texture,
        // specularMap: textureSpecular
        transparent: true,
      });
      var mesh = new THREE.Mesh(geometry,material);
      this.scene.add(mesh);
      // this.scene.background = texture;
      console.log('打印scene2',this.scene);
      console.log('打印data',this.scene.children[0].material.map.image);
    /**
     * 光源设置
     */
    var ambient = new THREE.AmbientLight(0x444444);
    this.scene.add(ambient); //环境光对象添加到scene场景中

    // 方向光
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // 设置光源位置
    directionalLight.position.set(60, 100, 40);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 300;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 200;
    directionalLight.shadow.camera.bottom = -100;
    // 设置mapSize属性可以使阴影更清晰，不那么模糊
    // directionalLight.shadow.mapSize.set(1024,1024)
    
    this.scene.add(directionalLight);

        //坐标轴对象模拟   红色：x轴  绿色： Y轴  蓝： z轴
        let axesHelper = new THREE.AxesHelper( 500 );
        this.scene.add( axesHelper );

        // 相机设置
        let width = window.innerWidth;
        let height = window.innerHeight;
        let k = width/height; //宽高比
        let s = 150;  //三维显示范围控制系数 ,系数越大,显示的范围越大,  (视图上系数越大,三维模型显示越小)

        // this.camera = new THREE.OrthographicCamera(-s*k,s*k,s,-s,1,1000);
        // this.camera.position.set(200,300,200);
        this.camera = new THREE.PerspectiveCamera(60,width/height,1,1000);
        this.camera.position.set(200,300,200);
        this.camera.lookAt(this.scene.position);
        this.scene.add(this.camera);


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
        
        let render = function render(){
            that.renderer.render(that.scene,that.camera);
            // that.mesh.rotateY(0.01);
            requestAnimationFrame(render);
            // texture.offset.x -= 0.005;
            // if(texture.offset.x<-1){
            //   texture.offset.x = -texture.offset.x;
            // }
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
    document.title = "demo39---数据纹理对象";
    // console.log('model.json',modelData);
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