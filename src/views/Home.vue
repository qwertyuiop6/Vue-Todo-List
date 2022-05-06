<template>
  <div style="min-width: 900px">
    <img class="logo" alt="Vue logo" src="@/assets/logo.png" />
    <!-- <router-view></router-view> -->
    <todo-list title="Todo List"></todo-list>
  </div>
</template>

<script>
import todoList from "./todo/todoList.vue";

export default {
  name: "AppHome",
  components: {
    todoList,
  },
};
</script>

<style lang="scss">
.logo {
  transition: 2s;
  &:hover {
    transform: rotateY(360deg);
    transition: 2s;
    filter: drop-shadow(1px 1px 15px #3ed079);
  }
}
</style>
