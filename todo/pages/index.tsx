import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import styles from '../styles/Home.module.css'
import {
  TextField,
  Container,
  FormControl,
  Box, ListItem, List, ListItemText, ListItemButton, ListItemIcon, Checkbox,
} from "@mui/material";

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
  // setTodoList(produce(draft => {
  //   draft.push({ name: name.trim(), isCompleted: false, id: idCount })
  // }))
  const addToDoToList = (todo: ITodo) => {
    setListToDo((prevTodo: ITodo[]) => {
      return [...prevTodo, todo];
    });
  };


  const setDone = (itemId: number, done: boolean) => {
      setListToDo((prevTodo: ITodo[]) => {
          const item = prevTodo.find((item)=>item.id===itemId);
          if (!item){
            return prevTodo;
          }
          item.isDone = done;
          return [...prevTodo];
      });
  }

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
    <FormControl
      onSubmit={handleSubmit}
      component="form"
      sx={{ marginTop: "10px", width: "100%" }}
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
                <ListItemButton key={item.id} role={undefined} onClick={handleToggle(item.id, !item.isDone)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={item.isDone}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={item.todo} />
                </ListItemButton>
            )}
        </List>
      </Container>
      </>
  )
}

export default Home;