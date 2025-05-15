import { useState } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import {useFormik} from 'formik';
import {AuthRegisterSchema} from '../../../schemas';
import register from 'api/register';
import { useSnackbar } from '../../../contexts/SnackbarContext';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| REGISTER ||=========================== //

const initialValues = {
  firstName: 'Qasim',
  lastName: 'Ali',
  name: 'Hassan Hospital',
  email: 'ali92qasim@live.com',
  password: 'Alienbeeps92',
  checked: false
};

export default function AuthRegister() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: AuthRegisterSchema,
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
  return (
    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2} sx={{ justifyContent: 'center' }}>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'center' }} size={12}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 0, sm: 2 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="First Name"
            margin="normal"
            name="firstName"
            type="text"
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
            margin="normal"
            name="lastName"
            type="text"
            {...getFieldProps('lastName')}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.lastName && errors.lastName)}
            helperText={touched.lastName && errors.lastName}
            sx={{ ...theme.typography.customInput }}
          />
        </Grid>
      </Grid>
      <TextField
        fullWidth
        label="Hospital"
        margin="normal"
        name="name"
        type="text"
        {...getFieldProps('name')}
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(touched.name && errors.name)}
        helperText={touched.name && errors.name}
        sx={{ ...theme.typography.customInput }}
      />
      <FormControl
        fullWidth
        sx={{ ...theme.typography.customInput }}
        error={Boolean(touched.email && errors.email)}
      >
        <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email-register"
          type="email"
          name="email"
          {...getFieldProps('email')}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Email Address"
        />
        {touched.email && errors.email && (
          <FormHelperText>{errors.email}</FormHelperText>
        )}
      </FormControl>


      <FormControl
        fullWidth
        sx={{ ...theme.typography.customInput }}
        error={Boolean(touched.password && errors.password)}
      >
        <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-register"
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="Password"
          {...getFieldProps('password')}
          onChange={handleChange}
          onBlur={handleBlur}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {touched.password && errors.password && (
          <FormHelperText>{errors.password}</FormHelperText>
        )}
      </FormControl>


      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid>
        <FormControl
        required
        error={Boolean(touched.checked && errors.checked)}
        component="fieldset"
        sx={{ mt: 1 }}
>
  <FormControlLabel
    control={
      <Checkbox
      {...getFieldProps('checked')}
        name="checked"
        color="primary"
        onChange={handleChange}
        onBlur={handleBlur}
      />
    }
    label={
      <Typography variant="subtitle1">
        Agree with&nbsp;
        <Typography variant="subtitle1" component={Link} to="#">
          Terms & Condition.
        </Typography>
      </Typography>
    }
  />
  {touched.checked && errors.checked && (
    <FormHelperText>{errors.checked}</FormHelperText>
  )}
</FormControl>

        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button 
          disableElevation 
          fullWidth 
          size="large" 
          type="submit" 
          variant="contained" 
          color="secondary"
          disabled={isSubmitting}
          >
            Sign up
          </Button>
        </AnimateButton>
      </Box>
    </Form>
  );
}
