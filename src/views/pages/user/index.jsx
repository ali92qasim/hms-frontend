import Grid from '@mui/material/Grid2';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Table from '../../../ui-component/Table';
import { useGet } from '../../../api/requests';

import {columns} from '../../../config/columns/user';
// ==============================|| VIEW USER ||============================== //
  

export default function User() {
    const { data } = useGet('api/v1/users');
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