import {useState, Fragment} from 'react';
import {Box, IconButton, Tooltip} from '@mui/material';
import {IconEye, IconEdit, IconTrash} from '@tabler/icons-react';
import ConfirmationDialog from './extended/Dialog/ConfirmationDialog';
import { useDelete } from '../api/requests';
import { useSnackbar } from '../contexts/SnackbarContext';
import { View } from './View';

export default function Actions(params) {
    const [openDialog, setOpenDialog] = useState(false);
    const [showView, setShowView] = useState(false);
    const { showSnackbar } = useSnackbar();
    const onView = () => {
        setShowView((prev) => !prev);
      };
    
      const onEdit = () => {
        console.log("Editing user: ", params.row);
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
        <Fragment>
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
            <View
                open={showView}
                data={params?.row}
                onClose={onView}
            />
        </Fragment>
    );
}