<template>
  <div class="box">
    <p>
      Hi!
      <span
        v-text="userInfo.name"
        style="color: rgb(64, 158, 255);
    font-weight: bold;
    font-size: 1.5rem;"
      ></span>
      , This is your {{ msg }}
      <i class="el-icon-s-order"></i>
    </p>

    <todo-login title="登录/注册" @userStatusChange="setUserInfo" class="loginComp"></todo-login>
    <todo-table ref="todoTable" :online="userInfo.loginStatus" :todoData="todoData"></todo-table>
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
    text-shadow: 1px 3px 11px #8ccfff;
    position: relative;
    display: inline-block;
    &::before {
      position: absolute;
      height: 2px;
      content: "";
      left: 0;
      right: 0;
      bottom: -3px;
      text-shadow: 1px 2px 8px;
      background: #409eff;
      transition: ease-in-out 0.4s;
      // transform-origin: bottom left;
      transform: scaleX(0);
    }
    &:hover::before {
      // transform-origin: bottom right;
      transform: scaleX(1);
    }
  }
  .loginComp {
    right: -20px;
    position: absolute;
    top: 75px;
  }
}
</style>

<script>
import todoLogin from "./todoLogin.vue";
import todoTable from "./todoTable.vue";

export default {
  name: "todoList",
  props: {
    msg: String
  },
  components: {
    todoLogin,
    todoTable
  },
  data() {
    return {
      userInfo: {
        name: "guy",
        uid: "0",
        loginStatus: false
      },
      todoData: []
    };
  },
  created() {
    this.loadTable();
  },
  methods: {
    //监听登录子组件登录状态信息触发的callback
    setUserInfo(info) {
      this.userInfo = info;
      this.loadTable();
    },

    //加载todolist列表
    loadTable() {
      let Locallist = JSON.parse(localStorage.getItem("todolist"));
      //若online状态加载server
      if (this.userInfo.loginStatus) {
        this.loading = true;
        //登录时若本地有数据则与server同步
        if (Locallist && Locallist.length > 1) {
          let syncTask = this.getLocalTodo(Locallist);
          //多个本地todo增加任务完成后获取新的todolist
          Promise.all(syncTask).then(this.$refs.todoTable.refreshTodoList);
        } else {
          //无本地数据则直接拉server
          this.$refs.todoTable.refreshTodoList();
        }
      } else if (Locallist) {
        //离线则加载本地LoalStorage
        this.todoData = Locallist;
      }
    },

    //将本地离线创建的无IDtodo 同步到server
    getLocalTodo(Locallist, tasks = []) {
      Locallist.forEach(todo => {
        if (!Object.prototype.hasOwnProperty.call(todo, "id")) {
          tasks.push(this.$api.todo.add(todo));
        }
      });
      return tasks;
    }
  }
};
</script>
