import React , {useState , useEffect} from 'react';
import './App.css';
import Todo from './Todo';
import { Button , FormControl , Input , InputLabel } from '@material-ui/core';
import db from './firebase';
import firebase from 'firebase';

export default function App () {
  const [todos,setTodos]= useState([]);
  const [input,setInput]= useState('');

  useEffect(() => {
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      // console.log(snapshot.docs.map(doc => doc.data()));
      console.log(snapshot.docs.map(doc => doc.id));
      setTodos(snapshot.docs.map(doc =>({id: doc.id, todo: doc.data().todo})))
    })
  },[]);

  const addTodo = (event) => {
      //  this will fire off when we click the button
      event.preventDefault(); // will prevent refresh
      db.collection('todos').add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      setInput(''); // clear up the input after clicking add todo button
  }

    return (
      <div className="App">
        <h1>Hello !</h1>
        <form>
          <FormControl>
            <InputLabel >Input a todo ...</InputLabel>
            <Input value={input} onChange={event => setInput(event.target.value)} />
          </FormControl>
          <Button disabled={!input} onClick={addTodo} type='submit' variant="contained" color="primary">
            Add Todo
          </Button>

        </form>

        <ul>
          {todos.map(todo =>(
            <Todo todo={todo} />
          ))}
        </ul>
      </div>
    );

}
