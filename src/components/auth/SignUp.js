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
import InputBox from '../form/InputBox';
import PasswordBox from '../form/PasswordBox';
import useFetchApiCall from '../../hooks/useFetchApiCall';
import useToastBox from '../../hooks/useToastBox';
import { useNavigate } from 'react-router-dom';
import userAtom from '../../atoms/userAtom';

export default function SignUp() {
  const { loading, apiCall } = useFetchApiCall();
  const { showToast } = useToastBox();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
  });
  const [unvalidData, setUnvalidData] = useState();
  const setAuthSrceenState = useSetRecoilState(authScreenAtom);
  const setUserState = useSetRecoilState(userAtom);

  const handleUserData = (name, value) => {
    setUserData({ ...userData, [name]: value });
    setUnvalidData();
  };

  const validate = user => {
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

    if (user.name === '') {
      setUnvalidData({
        name: 'Enter a valid name!',
      });
      return false;
    } else if (user.username === '') {
      setUnvalidData({
        username: `Enter valie user name`,
      });
      return false;
    } else if (!emailPattern.test(user.email)) {
      setUnvalidData({
        email: 'Enter a valid email address!',
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

  const singupUser = async () => {
    const valid = validate(userData);

    let response;
    if (valid) {
      response = await apiCall('user', 'POST', userData, {
        'Content-Type': 'application/json',
      });
    }

    if (response.success) {
      showToast('Success', 'Sign up successfully', 'success');
      setUserState(response.token);
      localStorage.setItem('token', response.token);
      navigate('/');
    } else showToast('Error', response.message, 'error');
  };

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <Flex gap={4} flexDirection={{ base: 'column', sm: 'row' }}>
              <Box>
                <InputBox
                  label="Full Name"
                  value={userData.name}
                  onChange={handleUserData}
                  name="name"
                  error={unvalidData?.name}
                />
              </Box>
              <Box>
                <InputBox
                  label="User Name"
                  value={userData.username}
                  onChange={handleUserData}
                  name="username"
                  error={unvalidData?.username}
                />
              </Box>
            </Flex>
            <InputBox
              label="Email Address"
              value={userData.email}
              onChange={handleUserData}
              name="email"
              type="email"
              error={unvalidData?.email}
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
                onClick={singupUser}
                isDisabled={loading}
              >
                {loading ? 'Loading...' : 'Sign up'}
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                <Link
                  color={'blue.400'}
                  onClick={() => {
                    setAuthSrceenState('login');
                  }}
                >
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
