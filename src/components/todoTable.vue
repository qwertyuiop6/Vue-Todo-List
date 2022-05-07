<template>
  <div>
    <todo-input @addTodo="addTodo"></todo-input>

    <div class="todolist">
      <el-tabs tab-position="left" v-model="activeTab">
        <el-tab-pane name="ing">
          <span slot="label"><i class="el-icon-date"></i> 进行中</span>
          <el-table :data="tableData" v-loading="loading" class="todotable" empty-text="---">
            <el-table-column width="150" prop="createAt">
              <template slot="header">
                <span>创建日期 </span>
                <i class="el-icon-time"></i>
              </template>
            </el-table-column>
            <el-table-column width="240">
              <template slot="header">
                <span>目标 </span>
                <i class="el-icon-data-line"></i>
              </template>
              <template slot-scope="scope">
                <div
                  class="input-textarea"
                  v-text="scope.row.content"
                  :ref="'input' + scope.row.id"
                  contenteditable="true"
                  @blur="updateContent(scope.$index, scope.row.id)"
                />
              </template>
            </el-table-column>
            <el-table-column width="120">
              <template slot="header">
                <span>截止日期 </span>
                <i class="el-icon-time"></i>
              </template>
              <template slot-scope="scope">
                <span>{{ scope.row.deadlineAt || "———" }}</span>
              </template>
            </el-table-column>
            <el-table-column width="90">
              <template slot="header">
                <span>状态 </span>
                <i class="el-icon-copy-document"></i>
              </template>
              <template slot-scope="scope">
                <span class="status" v-text="status[scope.row.complete ? 1 : 0].text"></span>
                <i :class="status[scope.row.complete ? 1 : 0].img"></i>
              </template>
            </el-table-column>
            <el-table-column width="180">
              <template slot="header">
                <span>操作 </span>
                <i class="el-icon-s-operation"></i>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  v-text="status[scope.row.complete ? 1 : 0].toggle"
                  @click="toggleFn(scope.$index, scope.row.id, !scope.row.complete)"
                ></el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="confirmAsk(scope.$index, scope.row.id)"
                >
                  <i class="el-icon-delete"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane name="done"
          ><span slot="label"><i class="el-icon-check"></i> 已完成</span>
          <el-table :data="tableData" v-loading="loading" class="todotable">
            <el-table-column width="150" prop="createAt">
              <template slot="header">
                <span>创建日期 </span>
                <i class="el-icon-time"></i>
              </template>
            </el-table-column>
            <el-table-column width="240">
              <template slot="header">
                <span>目标 </span>
                <i class="el-icon-data-line"></i>
              </template>
              <template slot-scope="scope">
                <span v-text="scope.row.content" :style="todoDoneStyle"></span>
              </template>
            </el-table-column>
            <el-table-column width="120">
              <template slot="header">
                <span>截止日期 </span>
                <i class="el-icon-time"></i>
              </template>
              <template slot-scope="scope">
                <span>{{ scope.row.deadlineAt || "———" }}</span>
              </template>
            </el-table-column>
            <el-table-column width="90">
              <template slot="header">
                <span>状态 </span>
                <i class="el-icon-copy-document"></i>
              </template>
              <template slot-scope="scope">
                <span class="status" v-text="status[scope.row.complete ? 1 : 0].text"></span>
                <i :class="status[scope.row.complete ? 1 : 0].img"></i>
              </template>
            </el-table-column>
            <el-table-column width="180">
              <template slot="header">
                <span>操作 </span>
                <i class="el-icon-s-operation"></i>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  v-text="status[scope.row.complete ? 1 : 0].toggle"
                  @click="toggleFn(scope.$index, scope.row.id, !scope.row.complete)"
                ></el-button>

                <el-popconfirm
                  style="margin-left: 10px"
                  confirmButtonText="删了"
                  cancelButtonText="不了"
                  icon="el-icon-info"
                  iconColor="red"
                  title="确定删除这个todo吗？"
                  confirmButtonType="danger"
                  @confirm="delTodo(scope.$index, scope.row.id)"
                >
                  <el-button slot="reference" size="mini" type="danger">
                    <i class="el-icon-delete"></i>
                  </el-button>
                  <!-- <el-button slot="reference">删除</el-button> -->
                </el-popconfirm>
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
  .input-textarea {
    box-sizing: content-box;
    max-height: 110px;
    overflow: hidden;
    padding: 5px;
    border: 1px solid transparent;
    background: transparent;
    border-radius: 5px;
    transition: 0.3s;
    &:hover {
      overflow: auto;
      border: 1px solid #ededed;
      background: rgba(255, 255, 255, 0.74);
    }
    &:focus {
      border: 1px solid #a2a2a2;
      outline: none;
    }
  }
}
.el-table td,
.el-table th {
  padding: 14px 0;
}
</style>
<script>
import todoInput from "./todoInput.vue";

