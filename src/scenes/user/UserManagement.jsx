import React, { useState } from 'react';
import {
  Button,
  Typography,
  Modal,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UserForm from './UserForm'; // Assuming you have a form component for adding/editing users

const UserManagement = () => {
  // Local state for dummy users
  const [users, setUsers] = useState([
    { id: 1, username: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, username: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Handle opening modal
  const handleOpen = () => setOpen(true);
  
  // Handle closing modal
  const handleClose = () => {
    setSelectedUser(null);
    setOpen(false);
  };

  // Handle adding or editing a user
  const handleSubmit = (userData) => {
    if (selectedUser) {
      // Editing existing user
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === selectedUser.id ? { ...userData, id: user.id } : user))
      );
    } else {
      // Adding new user
      const newUser = {
        ...userData,
        id: Date.now(), // Generate unique ID for the new user
      };
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }

    handleClose(); // Close the modal
  };

  // Handle deleting a user
  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  // Handle editing a user (populate form with user data)
  const handleEdit = (user) => {
    setSelectedUser(user);
    handleOpen();
  };

  return (
    <Box sx={{ marginLeft: '30px', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
        Create New User
      </Button>

      {/* User Table Layout */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(user)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Creating/Editing User */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            mt: 5,
            mx: 'auto',
            width: 400,
            p: 2,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 1,
          }}
        >
          {/* UserForm component for handling form submission */}
          <UserForm onSubmit={handleSubmit} user={selectedUser} onClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};

export default UserManagement;
