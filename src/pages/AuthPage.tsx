import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import AuthForm from '../components/AuthForm';

const AuthPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/projects');
    }
  }, [isAuthenticated, navigate]);

  const [loginMode, setLoginMode] = useState<boolean>(true);
  const toggleMode = () => setLoginMode((prev) => !prev);

  return (
    <Container maxWidth="xs">
      <Box textAlign="center" mt={8}>
        <Typography variant="h4" mb={2}>
          {loginMode ? 'Login' : 'Register'}
        </Typography>
        <AuthForm loginMode={loginMode} />
        <Box mt={2}>
          <Link component="button" onClick={toggleMode}>
            {loginMode
              ? 'Don\'t have an account? Register'
              : 'Already have an account? Log in'}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthPage;
