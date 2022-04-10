import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useMemo } from "react";
import styles from "../styles/Home.module.css";
import {
  TextField,
  Container,
  FormControl,
  Box,
  ListItem,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import produce, { finishDraft } from "immer";
import { FilterList } from "@mui/icons-material";

const getRandomId = () => Math.floor(Math.random() * 1000000);

interface IList {
  listtodo: ITodo[];
}
interface ITodo {
  id: number;
  todo: string;
  isDone: boolean;
  isEditing?: boolean;
}
type TabValue = "all" | "done" | "todo";

const Home: NextPage = () => {
  const [todo, setTodo] = useState<string>("");
  const [listToDo, setListToDo] = useState<ITodo[]>([]);
  const [tab, setTab] = useState<TabValue>("all");

  const addToDoToList = (todo: ITodo) => {
    setListToDo(
      produce((draft) => {
        draft.push(todo);
      })
    );
  };

  const setDone = (itemId: number, done: boolean) => {
    setListToDo(
      produce((draft) => {
        const item = draft.find((item) => item.id === itemId);
        if (item && !item.isEditing) {
          item.isDone = done;
        }
      })
    );
  };

  const deleteItem = (itemId: number) => {
    setListToDo(
      produce((draft) => {
        const index = draft.findIndex((item) => item.id === itemId);
        draft.splice(index, 1);
      })
    );
  };

  const startEditItem = (itemId: number) => {
    setListToDo(
      produce((draft) => {
        const index = draft.findIndex((item) => item.id === itemId);
        draft[index].isEditing = true;
      })
    );
  };

  const stopEditItem = (itemId: number, e: any) => {
    setListToDo(
      produce((draft) => {
        const index = draft.findIndex((item) => item.id === itemId);
        draft[index].todo = e.target[0].value;
        draft[index].isEditing = false;
        setTodo("");
      })
    );
  };
  const handleStopEdit = (id: number) => (e: any) => stopEditItem(id, e);
  const handleStartEdit = (id: number) => () => startEditItem(id);
  const handleDelete = (id: number) => () => deleteItem(id);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // zapobiegaj przeładowaniu
    const todoObj = {
      todo: todo,
      isDone: false,
      id: getRandomId(),
      isEditing: false,
    };
    addToDoToList(todoObj);
    setTodo("");
  };
  const fillterList = useMemo((): ITodo[] => {
    if (tab === "all") {
      console.log([...listToDo]);
      return [...listToDo];
    }
    if (tab === "done") {
      console.log([...listToDo].filter((i) => i.isDone));
      return [...listToDo].filter((i) => i.isDone);
    }
    if (tab === "todo") {
      return [...listToDo].filter((i) => !i.isDone);
    }
    return [];
  }, [tab, listToDo]);

  const handleTodo = (e: any) => setTodo(e.target.value);
  const handleEdit = (e: any) => setTodo(e.target.value);
  const handleToggle = (id: number, done: boolean) => () => setDone(id, done);
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", align: "center" }}>
        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          aria-label="basic tabs example"
        >
          <Tab label="all" value={"all"} />
          <Tab label="done" value={"done"} />
          <Tab label="todo" value={"todo"} />
        </Tabs>
      </Box>
      <Container maxWidth="sm" sx={{ marginTop: 2 }}>
        <>
          <form
            onSubmit={handleSubmit}
            style={{ marginTop: "10px", width: "100%" }}
          >
            <TextField
              fullWidth
              id="fullWidth"
              focused
              value={todo}
              onChange={handleTodo}
            />
          </form>
          <List>
            {fillterList.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={handleDelete(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={handleStartEdit(item.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </>
                }
                disablePadding
              >
                <ListItemButton
                  onClick={handleToggle(item.id, !item.isDone)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={item.isDone}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  {!item.isEditing && <ListItemText primary={item.todo} />}
                  {item.isEditing && (
                    <ListItemText>
                      <FormControl
                        onSubmit={handleStopEdit(item.id)}
                        component="form"
                      >
                        <Box
                          sx={{
                            width: 500,
                            maxWidth: "100%",
                          }}
                        >
                          <TextField
                            id="fullWidth"
                            key={"editeValue"}
                            defaultValue={item.todo}
                          />
                        </Box>
                      </FormControl>
                    </ListItemText>
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      </Container>
    </>
  );
};

export default Home;
