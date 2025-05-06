import Grid from '@mui/material/Grid2';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Table from '../../../ui-component/Table';
import { useGet } from '../../../api/requests';
import {columns} from '../../../config/columns/user';
import { userSchema } from '../../../schemas';
import FormModal from '../../../ui-component/extended/Form/FormModal';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSnackbar } from '../../../contexts/SnackbarContext';
// ==============================|| VIEW USER ||============================== //
 

const initialValues = {
  firstName: 'Qasim',
  lastName: 'Ali',
  name: 'Hassan Hospital',
  email: 'ali92qasim@live.com',
  password: '123456',
  joiningDate: '2023-10-01',
  dateOfBirth: '1992-10-01',
  phone: '1234567890',
  role: 'receptionist',
};


export default function User() {

    const { showSnackbar } = useSnackbar();

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