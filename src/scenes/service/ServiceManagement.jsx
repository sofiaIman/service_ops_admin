import React, { useState } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box } from '@mui/material'; // Import Box from MUI
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ServiceManagement = () => {
  const [services, setServices] = useState([
    { id: 1, name: 'VODAFONE MONEY TRANSFER', ITSM: 'VODAFONE MONEY TRANSFER-PROD TZ', market: 'Tanzania' },
    { id: 2, name: 'VODAFONE MONEY TRANSFER-SMARTPHONE PROD', ITSM: 'VODAFONE MONEY TRANSFER-SMARTPHONE PROD LS', market: 'Client interactions' },
  ]);
  const [serviceData, setServiceData] = useState({ name: '', ITSM: '', market: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);

  const handleAddOrEditService = () => {
    if (editMode) {
      setServices(
        services.map((service) =>
          service.id === currentServiceId ? { ...service, ...serviceData } : service
        )
      );
      setEditMode(false);
    } else {
      setServices([...services, { id: Date.now(), ...serviceData }]);
    }
    setServiceData({ name: '', ITSM: '', market: '' });
  };

  const handleEdit = (service) => {
    setEditMode(true);
    setServiceData({ name: service.name, ITSM: service.ITSM, market: service.market });
    setCurrentServiceId(service.id);
  };

  const handleDelete = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  return (
    <Box sx={{ marginLeft: '30px' }}> {/* Add Box component with margin */}
      <h2>Service Management</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          label="Service Name"
          value={serviceData.name}
          onChange={(e) => setServiceData({ ...serviceData, name: e.target.value })}
          required
          variant="outlined"
          sx={{ marginRight: 2 }}
        />
        <TextField
          label="ITSM"
          value={serviceData.ITSM}
          onChange={(e) => setServiceData({ ...serviceData, ITSM: e.target.value })}
          required
          variant="outlined"
          sx={{ marginRight: 2 }}
        />
        <TextField
          label="market"
          value={serviceData.market}
          onChange={(e) => setServiceData({ ...serviceData, market: e.target.value })}
          variant="outlined"
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddOrEditService}>
          {editMode ? 'Update Service' : 'Add Service'}
        </Button>
      </form>

      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Service Name</TableCell>
              <TableCell>ITSM Service Name</TableCell>
              <TableCell>Market</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.ITSM}</TableCell>
                <TableCell>{service.market}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(service)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(service.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ServiceManagement;
