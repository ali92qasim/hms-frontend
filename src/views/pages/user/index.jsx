import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import {
  TextField, MenuItem, InputLabel, OutlinedInput, FormHelperText, FormLabel, Select, Avatar, Button
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Table from '../../../ui-component/Table';
import { useGet } from '../../../api/requests';
import {columns} from '../../../config/columns/user';
import { userSchema } from '../../../schemas';
import FormModal from '../../../ui-component/extended/Form/FormModal';
import FormControl from '../../../ui-component/extended/Form/FormControl';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSnackbar } from '../../../contexts/SnackbarContext';
import { useTheme } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


// ==============================|| VIEW USER ||============================== //
 

const initialValues = {
  role: '',
  firstName: 'Qasim',
  lastName: 'Ali',
  email: 'ali92qasim@live.com',
  password: '12345678',
  phone: '',
  specialization: '',
  profilePicture: null,
  commissionPercentage: '',
  gender: '',
  address: '',
  licenseNumber: '',
  dateOfBirth: null,
  joiningDate: null,
};


export default function User() {
  const [isDoctor, setIsDoctor] = useState(true);
  const { showSnackbar } = useSnackbar();
  const theme = useTheme();

    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: userSchema,
      onSubmit: async (values) => {
        try {
          const response = await register(values)
          showSnackbar(response.data.meta.message, 'success');
          navigate('/');
        } catch (error) {
          showSnackbar(error?.message, 'error');
        }
      }
    })
    const {touched, errors, isSubmitting, handleBlur, handleChange, handleSubmit, getFieldProps} = formik;
    // Fetching data from API
    const { data: users } = useGet('api/v1/users');
    const { data: roles } = useGet('api/v1/roles');

    // parsing data to match the table structure
    const rows = users?.data?.map((user, index) => ({
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormModal open={true} onClose={() => {}} title="Add User" initialValues={initialValues} validationSchema={Yup.object({})} onSubmit={handleSubmit} isSubmitting={isSubmitting}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Select Role"
            select
            name="role"
            {...getFieldProps('role')}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.role && errors.role)}
            helperText={touched.role && errors.role}
            sx={{ ...theme.typography.customSelect }}
          >
            {roles?.data?.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.attributes.name}
              </MenuItem>
            ))}
          </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              {...getFieldProps('firstName')}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              sx={{ ...theme.typography.customInput }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              {...getFieldProps('lastName')}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              sx={{ ...theme.typography.customInput }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              {...getFieldProps('email')}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              sx={{ ...theme.typography.customInput }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              {...getFieldProps('password')}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              sx={{ ...theme.typography.customInput }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              type="text"
              {...getFieldProps('phone')}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
              sx={{ ...theme.typography.customInput}}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Gender"
              sx={{ ...theme.typography.customSelect }}
              select
              {...getFieldProps('gender')}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.gender && errors.gender)}
              helperText={touched.gender && errors.gender}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>

    {/*  
      -- DatePickers Starts --  
      DatePicker does not work with form getFieldProps. getFieldProps only handles native input 
      value, onBlue and onChange. DatePicker returns a dayjs object not a native event. Therefore
      we are handling it bit differently here.
    */}
    <Grid size={{ xs: 12, sm: 6 }}>
      <DatePicker
        label="Date of Birth"
        value={formik.values.dateOfBirth}
        onChange={(value) => formik.setFieldValue('dateOfBirth', value)}
        onBlur={formik.handleBlur}
        sx={{ ...theme.typography.customDate }}
        renderInput={(params) => (
          <TextField
            {...params}
            name="dateOfBirth"
            fullWidth
            error={Boolean(formik.touched.dateOfBirth && formik.errors.dateOfBirth)}
            helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          />
        )}
      />
    </Grid>

      {/* Joining Date */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <DatePicker
          label="Joining Date"
          value={formik.values.joiningDate}
          onChange={(value) => formik.setFieldValue('joiningDate', value)}
          onBlur={formik.handleBlur}
          sx={{ ...theme.typography.customDate }}
          renderInput={(params) => (
            <TextField
              {...params}
              name="joiningDate"
              fullWidth
              error={Boolean(formik.touched.joiningDate && formik.errors.joiningDate)}
              helperText={formik.touched.joiningDate && formik.errors.joiningDate}
              sx={{ ...theme.typography.customInput }}
            />
          )}
        />
      </Grid>
    {/*  
      
      -- DatePickers End -- 
      
    */}
       {isDoctor && (
      <>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Specialization"
            name="specialization"
            {...getFieldProps('specialization')}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.specialization && errors.specialization)}
            helperText={touched.specialization && errors.specialization}
            sx={{ ...theme.typography.customInput }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Commission (%)"
            name="commissionPercentage"
            type="number"
            {...getFieldProps('commissionPercentage')}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.commissionPercentage && errors.commissionPercentage)}
            helperText={touched.commissionPercentage && errors.commissionPercentage}
            sx={{ ...theme.typography.customInput }}
          />
        </Grid>

        <Grid size={{ xs: 12}}>
          <TextField
            fullWidth
            label="License Number"
            name="licenseNumber"
            {...getFieldProps('licenseNumber')}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.licenseNumber && errors.licenseNumber)}
            helperText={touched.licenseNumber && errors.licenseNumber}
            sx={{ ...theme.typography.customInput }}
          />
        </Grid>
      </>
    )}
      <Grid size={{ xs: 12}}>
          <TextField
            fullWidth
            name="address"
            label="Address"
            multiline
            minRows={1}
            {...getFieldProps('address')}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.address && errors.address)}
            helperText={touched.address && errors.address}
            sx={{ ...theme.typography.customInput }}
          />
        </Grid>
      </Grid>
    </FormModal>
      </LocalizationProvider>
    </MainCard>
  );
}