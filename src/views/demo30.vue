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
import grass from '@/assets/images/grass.jpg';
import modelData from "@/assets/data/model.json";
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
  name: 'demo30',
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
        // let geometry = new THREE.BoxGeometry(100,100,100);
        let geometry = new THREE.PlaneGeometry(1000,1000); 
        // let geometry = new THREE.SphereGeometry(60,25,25);

        let TextureLoader = new THREE.TextureLoader();

        var texture = TextureLoader.load(grass);
        // texture.offset = new THREE.Vector2(0.3,0.1);
        // 设置阵列模式   默认ClampToEdgeWrapping  RepeatWrapping：阵列  镜像阵列：MirroredRepeatWrapping
        // texture.wrapS = THREE.RepeatWrapping;
        // texture.wrapT = THREE.RepeatWrapping;
        // uv两个方向纹理重复数量
        // texture.repeat.set(4, 2);
        // texture.offset = new THREE.Vector2(0.14,0.5);
        // texture.center.set(0.5,0.5);
        // texture.rotation = Math.PI/4;
        // texture.rotation = Math.PI/2;
        // console.log(texture);
        // console.log(texture.center);
        // texture.rotation = Math.PI/8;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10,10);
        var material = new THREE.MeshLambertMaterial({
          map: texture
        });

        console.log(texture.matrix);
        console.log(geometry.faceVertexUvs);
        var mesh = new THREE.Mesh(geometry,material);
        this.scene.add(mesh);
        mesh.rotateX(-Math.PI/2);
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
    document.title = "demo30---草地效果";
    console.log('model.json',modelData);
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