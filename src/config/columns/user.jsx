import Actions from "../../ui-component/Actions";
import Chip from '@mui/material/Chip';

export const columns = [
    { field: 'displayId', headerName: '#', minWidth: 60 },
    { field: 'name', headerName: 'Name', minWidth: 150 },
    { field: 'role', headerName: 'Role', minWidth: 130 },
    { field: 'email', headerName: 'Email', minWidth: 230 },
    { field: 'phone', headerName: 'Phone', minWidth: 150 },
    { field: 'dateOfBirth', headerName: 'Date of Birth', minWidth: 150 },
    { field: 'joiningDate', headerName: 'Joining Date', minWidth: 150 },
    { field: 'status', headerName: 'Status', minWidth: 120,
    renderCell: (params) => (
        <Chip
            label={params.value === 1 ? 'Active' : 'Inactive'}
            color={params.value === 1 ? 'success' : 'error'}
            variant="outlined"
            size="small"
        />
        )
     },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => <Actions {...params} />,
    }
];
