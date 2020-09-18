<template>
  <div class="box">
    <p>
      Hi!
      <span
        v-text="name"
        style="color: rgb(64, 158, 255);
    font-weight: bold;
    font-size: 1.5rem;"
      ></span>
      ,
      This is your {{msg}}
      <i class="el-icon-s-order"></i>
    </p>
    <el-input
      type="text"
      name="content"
      placeholder="今天想做些什么？"
      v-model="content"
      @keyup.enter="add(content)"
    ></el-input>
    <el-date-picker
      slot="append"
      v-model="datePick"
      type="date"
      placeholder="截止日期"
      value-format="yyyy-MM-dd"
    ></el-date-picker>
    <el-button type="primary" @click="add(content,datePick)">
      添加
      <i class="el-icon-edit"></i>
    </el-button>
    <p v-if="content" class="tips">你是要添加: {{content}} ?</p>

    <login title="登录/注册" @userStatusChange="setUserInfo" class="loginComp"></login>

    <!-- element表格 -->
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column label="创建日期" width="130" prop="startDate"></el-table-column>
      <el-table-column label="目标" width="190">
        <template slot-scope="scope">
          <span
            style="margin-left: 10px"
            v-text="scope.row.target"
            :style="scope.row.status==1?{'text-decoration':'line-through'}:{}"
          ></span>
        </template>
      </el-table-column>
      <el-table-column label="截止日期" width="130">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.endDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px" class="status" v-text="status[scope.row.status].text"></span>
          <i :class="status[scope.row.status].img"></i>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-text="status[scope.row.status].toggle"
            @click="toggleFn(scope.$index,scope.row.id,status[scope.row.status].toggleStatus)"
          ></el-button>
          <el-button size="mini" type="danger" @click="del(scope.$index,scope.row.id)">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss">
.box {
  text-align: center;
  min-width: 700px;
  position: relative;
  > .el-input {
    width: 52%;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 28%;
    > input {
      border-radius: 0;
    }
  }
  p:first-of-type {
    color: #409eff;
    font-size: 1.5rem;
    text-shadow: 1px 3px 11px #8ccfff;
  }
  .tips {
    font-size: 0.9rem;
    color: gray;
  }
  .del {
    text-decoration: line-through;
  }
  .el-icon-success {
    color: #41b883;
    margin-left: 2px;
  }
  span {
    margin-left: 0;
  }
  .loginComp {
    right: -20px;
    position: absolute;
    top: 75px;
  }
}
</style>

<script>
import login from "./todoLogin.vue";

// import * as this.$api.todoList from "../utils/this.$api.todoList";

export default {
  name: "etodo",
  props: {
    msg: String
  },
  components: {
    login
  },
  data() {
    return {
      name: "guy",
      uid: "0",
      loginStatus: false,

      content: "",
      datePick: "",
      tableData: [],
      loading: false,
      status: [
        {
          img: "el-icon-more",
          text: "进行中",
          toggleStatus: 1,
          toggle: "完成了！"
        },
        {
          img: "el-icon-success",
          text: "已完成",
          toggleStatus: 0,
          toggle: "还原"
        }
      ]
    };
  },
  created() {
    this.loadTable();
  },
  methods: {
    //监听登录子组件登录状态信息触发的callback
    setUserInfo(info) {
      Object.assign(this, info);
      if (info.loginStatus) {
        this.loadTable(true);
      }
    },

    //加载todolist列表
    loadTable(syncLocal = false) {
      let Locallist = JSON.parse(localStorage.getItem("todolist"));
      //若online状态加载server
      if (this.loginStatus) {
        this.loading = true;
        //登录时若本地有数据则与server同步
        if (Locallist && Locallist.length > 1 && syncLocal) {
          let syncTask = this.getLocalTodo(Locallist);
          //多个本地todo增加任务完成后获取新的todolist
          Promise.all(syncTask).then(() => {
            this.getTodolist();
          });
        } else {
          //无本地数据则直接拉server
          this.getTodolist();
        }
      } else if (Locallist) {
        //离线则加载本地LoalStorage
        this.tableData = Locallist;
      }
    },

    //根据uid获取所有todolist
    getTodolist() {
      this.$api.todo.getAll(this.uid).then(res => {
        console.log(res);
        this.loading = false;
        let list = res.data.map(ele => ({
          startDate: ele.start_date,
          target: ele.content,
          endDate: ele.end_date,
          status: ele.status,
          id: ele.id
        }));
        list.sort((a, b) => a.id - b.id);
        this.tableData = list;
        this.updateLocalTodoList();
      });
    },

    //将本地离线创建的无IDtodo 同步到server
    getLocalTodo(Locallist, tasks = []) {
      Locallist.forEach(todo => {
        if (!Object.prototype.hasOwnProperty.call(todo,"id")) {
          tasks.push(this.$api.todo.add(this.uid, todo));
        }
      });
      // this.$message.success(tasks.length.toString());
      return tasks;
    },

    //增加一条todo
    add(content, endDate = "", status = 0) {
      var date = new Date();
      var now = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
      let newTodo = {
        startDate: now,
        target: content,
        status,
        endDate
      };

      //online状态添加到server
      if (this.loginStatus) {
        this.$api.todo.add(this.uid, newTodo).then(() => {
          // this.tableData.push(newTodo);
          this.$message.success("添加成功~");
          this.getTodolist();
        });
      } else {
        //离线存储到本地LocalStorage
        this.tableData.push(newTodo);
        this.updateLocalTodoList();
      }
    },

    //删除一条todo
    del(index, id) {
      this.$confirm("确定删除这个Todolist吗?", "FBI Warnning!!", {
        confirmButtonText: "确定!",
        cancelButtonText: "取消~",
        type: "warning"
      })
        .then(() => {
          if (this.loginStatus) {
            this.$api.todo
              .remove(this.uid, id)
              .then(() => {
                this.tableData.splice(index, 1);
                this.$message.success("删除成功!");
              })
              .catch(()=> {
                this.$message.error("删除失败");
                return;
              });
          } else {
            this.tableData.splice(index, 1);
            this.$message.success("删除成功!");
          }
          // this.$message.success("删除成功!");
          this.updateLocalTodoList();
        })
        .catch(() => {
          // this.$message.info("已取消删除");
        });
    },

    //更改todo完成状态
    toggleFn(index, id, status) {
      if (this.loginStatus) {
        this.$api.todo.changeStatus(this.uid, id, status);
      }
      var data = this.tableData[index];
      data.status = status;
      this.tableData.splice(index, 1, data);
      this.updateLocalTodoList();
    },

    updateLocalTodoList(){
      localStorage.setItem("todolist", JSON.stringify(this.tableData));
    }
  }
};
</script>
