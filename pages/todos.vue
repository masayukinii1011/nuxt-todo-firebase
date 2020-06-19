<template>
  <div class="content">
    <div class="form">
      <form @submit.prevent="add">
        <input v-model="name" />
        <button class="button is-link">Add</button>
      </form>
    </div>
    <ul>
      <li class="is-vertical-center" v-for="todo in todos" :key="todo.id">
        <input type="checkbox" :checked="todo.done" @change="toggle(todo)" />
        <span class="done" v-if="todo.done">Done!</span>
        <span>{{todo.name}}</span>
        <span class="date">{{todo.created.toDate()}}</span>
        <button class="button is-danger is-small" @click="remove(todo.id)">remove</button>
      </li>
    </ul>

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

<style>
.form {
  margin-top: 16px;
  margin-left:16px;
  line-height: 2.4;
}

.done {
  color: red;
}

.date {
  font-size: 14px;
}

li {
  list-style: none;
  line-height: 2.4;
  margin-bottom: 16px;
}
</style>
