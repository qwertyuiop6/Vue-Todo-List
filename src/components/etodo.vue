<template>
  <div class="box">
    <p>
      Hi!
      <span
        v-text="name"
        style="color: rgb(64, 158, 255);
    font-weight: bold;
    font-size: 1.6rem;"
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

    <el-tooltip class="item" effect="dark" content="登录可以同步todolist到云端哦~" placement="top">
      <el-button icon="el-icon-upload" circle v-if="!loginStatus" @click="loginFormVisible=true"></el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="退出登录" placement="top">
      <el-button icon="el-icon-switch-button" circle v-if="loginStatus" @click="logout()"></el-button>
    </el-tooltip>
    <p v-if="content" class="tips">你是要添加: {{content}} ?</p>
    <el-dialog title="登录" :visible.sync="loginFormVisible">
      <el-form :model="form">
        <el-form-item label="昵称:">
          <el-input
            v-model="form.name"
            autocomplete="off"
            suffix-icon="el-icon-user-solid"
            maxlength="10"
            placeholder="请输入您的昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input
            v-model="form.passwd"
            autocomplete="off"
            suffix-icon="el-icon-view"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="loginFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="login(form.name,form.passwd)">
          登录
          <i class="el-icon-loading" v-show="isLoging"></i>
        </el-button>
      </div>
    </el-dialog>

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
            @click="status[scope.row.status].togglefn(scope.$index,scope.row.todoId)"
          ></el-button>
          <el-button size="mini" type="danger" @click="del(scope.$index,scope.row.todoId)">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-table :data="tableData">
    <el-table-column
      v-for="{ prop, label} in colConfigs"
      :key="prop"
      :prop="prop"
      :label="label">
    </el-table-column>
    </el-table>-->
    <!-- Form -->
  </div>
