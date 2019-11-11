<!--  -->
<template>
  <div class="canvas-container02" id="canvas-container2"></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import * as Three from "three";
import { OrbitControls } from "three-orbit-controls";
import { BoxGeometry, BoxBufferGeometry } from "three";

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
          this.scene = new Three.Scene();
        //   创建geometry
          let geometry = new Three.BoxBufferGeometry(100,100,100);
        //   创建material
          let material = new Three.MeshLambertMaterial({
              color: 0x0099ff
          });
        //    创建网格对象
        this.mesh = new Three.Mesh(geometry,material);

        this.scene.add(this.mesh);

        // 光源设置
        // 点光源
        let point = new Three.PointLight(0xffffff);
        point.position.set(400,200,300); //点光源位置
        // 点光源添加到场景中
        this.scene.add(point);

        // 环境光
        let ambient = new Three.AmbientLight(0x444444);
        // 环境光添加到场景中
        this.scene.add(ambient);


        // 相机设置
        let width = window.innerWidth;
        let height = window.innerHeight;
        let k = width/height; //宽高比
        let s = 200;  //三维显示范围控制系数 ,系数越大,显示的范围越大,  (视图上系数越大,三维模型显示越小)

        this.camera = new Three.OrthographicCamera(-s*k,s*k,-s,s,1,1000);
        this.scene.add(this.camera);


        // 创建渲染器对象
        this.renderer = new Three.WebGLRenderer();
        this.renderer.setSize(width,height); //设置渲染尺寸大小
        this.renderer.setClearColor(0xb9d3ff,1);  //设置背景颜色


        canvasContainer.appendChild(this.renderer.domElement); //body元素中插入canvas对象
        let that = this;
        let render = function render(){
            that.renderer.render(that.scene,that.camera);
            that.mesh.rotateY(0.01);
        }
        setInterval(render,20)
      },
    //   animate: function(){
    //       this.renderer.render(this.scene,this.camera);
    //   }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    document.title = "demo02-setInterval调用render方法";
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      this.init();
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