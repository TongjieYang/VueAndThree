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
  name: 'demo41',
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

        var geometry = new THREE.BoxGeometry(100,100,100);
        var material = new THREE.MeshLambertMaterial({
          color: 0x0000ff
        });
        this.mesh = new THREE.Mesh(geometry,material);
        this.scene.add(this.mesh);
        //点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(400, 200, 300); //点光源位置
        this.scene.add(point); //点光源添加到场景中
        //环境光
        var ambient = new THREE.AmbientLight(0x444444);
        this.scene.add(ambient);
        /**
         * 相机设置
         */
        var width = window.innerWidth; //窗口宽度
        var height = window.innerHeight; //窗口高度
        // var k = width / height; //窗口宽高比
        // var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
        // //创建相机对象
        // this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        // this.camera.position.set(200, 300, 200); //设置相机位置
        this.camera = new THREE.PerspectiveCamera(60,width/height,1,1000);
        this.camera.position.set(200, 300, 200); //设置相机位置
        this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
        this.scene.add(this.camera);
        /**
         * 创建渲染器对象
         */
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);//设置渲染区域尺寸
        renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
        canvasContainer.appendChild(renderer.domElement); //body元素中插入canvas对象


        // 打印scene
        console.log('打印scene',this.scene);

        // 渲染函数
        function render() {
            renderer.render(that.scene,that.camera);//执行渲染操作
            requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
        }
        render();
        //创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
        var controls = new THREE.OrbitControls(that.camera,renderer.domElement);
        controls.addEventListener('change', render);
        // onresize 事件会在窗口被调整大小时发生
        window.onresize=function(){
          // 重置渲染器输出画布canvas尺寸
          renderer.setSize(window.innerWidth,window.innerHeight);
          // 重置相机投影的相关参数
          k = window.innerWidth/window.innerHeight;//窗口宽高比
          that.camera.left = -s*k;
          that.camera.right = s*k;
          that.camera.top = s;
          that.camera.bottom = -s;
          // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
          // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
          // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
          that.camera.updateProjectionMatrix ();
        }; 
      },
    //   animate: function(){
    //       this.renderer.render(this.scene,this.camera);
    //   }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    document.title = "demo41-透视投影相机自适应";
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