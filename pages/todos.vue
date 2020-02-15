<template>
  <div>
    <ul>
      <li v-for="todo in todos" v-bind:key="todo.id">
        <input type="checkbox" v-bind:checked="todo.done" v-on:change="toggle(todo)" />
        Done:{{todo.done}} / Name:{{todo.name}} / Created:{{todo.created.toDate()}}
        <button
          v-on:click="remove(todo.id)"
        >remove</button>
      </li>
    </ul>
    <div class="form">
      <form v-on:submit.prevent="add">
        <input v-model="name" />
        <button>Add</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      //一時的な格納用データ
      name: "",
      done: false
    };
  },
  created: function() {
    //初期化メソッド呼び出し
    this.$store.dispatch("todos/init");
  },
  methods: {
    //追加メソッド呼び出し。追加したらデータは空に
    add() {
      this.$store.dispatch("todos/add", this.name);
      this.name = "";
    },
    //削除メソッド呼び出し。引数にはfirestoreデータベースのドキュメントid
    remove(id) {
      this.$store.dispatch("todos/remove", id);
    },
    //チェックボックス操作メソッド呼び出し。
    toggle(todo) {
      this.$store.dispatch("todos/toggle", todo);
    }
  },
  computed: {
    //todos配列を取得
    todos() {
      return this.$store.state.todos.todos;
    }
  }
};
</script>
