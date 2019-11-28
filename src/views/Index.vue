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

    <h3>8.纹理贴图</h3>
    <router-link to="/demo23" class="router-link">demo23---创建纹理贴图</router-link>
    <router-link to="/demo23" class="router-link">demo24---重置几何体纹理</router-link>
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
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    .router-link{
        color: #666;
        line-height: 150%;
        font-size: 15px;
        
    }
}
    
</style>
