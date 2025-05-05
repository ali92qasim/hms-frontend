import Grid from '@mui/material/Grid2';
import Chip from '@mui/material/Chip';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Table from '../../../ui-component/Table';
import Actions from '../../../ui-component/Actions';
import { useGet } from '../../../api/requests';
// ==============================|| VIEW USER ||============================== //

const columns = [
    { field: 'id', headerName: '#', minWidth: 60, separa },
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
      renderCell: (params) => <Actions {...params.row} />,
    }
];
  

export default function User() {
    const { data } = useGet('api/v1/users');
    console.log('data', data);
    const rows = data?.data?.map((user, index) => ({
        id: index + 1,
        name: user.attributes.name,
        role: user.relationships.role.data.name,
        email: user.attributes.email,
        phone: user.attributes.phone,
        dateOfBirth: user.attributes.dateOfBirth,
        joiningDate: user.attributes.joiningDate,
        status: user.attributes.status,
    })) || [];
  return (
    <MainCard title="List" sx={{ padding: '0 !important' }}>
      <Grid container spacing={gridSpacing}>
        <Grid size={{ xs: 12 }}>
          <Table columns={columns} rows={rows} />
        </Grid>
      </Grid>
    </MainCard>
  );
}