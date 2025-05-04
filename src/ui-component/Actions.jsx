import {Box, IconButton, Tooltip} from '@mui/material';
import {IconEye, IconEdit, IconTrash} from '@tabler/icons-react';

export default function Actions({onEdit, onDelete, onView}) {
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
        </Box>
    );
}