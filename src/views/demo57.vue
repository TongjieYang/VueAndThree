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
// import grass from "@/assets/images/grass.jpg";
// import tree from "@/assets/images/tree.png";
// import rain from "@/assets/images/rain.png";
import modelData from "@/assets/data/model11-2.json";
import { MeshLambertMaterial, PlaneGeometry, BoxBufferGeometry } from 'three';


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
  name: 'demo57',
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


        
       var  group = new THREE.Group();
       var loader = new THREE.ObjectLoader();
       var mixer;
      loader.parse(modelData,function(obj){
          console.log(obj)
        obj.scale.set(15, 15, 15);
        that.scene.add(obj);
        // obj作为混合器的参数，可以播放obj包含的帧动画数据
        mixer = new THREE.AnimationMixer(obj);
        // obj.animations[0]：获得剪辑clip对象
        // // 剪辑clip作为参数，通过混合器clipAction方法返回一个操作对象AnimationAction
        var AnimationAction = mixer.clipAction(obj.animations[0]);
        // AnimationAction.loop = THREE.LoopOnce; //不循环播放
        // AnimationAction.clampWhenFinished=true;//暂停在最后一帧播放的状态
        AnimationAction.play();
       });
      

    // 辅助坐标系
    this.scene.add(new THREE.AxesHelper(300));

        //点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(400, 200, 800); //点光源位置
        this.scene.add(point); //点光源添加到场景中
        //环境光
        var ambient = new THREE.AmbientLight(0x888888);
        this.scene.add(ambient);
        /**
         * 相机设置
         */
        var width = window.innerWidth; //窗口宽度
        var height = window.innerHeight; //窗口高度
        var k = width / height; //窗口宽高比
        var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        // this.camera.position.set(200, 300, 200); //设置相机位置
        // this.camera = new THREE.PerspectiveCamera(60,width/height,1,1000);
        this.camera.position.set(200, 300, 200); //设置相机位置
        this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
        this.scene.add(this.camera);


        // var width = window.innerWidth; //窗口宽度
        // var height = window.innerHeight; //窗口高度
        // /**透视投影相机对象*/
        // this.camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000);
        // this.camera.position.set(292,109,268); //设置相机位置
        // this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
        // this.scene.add(this.camera);
        /**
         * 创建渲染器对象
         */
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);//设置渲染区域尺寸
        renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
        canvasContainer.appendChild(renderer.domElement); //body元素中插入canvas对象


        // 打印scene
        console.log('打印scene',this.scene);
        var clock  = new THREE.Clock();
        // 渲染函数
        function render() {
            var timeBucked = clock.getDelta();
            

            
            renderer.render(that.scene,that.camera);//执行渲染操作
            requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧



            //clock.getDelta()方法获得两帧的时间间隔
            // 更新混合器相关的时间
           
            if(mixer){
               mixer.update(clock.getDelta());
            }
            
        }
        render();
        //创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
        var controls = new THREE.OrbitControls(that.camera,renderer.domElement);
        controls.addEventListener('change', render);
        
      },
    //   animate: function(){
    //       this.renderer.render(this.scene,this.camera);
    //   }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    document.title = "demo57-----解析模型包含的帧动画";
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