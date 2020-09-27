<template>
  <div>
    <todo-input @addTodo="addTodo"></todo-input>

    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column label="创建日期" width="130" prop="startDate"></el-table-column>
      <el-table-column label="目标" width="190">
        <template slot-scope="scope">
          <span
            style="margin-left: 10px"
            v-text="scope.row.target"
            :style="scope.row.status == 1 ? { 'text-decoration': 'line-through' } : {}"
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
          <span
            style="margin-left: 10px"
            class="status"
            v-text="status[scope.row.status].text"
          ></span>
          <i :class="status[scope.row.status].img"></i>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-text="status[scope.row.status].toggle"
            @click="toggleFn(scope.$index, scope.row.id, status[scope.row.status].toggleStatus)"
          ></el-button>
          <el-button size="mini" type="danger" @click="delTodo(scope.$index, scope.row.id)">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
span {
  margin-left: 0;
}
</style>
<script>
import todoInput from "./todoInput";

export default {
  name: "todoTable",
  props: {
    online: Boolean,
    todoData: Array
  },
  components: {
    todoInput
  },
  data() {
    return {
      tableData: this.todoData,
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
    // this.tableData = this.todoData;
  },
  methods: {
    async refreshTodoList() {
      this.tableData = await this.getTodolist();
      this.updateLocalTodoList();
    },

    //根据uid获取所有todolist
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
      if (this.online) {
        this.$api.todo
          .add(todo)
          .then(() => {
            this.tableData.push(todo);
            this.$message.success("添加成功~");
            this.refreshTodoList();
          })
          .catch(err => {
            this.$message.error("添加失败,请重试");
          });
      } else {
        this.tableData.push(todo);
        this.updateLocalTodoList();
      }
    },

    //删除一条todo
    delTodo(index, id) {
      this.$confirm("确定删除这个Todolist吗?", "FBI Warnning!!", {
        confirmButtonText: "确定!",
        cancelButtonText: "取消~",
        type: "warning"
      })
        .then(() => {
          const delTodo = this.tableData.splice(index, 1);
          if (this.online) {
            this.$api.todo
              .remove(id)
              .then(() => {
                this.$message.success("删除成功!");
              })
              .catch(err => {
                this.tableData.splice(index, 0, delTodo);
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
      if (this.online) {
        this.$api.todo.changeStatus(id, status);
      }
      var data = this.tableData[index];
      data.status = status;
      this.tableData.splice(index, 1, data);
      this.updateLocalTodoList();
    },

    //存储到本地LocalStorage
    updateLocalTodoList() {
      localStorage.setItem("todolist", JSON.stringify(this.tableData));
    }
  }
};
</script>
