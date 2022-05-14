<template>
  <el-table :data="tableData" v-loading="loading" class="todotable" empty-text="空空如也">
    <el-table-column width="160" prop="createAt">
      <template #header>
        <span> 创建日期 </span>
        <el-icon><calendar /></el-icon>
      </template>
    </el-table-column>
    <el-table-column width="240">
      <template #header>
        <span>&nbsp;目标 </span>
        <el-icon><collection-tag /></el-icon>
      </template>
      <template #default="scope">
        <div :ref="'input' + scope.row.id">
          <slot
            name="content"
            :content="scope.row.content"
            :id="scope.row.id"
            :index="scope.$index"
            :updateContent="updateContent"
            :todoDoneStyle="todoDoneStyle"
          ></slot>
        </div>
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
        <el-icon><check v-if="scope.row.complete" /><more v-else /></el-icon>
      </template>
    </el-table-column>
    <el-table-column width="180">
      <template #header>
        <span>操作 </span>
        <el-icon><SetUp /></el-icon>
      </template>
      <template #default="scope">
        <el-button
          size="default"
          v-text="status[scope.row.complete ? 1 : 0].toggle"
          @click="toggleFn(scope.$index, scope.row.id, !scope.row.complete)"
        ></el-button>
        <slot name="delete" :action="deleteAction" :index="scope.$index" :id="scope.row.id"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { useStore } from "@/store/pinia";
import { mapState } from "pinia";

export default {
  props: {
    type: String,
    data: Array,
    loading: Boolean,
  },
  data() {
    return {
      // loading: false,
      status: [
        {
          text: "进行中",
          toggle: "完成！",
        },
        {
          text: "已完成",
          toggle: "还原",
        },
      ],
      todoDoneStyle: { margin: "6px", display: "block", "text-decoration": "line-through" },
    };
  },
  computed: {
    ...mapState(useStore, ["loginStatus"]),
    tableData() {
      return JSON.parse(JSON.stringify(this.data));
    },
  },
  methods: {
    deleteAction(index, id) {
      if (this.type === "ing") {
        this.$confirm("你还没有完成这个Todo，确定删除吗?", "FBI Warnning!!", {
          confirmButtonText: "确定!",
          cancelButtonText: "取消~",
          type: "warning",
        })
          .then(() => {
            this.delTodo(index, id);
          })
          .catch(() => {});
      } else {
        this.delTodo(index, id);
      }
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
      this.$message.success("删除成功!");
      this.$emit("updateData", this.tableData);
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
      this.$emit("updateData", this.tableData);
    },

    async updateContent(index, id) {
      const content = this.$refs["input" + id].textContent;
      if (this.loginStatus) {
        try {
          await this.$api.todo.updateTodo(id, { content });
          this.$message.success("目标已更新");
        } catch (error) {
          return;
        }
      }
      let todo = this.tableData[index];
      todo.content = content;
      this.tableData.splice(index, 1, todo);
      this.$emit("updateData", this.tableData);
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
