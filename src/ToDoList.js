import './ToDoList.css';
import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Typography,
  Paper,
  Grid,
  Slide,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import './ToDoList.css';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const addTask = () => {
    if (taskInput.trim()) {
      if (editing) {
        const updatedTasks = tasks.map((task, index) =>
          index === currentIndex ? { ...task, text: taskInput } : task
        );
        setTasks(updatedTasks);
        setEditing(false);
        setCurrentIndex(null);
      } else {
        setTasks([...tasks, { text: taskInput, completed: false }]);
      }
      setTaskInput('');
    }
  };

  const editTask = (index) => {
    setTaskInput(tasks[index].text);
    setEditing(true);
    setCurrentIndex(index);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className="todo-paper">
        <Typography variant="h4" align="center" gutterBottom>
          ToDo List
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              variant="outlined"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Add a new task"
              color="secondary"
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={addTask}
            >
              {editing ? 'Update Task' : 'Add Task'}
            </Button>
          </Grid>
        </Grid>
        <List>
          {tasks.map((task, index) => (
            <Slide direction="up" in={true} mountOnEnter unmountOnExit key={index}>
              <ListItem
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => editTask(index)}
                      color="secondary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteTask(index)}
                      color="secondary"
                    >
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <Checkbox
                  edge="start"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                  color="primary"
                />
                <ListItemText
                  primary={task.text}
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                  }}
                />
              </ListItem>
            </Slide>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ToDoList;
