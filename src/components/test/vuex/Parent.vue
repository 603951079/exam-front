<template>
  <div class="parent">
    <h3>这里是父组件</h3>
    <button type="button" @click="clickHandler">修改自己的文本内容</button>
    <button type="button" @click="clickHandler2">修改子组件的文本内容</button>
    <div>Test: {{msg}}</div>
    <child></child>
  </div>
</template>

<script>
  import child from './Child';

  export default {
    name: "Parent",
    components: {
      child
    },
    computed: {
      msg() {
        return this.$store.state.testMsg;
      }
    },
    methods: {
      clickHandler() {
        this.$store.commit('changeTestMsg', '父组件修改自己的文本');
      },
      clickHandler2() {
        this.$store.commit('changeChildText', '父组件修改子组件的文本');
      }
    }
  }
</script>

<style scoped>
  .parent {
    background-color: #00BBFF;
    height: 400px;
  }
</style>
