<template>
<!-- https://imgchr.com/i/Kojohq -->
  <div class="login-content">
    <el-form
      :model="loginFrom"
      :rules="rules"
      ref="loginFrom"
      class="login-form"
      size=" small"
    >
      <h1 class="login-title">考试后台管理</h1>
      <el-form-item prop="username">
        <el-input v-model="loginFrom.username">
          <i slot="prefix" class="el-icon-user-solid"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginFrom.password" >
          <i slot="prefix" class="el-icon-unlock"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-button" @click="submitForm('loginFrom')">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginFrom: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$http.post(`/users/login`,this.loginFrom)
        
          if (res.data.meta.status == 200) {
              
             localStorage.setItem('token',res.data.token)
            localStorage.setItem('username', res.data.data.username)
          this.$router.push('/home/userlist')
        this.$message({
          message: "登陆成功",
          type: "success"
        });
      } else {
        this.$message.error("登陆失败");
      }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-content {
  height: 100%;
  background: url(../../public/images/bg-2.jpg) no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .login-form {
    border-radius: 6px;
    width: 280px;
    padding: 40px 30px;
    padding-bottom: 10px;
    background-color: rgba(0, 0, 0, 0.3);
    text-align: center;
    .login-title {
      font-size: 26px;
      color: #fff;
      position: relative;
      left: 0;
      top: -30px;
    }
    .login-button{
      width: 100%;
    }
  }
}
</style>
