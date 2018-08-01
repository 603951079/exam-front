<template>
  <el-dialog title="角色信息" :visible="show" width="50%" @close="close">
    <el-form :model="sysRole"
             ref="form"
             label-width="100px"
             size="mini"
             :rules="sysRoleRules">
      <el-row>
        <el-col :span="18">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="sysRole.roleName"
                      placeholder="请输入角色名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="角色编码" prop="roleCode">
            <el-input v-model="sysRole.roleCode"
                      placeholder="请输入角色编码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input type="textarea" :rows="5" v-model="sysRole.roleDesc"
                      placeholder="请输入角色描述"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" style="text-align: center;">
          <el-form-item>
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="submitDialogForm('form')">确定</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
  import SysRoleModel from './SysRoleModel';
  import http from '../common/http';

  export default {
    name: "SysRoleDetailDialog",
    props: ['show', 'operator', 'id'],
    data() {
      return {
        sysRole: SysRoleModel,
        sysRoleRules: {
          roleName: [
            {required: true, message: '请输入角色名称', trigger: 'blur'}
          ],
          roleCode: [
            {required: true, message: '请输入角色编码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitDialogForm: function (formName) {
        console.log(this.operator);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.operator);
            if (this.operator === 'edit') {
              http.putData('/api/sysrole/v1.0/update', this.sysRole).then(data => {
                this.$emit('close-dialog', [false, true]);
              });
            } else if (this.operator === 'new') {
              http.postData('/api/sysrole/v1.0/save', this.sysRole).then(data => {
                if (data) {
                  this.$emit('close-dialog', [false, true]);
                }
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      close: function () {
        this.$emit('close-dialog', [false, false]);
      }
    },
    watch: {
      id: function (val) {
        val = val + '';
        if (val.indexOf('new') > -1) {
          // 将sysUser对象的所有属性置为空
          for (var key in this.sysRole) {
            delete this.sysRole[key];
          }
        } else {
          http.getData('/api/sysrole/v1.0/list/' + val).then(data => {
            this.sysRole = data;
          });
        }
      }
    }
  }
</script>

<style scoped>

</style>
