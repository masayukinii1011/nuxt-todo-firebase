import firebase from '~/plugins/firebase'
//vuexfireのaction機能
import { firestoreAction } from 'vuexfire'

//firestoreのデータベースを定義
const db = firebase.firestore()
const todosRef = db.collection('todos')

//stateを定義
export const state = () => ({
  todos: []
})

//actionsを定義
export const actions = {

  //初期化。todos配列をtodosRefデータベースに結びつける
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('todos', todosRef)
  }),

  //追加。nameで入力を受け取る。nameが空でなければ、todosRefデータベースに値を追加。
  //createdには作成時間を入れる。サーバーのタイムスタンプ
  add: firestoreAction((context, name) => {
    if (name.trim()) {
      todosRef.add({
        name: name,
        done: false,
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  }),

  //削除。firestoreデータベースのドキュメントidを指定して削除
  remove: firestoreAction((context, id) => {
    todosRef.doc(id).delete()
  }),

  //チェックボックス操作。firestoreデータベースのドキュメントidを指定して、更新。
  toggle: firestoreAction((context, todo) => {
    todosRef.doc(todo.id).update({
      done: !todo.done
    })
  })
}
