import { Tooltip, IconButton, TextField, Box } from '@mui/material';
import Button from './extended/Button';
import { IconPlus, IconFileDownload } from '@tabler/icons-react';
import {
  Toolbar,
  ExportCsv,
  QuickFilter,
  QuickFilterControl,
} from '@mui/x-data-grid';

export function FilterToolbar() {
    return (
<Toolbar
  sx={{
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 2,
    mb: 2,
  }}
>
  <Box
    sx={{
      flex: 1,
      mb: { xs: 1, sm: 0 }
    }}
  >
    <QuickFilter
      render={() => (
        <QuickFilterControl
          aria-label="Search"
          placeholder="Search..."
          render={({ slotProps, ...controlProps }) => (
            <TextField
              {...controlProps}
              {...slotProps?.htmlInput}
              fullWidth
            />
          )}
        />
      )}
    />
  </Box>

  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
    }}
  >
    <Button variant="contained" color="secondary">
      <IconPlus width={18} height={18} />
    </Button>
    <Tooltip title="Export CSV">
      <IconButton color="secondary">
        <IconFileDownload width={28} height={28} />
      </IconButton>
    </Tooltip>
  </Box>
</Toolbar>

    );
  }