<template>
  <div>
    <el-tooltip
      class="item"
      effect="dark"
      :content="!loginStatus ? '登录可以同步todolist到云端哦~' : '退出登录'"
      placement="top"
    >
      <el-button
        icon="el-icon-upload"
        circle
        v-if="!loginStatus"
        @click="formVisible = true"
      ></el-button>
      <el-button
        icon="el-icon-switch-button"
        circle
        v-else
        @click="logout()"
      ></el-button>
    </el-tooltip>

    <el-dialog :title="title" :visible.sync="formVisible" width="460px">
      <el-tabs stretch v-model="DiaTab">
        <el-tab-pane label="登录" name="login">
          <span slot="label"> <i class="el-icon-user-solid"></i>登录 </span>
          <!-- 登录表单 -->
          <el-form
            :model="loginForm"
            :rules="loginRules"
            :inline="!0"
            :status-icon="!0"
            label-position="left"
            ref="loginForm"
            :submitAction="login"
          >
            <el-form-item
              label="昵称:"
              show-message
              :error="loginForm.nerror"
              prop="name"
            >
              <el-input
                v-model="loginForm.name"
                autocomplete="off"
                suffix-icon="el-icon-user-solid"
                maxlength="10"
                placeholder="请输入您的昵称"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="密码:"
              show-message
              :error="loginForm.perror"
              prop="passwd"
            >
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
            <el-button @click="cancel('loginForm')">取 消</el-button>
            <el-button type="primary" @click="submitForm('loginForm')">
              登录
              <i class="el-icon-loading" v-show="loginForm.doing"></i>
            </el-button>
          </div>
        </el-tab-pane>

        <!-- 注册表单 -->
        <el-tab-pane label="注册" name="regsiter">
          <span slot="label"> <i class="el-icon-edit-outline"></i>注册 </span>
          <!-- 注册框 -->
          <el-form
            :model="regForm"
            :status-icon="true"
            :inline="true"
            :rules="regRules"
            ref="regForm"
            :submitAction="register"
            label-width="90px"
          >
            <el-form-item
              label="昵称:"
              show-message
              :error="regForm.nerror"
              prop="name"
            >
              <el-input
                v-model="regForm.name"
                autocomplete="off"
                suffix-icon="el-icon-user-solid"
                maxlength="10"
                placeholder="请输入昵称,3-10个字"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="passwd">
              <el-input
                v-model="regForm.passwd"
                autocomplete="off"
                suffix-icon="el-icon-view"
                placeholder="请输入密码,6-12位"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="checkPasswd">
              <el-input
                v-model="regForm.checkPasswd"
                autocomplete="off"
                suffix-icon="el-icon-view"
                placeholder="请再次输入密码确认"
                type="password"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="dialog-footer">
            <el-button @click="cancel('regForm')">取 消</el-button>
            <el-button
              type="primary"
              :disabled="regForm.passwd !== regForm.checkPasswd"
              @click="submitForm('regForm')"
            >
              注册
              <i class="el-icon-loading" v-show="regForm.doing"></i>
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<style lang="scss"></style>

<script>
// import * as this.$api.login from "../utils/login";

