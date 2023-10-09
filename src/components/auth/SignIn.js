import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import authScreenAtom from '../../atoms/authAtom';
import userAtom from '../../atoms/userAtom';
import InputBox from '../form/InputBox';
import PasswordBox from '../form/PasswordBox';
import useToastBox from '../../hooks/useToastBox';
import { useNavigate } from 'react-router-dom';
import useFetchApiCall from '../../hooks/useFetchApiCall';

export default function SignIn() {
  const { showToast } = useToastBox();
  const { apiCall, loading } = useFetchApiCall();

  const navigate = useNavigate();
  const setAuthSrceenState = useSetRecoilState(authScreenAtom);
  const setUserState = useSetRecoilState(userAtom);
  const [unvalidData, setUnvalidData] = useState();
  const [userData, setUserData] = useState({
    password: '',
    username: '',
  });

  const handleUserData = (name, value) => {
    setUserData({ ...userData, [name]: value });
    setUnvalidData();
  };

  const validate = user => {
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (user.username === '') {
      setUnvalidData({
        username: `Enter valie user name`,
      });
      return false;
    } else if (!passwordPattern.test(user.password)) {
      setUnvalidData({
        password: `- at least 8 characters\n
        - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
        - Can contain special characters`,
      });
      return false;
    } else {
      setUnvalidData('');
      return true;
    }
  };

  const singInUser = async () => {
    const valid = validate(userData);

    let response;
    if (valid) {
      response = await apiCall('user/login', 'POST', userData, {
        'Content-Type': 'application/json',
      });
    }
    if (response.success || response) {
      showToast('Success', 'Login successfully', 'success');
      setUserState(response.token);
      localStorage.setItem('token', response.token);
      localStorage.setItem('id', response.id);
      navigate('/');
    }
  };

  return (
    <Flex align={'center'} justify={'center'} width="full">
      <Stack spacing={8} mx={'auto'}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign In
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <InputBox
              label="User name"
              type="email"
              onChange={handleUserData}
              value={userData.username}
              name="username"
              error={unvalidData?.username}
            />
            <PasswordBox
              onChange={handleUserData}
              value={userData.password}
              error={unvalidData?.password}
            />
            <Stack spacing={10} pt={2}>
              <Button
                size="lg"
                bg={useColorModeValue('gray.600', 'gray.700')}
                color={'white'}
                _hover={{
                  bg: useColorModeValue('gray.700', 'gray.800'),
                }}
                onClick={singInUser}
                isDisabled={loading}
              >
                {loading ? 'Loading...' : 'Sign up'}
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Don't have an account?{' '}
                <Link
                  color={'blue.400'}
                  onClick={() => {
                    setAuthSrceenState('signup');
                  }}
                >
                  SignUp
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
