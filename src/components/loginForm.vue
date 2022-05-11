<template>
  <div>
    <el-tooltip
      class="item"
      effect="dark"
      :content="!loginStatus ? '登录可以同步todolist到云端哦~' : '退出登录'"
      placement="top"
    >
      <el-button icon="user" circle v-if="!loginStatus" @click="formVisible = true"> </el-button>
      <!-- <img v-else :src="user.avatar" alt="" class="avatar" /> -->
      <el-button icon="switch" circle v-else @click="logout()"></el-button>
    </el-tooltip>

    <el-dialog :title="title" v-model="formVisible" width="460px">
      <el-tabs stretch v-model="DiaTab">
        <el-tab-pane label="登录" name="login">
          <template #label>
            <span
              ><el-icon><user /></el-icon>登录</span
            >
          </template>
          <!-- 登录表单 -->
          <el-form
            :model="loginForm"
            :rules="loginRules"
            :inline="!0"
            label-position="left"
            ref="loginForm"
            :submitAction="login"
          >
            <el-form-item label="昵称:" show-message :error="loginForm.nerror" prop="name">
              <el-input
                v-model="loginForm.name"
                autocomplete="off"
                suffix-icon="el-icon-user-solid"
                maxlength="10"
                placeholder="请输入您的昵称"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码:" show-message :error="loginForm.perror" prop="passwd">
              <el-input
                v-model="loginForm.passwd"
                autocomplete="off"
                placeholder="请输入密码"
                show-password
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="dialog-footer">
            <el-button @click="cancel('loginForm')">取 消</el-button>
            <el-button type="primary" @click="submitForm('loginForm')">
              登录
              <el-icon class="is-loading" v-show="loginForm.doing"><loading /></el-icon>
            </el-button>
          </div>
        </el-tab-pane>

        <!-- 注册表单 -->
        <el-tab-pane label="注册" name="regsiter">
          <template #label>
            <span
              ><el-icon><EditPen /></el-icon>注册</span
            >
          </template>
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
            <el-form-item label="昵称:" show-message :error="regForm.nerror" prop="name">
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
                placeholder="请输入密码,6-12位"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="checkPasswd">
              <el-input
                v-model="regForm.checkPasswd"
                autocomplete="off"
                placeholder="请再次输入密码确认"
                show-password
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
              <el-icon class="is-loading" v-show="regForm.doing"><loading /></el-icon>
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<style lang="scss"></style>

<script>
import { useStore } from "@/store/pinia";
import { mapState, mapActions } from "pinia";

export default {
  props: {
    title: String,
  },
  data() {
    return {
      formVisible: false,
      DiaTab: "login",
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
                this.$axios
                  .get("/api/auth/checkName", { params: { name: value } })
                  .then(() => {
                    callback();
                  })
                  .catch(({ response: { status } }) => {
                    if (status === 403) callback(new Error(`有人起过这个名字啦~`));
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
    this.checkLoginStatus();
  },
  computed: {
    ...mapState(useStore, ["loginStatus"]),
  },
  methods: {
    ...mapActions(useStore, ["updateUser", "clearUser"]),
    checkLoginStatus() {
      if (!localStorage.getItem("accessToken")) {
        return;
      }
      //检查token是否过期,再根据token用户id获取用户信息
      this.$api.auth
        .check()
        .then(({ data }) => this.$api.user.get(data.uid))
        .catch((err) => {
          console.log(err);
        })
        .then(({ data }) => {
          const { uid, name, avatar } = data;
          this.setUserState({ uid, name, avatar });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //登录
    login(name, passwd) {
      this.loginForm.doing = true;
      this.loginForm.nerror = "";
      this.loginForm.perror = "";
      this.$api.auth
        .login({ name, passwd })
        .then((res) => {
          this.loginForm.doing = false;
          this.formVisible = false;
          localStorage.setItem("accessToken", res.accessToken);
          this.setUserState(res.data);
        })
        .catch(({ status, statusText, data: err }) => {
          this.loginForm.doing = false;
          switch (status) {
            case 400:
              this.loginForm.nerror = err;
              break;
            case 403:
              this.loginForm.perror = err;
              break;
            default:
              this.$message.error("服务器可能出问题啦,请稍后重试~" + statusText);
              break;
          }
        });
    },

    //登出
    logout() {
      this.$confirm("确定退出登录吗?", "FBI Warnning!!", {
        confirmButtonText: "确定!",
        cancelButtonText: "取消~",
        type: "warning",
      })
        .then(() => {
          this.$api.auth
            .logout()
            .then(() => {
              localStorage.removeItem("accessToken");
              this.clearUser();
              this.$message("已退出登录~");
            })
            .catch(() => {});
        })
        .catch(() => {});
    },

    //设置登录状态信息
    setUserState(userInfo) {
      if (!this.loginStatus && userInfo.uid > 0) {
        this.$message.success(`Hi ${userInfo.name} ,Welcome to your todolist!`);
      }

      //vuex
      // this.$store.dispatch("setUserState", userState); //actions
      // this.$store.commit("setUserState", userState); //mutations

      // eventBus store
      // this.$store.$emit("setUserState", userState);

      //pinia
      this.updateUser(userInfo);
    },

    //注册
    register(name, passwd) {
      this.regForm.doing = true;
      this.regForm.nerror = "";
      this.$api.auth
        .register({ name, passwd })
        .then(() => {
          this.regForm.doing = false;
          this.$message.success("注册成功~,欢迎: " + name);
          this.DiaTab = "login";
        })
        .catch(({ status, data: err }) => {
          if (status == 403) {
            this.regForm.nerror = err;
          }
        });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs[formName].$attrs.submitAction(this[formName].name, this[formName].passwd);
        } else {
          this.$message.warning("请修改表单错误项");
          return false;
        }
      });
    },

    cancel(formName) {
      this.$refs[formName].resetFields();
      this.formVisible = false;
    },
  },
};
</script>
