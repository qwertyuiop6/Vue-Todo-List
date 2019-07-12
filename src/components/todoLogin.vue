<template>
  <div>
    <el-tooltip
      class="item"
      effect="dark"
      :content="!loginStatus?'登录可以同步todolist到云端哦~':'退出登录'"
      placement="top"
    >
      <el-button icon="el-icon-upload" circle v-if="!loginStatus" @click="loginFormVisible=true"></el-button>
      <el-button icon="el-icon-switch-button" circle v-else @click="logout()"></el-button>
    </el-tooltip>

    <el-dialog :title="title" :visible.sync="loginFormVisible" width="400px">
      <el-tabs stretch v-model="DiaTab">
        <el-tab-pane label="登录" name="login">
          <span slot="label">
            <i class="el-icon-user-solid"></i>登录
          </span>
          <!-- 登录框 -->
          <el-form :model="loginForm" inline="true" label-position="left">
            <el-form-item label="昵称:" show-message :error="loginForm.nerror">
              <el-input
                v-model="loginForm.name"
                autocomplete="off"
                suffix-icon="el-icon-user-solid"
                maxlength="10"
                placeholder="请输入您的昵称"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码:" show-message :error="loginForm.perror">
              <el-input
                v-model="loginForm.passwd"
                autocomplete="off"
                suffix-icon="el-icon-view"
                placeholder="请输入密码"
                type="password"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="dialog-footer">
            <el-button @click="loginFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="login(loginForm.name,loginForm.passwd)">
              登录
              <i class="el-icon-loading" v-show="isLoging"></i>
            </el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="注册" name="regsiter">
          <span slot="label">
            <i class="el-icon-edit-outline"></i>注册
          </span>
          <!-- 注册框 -->
          <el-form :model="regForm" status-icon :rules="rules" ref="regForm">
            <el-form-item label="昵称:" show-message :error="regForm.nerror">
              <el-input
                v-model="regForm.name"
                autocomplete="off"
                suffix-icon="el-icon-user-solid"
                maxlength="10"
                placeholder="请输入您的昵称"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="passwd">
              <el-input
                v-model="regForm.passwd"
                autocomplete="off"
                suffix-icon="el-icon-view"
                placeholder="请输入密码"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="passwd2">
              <el-input
                v-model="regForm.passwd2"
                autocomplete="off"
                suffix-icon="el-icon-view"
                placeholder="再次输入密码:"
                type="password"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="dialog-footer">
            <el-button @click="loginFormVisible = false">取 消</el-button>
            <el-button
              type="primary"
              :disabled="regForm.passwd!==regForm.passwd2"
              @click="reg(regForm.name,regForm.passwd)"
            >
              注册
              <i class="el-icon-loading" v-show="isLoging"></i>
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<style lang="scss">
</style>

<script>
import * as loginApi from "../utils/login";

export default {
  name: "todoLogin",
  props: {
    title: String
  },
  data() {
    return {
      //登录相关
      loginFormVisible: false,
      loginStatus: false,
      DiaTab: "login",
      isLoging: false,
      uid: "",
      name: "",
      loginForm: {
        name: "",
        nerror: "",
        passwd: "",
        perror: ""
      },
      regForm: {
        name: "",
        nerror: "",
        passwd: ""
      },
      rules: {
        passwd: [
          {
            validator: (rule, value, callback) => {
              if (value.length < 6 || value.length > 12) {
                callback(new Error("密码需大于6位,小于12位"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        passwd2: [
          {
            validator: (rule, value, callback) => {
              if (value !== this.regForm.passwd) {
                callback(new Error("两次密码不一致!"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      //检查session会话是否过期
      loginApi.checkLogin().then(res => {
        if (res.isLogin) {
          this.setLoginStatus(true, res);
        } else {
          this.setLoginStatus(false);
        }
      });
    },
    //登录
    login(name, passwd) {
      this.isLoging = true;
      this.loginForm.nerror = "";
      this.loginForm.perror = "";
      loginApi
        .toLogin({ name, passwd })
        .then(res => {
          this.isLoging = false;
          if (res.code == 200) {
            this.loginFormVisible = false;
            this.$message.success(name + " 登陆成功~~ 欢迎~");
            this.setLoginStatus(true, res.data, true);
          } else {
            this.$message.error("权限验证失败，" + res.msg);
            if (res.code == 404) {
              this.loginForm.nerror = res.msg;
              return;
            }
            this.loginForm.perror = res.msg;
          }
        })
        .catch(err => {
          this.isLoging = false;
          this.$message.error("网络可能出问题啦~" + err.response);
        });
    },
    //登出
    logout(uid = this.uid) {
      this.$confirm("确定退出登录吗?", "FBI Warnning!!", {
        confirmButtonText: "确定!",
        cancelButtonText: "取消~",
        type: "warning"
      })
        .then(() => {
          loginApi.toLogout({ uid }).then(() => {
            // loginApi.delCookies(["uid", "name", "isLogin"]);

            this.setLoginStatus(false);
            this.$message("已退出登录~");
          });
        })
        .catch(() => {});
    },
    //设置登录状态信息，并发送用户uid name 登录状态到父组件
    setLoginStatus(isLogin, userInfo, sync = false) {
      if (isLogin) {
        this.loginStatus = true;
        this.uid = userInfo.uid;
        this.name = userInfo.name;
        this.$message.success(`Hi ${this.name} ,Welcome to your todolist!`);
      } else {
        this.loginStatus = false;
        this.name = "guy";
        this.uid = "";
      }
      this.$emit(
        "userHasLogin",
        {
          name: this.name,
          uid: this.uid,
          loginStatus: this.loginStatus
        },
        sync
      );
    },
    //注册
    reg(name, passwd) {
      this.isLoging = true;
      this.regForm.nerror = "";
      loginApi.register({ name, passwd }).then(res => {
        this.isLoging = false;
        if (res.code == 403) {
          this.regForm.nerror = res.msg;
        } else {
          this.$message.success("注册成功~,欢迎: " + name);
          this.DiaTab = "login";
        }
      });
    }
  }
};
</script>
