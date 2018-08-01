<template>
  <div class="login-wrap">
    <div class="ms-title">在线考试系统</div>
    <div class="ms-login">
      <el-form :model="sysUser"
               :rules="sysUserRules"
               ref="sysUserForm"
               label-width="0px"
               class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="sysUser.username"
                    placeholder="用户名"
                    v-focus></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password"
                    placeholder="密码"
                    v-model="sysUser.password"
                    @keyup.enter.native="submitForm('sysUserForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary"
                     @click="submitForm('sysUserForm')">登录
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import http from '../common/http';

  export default {
    data() {
      return {
        sysUser: {
          username: '',
          password: ''
        },
        sysUserRules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            http.login('/api/login', this.sysUser).then(data => {
              if (data == null || data == '') {
                this.$message.error('用户名或密码错误，请重新输入!');
              } else {
                // 将JWT存入当前浏览器的sessionStorage中
                sessionStorage.setItem('Authorization', data);
                // 向后端发送请求，获取菜单树、用户信息
                http.getData('/api/sysuser/v1.0/info').then(result => {
                  console.log(result);
                  sessionStorage.setItem('user', JSON.stringify(result.user));
                  sessionStorage.setItem('menus', JSON.stringify(result.menus));
                  sessionStorage.setItem('menuindexs', JSON.stringify(result.menuindexs))
                  this.$router.push('/dashboard');
                });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    directives: {
      focus: {
        inserted(el) {
          el.focus()
        }
      }
    }
  }
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
  }

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
  }
</style>