</template>
<style lang="scss">
.box {
  text-align: center;
  min-width: 700px;
  .el-input {
    width: 52%;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 28%;
    > input {
      border-radius: 0;
    }
  }
  p {
    color: #409eff;
    font-size: 1.5rem;
    text-shadow: 2px 3px 13px #70c3ff;
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
}
</style>
<script>
import {
  getAll,
  update,
  add as dbadd,
  del as dbdel,
  changeStatus as dbCs
} from "../utils/api";
import { setCookie, getCookie, deleteCookies, toLogin } from "../utils/login";

export default {
  name: "todo",
  props: {
    msg: String
  },
  data() {
    // this.colConfigs = [
    //     { prop: 'date', label: '日期' },
    //     { prop: 'target', label: '目标'}
    // ]
    return {
      content: "",
      datePick: "",
      tableData: [],
      loading: false,
      status: [
        {
          img: "el-icon-more",
          text: "进行中",
          togglefn: this.done,
          toggle: "完成了！"
        },
        {
          img: "el-icon-success",
          text: "已完成",
          togglefn: this.undo,
          toggle: "还原"
        }
      ],
      //登录相关
      loginFormVisible: false,
      loginStatus: false,
      isLoging: false,
      uid: "",
      name: "",
      form: {
        name: "",
        passwd: ""
      }
    };
  },
  created() {
    this.checkLogin();
  },
  mounted() {
    this.loadTable();
  },
  // watch: {
  //   // content:(val)=>{
  //   //     // console.log('content为：',val);
  //   // }
  // },
  // computed: {
  //   // issus(index) {
  //   //   return {
  //   //     del: this.tableData[index].status == 1
  //   //   };
  //   // }
  // },
  methods: {
    //检查是否是已登录状态
    checkLogin() {
      //检查是否存在session
      this.loginStatus = getCookie("isLogin");
      if (this.loginStatus) {
        this.uid = getCookie("uid");
        this.name = getCookie("name");
        this.$message.success(this.name + " Welcome to your todolist!");
      } else {
      }
    },

    //登录动作
    login(name, passwd) {
      this.isLoging = true;
      let loginParam = {
        name,
        passwd
      };
      toLogin(loginParam)
        .then(res => {
          if (res.code == 200) {
            // let expireTime = 1000 * 3600 * 6;
            // setCookie("session", res.session, expireTime);
            this.isLoging = false;
            this.loginFormVisible = false;
            this.$message.success(name + " 登陆成功~~欢迎~");
            this.loginStatus = getCookie("isLogin");
            this.uid = getCookie("uid");
            this.name = getCookie("name");
            this.loadTable(true);
          } else {
            this.isLoging = false;
            this.$message.error("权限验证失败，" + res.msg);
          }
        })
        .catch(err => {
          this.isLoging = false;
          this.$message.error("网络可能出问题啦~" + err.response);
        });
    },

    logout() {
      this.$confirm("确定退出登录吗?", "FBI Warnning!!", {
        confirmButtonText: "确定!",
        cancelButtonText: "取消~",
        type: "warning"
      }).then(() => {
        this.loginStatus = false;
        this.name = "";
        this.uid = "";
        deleteCookies(["uid", "name", "isLogin"]);
        this.loadTable();
        this.$message.success("已退出登录~");
      });
    },

    //加载todolist列表
    loadTable(syncLocal = false) {
      let Locallist = JSON.parse(localStorage.getItem("todolist"));
      //若online状态加载server
      if (this.loginStatus) {
        this.loading = true;

        //登录时若本地有数据则与server同步
        if (Locallist && Locallist.length > 1 && syncLocal) {
          let syncTask = this.pushLocalTodo(Locallist);

          //多个本地todo增加任务完成后获取新的todolist
          Promise.all(syncTask).then(() => {
            this.getTodolist();
          });
        } else {
          //无本地数据则直接拉server
          this.getTodolist();
        }
      } else {
        //加载本地LoalStorage
        if (Locallist) {
          this.tableData = Locallist;
        }
      }
    },

    //根据uid获取所有todolist
    getTodolist() {
      getAll(this.uid).then(res => {
        this.loading = false;
        let list = [];
        res.data.forEach(ele => {
          const {
            start_date: startDate,
            content: target,
            end_date: endDate,
            status,
            todo_id: todoId
          } = ele;
          list.push({ startDate, target, status, endDate, todoId });
        });
        this.tableData = list;
        localStorage.setItem("todolist", JSON.stringify(this.tableData));
      });
    },

    //将本地离线创建的无IDtodo 同步到server
    pushLocalTodo(Locallist, tasks = []) {
      Locallist.forEach(todo => {
        if (!todo.hasOwnProperty("todoId")) {
          var date = new Date();
          var now = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
          // let newTodo = {
          //   startDate: now,
          //   target: todo.target,
          //   status: todo.status,
          //   endDate: todo.endDate
          // };
          tasks.push(dbadd(this.uid, todo));
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
        dbadd(this.uid, newTodo).then(res => {
          if (res.code == 200) {
            // this.tableData.push(newTodo);
            this.$message.success("添加成功~");
            this.getTodolist();
          }
        });
      } else {
        //离线存储到本地LocalStorage
        this.tableData.push(newTodo);
        localStorage.setItem("todolist", JSON.stringify(this.tableData));
      }
    },

    //删除一条todo
    del(index, todoId) {
      this.$confirm("确定删除这个Todolist吗?", "FBI Warnning!!", {
        confirmButtonText: "确定!",
        cancelButtonText: "取消~",
        type: "warning"
      })
        .then(() => {
          if (this.loginStatus) {
            dbdel(this.uid, todoId).then(res => {
              if (res.code == 200) {
                this.tableData.splice(index, 1);
                this.$message.success("删除成功!");
              }
            });
          } else {
            this.tableData.splice(index, 1);
            this.$message.success("删除成功!");
          }
          localStorage.setItem("todolist", JSON.stringify(this.tableData));
        })
        .catch(() => {
          this.$message.info("已取消删除~");
        });
    },

    //改变todo状态
    done(index, todoId) {
      if (this.loginStatus) {
        dbCs(this.uid, todoId, 1);
      }

      var data = this.tableData[index];
      data.status = 1;
      this.tableData.splice(index, 1, data);
      localStorage.setItem("todolist", JSON.stringify(this.tableData));
    },

    //撤销完成动作
    undo(index, todoId) {
      if (this.loginStatus) {
        dbCs(this.uid, todoId, 0);
      }

      var data = this.tableData[index];
      data.status = 0;
      this.tableData.splice(index, 1, data);
      localStorage.setItem("todolist", JSON.stringify(this.tableData));
    }
  }
};
</script>