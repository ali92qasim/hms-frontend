import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress
} from '@mui/material';
import { Formik, Form } from 'formik';

const FormModal = ({
  open,
  onClose,
  title,
  initialValues,
  validationSchema,
  onSubmit,
  children,
  submitText = 'Save',
  isSubmitting,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting}) => (
          <Form>
            <DialogContent dividers>
              {typeof children === 'function' ? children() : children}
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="secondary" variant="outlined">Cancel</Button>
              <Button type="submit" variant="contained" color="secondary" disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={24} /> : submitText}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default FormModal;
