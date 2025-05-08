import PropTypes from 'prop-types';
// material-ui
import MUIFormControl from '@mui/material/FormControl';
import {Form} from 'formik'


export default function FormControl({ children, fullWidth, margin }) {

  return (
    <Form>
      <MUIFormControl fullWidth={fullWidth} margin={margin}>
        {children}
      </MUIFormControl>
    </Form>
  );
}


FormControl.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
};