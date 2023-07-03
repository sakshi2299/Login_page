// HomePage.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { EditOutlined, DeleteOutline } from '@material-ui/icons';
import { addTask, editTask, deleteTask } from '../store/tasksSlice';

interface Task {
  id: number;
  name: string;
}

const HomePage: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const dispatch = useDispatch();

  const handleAdd = () => {
    const taskId = tasks.length + 1;
    dispatch(addTask({ id: taskId, name: newTask }));
    setNewTask('');
  };

  const handleEdit = (id: number) => {
    const taskToEdit = tasks.find((task: Task) => task.id === id);
    if (taskToEdit) {
      setEditTaskId(taskToEdit.id);
      setNewTask(taskToEdit.name);
    }
  };

  const handleUpdate = () => {
    if (editTaskId) {
      dispatch(editTask({ id: editTaskId, name: newTask }));
      setEditTaskId(null);
      setNewTask('');
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Task List
      </Typography>
      <TextField
        label="New Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      {editTaskId ? (
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add
        </Button>
      )}
      <List>
        {tasks.map((task: Task) => (
          <ListItem key={task.id}>
            <ListItemText primary={task.name} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEdit(task.id)}
              >
                <EditOutlined />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(task.id)}
              >
                <DeleteOutline />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default HomePage;
