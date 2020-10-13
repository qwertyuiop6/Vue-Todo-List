<template>
  <div>
    <todo-input @addTodo="addTodo"></todo-input>

    <div class="todolist">
      <el-tabs tab-position="left" v-model="activeTab">
        <el-tab-pane name="ing">
          <span slot="label"><i class="el-icon-date"></i> 进行中</span>
          <el-table :data="tableData" v-loading="loading" class="todotable">
            <el-table-column label="创建日期" width="150" prop="startDate"></el-table-column>
            <el-table-column label="目标" width="240">
              <template slot-scope="scope">
                <span
                  style="margin-left: 5px"
                  v-text="scope.row.target"
                  :style="scope.row.status == 1 ? { 'text-decoration': 'line-through' } : {}"
                ></span>
              </template>
            </el-table-column>
            <el-table-column label="截止日期" width="110">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span>{{ scope.row.endDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="90">
              <template slot-scope="scope">
                <span class="status" v-text="status[scope.row.status].text"></span>
                <i :class="status[scope.row.status].img"></i>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  v-text="status[scope.row.status].toggle"
                  @click="
                    toggleFn(scope.$index, scope.row.id, status[scope.row.status].toggleStatus)
                  "
                ></el-button>
                <el-button size="mini" type="danger" @click="delTodo(scope.$index, scope.row.id)">
                  <i class="el-icon-delete"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane name="done"
          ><span slot="label"><i class="el-icon-check"></i> 已完成</span>
          <el-table :data="tableData" v-loading="loading" class="todotable">
            <el-table-column label="创建日期" width="150" prop="startDate"></el-table-column>
            <el-table-column label="目标" width="240">
              <template slot-scope="scope">
                <span
                  v-text="scope.row.target"
                  :style="scope.row.status == 1 ? { 'text-decoration': 'line-through' } : {}"
                ></span>
              </template>
            </el-table-column>
            <el-table-column label="截止日期" width="110">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span>{{ scope.row.endDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="90">
              <template slot-scope="scope">
                <span class="status" v-text="status[scope.row.status].text"></span>
                <i :class="status[scope.row.status].img"></i>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  v-text="status[scope.row.status].toggle"
                  @click="
                    toggleFn(scope.$index, scope.row.id, status[scope.row.status].toggleStatus)
                  "
                ></el-button>
                <el-button size="mini" type="danger" @click="delTodo(scope.$index, scope.row.id)">
                  <i class="el-icon-delete"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss">
.del {
  text-decoration: line-through;
}
.el-icon-success {
  color: #41b883;
  margin-left: 2px;
}
.todolist {
  margin-top: 1rem;
  position: relative;
  left: -3.4rem;
}
.todotable {
  border: 1px solid #eee;
}
.el-table td,
.el-table th {
  padding: 14px 0;
}
</style>
<script>
import todoInput from "./todoInput";

export default {
  name: "todoTable",
  props: {
    // loginStatus: Boolean,
    // tableData: Array
  },
  components: {
    todoInput
  },
  data() {
    return {
      todoData: [],
      activeTab: "ing",
      loading: false,
      status: [
        {
          img: "el-icon-more",
          text: "进行中",
          toggleStatus: 1,
          toggle: "完成！"
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
  computed: {
    loginStatus() {
      return this.$store.loginStatus;
    },
    ingTodoData() {
      return this.todoData.filter(v => v.status === 0);
    },
    doneTodoData() {
      return this.todoData.filter(v => v.status === 1);
    },
    tableData() {
      return this.activeTab === "ing" ? this.ingTodoData : this.doneTodoData;
    }
  },
  watch: {
    loginStatus(n, o) {
      if (o === false && n === true) this.loadTable();
    }
  },
  methods: {
    //加载todolist表格数据
    loadTable() {
      let LocalTodoList = JSON.parse(localStorage.getItem("todolist"));
      //若loginStatus状态加载server
      if (this.loginStatus) {
        this.loading = true;
        //登录时若本地有数据则与server同步
        if (LocalTodoList?.length > 0) {
          let syncTask = this.getLocalChangedTodo(LocalTodoList);
          //多个本地todo增加任务完成后获取新的todolist
          Promise.all(syncTask).then(this.refreshTodoList());
        } else {
          //无本地数据则直接拉server
          this.refreshTodoList();
        }
      } else if (LocalTodoList) {
        //离线则加载本地LoalStorage
        this.todoData = LocalTodoList;
      }
    },

    //将本地离线创建的无IDtodo 同步到server
    getLocalChangedTodo(LocalTodoList, tasks = []) {
      LocalTodoList.forEach(todo => {
        if (!Object.prototype.hasOwnProperty.call(todo, "id")) {
          tasks.push(this.$api.todo.add(todo));
        }
      });
      return tasks;
    },
    async refreshTodoList() {
      this.todoData = await this.getTodolist();
      this.updateLocalTodoList();
    },
    //获取所有todolist
    async getTodolist() {
      let res = await this.$api.todo.getAll();
      this.loading = false;
      let list = res.data.map(ele => ({
        startDate: ele.start_date,
        target: ele.content,
        endDate: ele.end_date,
        status: ele.status,
        id: ele.id
      }));
      return list.sort((a, b) => a.id - b.id);
    },

    addTodo(todo) {
      if (this.loginStatus) {
        this.$api.todo
          .add(todo)
          .then(() => {
            this.todoData.push(todo);
            this.$message.success("添加成功~");
            this.refreshTodoList();
          })
          .catch(err => {
            this.$message.error("添加失败,请重试");
          });
      } else {
        this.ingTodoData.push(todo);
        this.updateLocalTodoList();
      }
    },

    //删除一条todo
    delTodo(index, id) {
      this.$confirm("确定删除这个Todo吗?", "FBI Warnning!!", {
        confirmButableDataonText: "确定!",
        cancelButableDataonText: "取消~",
        type: "warning"
      })
        .then(() => {
          const delTodo = this.tableData.splice(index, 1);
          if (this.loginStatus) {
            this.$api.todo
              .remove(id)
              .then(() => {
                this.$message.success("删除成功!");
              })
              .catch(err => {
                this.tableData.splice(index, 0, ...delTodo);
                console.log(err);
                return;
              });
          } else {
            this.$message.success("删除成功!");
          }
          this.updateLocalTodoList();
        })
        .catch(() => {
          // this.$message.info("已取消删除");
        });
    },

    //更改todo完成状态
    toggleFn(index, id, status) {
      if (this.loginStatus) {
        this.$api.todo.changeStatus(id, status);
      }
      // var data = this.tableData[index];
      // data.status = status;
      let toggleTableData = this.activeTab === "ing" ? this.doneTodoData : this.ingTodoData;
      const toggleTodo = this.tableData.splice(index, 1)[0];
      toggleTodo.status = status;
      toggleTableData.push(toggleTodo);

      this.updateLocalTodoList();
    },

    //存储到本地LocalStorage
    updateLocalTodoList() {
      this.todoData = [...this.ingTodoData, ...this.doneTodoData];
      localStorage.setItem("todolist", JSON.stringify(this.todoData));
    }
  }
};
</script>
