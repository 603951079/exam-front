<template>
  <el-container>
    <el-header style="height:40px;padding-top:8px;">
      <el-row type="flex">
        <el-col style="width:90px;">
          <el-button type="primary" size="mini" @click="createClick('new')">新建角色</el-button>
        </el-col>
        <el-col style="width:170px;">
          <el-input
            size="mini"
            placeholder="请输入名称"
            style="width:160px;"
            v-model="sysRoleSearch.roleName"
            @keyup.enter.native="searchClick"></el-input>
        </el-col>
        <el-col style="width:170px;">
          <el-input
            size="mini"
            placeholder="请输入编码"
            style="width:160px;"
            v-model="sysRoleSearch.roleCode"
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
        :data="sysRolePage"
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
          prop="roleName"
          label="角色名称"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="roleCode"
          label="角色编码"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="roleDesc"
          label="描述"
          width="250">
        </el-table-column>
        <el-table-column
          prop=""
          label="操作"
          width="300"
          align="center">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row.id)" size="mini" type="success">编辑</el-button>
            <el-button @click="deleteClick(scope.row.id)" size="mini" type="danger">删除</el-button>
            <!--<el-button size="mini" type="info">查看</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <sys-role-detail-dialog
        v-bind:show="dialogFormVisible"
        v-bind:operator="operator"
        v-bind:id="roleId"
        @close-dialog="closeDialog"></sys-role-detail-dialog>
    </el-main>
    <el-footer>
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
  import http from '../common/http';
  import SysRoleModel from './SysRoleModel';
  import SysRoleDetailDialog from './SysRoleDetailDialog';

  export default {
    name: "SysRole",
    components: {SysRoleDetailDialog},
    data() {
      return {
        sysRolePage: [],
        sysRole: SysRoleModel,
        sysRoleSearch: {
          roleName: '',
          roleCode: ''
        },
        page_current: 1,
        page_size: 10,
        page_total: 0,
        dialogFormVisible: false,
        operator: '',
        roleId: ''
      }
    },
    methods: {
      editClick: function (val) {
        this.dialogFormVisible = true;
        this.operator = 'edit';
        this.roleId = val;
      },
      deleteClick: function (val) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          http.deleteData("/api/sysrole/v1.0/delete/" + val).then(() => {
            http.postData('/api/sysrole/v1.0/list', {
              number: this.page_current - 1,
              size: this.page_size,
              condition: this.sysRoleSearch
            }).then(data => {
              this.sysRolePage = data.content;
              this.page_total = data.totalElements;
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            });
          });
        })
      },
      createClick: function () {
        this.dialogFormVisible = true;
        this.operator = 'new';
        this.roleId = 'new' + Math.random();
      },
      handleSizeChange: function (val) { // page_size变化时重新加载数据
        this.page_current = 0;
        http.postData('/api/sysrole/v1.0/list', {
          number: this.page_current,
          size: val,
          condition: this.sysRoleSearch
        }).then(data => {
          console.log(data);
          this.sysRolePage = data.content;
          this.page_total = data.totalElements;
          this.page_size = val;
        });
      },
      handleCurrentChange: function (val) { // page_current变化时重新加载数据
        http.postData('/api/sysrole/v1.0/list', {
          number: val - 1,
          size: this.page_size,
          condition: this.sysRoleSearch
        }).then(data => {
          this.sysRolePage = data.content;
          this.page_total = data.totalElements;
          this.page_current = val;
        });
      },
      searchClick: function () {
        http.postData('/api/sysrole/v1.0/list', {
          number: this.page_current - 1,
          size: this.page_size,
          condition: this.sysRoleSearch
        }).then(data => {
          this.sysRolePage = data.content;
          this.page_total = data.totalElements;
        });
      },
      closeDialog: function (val) {
        this.dialogFormVisible = val[0];
        if (val[1]) {
          http.postData('/api/sysrole/v1.0/list', {
            number: this.page_current - 1,
            size: this.page_size,
            condition: this.sysRoleSearch
          }).then(data => {
            this.sysRolePage = data.content;
            this.page_total = data.totalElements;
          });
        }
      }
    },
    created: function () {
      http.postData('/api/sysrole/v1.0/list', {
        number: this.page_current - 1,
        size: this.page_size,
        condition: this.sysRoleSearch
      }).then(data => {
        this.sysRolePage = data.content;
        this.page_total = data.totalElements;
      });
    }
  }
</script>

<style scoped>

</style>
