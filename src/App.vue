<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png" />
		<todo-list msg="Todo List"></todo-list>
	</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import todoList from "./components/todoList.vue";

export default {
	name: "app",
	components: {
		todoList
	}
};
</script>

<style>
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
</style>
