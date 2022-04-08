import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import styles from '../styles/Home.module.css'
import {
  TextField,
  Container,
  FormControl,
  Box, ListItem, List, ListItemText, ListItemButton, ListItemIcon, Checkbox, IconButton,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import produce, { finishDraft } from 'immer';

const getRandomId = () => Math.floor(Math.random()*1000000);

interface IList{
  listtodo: ITodo[];
}
interface ITodo{
  id: number;
  todo: string;
  isDone: boolean;
  isEditing?: boolean;
}


const Home: NextPage = () => {


  const [todo, setTodo] = useState<string>("");
  const [listToDO, setListToDo] = useState<ITodo[]>([]);

  const addToDoToList = (todo: ITodo) => {
    setListToDo(produce(draft =>{
 draft.push(todo)

    }))
  }


  const setDone = (itemId: number, done: boolean) => {
      setListToDo(produce((draft)=>{
        const index = draft.findIndex((item) => item.id === itemId);
        draft[index].isDone = done;


      }))}
      

  const deleteItem = (itemId: number) => {
    setListToDo(produce((draft)=>{
        const index = draft.findIndex((item) => item.id === itemId);
        draft.splice(index,1)
    }))
}

const handleDelete = (id: number) => () => deleteItem(id);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // zapobiegaj przeładowaniu
    const todoObj = { todo: todo, isDone: false, id: getRandomId(), isEditing: false};
    addToDoToList(todoObj);
    setTodo("");
  }

  const handleTodo = (e: any) => setTodo(e.target.value);
  const handleToggle = (id: number, done: boolean) => () => setDone(id, done);
  return (
    <>
  <Container maxWidth="sm" sx={{ marginTop: 2 }}>
  <>
            <FormControl
                onSubmit={handleSubmit}
                component="form"
                sx={{marginTop: "10px", width: "100%"}}
            >
                <TextField
                    fullWidth
                    id="fullWidth"
                    focused
                    value={todo}
                    onChange={handleTodo}
                />
            </FormControl>
            <List>
                {listToDO.map((item) =>
                    <ListItem
                        key={item.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={handleDelete(item.id)}>
                                <DeleteIcon/>
                            </IconButton>
                        }
                        disablePadding
                    >
                        <ListItemButton  role={undefined} onClick={handleToggle(item.id, !item.isDone)}
                                        dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={item.isDone}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={item.todo}/>
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </>
      </Container>
      </>
  )
}

export default Home;