import firebase from 'firebase'

//初期化に必要なオブジェクト
const config = {
  projectId: process.env.FIREBASE_PROJECT_ID
}

//初期化されてない場合のみ実行
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase
