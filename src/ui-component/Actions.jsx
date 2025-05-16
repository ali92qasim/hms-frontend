import {useState} from 'react';
import {Box, IconButton, Tooltip} from '@mui/material';
import {IconEye, IconEdit, IconTrash} from '@tabler/icons-react';
import ConfirmationDialog from './extended/Dialog/ConfirmationDialog';
import { useDelete } from '../api/requests';
import { useSnackbar } from '../contexts/SnackbarContext';

export default function Actions(params) {
    const [openDialog, setOpenDialog] = useState(false);
    const { showSnackbar } = useSnackbar();
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
        try {
        const response = await useDelete(`api/v1/users`,`api/v1/users/${params.row.id}`)
        if(response.status === 200) {
            showSnackbar(response?.message, 'success')
        }
        setOpenDialog(false); 
    } catch(error) {
        showSnackbar(error?.response.data?.message, 'error');
        }
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