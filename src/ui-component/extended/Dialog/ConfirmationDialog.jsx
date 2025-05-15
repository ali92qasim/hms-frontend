import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import Button from '../Button';

export default function ConfirmationDialog ({ open, onClose, onConfirm, item, title = "Delete Confirmation" }) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="confirmation-dialog" maxWidth="sm" fullWidth>
      <DialogTitle
        id="confirmation-dialog"
      >
        {title}
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">
          Are you sure you want to delete <Typography color='info' component='span'>{item} ?</Typography> 
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button onClick={onClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

