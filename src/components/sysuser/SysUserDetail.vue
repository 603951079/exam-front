<template>
  <el-dialog title="用户信息"
             :visible.sync="$store.state.sysuser.sysUserDetailShow"
             width="55%"
             @open="open"
             @close="close">
    <el-form :model="sysUser"
             ref="form"
             label-width="100px"
             size="mini"
             :rules="sysUserRules">
      <el-row>
        <el-col :span="20">
          <el-form-item label="用户姓名" prop="zhName">
            <el-input v-model="sysUser.zhName" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="登录账号" prop="username">
            <el-input v-model="sysUser.username" placeholder="请输入登录账号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="sysUser.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="账号未过期" prop="accountNonExpired">
            <el-switch v-model="sysUser.accountNonExpired"
                       active-text="是" inactive-text="否"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="账号未锁定" prop="accountNonLocked">
            <el-switch v-model="sysUser.accountNonLocked"
                       active-text="是" inactive-text="否"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="密码未过期" prop="credentialsNonExpired">
            <el-switch v-model="sysUser.credentialsNonExpired"
                       active-text="是" inactive-text="否"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="用户未禁用" prop="enabled">
            <el-switch v-model="sysUser.enabled"
                       active-text="是" inactive-text="否"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="sysUser.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" style="text-align: center;">
          <el-form-item>
            <el-button @click="$store.state.sysuser.sysUserDetailShow = false;">取消</el-button>
            <el-button type="primary" @click="submitForm('form')">确定</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
  import http from '../common/http';
  import SysUserModel from './SysUserModel';

  export default {
    name: "SysUserDetail",
    data() {
      return {
        sysUser: SysUserModel,
        sysUserRules: {
          zhName: [
            {required: true, message: '请输入用户姓名', trigger: 'blur'}
          ],
          username: [
            {required: true, message: '请输入用户登录账号', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.$store.state.sysuser.operator === 'edit') {
              http.putData('/api/sysuser/v1.0/update', this.sysUser)
                .then(data => {
                  // 修改成功，关闭弹出框
                  this.$store.state.sysuser.sysUserDetailShow = false;
                  // 向父页面发射刷新事件
                  this.$emit('refresh');
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  });
                });
            } else if (this.$store.state.sysuser.operator === 'new') {
              http.postData('/api/sysuser/v1.0/save', this.sysUser)
                .then(data => {
                  if (data) {
                    // 创建成功，关闭弹出框
                    this.$store.state.sysuser.sysUserDetailShow = false;
                    // 向父页面发射刷新事件
                    this.$emit('refresh');
                    this.$message({
                      type: 'success',
                      message: '创建成功!'
                    });
                  } else {
                    this.$message({
                      type: 'danger',
                      message: '创建失败!'
                    });
                  }
                });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      open() {
        if (this.$store.state.sysuser.operator === 'edit') {
          http.getData('/api/sysuser/v1.0/list/'
            + this.$store.state.sysuser.sysUserId)
            .then(data => {
              this.sysUser = data;
            });
        }
      },
      close() {
        // 将sysUser对象的所有属性置为空
        for (var key in this.sysUser) {
          delete this.sysUser[key];
        }
      }
    }
  }
</script>

<style scoped>

</style>
