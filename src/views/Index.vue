<template>
  <div class="router-link-container">
    <!-- 1部分  快速入门 -->
    <router-link to="/demo01" class="router-link">demo01---第一个3d场景</router-link>
    <router-link to="/demo02" class="router-link">demo02---setInterval调用render方法</router-link>
    <router-link to="/demo03" class="router-link">demo03---插入几何体，并偏移</router-link>
    <router-link to="/demo04" class="router-link">demo04---创建材质对象</router-link>
    <router-link to="/demo05" class="router-link">demo05---顶点位置渲染</router-link>
    <router-link to="/demo06" class="router-link">demo06---顶点法向量光照计算</router-link>
    <router-link to="/demo07" class="router-link">demo07---矩形非索引绘制</router-link>
    <router-link to="/demo08" class="router-link">demo08---定义顶点颜色数据</router-link>
    <router-link to="/demo09" class="router-link">demo09---定义顶点颜色数据</router-link>
    <router-link to="/demo10" class="router-link">demo10---顶点索引法向量</router-link>
    <router-link to="/demo11" class="router-link">demo11---材质</router-link>
    <router-link to="/demo12" class="router-link">demo12---网格材质</router-link>
    <router-link to="/demo13" class="router-link">demo13---线材质</router-link>
    <router-link to="/demo14" class="router-link">demo14---材质属性</router-link>
    <router-link to="/demo15" class="router-link">demo15---点线网格模型</router-link>
    <router-link to="/demo16" class="router-link">demo16---旋转平移缩放</router-link>
    <router-link to="/demo17" class="router-link">demo17---模型对象克隆</router-link>
    <router-link to="/demo18" class="router-link">demo18---聚光光源，方向光</router-link>
    <router-link to="/demo19" class="router-link">demo19---平行光阴影</router-link>
    <router-link to="/demo20" class="router-link">demo20---组，对象group,层级模型</router-link>
    <router-link to="/demo21" class="router-link">demo21---对象节点命名，查找，遍历</router-link>
    <router-link to="/demo22" class="router-link">demo22---本地位置坐标，世界位置坐标</router-link>

    <h3 class="router-title">8.纹理贴图</h3>
    <router-link to="/demo23" class="router-link">demo23---创建纹理贴图</router-link>
    <router-link to="/demo24" class="router-link">demo24---重置几何体纹理</router-link>
    <router-link to="/demo25" class="router-link">demo25---创建三角面设置UV坐标</router-link>

    <router-link to="/demo27" class="router-link">demo27---引入外部模型</router-link>
    <router-link to="/demo28" class="router-link">demo28---阵列设置重复纹理</router-link>
    <router-link to="/demo29" class="router-link">demo29---纹理偏移</router-link>
    <router-link to="/demo30" class="router-link">demo30---草地效果</router-link>
    <router-link to="/demo31" class="router-link">demo31---纹理移动动画效果</router-link>
    <router-link to="/demo32" class="router-link">demo32---canvas画布作为纹理贴图</router-link>
    <router-link to="/demo33" class="router-link">demo33---视频作为纹理贴图</router-link>
    <router-link to="/demo34" class="router-link">demo34---法线贴图</router-link>
    <router-link to="/demo35" class="router-link">demo35--凹凸贴图</router-link>
    <router-link to="/demo36" class="router-link">demo36--阴影贴图</router-link>
    <router-link to="/demo37" class="router-link">demo37--高光贴图</router-link>
    <router-link to="/demo38" class="router-link">demo38--环境贴图</router-link>
    <router-link to="/demo39" class="router-link">demo39--数据纹理对象</router-link>


    <h3 class="router-title">9.相机</h3>
    <router-link to="/demo40" class="router-link">demo40--正交相机</router-link>
    <router-link to="/demo41" class="router-link">demo41--透视相机</router-link>


    <h3 class="router-title">10.点精灵和粒子系统</h3>
    <h5 class="router-title">（1）精灵模型对象</h5>
    <router-link to="/demo42" class="router-link">demo42--精灵模型对象</router-link>
    <router-link to="/demo43" class="router-link">demo43--精灵透视投影相机</router-link>
    <router-link to="/demo44" class="router-link">demo44--点模型</router-link>
    <router-link to="/demo45" class="router-link">demo45--网格模型</router-link>
    <router-link to="/demo46" class="router-link">demo46--线模型</router-link>
    <h5 class="router-title">（2）中国城市PM2.5</h5>
    <router-link to="/demo47" class="router-link">demo47--点精灵实现</router-link>
    <router-link to="/demo48" class="router-link">demo48--points模型只能表示位置</router-link>
    <router-link to="/demo49" class="router-link">demo49--CircleGeometry实现</router-link>
    <router-link to="/demo50" class="router-link">demo50--PlaneGeometry实现</router-link>
    <h5 class="router-title">（3）树林效果</h5>
    <router-link to="/demo51" class="router-link">demo51--树林效果模拟</router-link>
    <h5 class="router-title">（4）下雨场景效果模拟</h5>
    <router-link to="/demo52" class="router-link">demo52--空间中随机生产静态的雨滴</router-link>
    <router-link to="/demo53" class="router-link">demo53--雨滴动态运动</router-link>
    <router-link to="/demo54" class="router-link">demo54--站在雨中的效果</router-link>
    <router-link to="/demo55" class="router-link">demo55--匀速下落</router-link>
    <h5 class="router-title">11.帧动画模块</h5>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'index',
  components: {
    // HelloWorld
  }
}
</script>
<style lang="less" scoped>
.router-link-container{
    display: flex;
    // flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    h3.router-title{
      flex-basis: 100%;
      margin-left: 20px;
      font-size: 25px;
      color: #333;
    }
    h5.router-title{
      flex-basis: 100%;
      margin-left: 25px;
      font-size: 20px;
      color: #333;
    }
    .router-link{
      flex-basis: 33%;
      color: #666;
      line-height: 150%;
      font-size: 15px;
      margin-left: 20px;
    }
}
    
</style>
