import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, IconButton } from '@mui/material';
import { IconTrash } from '@tabler/icons-react';

export default function ConfirmationDialog ({ open, onClose, onConfirm, item, title = "Delete Confirmation" }) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="confirmation-dialog" maxWidth="sm" fullWidth>
      <DialogTitle
        id="confirmation-dialog"
      >
          <IconTrash size={40} />
        <Typography variant="h6">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ marginBottom: '16px' }}>
          Are you sure you want to delete <strong>{item?.name}</strong>? This action cannot be undone.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Deleting this item will permanently remove all related data.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button onClick={onClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={() => onConfirm(item)} color="secondary" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

