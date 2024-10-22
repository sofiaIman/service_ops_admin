import React, { useState } from 'react';
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Modal,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';

const EmailDLManagement = () => {
  const [emailDLs, setEmailDLs] = useState([
    { id: 1, name: 'IT Department', email: 'it-dept@example.com', members: ['john@example.com', 'jane@example.com'] },
    { id: 2, name: 'HR Department', email: 'hr-dept@example.com', members: ['hr1@example.com', 'hr2@example.com'] },
  ]);

  const [dlData, setDlData] = useState({ name: '', email: '', members: [] });
  const [editMode, setEditMode] = useState(false);
  const [currentDlId, setCurrentDlId] = useState(null);
  const [openMemberModal, setOpenMemberModal] = useState(false);
  const [selectedDl, setSelectedDl] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // For the search functionality
  const [allUsers] = useState(['john@example.com', 'jane@example.com', 'hr1@example.com', 'hr2@example.com', 'admin@example.com']); // Example list of users

  // Handle Add or Edit DL
  const handleAddOrEditDl = () => {
    if (editMode) {
      setEmailDLs(
        emailDLs.map((dl) =>
          dl.id === currentDlId ? { ...dl, ...dlData } : dl
        )
      );
      setEditMode(false);
    } else {
      setEmailDLs([...emailDLs, { id: Date.now(), ...dlData, members: [] }]);
    }
    setDlData({ name: '', email: '', members: [] });
  };

  // Handle Edit button click
  const handleEdit = (dl) => {
    setEditMode(true);
    setDlData({ name: dl.name, email: dl.email, members: dl.members });
    setCurrentDlId(dl.id);
  };

  // Handle Delete button click
  const handleDelete = (id) => {
    setEmailDLs(emailDLs.filter((dl) => dl.id !== id));
  };

  // Handle managing members
  const handleManageMembers = (dl) => {
    setSelectedDl(dl);
    setOpenMemberModal(true);
  };

  // Handle checkbox toggle for member selection
  const handleToggleMember = (userEmail) => {
    setSelectedDl({
      ...selectedDl,
      members: selectedDl.members.includes(userEmail)
        ? selectedDl.members.filter((member) => member !== userEmail)
        : [...selectedDl.members, userEmail],
    });
  };

  // Save members
  const handleSaveMembers = () => {
    setEmailDLs(
      emailDLs.map((dl) =>
        dl.id === selectedDl.id ? { ...dl, members: selectedDl.members } : dl
      )
    );
    setOpenMemberModal(false);
  };

  // Filter users based on search query
  const filteredUsers = allUsers.filter((user) =>
    user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: 4 }}>
      <h2>Email Distribution List Management</h2>

      {/* Form to Add/Edit DL */}
      <form onSubmit={(e) => e.preventDefault()} style={{ marginBottom: '20px' }}>
        <TextField
          label="Distribution List Name"
          value={dlData.name}
          onChange={(e) => setDlData({ ...dlData, name: e.target.value })}
          required
          variant="outlined"
          sx={{ marginRight: 2 }}
        />
        <TextField
          label="Email Address"
          value={dlData.email}
          onChange={(e) => setDlData({ ...dlData, email: e.target.value })}
          required
          variant="outlined"
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddOrEditDl}>
          {editMode ? 'Update DL' : 'Add DL'}
        </Button>
      </form>

      {/* Table to Display Existing DLs */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Members</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emailDLs.map((dl) => (
              <TableRow key={dl.id}>
                <TableCell>{dl.name}</TableCell>
                <TableCell>{dl.email}</TableCell>
                <TableCell>{dl.members.length}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(dl)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(dl.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleManageMembers(dl)} color="default">
                    <GroupIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Managing Members */}
      <Modal open={openMemberModal} onClose={() => setOpenMemberModal(false)}>
        <Box sx={{ mt: 5, mx: 'auto', width: 400, p: 2, bgcolor: 'background.paper' }}>
          <h3>Manage Members for {selectedDl?.name}</h3>

          {/* Search Bar */}
          <TextField
            label="Search Members"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <List>
            {filteredUsers.map((user) => (
              <ListItem key={user}>
                <ListItemText primary={user} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    checked={selectedDl?.members.includes(user)}
                    onChange={() => handleToggleMember(user)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <Button variant="contained" color="primary" onClick={handleSaveMembers}>
            Save Members
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default EmailDLManagement;
