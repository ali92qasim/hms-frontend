import {useState} from 'react';
import {Box, IconButton, Tooltip} from '@mui/material';
import {IconEye, IconEdit, IconTrash} from '@tabler/icons-react';
import ConfirmationDialog from './extended/Dialog/ConfirmationDialog';
import { useDelete } from '../api/requests';

export default function Actions(params) {
    const [openDialog, setOpenDialog] = useState(false);
    const onView = () => {
        console.log("Viewing user: ", params.row.id);
      };
    
      const onEdit = () => {
        console.log("Editing user: ", row);
      };
    
      const onDelete = () => {
        setOpenDialog(true); 
      };

      
    const handleConfirm = async () => {
        console.log("Deleting user: ", params.row.id); 
        const response = await useDelete(`api/v1/users`,`api/v1/users/${params.row.id}`)
        console.log(response)
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