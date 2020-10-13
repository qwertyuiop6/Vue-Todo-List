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
      value-format="yyyy-MM-dd"
    ></el-date-picker>
    <el-button type="primary" style="border-radius: 0 5px 5px 0;padding: 12px 15px;" @click="add">
      添加
      <i class="el-icon-edit"></i>
    </el-button>
    <!-- <p v-if="content" class="tips">你是要添加: {{ content }} ?</p> -->
  </div>
</template>

<style lang="scss">
#input {
  > .el-input {
    width: 59%;
    font-size: unset;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 10rem;
    > input {
      border-radius: 0;
    }
  }
  .el-input__inner {
    border-radius: 4px 0 0 4px;
    border-right: none;
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
    add() {
      var date = new Date();
      var now = `${date.getFullYear()}/${date.getMonth() +
        1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
      let newTodo = {
        startDate: now,
        target: this.content,
        status: 0,
        endDate: this.datePick
      };
      this.content = "";
      this.datePick = null;
      this.$emit("addTodo", newTodo);
    }
  }
};
</script>
