import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const services = ['CPS', 'AML', 'HUB', 'SmartPhone', 'LMP'];
const teams = ['HUB L1', 'LMP L1'];

const SystemSettingsAndAlerts = () => {
  const [settingsData, setSettingsData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTable, setCurrentTable] = useState('');
  const [currentSetting, setCurrentSetting] = useState({
    service: '',
    p1Target: '',
    p2Target: '',
    p1ReductionTarget: '',
    p2ReductionTarget: '',
    p0Sla: 2,
    p1Sla: 4,
    p2Sla: 12,
    p3Sla: 72,
    escalationTeam: '',
    teamLead: '',
    appLead: '',
    manager: '',
  });

  // Functions to handle input, add, edit, delete settings
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentSetting((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEditSetting = () => {
    setSettingsData((prev) => [...prev, currentSetting]);
    handleCloseDialog();
  };

  const handleDeleteSetting = (index) => {
    const updatedSettings = [...settingsData];
    updatedSettings.splice(index, 1);
    setSettingsData(updatedSettings);
  };

  const handleEditSetting = (index) => {
    const settingToEdit = settingsData[index];
    setCurrentSetting(settingToEdit);
    handleDeleteSetting(index); // Remove existing entry to allow editing
    handleOpenDialog('Edit');
  };

  const handleOpenDialog = (tableName) => {
    setCurrentTable(tableName);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentSetting({
      service: '',
      p1Target: '',
      p2Target: '',
      p1ReductionTarget: '',
      p2ReductionTarget: '',
      p0Sla: 2,
      p1Sla: 4,
      p2Sla: 12,
      p3Sla: 72,
      escalationTeam: '',
      teamLead: '',
      appLead: '',
      manager: '',
    });
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        System Settings and Alerts
      </Typography>

      <Grid container spacing={4}>
        {/* MTTR Settings Table */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            MTTR Settings
          </Typography>
          <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Service</TableCell>
                  <TableCell>MTTR P1 (s)</TableCell>
                  <TableCell>MTTR P2 (s)</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {settingsData.map((setting, index) => (
                  <TableRow key={index}>
                    <TableCell>{setting.service}</TableCell>
                    <TableCell>{setting.p1Target}</TableCell>
                    <TableCell>{setting.p2Target}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditSetting(index)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteSetting(index)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" color="primary" onClick={() => handleOpenDialog('MTTR')}>
            Add MTTR Setting
          </Button>
        </Grid>

        {/* Incident Reduction Settings Table */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Incident Reduction Settings
          </Typography>
          <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Service</TableCell>
                  <TableCell>P1 Reduction Target</TableCell>
                  <TableCell>P2 Reduction Target</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {settingsData.map((setting, index) => (
                  <TableRow key={index}>
                    <TableCell>{setting.service}</TableCell>
                    <TableCell>{setting.p1ReductionTarget}</TableCell>
                    <TableCell>{setting.p2ReductionTarget}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditSetting(index)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteSetting(index)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" color="primary" onClick={() => handleOpenDialog('Incident Reduction')}>
            Add Incident Reduction Setting
          </Button>
        </Grid>

        {/* SLA Settings Table */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            SLA Settings
          </Typography>
          <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>SLA P0 (hours)</TableCell>
                  <TableCell>SLA P1 (hours)</TableCell>
                  <TableCell>SLA P2 (hours)</TableCell>
                  <TableCell>SLA P3 (hours)</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {settingsData.map((setting, index) => (
                  <TableRow key={index}>
                    <TableCell>{setting.p0Sla}</TableCell>
                    <TableCell>{setting.p1Sla}</TableCell>
                    <TableCell>{setting.p2Sla}</TableCell>
                    <TableCell>{setting.p3Sla}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditSetting(index)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteSetting(index)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" color="primary" onClick={() => handleOpenDialog('SLA')}>
            Add SLA Setting
          </Button>
        </Grid>

        {/* Escalation Matrix Settings Table */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Escalation Matrix Settings
          </Typography>
          <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Escalation Team</TableCell>
                  <TableCell>Team Lead</TableCell>
                  <TableCell>App Lead</TableCell>
                  <TableCell>Manager</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {settingsData.map((setting, index) => (
                  <TableRow key={index}>
                    <TableCell>{setting.escalationTeam}</TableCell>
                    <TableCell>{setting.teamLead}</TableCell>
                    <TableCell>{setting.appLead}</TableCell>
                    <TableCell>{setting.manager}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditSetting(index)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteSetting(index)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" color="primary" onClick={() => handleOpenDialog('Escalation Matrix')}>
            Add Escalation Matrix Setting
          </Button>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'right' }}>
            <Button variant="contained" color="success" onClick={() => console.log('Settings Saved')}>
              Save Settings
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{currentTable} Settings</DialogTitle>
        <DialogContent>
          {/* Render the form based on currentTable (MTTR, SLA, etc.) */}
          {currentTable === 'MTTR' && (
            <Box>
              <TextField
                select
                label="Service"
                name="service"
                value={currentSetting.service}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              >
                {services.map((service) => (
                  <MenuItem key={service} value={service}>
                    {service}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="MTTR P1 Target (seconds)"
                name="p1Target"
                type="number"
                value={currentSetting.p1Target}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="MTTR P2 Target (seconds)"
                name="p2Target"
                type="number"
                value={currentSetting.p2Target}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginTop: 2 }}
              />
            </Box>
          )}

          {currentTable === 'Incident Reduction' && (
            <Box>
              <TextField
                label="Incident Reduction Target P1"
                name="p1ReductionTarget"
                type="number"
                value={currentSetting.p1ReductionTarget}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Incident Reduction Target P2"
                name="p2ReductionTarget"
                type="number"
                value={currentSetting.p2ReductionTarget}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
          )}

          {/* Add more conditionals for 'SLA' and 'Escalation Matrix' tables */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddEditSetting} variant="contained">
            {currentSetting.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SystemSettingsAndAlerts;
