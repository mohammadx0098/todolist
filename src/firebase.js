
  import firebase from 'firebase';

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCzYIeMR9WUKqwlHYX7Er0sKR5WWGVdZjM",
    authDomain: "todo-app-fd464.firebaseapp.com",
    databaseURL: "https://todo-app-fd464.firebaseio.com",
    projectId: "todo-app-fd464",
    storageBucket: "todo-app-fd464.appspot.com",
    messagingSenderId: "681155325769",
    appId: "1:681155325769:web:37d1749f459851080ab498",
    measurementId: "G-M20K6WYQRE"
  });

  const db = firebaseApp.firestore();

  export default db;

