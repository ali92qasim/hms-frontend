import MainCard from '../ui-component/cards/MainCard';
import {FilterToolbar} from '../ui-component/FilterToolbar';
import MuiStack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';

export default function Table({ columns, rows, modalTrigger, title }) {
  const theme = useTheme();
  return (
    <MainCard title={title} sx={{ padding: '0 !important' }}>
      <MuiStack direction="row" spacing={2} alignItems="center">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
          showToolbar
          disableColumnMenu
          disableColumnResize
          slots={{
            toolbar: FilterToolbar,
          }}
          sx={{
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-cell:focus-within': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: theme.palette.grey[100],
            },
            '& .MuiCheckbox-root': {
              color: theme.palette.grey[500],
              '&.Mui-checked': {
                color: theme.palette.secondary[800],
              },
            },
            '& .MuiDataGrid-columnHeader:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnHeader:focus-within': {
              outline: 'none',
            },
          }}
        />
      </MuiStack>
    </MainCard>
  );
}
