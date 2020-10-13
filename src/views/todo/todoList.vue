<template>
  <div class="box">
    <p>
      Hi!
      <a v-text="userInfo.name" class="name"></a>
      , This is your {{ title }}!
      <i class="el-icon-s-order"></i>
    </p>

    <!-- <todo-login title="登录/注册" @userStatusChange="setUserInfo" class="loginComp"></todo-login> -->
    <todo-login title="登录/注册" class="loginComp"></todo-login>
    <todo-table ref="todoTable"></todo-table>
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
import todoLogin from "@/components/todoLogin.vue";
import todoTable from "@/components/todoTable.vue";

export default {
  name: "todoList",
  props: {
    title: {
      type: String,
      default: "Todo List"
    }
  },
  components: {
    todoLogin,
    todoTable
  },
  data: () => ({}),
  created() {},
  computed: {
    userInfo() {
      // return this.$store.state.userInfo; //vuex
      return this.$store.userInfo; //eventBus
    }
  },
  methods: {}
};
</script>
