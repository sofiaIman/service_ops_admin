import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles'; // Import useTheme
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const MarketManagement = () => {
  const [markets, setMarkets] = useState([
    { id: 1, name: 'Kenya' },
    { id: 2, name: 'Tanzania' },
  ]);
  const [marketName, setMarketName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentMarketId, setCurrentMarketId] = useState(null);

  const theme = useTheme(); // Get the current theme

  const handleAddOrEditMarket = () => {
    if (editMode) {
      setMarkets(
        markets.map((market) =>
          market.id === currentMarketId ? { ...market, name: marketName } : market
        )
      );
      setEditMode(false);
    } else {
      setMarkets([...markets, { id: Date.now(), name: marketName }]);
    }
    setMarketName('');
  };

  const handleEdit = (market) => {
    setEditMode(true);
    setMarketName(market.name);
    setCurrentMarketId(market.id);
  };

  const handleDelete = (id) => {
    setMarkets(markets.filter((market) => market.id !== id));
  };

  return (
    <Box sx={{ marginLeft: '30px' }}> {/* Add Box component with margin */}
      <h2>Market Management</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          label="Market Name"
          value={marketName}
          onChange={(e) => setMarketName(e.target.value)}
          required
          variant="outlined"
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddOrEditMarket}>
          {editMode ? 'Update Market' : 'Add Market'}
        </Button>
      </form>

      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Market Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {markets.map((market) => (
              <TableRow key={market.id}>
                <TableCell>{market.name}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(market)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(market.id)} color="secondary">
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

export default MarketManagement;
