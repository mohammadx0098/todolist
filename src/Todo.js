import React , {useState} from 'react';
import './Todo.css';
import { List, ListItem, ListItemAvatar,Avatar, ListItemText, Button, Modal, makeStyles } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import db from './firebase';
import firebase from 'firebase';


const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input,setInput] = useState('');
    
    const handleOpen = () => {
        setOpen(true)
    }

    
    const updateTodo = () => {

    db.collection('todos').doc(props.todo.id).set({
    todo: input,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
    },{merge:true})

    setOpen(false)
    }

    return (
        <>
            <Modal
                className={classes.modal}
                open={open}
                onClose={e => {setOpen(false)}}
                closeAfterTransition
                
            >
                <form>
                    <div className={classes.paper}>
                        <h1>Hello!</h1>
                        <input placeholder={props.todo.todo} value = {input} onChange={event => setInput(event.target.value)}/>
                        <Button disabled={!input} onClick={updateTodo} type='submit' variant="contained" color="inherit" >
                            click
                        </Button>
                    </div>
                </form>

            </Modal>
            
            <List>
                <ListItem className="todo__list">
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary={props.todo.id} />
                <button type="button" onClick={handleOpen}>
                    Edit
                </button>
                <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()} />
                </ListItem>
                
            </List>
        </>
    )
}

export default Todo
