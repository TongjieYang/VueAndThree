<template>
  <div class="canvas-container" id="canvas-container">
    
  </div>
</template>

<script>
// @ is an alias to /src
import * as Three from 'three'; 
import {OrbitControls} from 'three-orbit-controls';
import { BoxGeometry, BoxBufferGeometry } from 'three';


// import {
//   Scene,
//   WebGLRenderer,
//   PerspectiveCamera,
//   BoxGeometry,
//   MeshBasicMaterial,
//   Mesh
// } from 'three';

export default {
  name: 'unit1',
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      mesh: null
    }
  },
  components: {
    // HelloWorld
  },
  created: function(){

  },
  mounted: function(){
    this.init();
    this.animate();
  },
  methods: {
    init: function(){
      let canvasContainer = document.getElementById('canvas-container')
      // 创建场景
      this.scene = new Three.Scene();
      // 创建geometry
      let geometry = new Three.BoxBufferGeometry(100,100,100);
      // 创建材质
      let material = new Three.MeshLambertMaterial({
        color: 0x0099ff,
      });
      // 创建mesh网格对象
      this.mesh = new Three.Mesh(geometry,material);

      this.scene.add(this.mesh);


      /**
      * 光源设置
      */
      //点光源
      let point = new Three.PointLight(0xffffff);
      point.position.set(400, 200, 300); //点光源位置
      this.scene.add(point); //点光源添加到场景中
      //环境光
      let ambient = new Three.AmbientLight(0x444444);
      this.scene.add(ambient);


      /**
       * 相机设置
       */
      let width = window.innerWidth; //窗口宽度
      let height = window.innerHeight; //窗口高度
      let k = width / height; //窗口宽高比
      let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
      //创建相机对象
      this.camera = new Three.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
      this.camera.position.set(200, 300, 200); //设置相机位置
      this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)


      /**
     * 创建渲染器对象
     */
    this.renderer = new Three.WebGLRenderer();
    this.renderer.setSize(width, height);//设置渲染区域尺寸
    this.renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    console.log('打印dom元素',canvasContainer);
    canvasContainer.appendChild(this.renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    
    },
    animate: function(){
      this.renderer.render(this.scene, this.camera);
    }
  },
}
</script>

<style scoped lang="less">

  .canvas-container {
    width: 100%;
    height: 100%;
  }
  
</style>