export default {
  name: "todoLogin",
  props: {
    title: String,
  },
  data() {
    return {
      //登录相关
      formVisible: false,
      loginStatus: false,
      DiaTab: "login",

      uid: "",
      name: "",
      timer: null,
      loginForm: {
        name: "",
        nerror: "",
        passwd: "",
        perror: "",
        doing: false,
      },
      regForm: {
        name: "",
        nerror: "",
        passwd: "",
        doing: false,
      },
      loginRules: {
        name: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
        passwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      regRules: {
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              if (this.timer) {
                clearTimeout(this.timer);
              }
              this.timer = setTimeout(() => {
                // this.$message.success("发送"+value);
                this.$axios
                  .get("/auth/user", { params: { name: value } })
                  .then((res) => {
                    if (res.data.data.count > 0) {
                      callback(new Error(`有人起过这个名字啦~`));
                    } else {
                      callback();
                    }
                  });
              }, 1500);
            },
            trigger: "change",
          },
        ],
        passwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value.length < 6 || value.length > 12) {
                callback(new Error("密码需大于6位,小于12位"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        checkPasswd: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value !== this.regForm.passwd) {
                callback(new Error("两次密码不一致!"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      if (!localStorage.getItem("accessToken")) {
        return;
      }
      //检查token是否过期
      this.$api.login
        .checkLogin()
        .then((res) => {
          this.updateUserInfo(true, res.data);
        })
        .catch((err) => {
          console.log(err.response);
          // if (err.response.status == 401) {
          //   localStorage.removeItem("accessToken");
          //   this.$message.warning("登录状态失效,请重新登录");
          // }

          // this.updateUserInfo(false);
        });
    },

    //登录
    login(name, passwd) {
      this.loginForm.doing = true;
      this.loginForm.nerror = "";
      this.loginForm.perror = "";
      this.$api.login
        .login({ name, passwd })
        .then((res) => {
          this.loginForm.doing = false;
          this.formVisible = false;
          // this.$message.success(res.data.name + " 登陆成功~ 欢迎~");
          localStorage.setItem("accessToken", res.data.accessToken);
          this.updateUserInfo(true, res.data);
        })
        .catch((err) => {
          this.loginForm.doing = false;
          console.log(err);
          let { status, statusText: text, data: msg } = err.response;
          switch (status) {
            case 400:
              this.loginForm.nerror = msg;
              break;
            case 403:
              this.loginForm.perror = msg;
              break;
            default:
              this.$message.error("服务器可能出问题啦,请稍后重试~" + text);
              break;
          }
        });
    },

    //登出
    logout(uid = this.uid) {
      this.$confirm("确定退出登录吗?", "FBI Warnning!!", {
        confirmButtonText: "确定!",
        cancelButtonText: "取消~",
        type: "warning",
      })
        .then(() => {
          this.$api.login
            .logout({ uid })
            .then(() => {
              // this.$api.login.delCookies(["uid", "name", "isLogin"]);
              // localStorage.removeItem("accessToken");
              // this.updateUserInfo(false, { name: "guy", uid: "" });
              // this.$message("已退出登录~");

              localStorage.removeItem("accessToken");
              this.updateUserInfo(false, { name: "guy", uid: "" });
              this.$message("已退出登录~");
            })
            .catch(() => {});
        })
        .catch(() => {});
    },

    //设置登录状态信息，并发送用户uid name 登录状态到父组件
    updateUserInfo(isLogin, userInfo) {
      if (isLogin) {
        this.loginStatus = true;
        this.$message.success(`Hi ${userInfo.name} ,Welcome to your todolist!`);
      } else {
        this.loginStatus = false;
      }
      this.$emit("userStatusChange", {
        name: userInfo.name,
        uid: userInfo.uid,
        loginStatus: this.loginStatus,
      });
    },

    //注册
    register(name, passwd) {
      this.regForm.doing = true;
      this.regForm.nerror = "";
      this.$api.login.register({ name, passwd }).then((res) => {
        this.regForm.doing = false;
        if (res.code == 403) {
          this.regForm.nerror = res.msg;
        } else {
          this.$message.success("注册成功~,欢迎: " + name);
          this.DiaTab = "login";
        }
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // if (formName=='refForm') {
          // console.log(this.$refs[formName]);

          this.$refs[formName].$attrs.submitAction(
            this[formName].name,
            this[formName].passwd
          );
          // this.$refs[formName].resetFields();

          // }else if(formName=='loginForm'){
          //   this.login(this[formName].name,this[formName].passwd)
          // }
        } else {
          this.$message.warning("请修改表单错误项");
          return false;
        }
      });
    },
    //取消操作,重置表单
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.formVisible = false;
    },
  },
};
</script>
