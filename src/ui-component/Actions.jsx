import {useState} from 'react';
import {Box, IconButton, Tooltip} from '@mui/material';
import {IconEye, IconEdit, IconTrash} from '@tabler/icons-react';
import Button from './extended/Button';
import ConfirmationDialog from './extended/Dialog/ConfirmationDialog';

export default function Actions(params) {
    const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
    const onView = () => {
        console.log("Viewing user: ", params.row.id);
      };
    
      const onEdit = () => {
        console.log("Editing user: ", row);
      };
    
      const onDelete = () => {
        setUserToDelete(params.row); // Store the user data to delete
        setOpenDialog(true);  // Open the confirmation dialog
      };

      
  const handleConfirm = () => {
    console.log("Deleting user: ", userToDelete.id); 
    setOpenDialog(false); 
  };

  const handleClose = () => {
    setOpenDialog(false); 
  };
    return (
        <Box>
            <Tooltip title="View" arrow>
                <IconButton onClick={onView}>
                    <IconEye size={18}/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit" arrow>
                <IconButton onClick={onEdit}>
                    <IconEdit size={18}/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete" arrow>
                <IconButton onClick={onDelete}>
                    <IconTrash size={18}/>
                </IconButton>
            </Tooltip>

            <ConfirmationDialog open={openDialog} onClose={handleClose} onConfirm={handleConfirm} item={params?.row?.name} />
        </Box>
    );
}