<template>
  <div id="input">
    <el-input
      type="text"
      name="content"
      placeholder="今天想做些什么？"
      v-model="content"
      @keyup.enter="add(content, datePick)"
    ></el-input>
    <el-date-picker
      slot="append"
      v-model="datePick"
      type="date"
      placeholder="截止日期"
      value-format="yyyy-MM-dd"
    ></el-date-picker>
    <el-button type="primary" @click="add(content, datePick)">
      添加
      <i class="el-icon-edit"></i>
    </el-button>
    <p v-if="content" class="tips">你是要添加: {{ content }} ?</p>
  </div>
</template>

<style lang="scss">
#input {
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
  .tips {
    font-size: 0.9rem;
    color: gray;
  }
}
</style>

<script>
import todoLogin from "./todoLogin.vue";

export default {
  name: "todoInput",
  data() {
    return {
      content: "",
      datePick: ""
    };
  },
  methods: {
    add(content, endDate = "", status = 0) {
      this.content = "";
      var date = new Date();
      var now = `${date.getFullYear()}/${date.getMonth() +
        1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
      let newTodo = {
        startDate: now,
        target: content,
        status,
        endDate
      };

      this.$emit("addTodo", newTodo);

      // this.tableData.push(newTodo);

      //online状态添加到server
      // if (this.loginStatus) {
      //   this.$api.todo
      //     .add(this.uid, newTodo)
      //     .then(() => {
      //       // this.tableData.push(newTodo);
      //       this.$message.success("添加成功~");
      //       this.getTodolist();
      //     })
      //     .catch(err => {
      //       this.tableData.pop();
      //       this.$message.error("添加失败,请重试");
      //     });
      // } else {
      //   // this.tableData.push(newTodo);
      //   this.updateLocalTodoList();
      // }
    }
  }
};
</script>
