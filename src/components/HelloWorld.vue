<template>
  <div class="hello">
    <el-input class="search" v-model="input" clearable></el-input>
    <el-button type="primary">搜索</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search{
  width: 500px;
  margin-right: 10px;
}
</style>
