import {
  Button,
  Flex,
  FormControl,
  Heading,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  Input,
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';

import NavBar from '../components/common/NavBar';
import InputBox from '../components/form/InputBox';
import useFetchApiCall from '../hooks/useFetchApiCall';
import usePreviewImg from '../hooks/useImagePreview';
import user from '../assets/user.png';
import Loader from '../components/common/Loader';
import useToastBox from '../hooks/useToastBox';
import { useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
  const color = useColorModeValue('white', 'gray.dark');
  const imageRef = useRef(null);
  const navigate = useNavigate();
  const { apiCall, loading } = useFetchApiCall();
  const { showToast } = useToastBox();
  const { handleImageChange, imgUrl } = usePreviewImg();
  const [userInfo, setUserInfo] = useState();
  const [wrongData, setWrongData] = useState();

  const handleUserInfo = (name, value) => {
    setUserInfo({ ...userInfo, [name]: value });
    setWrongData();
  };

  const fetchUserInfo = async () => {
    const response = await apiCall('user/profile');

    if (response.success) {
      setUserInfo(response.user);
    } else {
      setUserInfo('Wrong data');
    }
  };

  const validate = data => {
    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

    if (data.name === '') {
      setWrongData({
        name: 'Enter a valid name!',
      });
      return false;
    } else if (!emailPattern.test(data.email)) {
      setWrongData({
        email: 'Enter a valid email address!',
      });
      return false;
    } else {
      setWrongData('');
      return true;
    }
  };

  const hanldeUpdate = async () => {
    const valid = validate(userInfo);
    if (valid) {
      const user = {
        ...userInfo,
        image: imgUrl || userInfo.image,
      };
      const response = await apiCall('user/update', 'PATCH', user);
      if (response.success) {
        showToast('Success', 'Profile update successfull');
        navigate(`/${response.user.username}`);
      } else {
        showToast('Error', response.message || response);
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !userInfo) {
    return <Loader />;
  }
  return (
    <>
      <NavBar />
      {userInfo && (
        <Flex align={'center'} justify={'center'} width="full" pb="6">
          <Stack
            spacing={4}
            w={'full'}
            bg={color}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
          >
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
              User Profile Update
            </Heading>

            <FormControl>
              <Stack direction={['column', 'row']} spacing={6}>
                <Center>
                  <Avatar size="xl" src={imgUrl || userInfo.image || user} />
                </Center>
                <Center w="full">
                  <Button
                    w="full"
                    onClick={() => {
                      imageRef.current.click();
                    }}
                  >
                    Change Image
                  </Button>
                  <Input
                    type="file"
                    name="image"
                    hidden
                    ref={imageRef}
                    onChange={handleImageChange}
                  />
                </Center>
              </Stack>
            </FormControl>
            <InputBox
              label="Full Name"
              name="name"
              value={userInfo?.name}
              onChange={handleUserInfo}
              error={wrongData?.name}
            />
            <InputBox
              label="User Name"
              name="username"
              value={userInfo?.username}
              onChange={handleUserInfo}
              error={wrongData?.username}
            />
            <InputBox
              label="Bio"
              name="bio"
              value={userInfo?.bio}
              onChange={handleUserInfo}
              error={wrongData?.bio}
            />
            <InputBox
              label="Email"
              name="email"
              value={userInfo?.email}
              onChange={handleUserInfo}
              error={wrongData?.email}
            />

            <Stack spacing={6} direction={['column', 'row']}>
              <Button
                bg={'red.400'}
                color={'white'}
                w="full"
                _hover={{
                  bg: 'red.500',
                }}
              >
                Cancel
              </Button>
              <Button
                bg={'green.400'}
                color={'white'}
                w="full"
                _hover={{
                  bg: 'green.500',
                }}
                onClick={hanldeUpdate}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      )}
    </>
  );
}
