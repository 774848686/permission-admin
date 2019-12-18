<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-title">图书订购平台</div>
      <div class="login-form">
        <el-form :model="loginForm" ref="login" label-position="center" :rules="rules">
          <el-form-item prop="username" label="账号">
            <el-input class="input-item" placeholder="请输入账号" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input
              class="input-item"
              placeholder="请输入密码"
              :type="pwdType"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-button @click="handleLogin">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    const validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
        return;
      }
      callback();
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
        return;
      }
      callback();
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loading: false,
      pwdType: "password",
      rules: {
        username: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  created() {
    document.onkeydown = (e)=>{
      const keyCode = e.keyCode;
      if(keyCode===13){
        this.handleLogin();
      }
    }
    this.$store.dispatch("LogOut");
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      this.$refs['login'].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch("Login", this.loginForm).then(() => {
              this.loading = false;
              this.$router.push({ path: "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
$bg: #f6f6f6;
.login-container {
  @include relative;
  height: 100vh;
  background: $bg;
  .login-content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 320px;
    height: 280px;
    margin: auto;
    background: #ffffff;
    text-align: center;
    box-shadow:0px 0px 15px 3px #abcdef;
    .login-title {
      margin-top: 50px;
      margin-bottom: 38px;
      color: #333333;
      font-size: 20px;
    }
    .el-form-item {
      margin-bottom: 15px;
      .el-form-item__error{
        margin-left:25px;
      }
    }
    .el-input__inner{
      color: #000;
    }
    .el-button {
      margin-top: 5px;
      width: 270px;
    }
    .input-item {
      width: 220px;
      height: 40px;
    }
  }
  .el-form-item__error{
    padding-top:0;
  }
  .el-form-item__label{
    position: relative;
    left:25px;
  }
}
</style>