export default {
  name: "todoTable",
  props: {
    data: Array,
  },
  components: {
    todoInput,
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
          toggle: "完成！",
        },
        {
          img: "el-icon-success",
          text: "已完成",
          toggle: "还原",
        },
      ],
      todoDoneStyle: { margin: "6px", display: "block", "text-decoration": "line-through" },
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
      return this.todoData.filter((v) => !v.complete);
    },
    doneTodoData() {
      return this.todoData.filter((v) => v.complete);
    },
    tableData() {
      return this.activeTab === "ing" ? this.ingTodoData : this.doneTodoData;
    },
  },
  watch: {
    loginStatus(n, o) {
      if (o === false && n === true) this.loadTable();
    },
  },
  methods: {
    //加载todolist表格数据
    async loadTable() {
      let LocalData = JSON.parse(localStorage.getItem("todolist"));
      //若loginStatus状态加载server
      if (this.loginStatus) {
        this.loading = true;
        //登录时若本地有数据则与server同步
        if (LocalData?.length > 0) {
          let syncTask = this.getLocalChangedTodo(LocalData);
          //多个本地todo增加任务完成后获取新的todolist
          await Promise.all(syncTask).then(this.refreshData());
        } else {
          //无本地数据则直接拉server
          await this.refreshData();
        }
        this.loading = false;
      } else if (LocalData) {
        //离线则加载本地LoalStorage
        this.todoData = LocalData;
      }
    },

    //将本地离线创建的无IDtodo 同步到server
    getLocalChangedTodo(LocalData) {
      return LocalData.map((todo) => {
        if (!Object.hasOwn(todo, "id")) {
          return this.$api.todo.add(todo);
        }
      });
    },

    async refreshData() {
      this.todoData = await this.getTodolist();
      this.updateLocalData();
    },

    //获取所有todolist
    async getTodolist() {
      let res = await this.$api.todo.getAll();
      let list = res.data;
      list.forEach((t, k) => {
        list[k].createAt = new Date(t.createAt).toLocaleString();
        if (isNaN(t) && Date.parse(t.deadlineAt)) {
          list[k].deadlineAt = new Date(t.deadlineAt).toLocaleDateString();
        }
      });
      return list.sort((a, b) => a.id - b.id);
    },

    addTodo(todo) {
      if (this.loginStatus) {
        this.$api.todo
          .add(todo)
          .then(() => {
            this.todoData.push(todo);
            this.$message.success("添加成功~");
            this.refreshData();
          })
          .catch(() => {
            this.$message.error("添加失败,请重试");
          });
      } else {
        this.ingTodoData.push(todo);
        this.updateLocalData();
      }
    },

    confirmAsk(index, id) {
      this.$confirm("你还没有完成这个Todo，确定删除吗?", "FBI Warnning!!", {
        confirmButableDataonText: "确定!",
        cancelButableDataonText: "取消~",
        type: "warning",
      })
        .then(() => {
          this.delTodo(index, id);
        })
        .catch(() => {
          // this.$message.info("已取消删除");
        });
    },

    //删除一条todo
    delTodo(index, id) {
      if (this.loginStatus) {
        this.$api.todo
          .remove(id)
          .then(() => {
            this.$message.success("删除成功!");
            this.refreshData();
          })
          .catch(() => {
            // this.tableData.splice(index, 0, ...delTodo);
            this.$message.error("删除失败");
            return;
          });
      } else {
        this.tableData.splice(index, 1);
        this.$message.success("删除成功!");
        this.updateLocalData();
      }
    },
    //更改todo完成状态
    toggleFn(index, id, complete) {
      let toggleTableData = this.activeTab === "ing" ? this.doneTodoData : this.ingTodoData;
      if (this.loginStatus) {
        this.$api.todo.updateTodo(id, { complete }).then(() => {
          // const toggleTodo = this.tableData.splice(index, 1)[0];
          // toggleTodo.status = status;
          // toggleTableData.push(toggleTodo);
          // this.updateLocalData();
          this.refreshData();
        });
        return;
      }
      const toggleTodo = this.tableData.splice(index, 1)[0];
      toggleTodo.complete = complete;
      toggleTableData.push(toggleTodo);
      this.updateLocalData();
    },
    updateContent(index, id) {
      let todo = this.tableData[index];
      const content = this.$refs["input" + id].textContent;
      todo.content = content;
      if (this.loginStatus) {
        this.$api.todo.updateTodo(id, { content }).then(() => {
          this.tableData.splice(index, 1, todo);
          this.updateLocalData();
        });
        return;
      }
      this.tableData.splice(index, 1, todo);
      this.updateLocalData();
    },
    //存储到本地LocalStorage
    updateLocalData() {
      this.todoData = [...this.ingTodoData, ...this.doneTodoData];
      localStorage.setItem("todolist", JSON.stringify(this.todoData));
    },
  },
};
</script>
