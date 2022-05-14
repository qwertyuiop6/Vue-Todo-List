<template>
  <div>
    <todo-input @addTodo="addTodo"></todo-input>

    <div class="todolist">
      <el-tabs tab-position="left" v-model="activeTab">
        <div class="w-[800px]">
          <el-tab-pane name="ing">
            <template #label>
              <span
                ><el-icon><Guide /></el-icon> 进行中</span
              >
            </template>

            <todo-table
              :data="ingTodoData"
              :loading="loading"
              type="ing"
              @update-data="handleUpdate('ing', $event)"
            >
              <template #content="{ content, id, index, updateContent }">
                <el-tooltip
                  content="点击修改"
                  :show-after="200"
                  placement="right-end"
                  effect="dark"
                >
                  <div
                    class="input-textarea"
                    v-text="content"
                    contenteditable="true"
                    @blur="updateContent(index, id)"
                  />
                </el-tooltip>
              </template>
              <template #delete="{ action, index, id }">
                <el-button type="danger" @click="action(index, id)">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </template>
            </todo-table>
          </el-tab-pane>

          <el-tab-pane name="done">
            <template #label>
              <span
                ><el-icon><finished /></el-icon> 已完成</span
              >
            </template>
            <todo-table
              :data="doneTodoData"
              type="done"
              :loading="loading"
              @update-data="handleUpdate('done', $event)"
            >
              <template #content="{ content, todoDoneStyle }">
                <span v-text="content" :style="todoDoneStyle" class="text-gray-400"></span>
              </template>
              <template #delete="{ action, index, id }">
                <el-popconfirm
                  title="确定删除这个todo吗?"
                  confirmButtonText="删了"
                  cancelButtonText="不了"
                  icon="Delete"
                  iconColor="red"
                  confirmButtonType="danger"
                  @confirm="action(index, id)"
                >
                  <template #reference>
                    <el-button size="default" type="danger">
                      <el-icon>
                        <Delete />
                      </el-icon>
                    </el-button>
                  </template>
                </el-popconfirm>
              </template>
            </todo-table>
          </el-tab-pane>
        </div>
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
import todoTable from "@/components/todoTable.vue";
import { useStore } from "@/store/pinia";
import { mapState } from "pinia";

export default {
  name: "todoList",
  props: {
    data: Array,
  },
  components: {
    todoInput,
    todoTable,
  },
  data() {
    return {
      todoData: [],
      activeTab: "ing",
      loading: false,
    };
  },
  created() {
    this.loadTable();
  },
  computed: {
    ...mapState(useStore, ["loginStatus"]),
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
      let LocalData = this.getLocalData();
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
        this.updateLocalData();
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
      if (!this.loginStatus) {
        this.todoData = this.getLocalData();
      } else {
        this.todoData = await this.getTodolist();
      }
    },

    async getTodolist() {
      this.loading = true;
      let list = await this.$api.todo.getAll();
      list.forEach((t, k) => {
        list[k].createAt = new Date(t.createAt).toLocaleString();
        if (isNaN(t) && Date.parse(t.deadlineAt)) {
          list[k].deadlineAt = new Date(t.deadlineAt).toLocaleDateString();
        }
      });
      this.loading = false;
      return list.sort((a, b) => a.id - b.id);
    },

    handleUpdate(type, data) {
      if (type === "ing") {
        this.todoData = [...data, ...this.doneTodoData];
      } else {
        this.todoData = [...this.ingTodoData, ...data];
      }
      console.log(this.todoData);
      this.updateLocalData();
      this.loginStatus && this.refreshData();
    },

    async addTodo(todo) {
      this.todoData.push(todo);
      if (this.loginStatus) {
        try {
          await this.$api.todo.add(todo);
          this.$message.success("添加成功~");
        } catch (error) {
          this.$message.error("添加失败,请重试");
          return;
        }
        await this.refreshData();
      }
      this.updateLocalData();
    },

    //获取本地data
    getLocalData() {
      return JSON.parse(localStorage.getItem("todolist"));
    },

    //存储到本地LocalStorage
    updateLocalData() {
      localStorage.setItem("todolist", JSON.stringify(this.todoData));
    },
  },
};
</script>
