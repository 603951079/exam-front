<template>
  <el-dialog :visible.sync="$store.state.show">
    <el-button type="primary" @click="$store.state.show=false">关闭</el-button>
  </el-dialog>
</template>

<script>
  export default {
    name: "Child"
  }
</script>

<style scoped>

</style>
