<template>
  <div class="box">
    <p>
      Hi!
      <el-tooltip
        v-if="user.uid"
        open-delay="500"
        class="item"
        effect="dark"
        content="查看个人资料"
        placement="top"
      >
        <router-link :to="{ name: 'user', params: { uid: user.uid } }" class="name">{{
          user.name
        }}</router-link>
      </el-tooltip>
      <span v-else>{{ user.name }}</span> , This is your {{ title }}!
      <i class="el-icon-s-order"></i>
    </p>
    <el-tooltip class="avatar" content="查看个人资料" placement="bottom">
      <img v-if="user.uid" @click="$router.push(`user/${user.uid}`)" :src="user.avatar" alt="" />
    </el-tooltip>
    <!-- <todo-login title="登录/注册" @userStatusChange="setUserInfo" class="loginComp"></todo-login> -->
    <div class="loginComp">
      <login title="登录/注册"></login>
    </div>
    <todo-table></todo-table>
  </div>
</template>

<style lang="scss">
.box {
  text-align: center;
  min-width: 700px;
  position: relative;

  p:first-child {
    color: #409eff;
    font-size: 1.5rem;
    text-shadow: 1px 2px 6px #92c4e7;
    // display: inline-block;
    margin: 1.2rem 0;
  }
  .avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    position: fixed;
    right: 10px;
    top: 10px;
    transition: 0.6s;
    box-shadow: 1px 1px 3px #8c8c8c;
    &:hover {
      transform: rotate(360deg);
      box-shadow: 1px 1px 10px #8c8c8c;
    }
  }
  .name {
    position: relative;
    color: rgb(64, 158, 255);
    font-weight: bold;
    font-size: 1.5rem;
    text-decoration: none;
    transition: ease-in 0.4s;
    &:hover {
      text-shadow: 0 2px 8px #2894ebd1;
    }
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
    right: 5px;
    position: absolute;
    top: 50px;
  }
}
</style>

<script>
import login from "@/components/login.vue";
import todoTable from "@/components/todoTable.vue";

export default {
  name: "todoList",
  props: {
    title: {
      type: String,
      default: "Todo List",
    },
  },
  components: {
    login,
    todoTable,
  },
  data: () => ({}),
  created() {},
  computed: {
    user() {
      // return this.$store.state.user; //vuex
      return this.$store.userInfo; //eventBus
    },
  },
  methods: {},
};
</script>
