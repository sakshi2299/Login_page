import React, { useState } from 'react';
import { Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons';
import { DeleteOutline } from '@material-ui/icons';

interface Item {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState('');
  const [editItem, setEditItem] = useState<Item | null>(null);

  const handleAdd = () => {
    const newItemData: Item = {
      id: Date.now(),
      name: newItem,
    };
    setData([...data, newItemData]);
    setNewItem('');
  };

  const handleEdit = (id: number) => {
    const itemToEdit = data.find((item) => item.id === id);
    if (itemToEdit) {
      setEditItem(itemToEdit);
      setNewItem(itemToEdit.name);
    }
  };

  const handleUpdate = () => {
    if (editItem) {
      const updatedData = data.map((item) =>
        item.id === editItem.id ? { ...item, name: newItem } : item
      );
      setData(updatedData);
      setNewItem('');
      setEditItem(null);
    }
  };

  const handleDelete = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  return (
    <div style={styles.container}>
      <Typography variant="h4" style={styles.heading}>
        Home Page
      </Typography>

      <div style={styles.inputContainer}>
        <TextField
          label="Enter a new item"
          variant="outlined"
          size="small"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          style={styles.input}
        />
        {editItem ? (
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add
          </Button>
        )}
      </div>

      <List style={styles.list}>
        {data.map((item) => (
          <ListItem key={item.id} style={styles.listItem}>
            <ListItemText primary={item.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item.id)}>
                <EditOutlined />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                <DeleteOutline />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginRight: '10px',
    width: '60%',
  },
  list: {
    padding: 0,
  },
  listItem: {
    marginBottom: '10px',
    fontSize: '16px',
  },
};

export default Home;
