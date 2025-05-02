import { useState, useEffect } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import {useFormik} from 'formik';
import {AuthLoginSchema} from '../../../schemas';
import { loginUser } from '../../../store/slices/authSlice';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===============================|| LOGIN ||=============================== //

const initialValues = {
  email: 'demo@hospital.com',
  password: 'Alienbeeps92',
};

export default function AuthLogin() {
  const theme = useTheme();

  const [checked, setChecked] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error, token } = useSelector((state) => state.auth);

  const formik = useFormik({
      initialValues: initialValues,
      validationSchema: AuthLoginSchema,
      onSubmit: async (values) => {
      const result = await dispatch(loginUser(values));

      if (loginUser.fulfilled.match(result)) {
        navigate('/dashboard'); 
      }
    }
  });
  const {touched, errors, isSubmitting, handleBlur, handleChange, handleSubmit, getFieldProps} = formik;

  useEffect(() => {
    if (token && user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <FormControl 
      fullWidth 
      error={Boolean(touched.email && errors.email)}
      sx={{ ...theme.typography.customInput }}>
        <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
        <OutlinedInput
        id="outlined-adornment-email-login" 
        type="email" 
        name="email" 
        {...getFieldProps('email')}
        onChange={handleChange}
        onBlur={handleBlur}
        inputProps={{}} 
        />
        {touched.email && errors.email && (
          <FormHelperText>{errors.email}</FormHelperText>
        )}
      </FormControl>

      <FormControl 
      fullWidth 
      error={Boolean(touched.password && errors.password)}
      sx={{ ...theme.typography.customInput }}>
        <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-login"
          type={showPassword ? 'text' : 'password'}
          name="password"
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
          inputProps={{}}
          label="Password"
        />
        {touched.password && errors.password && (
          <FormHelperText>{errors.password}</FormHelperText>
        )}
      </FormControl>

      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
            label="Keep me logged in"
          />
        </Grid>
        <Grid>
          <Typography variant="subtitle1" component={Link} to="/forgot-password" color="secondary" sx={{ textDecoration: 'none' }}>
            Forgot Password?
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button 
          color="secondary" 
          fullWidth 
          size="large" 
          type="submit" 
          variant="contained"
          disabled={isSubmitting}
        >
            Sign In
          </Button>
        </AnimateButton>
      </Box>
    </Form>
  );
}
