<template>
  <div class="container">
    <Todos />
  </div>
</template>

<script>
import Todos from "./todos.vue";

export default {
  components: {
    Todos: Todos
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
