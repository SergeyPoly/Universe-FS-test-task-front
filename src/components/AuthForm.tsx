import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../api/axiosInstance';
import { TextField, Button, Stack } from '@mui/material';
import { useAuth } from '../providers/AuthProvider';
import { getErrorMessage } from '../utils/getErrorMessage';
import { useNotification } from '../providers/NotificationProvider';

interface Props {
  loginMode: boolean;
}

const AuthSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Password is too short, min 6 symbols required!')
    .required('Required'),
});

const AuthForm: FC<Props> = ({ loginMode }) => {
  const { login } = useAuth();
  const { showNotification } = useNotification();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const url = loginMode ? '/auth/login' : '/auth/register';
      const response = await axiosInstance.post(url, values);
      login(response.data.access_token);
    } catch (err) {
      showNotification(getErrorMessage(err), 'error');
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={AuthSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleChange, handleBlur }) => (
        <Form>
          <Stack spacing={2}>
            <TextField
              label="Email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              fullWidth
            />
            <Button variant="contained" color="primary" type="submit">
              {loginMode ? 'Log In' : 'Register'}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
