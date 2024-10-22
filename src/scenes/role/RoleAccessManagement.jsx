// src/pages/RoleAccessManagement.js
import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button } from '@mui/material';

// Example roles and modules
const roles = ['Incident Manager', 'Problem Manager', 'Change Manager'];
const modules = ['Incident Management', 'Problem Management', 'Change Management'];

const RoleAccessManagement = () => {
  // State to hold access control rules
  const [accessControl, setAccessControl] = useState({
    'Incident Manager': {
      'Incident Management': { view: true, edit: true },
      'Problem Management': { view: false, edit: false },
      'Change Management': { view: false, edit: false },
    },
    'Problem Manager': {
      'Incident Management': { view: true, edit: false },
      'Problem Management': { view: true, edit: true },
      'Change Management': { view: false, edit: false },
    },
    'Change Manager': {
      'Incident Management': { view: false, edit: false },
      'Problem Management': { view: false, edit: false },
      'Change Management': { view: true, edit: true },
    },
  });

  // Handle toggling permissions
  const handlePermissionChange = (role, module, permission) => {
    setAccessControl({
      ...accessControl,
      [role]: {
        ...accessControl[role],
        [module]: {
          ...accessControl[role][module],
          [permission]: !accessControl[role][module][permission],
        },
      },
    });
  };

  // Handle saving permissions (dummy save function for now)
  const handleSavePermissions = () => {
    console.log('Saved Permissions', accessControl);
    // Add API call to save permissions to backend
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Role-Based Portal Access Management
      </Typography>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role</TableCell>
              {modules.map((module) => (
                <TableCell key={module} align="center">
                  {module}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role}>
                <TableCell>{role}</TableCell>
                {modules.map((module) => (
                  <TableCell key={module} align="center">
                    <Typography variant="subtitle2">View</Typography>
                    <Checkbox
                      checked={accessControl[role][module]?.view || false}
                      onChange={() => handlePermissionChange(role, module, 'view')}
                    />
                    <Typography variant="subtitle2">Edit</Typography>
                    <Checkbox
                      checked={accessControl[role][module]?.edit || false}
                      onChange={() => handlePermissionChange(role, module, 'edit')}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Save Button */}
      <Box sx={{ textAlign: 'right', marginTop: 3 }}>
        <Button variant="contained" color="primary" onClick={handleSavePermissions}>
          Save Permissions
        </Button>
      </Box>
    </Box>
  );
};

export default RoleAccessManagement;
