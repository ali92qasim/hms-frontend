import Grid from '@mui/material/Grid2';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

export default function Role() {
  return (
    <MainCard title="List" sx={{ padding: '0 !important' }}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={6}>
          <div>Role</div>
        </Grid>
      </Grid>
    </MainCard>
  );
}