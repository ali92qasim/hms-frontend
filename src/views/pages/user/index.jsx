import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import {
  TextField, MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Table from '../../../ui-component/Table';
import { useGet, usePost } from '../../../api/requests';
import {columns} from '../../../config/columns/user';
import { userSchema } from '../../../schemas';
import FormModal from '../../../ui-component/extended/Form/FormModal';
import { useFormik, Form } from 'formik';
import { useSnackbar } from '../../../contexts/SnackbarContext';
import { useTheme } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useModal } from '../../../contexts/ModalContext';
import dayjs from 'dayjs';


// ==============================|| VIEW USER ||============================== //
 

const initialValues = {
  role: 'Receptionist',
  firstName: 'Qasim',
  lastName: 'Ali',
  email: 'ali92qasim@live.com',
  password: '12345678',
  phone: '03127615745',
  specialization: '',
  profilePicture: null,
  commissionPercentage: 0,
  gender: 'Male',
  address: '',
  licenseNumber: null,
  dateOfBirth: dayjs(),
  joiningDate: dayjs(),
};


export default function User() {
  const {isOpen,  closeModal} = useModal()
  const [isDoctor, setIsDoctor] = useState(false);
  const [hasBackendError, setHasBackendError] = useState(false);

  const { showSnackbar } = useSnackbar();
  const theme = useTheme();
  // Fetching data from API
  const { data: users } = useGet('api/v1/users');
  const { data: roles } = useGet('api/v1/roles');

  //send request to API for storing Data
  const { post } = usePost('api/v1/users');
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: userSchema,
      onSubmit: async (values, {resetForm}) => {
        try {
          const response = await post(values);
          showSnackbar(response.data?.meta?.message, 'success');
          closeModal()
          resetForm()
        } catch (error) 
        {
          setHasBackendError(true);
          console.log(error)
          showSnackbar(error?.response.data?.message, 'error');
        }
      }
    })
    const {touched, errors, isSubmitting, handleBlur, handleChange, handleSubmit, getFieldProps} = formik;
    const isActuallySubmitting =
    isSubmitting &&
    Object.keys(errors).length === 0 &&
    !hasBackendError;
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
      <FormModal open={isOpen} 
        onClose={closeModal}
        title="Add User" 
        initialValues={initialValues} 
        onSubmit={handleSubmit} 
        isSubmitting={isActuallySubmitting}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Select Role"
              name="role"
              sx={{ ...theme.typography.customSelect }}
              select
              {...getFieldProps('role') ?? ''}
              onChange={(e) => {
                handleChange(e);
                setIsDoctor(e.target.value === 'Doctor');
              }}
              onBlur={handleBlur}
              error={Boolean(touched.gender && errors.gender)}
              helperText={touched.gender && errors.gender}
            >
              {roles?.data?.length > 0 ? (
                roles.data.map((role) => (
                  <MenuItem key={role.id} value={role?.attributes?.name}>
                    {role?.attributes?.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">No roles available</MenuItem>
              )}
            </TextField>

          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              {...getFieldProps('firstName') ?? ''}
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
              {...getFieldProps('lastName') ?? ''}
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
              {...getFieldProps('email') ?? ''}
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
              {...getFieldProps('password') ?? ''}
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
              {...getFieldProps('phone') ?? ''}
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
              {...getFieldProps('gender') ?? ''}
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
        onChange={(value) => formik.setFieldValue('dateOfBirth', value ?? dayjs())}
        onBlur={formik.handleBlur}
        slotProps={{
          textField: {
            name: 'dateOfBirth',
            fullWidth: true,
            error: Boolean(touched.dateOfBirth && errors.dateOfBirth),
            helperText: touched.dateOfBirth && errors.dateOfBirth,
            sx: { ...theme.typography.customDate },
          },
        }}
      />
    </Grid>

      {/* Joining Date */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <DatePicker
          label="Joining Date"
          value={formik.values.joiningDate}
        onChange={(value) => formik.setFieldValue('joiningDate', value ?? dayjs())}
        onBlur={formik.handleBlur}
          slotProps={{
            textField: {
              name: 'joiningDate',
              fullWidth: true,
              error: Boolean(touched.joiningDate && errors.joiningDate),
              helperText: touched.joiningDate && errors.joiningDate,
              sx: { ...theme.typography.customDate },
            },
          }}
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
            {...getFieldProps('specialization') ?? ''}
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
            {...getFieldProps('commissionPercentage') ?? ''}
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
            {...getFieldProps('licenseNumber') ?? ''}
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
            {...getFieldProps('address') ?? ''}
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