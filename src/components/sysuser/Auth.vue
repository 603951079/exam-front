<template>
  <el-dialog title="选择角色"
             :visible.sync="$store.state.sysuser.authShow"
             width="50%"
             @close="close"
             @open="open">
    <el-container>
      <el-main>
        <el-table
          ref="multipleTable"
          :data="sysRolePage"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          border>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="角色名称"
            width="120"
            prop="roleName">
          </el-table-column>
          <el-table-column
            label="角色编码"
            width="120"
            prop="roleCode">
          </el-table-column>
          <el-table-column
            label="角色描述"
            show-overflow-tooltip
            prop="roleDesc">
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-row type="flex" style="text-align:center;">
          <el-col>
            <el-button size="mini" @click="$store.commit('SET_AUTH_SHOW',false)">取消</el-button>
            <el-button type="primary" size="mini" @click="submitDialog">确定</el-button>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </el-dialog>
</template>

<script>
  import http from '../common/http';

  export default {
    name: "Auth",
    data() {
      return {
        sysRolePage: [],
        multipleSelection: []
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      close: function () {
        this.$refs.multipleTable.clearSelection();
      },
      submitDialog: function () {
        let auths = [];
        this.multipleSelection.forEach(row => {
          auths.push({
            userId: this.$store.state.sysuser.sysUserId,
            roleId: row.id
          });
        });
        if (auths.length == 0) {
          auths.push({
            userId: this.$store.state.sysuser.sysUserId,
            roleId: ''
          });
        }
        http.postData('/api/sysauth/v1.0/save', auths)
          .then(data => {
            this.$store.commit('SET_AUTH_SHOW',false);
            this.$emit('refresh');
          });
      },
      open: function () {
        http.postData('/api/sysrole/v1.0/list', {
          number: 0,
          size: 500,
          condition: {}
        }).then(data => {
          this.sysRolePage = data.content;
          http.getData('/api/sysrole/v1.0/list/userroles/'
            + this.$store.state.sysuser.sysUserId)
            .then(data => {
              if (data) {
                this.sysRolePage.map(row => {
                  for (var i = 0; i < data.content.length; i++) {
                    var t = data.content[i];
                    if (t.id == row.id) {
                      this.$refs.multipleTable.toggleRowSelection(row, true);
                    }
                  }
                });
              }
            });
        });
      }
    }
  }
</script>

<style scoped>

</style>
