<template>
  <el-table :data="tableData" v-loading="loading" class="todotable" empty-text="---">
    <el-table-column width="150" prop="createAt">
      <template #header>
        <span>创建日期 </span>
        <el-icon><Clock /></el-icon>
      </template>
    </el-table-column>
    <el-table-column width="240">
      <template #header>
        <span>目标 </span>
        <el-icon><Flag /></el-icon>
      </template>
      <template #default="scope">
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
      <template #header>
        <span>截止日期 </span>
        <el-icon><AlarmClock /></el-icon>
      </template>
      <template #default="scope">
        <span>{{ scope.row.deadlineAt || "———" }}</span>
      </template>
    </el-table-column>
    <el-table-column width="90">
      <template #header>
        <span>状态 </span>
        <el-icon><CopyDocument /></el-icon>
      </template>
      <template #default="scope">
        <span class="status" v-text="status[scope.row.complete ? 1 : 0].text"></span>
        <i :class="status[scope.row.complete ? 1 : 0].img"></i>
      </template>
    </el-table-column>
    <el-table-column width="180">
      <template #header>
        <span>操作 </span>
        <el-icon><SetUp /></el-icon>
      </template>
      <template #default="scope">
        <el-button
          size="mini"
          v-text="status[scope.row.complete ? 1 : 0].toggle"
          @click="toggleFn(scope.$index, scope.row.id, !scope.row.complete)"
        ></el-button>
        <el-button size="mini" type="danger" @click="confirmAsk(scope.$index, scope.row.id)">
          <el-icon><Delete /></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    data: Array,
  },
  data() {
    return {
      tableData: [],
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
    this.tableData = this.data;
  },
  methods: {
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
    async addTodo(todo) {
      if (this.loginStatus) {
        try {
          await this.$api.todo.add(todo);
          this.$message.success("添加成功~");
        } catch (error) {
          this.$message.error("添加失败,请重试");
          return;
        }
      }
      this.ingTodoData.push(todo);
      this.refreshData();
    },

    //删除一条todo
    async delTodo(index, id) {
      if (this.loginStatus) {
        try {
          await this.$api.todo.remove(id);
          this.$message.success("删除成功!");
        } catch (error) {
          this.$message.error("删除失败");
          return;
        }
      }
      this.tableData.splice(index, 1);
      // this.$message.success("删除成功!");
      this.refreshData();
    },

    //更改todo完成状态
    async toggleFn(index, id, complete) {
      if (this.loginStatus) {
        try {
          await this.$api.todo.updateTodo(id, { complete });
        } catch (error) {
          return;
        }
      }
      const toggleTodo = this.tableData.splice(index, 1)[0];
      toggleTodo.complete = complete;
      this.tableData.push(toggleTodo);
      this.refreshData();
    },

    async updateContent(index, id) {
      const content = this.$refs["input" + id].textContent;
      if (this.loginStatus) {
        try {
          await this.$api.todo.updateTodo(id, { content });

          this.$message.success("已更新目标");
        } catch (error) {
          return;
        }
      }
      let todo = this.tableData[index];
      todo.content = content;
      this.tableData.splice(index, 1, todo);
      this.refreshData();
    },
  },
};
</script>
<style lang="scss">
.del {
  text-decoration: line-through;
}
.el-icon-success {
  color: #41b883;
  margin-left: 2px;
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
