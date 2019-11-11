<template>
  <div class="router-link-container">
    <!-- 1部分  快速入门 -->
    <router-link to="/demo01" class="router-link">demo01---第一个3d场景</router-link>
    <router-link to="/demo02" class="router-link">demo02---setInterval调用render方法</router-link>
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
