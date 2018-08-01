<template>
  <el-container>
    <el-header style="height:40px;padding-top:8px;">
      <el-row type="flex">
        <el-col style="width:90px;">
          <el-button type="primary" size="mini" @click="createClick">新建用户</el-button>
        </el-col>
        <el-col style="width:170px;">
          <el-input
            size="mini"
            placeholder="请输入姓名"
            style="width:160px;"
            v-model="sysUserSearch.zhName"
            @keyup.enter.native="searchClick"></el-input>
        </el-col>
        <el-col style="width:170px;">
          <el-input
            size="mini"
            placeholder="请输入手机号"
            style="width:160px;"
            v-model="sysUserSearch.phone"
            @keyup.enter.native="searchClick"></el-input>
        </el-col>
        <el-col style="width:90px;">
          <el-button type="primary" size="mini" @click="searchClick">查询</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main style="padding-top:5px;padding-bottom: 5px;">
      <el-table
        ref="singleTable"
        :data="sysUserPage"
        style="width:100%"
        highlight-current-row
        border
        height="400px"
        max-height="400px">
        <el-table-column
          fixed
          type="index"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          fixed
          prop="zhName"
          label="姓名"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="isEnabled"
          label="账号是否可用"
          width="120"
          align="center">
          <template slot-scope="scope">
            <span v-if=scope.row.enabled>可用</span>
            <span v-else>不可用</span>
          </template>
        </el-table-column>
        <el-table-column
          label="角色"
          width="150"
          align="center">
          <template slot-scope="scope">
            <el-tag size="mini" :type="'danger'"
                    v-for="(role,index) in scope.row.authorities"
                    :key="scope.row.id+index"
                    style="margin-left:1px;">
              {{role.authority}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="操作"
          width="300"
          align="center">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row.id)" size="mini" type="success">编辑</el-button>
            <el-button @click="authClick(scope.row.id)" size="mini" type="info">授权</el-button>
            <el-button @click="deleteClick(scope.row.id)" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <sys-user-detail :show="$store.state.sysuser.sysUserDetailShow"
                       @refresh="refresh"></sys-user-detail>
      <auth :show="$store.state.sysuser.authShow"
            @refresh="refresh"></auth>
    </el-main>
    <el-footer style="height:40px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page_current"
        :page-size="page_size"
        :total="page_total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
  import http from '@/components/common/http';
  import Auth from './Auth';
  import SysUserDetail from './SysUserDetail';


  export default {
    name: "SysUser",
    components: {
      Auth, SysUserDetail
    },
    data() {
      return {
        sysUserPage: [],
        sysUserSearch: {
          zhName: '',
          phone: ''
        },
        page_current: 1,
        page_size: 10,
        page_total: 0
      }
    },
    methods: {
      handleSizeChange: function (val) { // page_size变化时重新加载数据
        this.page_current = 0;
        http.postData('/api/sysuser/v1.0/list', {
          number: this.page_current,
          size: val,
          condition: this.sysUserSearch
        }).then(data => {
          this.sysUserPage = data.content;
          this.page_total = data.totalElements;
          this.page_size = val;
        });
      },
      handleCurrentChange: function (val) { // page_current变化时重新加载数据
        http.postData('/api/sysuser/v1.0/list', {
          number: val - 1,
          size: this.page_size,
          condition: this.sysUserSearch
        }).then(data => {
          this.sysUserPage = data.content;
          this.page_total = data.totalElements;
          this.page_current = val;
        });
      },
      deleteClick: function (val) { // 单击删除按钮
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          http.deleteData("/api/sysuser/v1.0/delete/" + val).then(() => {
            http.postData('/api/sysuser/v1.0/list', {
              number: this.page_current - 1,
              size: this.page_size,
              condition: this.sysUserSearch
            }).then(data => {
              this.sysUserPage = data.content;
              this.page_total = data.totalElements;
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            });
          });
        });
      },
      editClick: function (val) {
        this.$store.commit('SET_OPERATOR', 'edit');
        // 打开弹出框
        this.$store.commit('SET_USERDETAIL_SHOW', true);
        this.$store.commit('SET_USERID', val);
      },
      createClick: function () {
        this.$store.commit('SET_OPERATOR', 'new');
        // 打开弹出框
        this.$store.commit('SET_USERDETAIL_SHOW', true);
      },
      searchClick: function () {
        http.postData('/api/sysuser/v1.0/list', {
          number: this.page_current - 1,
          size: this.page_size,
          condition: this.sysUserSearch
        }).then(data => {
          this.sysUserPage = data.content;
          this.page_total = data.totalElements;
        });
      },
      authClick: function (val) {
        this.$store.commit('SET_AUTH_SHOW', true);
        this.$store.commit('SET_USERID', val);
      },
      refresh() {
        http.postData('/api/sysuser/v1.0/list', {
          number: this.page_current - 1,
          size: this.page_size,
          condition: this.sysUserSearch
        }).then(data => {
          this.sysUserPage = data.content;
          this.page_total = data.totalElements;
        });
      }
    },
    created: function () { // 声明周期钩子,实例化之后给列表赋值
      this.refresh();
    }
  }
</script>

<style scoped>
  .el-table .table-head-th {
    background-color: #f4f4f4;
    font-size: large;
  }

  .el-table thead {
    color: black;
  }
</style>
