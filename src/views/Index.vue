<template>
  <div class="router-link-container">
    <router-link to="/home" class="router-link">home</router-link>
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
<style lang="less" >
.router-link-container{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .router-link{
        color: #666;
        line-height: 150%;
        font-size: 15px;
        
    }
}
    
</style>
