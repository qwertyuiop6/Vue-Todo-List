<template>
  <div id="input">
    <el-input
      type="text"
      name="content"
      placeholder="今天想做些什么？"
      v-model="content"
      clearable
      minlength="1"
      @keypress.enter.native="add"
    ></el-input>
    <el-date-picker
      v-model="datePick"
      type="date"
      placeholder="截止日期"
      value-format="YYYY-MM-DD"
      format="YYYY/MM/DD"
    ></el-date-picker>
    <el-button type="primary" class="btn" @click="add">
      添加 <el-icon><Plus /></el-icon>
    </el-button>
  </div>
</template>

<style lang="scss">
#input {
  > .el-input {
    width: 55%;
  }
  .el-date-editor {
    width: 10rem;
    position: relative;
    top: 2px;
    .el-input__wrapper {
      border-radius: unset;
    }
  }
  .btn {
    border-radius: 0 5px 5px 0;
    padding: 12px 15px;
    position: relative;
    top: -1px;
  }
}
</style>

<script>
export default {
  name: "todoInput",
  data() {
    return {
      content: "",
      datePick: "",
    };
  },
  methods: {
    add() {
      if (this.content.length === 0) return;
      const date = new Date();
      const now = `${date.getFullYear()}/${
        date.getMonth() + 1
      }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
      let newTodo = {
        content: this.content,
        createAt: now,
        deadlineAt: this.datePick,
        complete: false,
      };
      this.content = "";
      this.datePick = null;
      this.$emit("addTodo", newTodo);
    },
  },
};
</script>
