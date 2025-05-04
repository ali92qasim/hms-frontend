import { useMemo, useState } from 'react';
import MainCard from '../ui-component/cards/MainCard';
import MuiStack from '@mui/material/Stack';
import { DataGrid, GridToolbarExportContainer } from '@mui/x-data-grid';

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';


export default function Table({columns, rows,  modalTrigger, title}) {
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
                    pageSizeOptions={[5,10,20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </MuiStack>
        </MainCard>

    )
}

