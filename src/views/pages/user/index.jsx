import Grid from '@mui/material/Grid2';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Table from '../../../ui-component/Table';
import Actions from '../../../ui-component/Actions';
// ==============================|| VIEW USER ||============================== //

const columns = [
    { field: 'id', headerName: '#', width: 60 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'role', headerName: 'Role', width: 130 },
    { field: 'email', headerName: 'Email', width: 230 },
    { field: 'phone', headerName: 'Phone', width: 150 }, // Added width
    { field: 'dateOfBirth', headerName: 'Date of Birth', width: 150 }, // Added width
    { field: 'joiningDate', headerName: 'Joining Date', width: 150 }, // Added width
    { 
      field: 'status',
      headerName: 'Status',
      flex: 1 // Makes this column absorb remaining space
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => <Actions {...params.row} />
    }
  ];


const rows = [
    {
      id: 1,
      name: 'Alice Johnson',
      role: 'Doctor',
      email: 'alice.johnson@example.com',
      phone: '+1 555-123-4567',
      dateOfBirth: '1990-04-15',
      joiningDate: '2022-01-10',
      status: 'Active',
      action: 'Edit',
    },
    {
      id: 2,
      name: 'Bob Smith',
      role: 'Receptionist',
      email: 'bob.smith@example.com',
      phone: '+1 555-234-5678',
      dateOfBirth: '1988-07-22',
      joiningDate: '2021-05-12',
      status: 'Inactive',
      action: 'Edit',
    },
    {
      id: 3,
      name: 'Catherine Lee',
      role: 'Pathalogist',
      email: 'catherine.lee@example.com',
      phone: '+1 555-345-6789',
      dateOfBirth: '1985-02-10',
      joiningDate: '2019-09-03',
      status: 'Active',
      action: 'Edit',
    },
    {
      id: 4,
      name: 'Daniel Kim',
      role: 'QA Engineer',
      email: 'daniel.kim@example.com',
      phone: '+1 555-456-7890',
      dateOfBirth: '1992-12-05',
      joiningDate: '2023-03-17',
      status: 'On Leave',
      action: 'Edit',
    },
    {
      id: 5,
      name: 'Emma Brown',
      role: 'HR',
      email: 'emma.brown@example.com',
      phone: '+1 555-567-8901',
      dateOfBirth: '1995-09-30',
      joiningDate: '2020-11-01',
      status: 'Active',
      action: 'Edit',
    },
    {
      id: 6,
      name: 'Emma Brown',
      role: 'HR',
      email: 'emma.brown@example.com',
      phone: '+1 555-567-8901',
      dateOfBirth: '1995-09-30',
      joiningDate: '2020-11-01',
      status: 'Active',
      action: 'Edit',
    },
    {
      id: 7,
      name: 'Emma Brown',
      role: 'HR',
      email: 'emma.brown@example.com',
      phone: '+1 555-567-8901',
      dateOfBirth: '1995-09-30',
      joiningDate: '2020-11-01',
      status: 'Active',
      action: 'Edit',
    },
    {
      id: 8,
      name: 'Emma Brown',
      role: 'HR',
      email: 'emma.brown@example.com',
      phone: '+1 555-567-8901',
      dateOfBirth: '1995-09-30',
      joiningDate: '2020-11-01',
      status: 'Active',
      action: 'Edit',
    },
    {
      id: 9,
      name: 'Emma Brown',
      role: 'HR',
      email: 'emma.brown@example.com',
      phone: '+1 555-567-8901',
      dateOfBirth: '1995-09-30',
      joiningDate: '2020-11-01',
      status: 'Active',
      action: 'Edit',
    },
    {
      id: 10,
      name: 'Emma Brown',
      role: 'HR',
      email: 'emma.brown@example.com',
      phone: '+1 555-567-8901',
      dateOfBirth: '1995-09-30',
      joiningDate: '2020-11-01',
      status: 'Active',
      action: 'Edit',
    },
    {
      id: 11,
      name: 'Emma Brown',
      role: 'HR',
      email: 'emma.brown@example.com',
      phone: '+1 555-567-8901',
      dateOfBirth: '1995-09-30',
      joiningDate: '2020-11-01',
      status: 'Active',
      action: 'Edit',
    },
    {
      id: 12,
      name: 'Emma Brown',
      role: 'HR',
      email: 'emma.brown@example.com',
      phone: '+1 555-567-8901',
      dateOfBirth: '1995-09-30',
      joiningDate: '2020-11-01',
      status: 'Active',
      action: 'Edit',
    },
  ];
  
export default function User() {
  return (
    <MainCard title="List" sx={{ padding: '0 !important' }}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Table columns={columns} rows={rows} />
        </Grid>
      </Grid>
    </MainCard>
  );
}