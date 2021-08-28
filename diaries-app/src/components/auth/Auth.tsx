import { FC, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Center,
  Box,
  VStack,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
} from '@chakra-ui/react';

import { User } from '../../interfaces';
import http from '../../services/api';
import { saveToken, setAuthState } from './authSlice';
import { setUser } from './userSlice';
import { AuthResponse } from '../../services/mirage/routes/user';
import { useAppDispatch } from '../../store';

const schema = Yup.object().shape({
  username: Yup.string()
    .required('What? No username?')
    .max(16, 'Username cannot be longer than 16 characters'),
  password: Yup.string().required('Without a password, "None shall pass!"'),
  email: Yup.string().email('Please provide a valid email address (abc@xy.z)'),
});

const Auth: FC = () => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    resolver: yupResolver(schema),
  });
  const [isLogin, setIsLogin] = useState(true);

  const submitForm = useCallback(
    (data: User) => {
      const path = isLogin ? '/auth/login' : '/auth/signup';
      http
        .post<User, AuthResponse>(path, data)
        .then((res) => {
          if (res) {
            const { user, token } = res;

            dispatch(saveToken(token));
            dispatch(setUser(user));
            dispatch(setAuthState(true));
          }
        })
        .catch((error) => {
          setError(error.data.field, {
            type: 'manual',
            message: error.data.message,
          });

          console.error(error);
        });
    },
    [isLogin, dispatch, setError]
  );

  return (
    <Center minHeight="100vh">
      <Box
        minWidth={{ base: '100%', md: '60%', xl: '40%' }}
        boxShadow="xl"
        rounded="md"
        px="8"
        py="16"
      >
        <form onSubmit={handleSubmit(submitForm)}>
          <VStack spacing="4">
            <FormControl isInvalid={!!errors.username}>
              <Input {...register('username')} placeholder="Username" />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <Input
                {...register('password')}
                placeholder="Password"
                type="password"
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email}>
              <Input {...register('email')} placeholder="Email (optional)" />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <Button isFullWidth type="submit" isLoading={isSubmitting}>
              {isLogin ? 'Login' : 'Create account'}
            </Button>
            <Button
              variant="link"
              _focus={{
                outline: 'none',
              }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'No account? Create one' : 'Already have an account?'}
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default Auth;
