import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
  useToast,
} from '@chakra-ui/react';
import NavBar from '../components/common/NavBar';

import verified from '../assets/verified.png';
import { BsThreeDots } from 'react-icons/bs';
import Actions from '../components/user/Actions';
import { useState } from 'react';
import Replies from '../components/user/Replies';

const UserPost = () => {
  const toast = useToast();
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  const copyURL = () => {
    const currentLocation = window.location.href;
    navigator.clipboard.writeText(currentLocation).then(() => {
      toast({
        title: 'URL is copyed',
        description: currentLocation,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    });
  };
  return (
    <>
      <NavBar />
      <Flex>
        <Flex alignItems="center" gap={2} width="full">
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&usqp=CAU"
            name="name"
            size="md"
          />
          <Flex alignItems="center">
            <Text fontSize="sm" fontWeight="bold">
              {'name'}
            </Text>
            <Image src={verified} w="4" h="4" ml="2" />
          </Flex>
        </Flex>
        <Flex alignItems="center" gap={4}>
          <Text fontSize="sm" color="gray.light">
            Time
          </Text>
          <BsThreeDots cursor="pointer" onClick={copyURL} />
        </Flex>
      </Flex>
      <Text my="3" textAlign="start">
        About thread
      </Text>
      <Box
        borderRadius={6}
        overflow="hidden"
        border="1px solid"
        borderColor="gary.light"
        position="relative"
      >
        <Image src={`https://bit.ly/dan-abramov`} name={`name`} w="full" />
      </Box>
      <Flex gap={3} my={1} cursor="pointer">
        <Actions liked={liked} handleLikeAndUnlike={handleLike} />
      </Flex>
      <Flex alignItems="center" gap="2">
        <Text color="gray.light" fontSize="sm">
          125 replies
        </Text>
        <Box width={0.5} height={0.5} bg={'gray.light'} borderRadius={'full'} />
        <Text color="gray.light" fontSize="sm">
          125 likes
        </Text>
      </Flex>
      <Divider my="4" />
      <Flex justifyContent="space-between">
        <Flex gap={2}>
          <Text fontSize={'2xl'}>👏</Text>
          <Text color="gray.light">Get the app to like, reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my="4" />
      <Replies />
    </>
  );
};

export default UserPost;
