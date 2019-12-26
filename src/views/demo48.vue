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
import sprite from "@/assets/images/sprite.png";
import spriteData from "@/assets/data/sprite.json"

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
  name: 'demo48',
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

        /**
         * 一个精灵模型对象表示一个城市的位置和数据
         */
        // 加载一个背景透明的圆形贴图，矩形精灵显示为圆形效果
        var texture = new THREE.TextureLoader().load(sprite);
        // 创建组对象，包含所有精灵对象
        let group = new THREE.Group();
        // 文件加载对象
        var loader = new THREE.FileLoader().setResponseType('json');
        console.log('打印spriteData',spriteData);
        // loader.load(spriteData,function(data){
        //   console.log('打印json数据',data);
          //遍历数据
          texture.needsUpdate = true;
          spriteData.forEach(elem => {
            // 精灵材质
            var material = new THREE.PointsMaterial({
              // map: texture, //设置精灵纹理贴图
              // transparent: true,
              // alphaMap: texture,
              // opacity: 0.5,
              map: texture,
              // color: 0xff00ff,
              size: 10
            });
            // 创建精灵模型对象
            let geometry = new THREE.Geometry();
            
            // group.add(points);
            // 控制精灵大小   使用PM2.5大小设置精灵模型的大小
            // 注意适当缩放pm2.5大小,以便得到更好的显示效果
            // var k = elem.value / 200
            // points.scale.set(k, k, 1);
            //获得城市坐标设置精灵模型对象的位置
            geometry.vertices.push(new THREE.Vector3(elem.coordinate[0], elem.coordinate[1], 0));
            var points = new THREE.Points(geometry,material);
            points.position.set(-110, -30, 0);
            that.scene.add(points);
          });
          // 中国城市坐标整体的几何中心不在坐标原点，需要适当的平移
          // group.position.set(-110, -30, 0);
          // that.scene.add(group);//把精灵群组插入场景中
        // });


        // var spriteMaterial = new THREE.SpriteMaterial({
        //   color:0xff00ff,//设置精灵矩形区域颜色
        //   // rotation:Math.PI/4,//旋转精灵对象45度，弧度值
        //   // map: texture,//设置精灵纹理贴图
        // });
        // var sprite  = new THREE.Sprite(spriteMaterial);
        // this.scene.add(sprite);
        // // 控制精灵大小，比如可视化中精灵大小表征数据大小
        // sprite.scale.set(10, 10, 1); //// 只需要设置x、y两个分量就可以


        // // 
        // for (let i = 0; i < 50; i++) {
        //   var spriteMaterial = new THREE.SpriteMaterial({
        //     color:0xff00ff,//设置精灵矩形区域颜色
        //   });
        //   // 创建精灵模型对象，不需要几何体geometry参数
        //   var sprite = new THREE.Sprite(spriteMaterial);
        //   this.scene.add(sprite);
        //   // 控制精灵大小，比如可视化中精灵大小表征数据大小
        //   sprite.scale.set(10, 10, 1); //// 只需要设置x、y两个分量就可以
        //   let k =  Math.random()-0.5;
        //   // 设置精灵模型位置，z轴的范围0~1000，便于观察随着距离变化，显示大小变化
        //   sprite.position.set(50*k,50*k,1000*Math.random())
        // }
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
        var s = 25; //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        // this.camera.position.set(200, 300, 200); //设置相机位置
        // this.camera = new THREE.PerspectiveCamera(60,width/height,1,1000);
        this.camera.position.set(0, 0, 200); //设置相机位置
        this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
        this.scene.add(this.camera);


        // var width = window.innerWidth; //窗口宽度
        // var height = window.innerHeight; //窗口高度
        // /**透视投影相机对象*/
        // this.camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
        // // camera.position.set(200, 300, 200); //设置相机位置
        // this.camera.position.set(-40, 40, 830); //设置相机位置
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

        // 渲染函数
        function render() {
            renderer.render(that.scene,that.camera);//执行渲染操作
            requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
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
    document.title = "demo48-----points模型只能表示位置";
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