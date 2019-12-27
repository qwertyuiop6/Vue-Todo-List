<template>
  <div class="box">
    <p>This is your {{msg}}</p>
    <input type="text" name="todo" placeholder="想做些什么？" v-model="todo">>
    <button type="primary">
      添加
      <i class="el-icon-edit" @click="add(todo)"></i>
    </button>
    <p>你要添加的是: {{todo}}?</p>
    <table>
      <tr v-for="(item,index) in tableData" :key="index">
        <td>{{item.date}}</td>
        <td>{{item.target}}</td>
      </tr>
    </table>
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
}
</style>
<script>
export default {
  name: "todoDemo",
  props: {
    msg: String
  },
  data() {
    return {
      todo: "",
      tableData: []
    };
  },
  methods: {
    add(text) {
      var date = new Date();
      var now = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
      this.tableData.push({
        date: now,
        target: text
      });

      // JS直接改变(Array or Object)内部的内容无法触发setter

      //1.使用Vue实现的变异方法触发setter
      // - push()
      // - pop()
      // - shift()
      // - unshift()
      // - splice()
      // - sort()
      // - reverse()

      // 2.Vue.set 或$set强制渲染
      // var data={date:now,target:text}
      // this.$set(this.tableData,this.index,data)

      // 3.赋予新的对象或数组
      // this.tableData=Object.assign({},this.tableData,data)  //Object引用地址指向新Object
      // this.tableData=this.tableData.cancat(data)  // Array filter cancat slice非变异方法返回新数组,Vue有优化,不会完全重新渲染

      // this.$nextTick(()=>{
      // alert('1')
      // this.$set(this.tableData,date,target)
      // alert('2')
      // })
      // this.$forceUpdate();
    },
    del(index) {
      this.tableData.splice(index, 1);
    }
  }
};
</script>