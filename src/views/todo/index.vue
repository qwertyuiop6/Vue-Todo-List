<template>
  <div class="box">
    <p>
      Hi!
      <el-tooltip
        v-if="user.uid"
        :show-after="300"
        class="item"
        effect="dark"
        content="查看个人资料"
        placement="top"
      >
        <router-link :to="{ name: 'User', params: { uid: user.uid } }" class="name">{{
          user.name
        }}</router-link>
      </el-tooltip>
      <span v-else>{{ user.name }}</span> , This is your {{ title }}!
      <el-icon><List /></el-icon>
    </p>

    <div class="avatar" v-if="user.uid">
      <el-tooltip class="avatar" content="查看个人资料" placement="bottom" :show-after="300">
        <img
          @click="$router.push(`/user/${user.uid}`)"
          :src="user.avatar"
          alt=""
          class="cursor-pointer"
        />
      </el-tooltip>
    </div>

    <div class="loginComp">
      <login-form title="登录/注册"></login-form>
    </div>

    <todo-list></todo-list>
  </div>
</template>

<style lang="scss">
.box {
  text-align: -webkit-center;
  min-width: 700px;
  position: relative;

  p:first-child {
    font-size: 1.5rem;
    font-weight: 600;
    text-shadow: 1px 1px 15px #d6f2e7;
    margin: 1.2rem 0;
    -webkit-background-clip: text;
    background-clip: text;
    background-image: linear-gradient(90deg, #00a9eb, #00ebb6);
    color: transparent;
    width: fit-content;
  }
  .avatar {
    position: fixed;
    right: 10px;
    top: 10px;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    transition: 0.6s;
    overflow: hidden;
    box-shadow: 1px 1px 5px 1px #8c8c8c;

    &:hover {
      transform: rotate(360deg);
      box-shadow: 1px 1px 10px 2px #8c8c8c;
    }
    img {
      width: 100%;
    }
  }
  .name {
    position: relative;
    color: rgb(56 159 240);
    font-weight: bold;
    font-size: 1.5rem;
    text-decoration: none;
    transition: ease-in 0.4s;
    &::before {
      position: absolute;
      height: 2px;
      content: "";
      left: 0;
      right: 0;
      bottom: -4px;
      background: #409eff;
      box-shadow: 0 2px 8px #2894ebd1;
      transition: transform ease-in-out 0.4s;
      transform-origin: bottom right;
      transform: scaleX(0);
    }
    &:hover::before {
      transform-origin: bottom left;
      transform: scaleX(1);
    }
  }
  .loginComp {
    right: 3rem;
    position: absolute;
  }
}
</style>

<script>
import loginForm from "@/components/loginForm.vue";
import todoList from "./todoList.vue";
import { useStore } from "@/store/pinia";
import { mapState } from "pinia";

export default {
  name: "todoPage",
  props: {
    title: {
      type: String,
      default: "Todo List",
    },
  },
  components: {
    loginForm,
    todoList,
  },
  data: () => ({}),
  created() {},
  computed: {
    // user() {
    //   // return this.$store.state.user; //vuex
    //   // return this.$store.userInfo; //eventBus
    // },
    ...mapState(useStore, { user: "userInfo" }),
  },
  methods: {},
};
</script>
