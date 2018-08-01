<template>
  <div>
    <a href="javascript:;" @click="$store.state.show=true">点击</a>
    <child></child>
  </div>
</template>

<script>
  import child from './Child';

  export default {
    name: "Parent",
    components: {
      child
    }
  }
</script>

<style scoped>

</style>
