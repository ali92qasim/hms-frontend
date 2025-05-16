import {
    Dialog,
    IconButton,
    Grid2 as Grid,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    Stack,
    Avatar,
    ListItemText
  } from '@mui/material';
  import { useTheme } from '@mui/material/styles';
  import { IconX, IconMailFilled, IconPhoneFilled, IconCalendarPlus } from '@tabler/icons-react';
  import MainCard from './cards/MainCard';
  
  export function View({ data, open, onClose }) {
    const theme = useTheme();
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
      >
        <Grid container spacing={2.5}>
            <Grid size={{xs:12}}>
                <Stack alignContent="space-between">
                <List>
                  <ListItem>
                    <ListItemText><Typography variant="h3">Personal Information</Typography></ListItemText>
                    <ListItemIcon>
                        <IconButton onClick={onClose}>
                            <IconX />
                        </IconButton>
                    </ListItemIcon>
                  </ListItem>
                  </List>
                </Stack>
            </Grid>
            <Grid size={{xs:12}}>
                <Divider />
            </Grid>
      <Grid size={{xs: 12, sm: 5, md: 4, lg: 4, xl: 3}}>
        
        <MainCard elevation={0}>
            <Grid container spacing={3}>
                <Stack spacing={3} sx={{ border: 1, borderColor: theme.palette.grey[100], p: 10, borderRadius: 2 }}> 
              <Grid size={{xs: 12}}>
                <Stack direction="column" spacing={2} alignItems="center">
                  <Avatar
                    alt="Avatar 1"
                    src="https://ableproadmin.com/react/assets/avatar-1-B0hIH1z9.png"
                  />
                  <Stack>
                    <Typography variant="h5">Michael Bass</Typography>
                    <Typography variant="body1">IT Architect</Typography>
                  </Stack>
                </Stack>
              </Grid>

              <Grid size={{xs: 12}}>
                <Divider />
              </Grid>
              <Grid size={{xs: 12}}>
              <Stack direction="column" spacing={2} alignItems="center">
                <List>
                  <ListItem>
                    <ListItemIcon>
                        <IconMailFilled />
                    </ListItemIcon>
                    <ListItemText primary={data?.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <IconPhoneFilled />
                    </ListItemIcon>
                    <ListItemText primary={data?.phone} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <IconCalendarPlus />
                    </ListItemIcon>
                    <ListItemText primary={data?.joiningDate} />
                  </ListItem>
                </List>
                </Stack>
              </Grid>
              </Stack>
            </Grid>
        </MainCard>
      </Grid>
    </Grid>
      </Dialog>
    );
  }
  