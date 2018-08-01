<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <v-tags></v-tags>
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view/>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import vHead from './Header.vue'; // 引入头部栏目
  import vSidebar from './Sidebar.vue'; // 引入左侧栏目
  import vTags from './Tags.vue'; // 引入页面切换标签组件
  import bus from '../common/bus';

  export default {
    data() {
      return {
        tagsList: [],
        collapse: false
      }
    },
    components: {
      vHead, vSidebar, vTags
    },
    created() {
      bus.$on('collapse', msg => {
        this.collapse = msg;
      })

      // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
      bus.$on('tags', msg => {
        let arr = [];
        for (let i = 0, len = msg.length; i < len; i++) {
          msg[i].name && arr.push(msg[i].name);
        }
        this.tagsList = arr;
      })
    }
  }
</script>

<style scoped>

</style>
