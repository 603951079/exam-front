<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu"
             :default-active="onRoutes"
             :collapse="collapse"
             background-color="#242f42"
             text-color="#bfcbd9"
             active-text-color="#20a0ff"
             unique-opened
             router>
      <!--个人首页-->
      <el-menu-item :index='dashboard.menuIndex'
                    :key='dashboard.menuIndex'>
        <i :class="dashboard.menuIcon"></i>
        <span slot="title">{{ dashboard.menuTitle }}</span>
      </el-menu-item>
      <!--业务菜单-->
      <template v-for="item in menus">
        <template v-if="item.subs">
          <el-submenu :index="item.menuIndex"
                      :key="item.menuIndex">
            <template slot="title">
              <i :class="item.menuIcon"></i>
              <span slot="title">{{ item.menuTitle }}</span>
            </template>
            <el-menu-item v-for="(subItem,i) in item.subs"
                          :key="i"
                          :index="subItem.menuIndex">
              {{ subItem.menuTitle }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.menuIndex"
                        :key="item.menuIndex">
            <i :class="item.menuIcon"></i>
            <span slot="title">{{ item.menuTitle }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import bus from '../common/bus';
  import http from '../common/http';

  export default {
    data() {
      return {
        collapse: false,
        dashboard: {
          menuIcon: 'el-icon-star-on',
          menuIndex: 'dashboard',
          menuTitle: '个人首页'
        },
        menus: []
      }
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    },
    created() {
      // 通过 Event Bus 进行组件间通信，来折叠侧边栏
      bus.$on('collapse', msg => {
        this.collapse = msg;
      });
      // 从浏览器缓存中获取菜单树
      this.menus = JSON.parse(sessionStorage.getItem('menus'));
    }
  }
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
  }

  .sidebar > ul {
    height: 100%;
  }
</style>
