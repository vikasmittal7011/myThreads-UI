import { Avatar, Box, Flex, Image, Text, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';

import verified from '../../assets/verified.png';
import Actions from './Actions';
import { useState } from 'react';

const Posts = () => {
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
    <Link to={`/vikas/post/543`}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Avatar
            size="md"
            name={`name`}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&usqp=CAU"
          />
          <Box w={1} h={'full'} bg="gray.light" my={2}></Box>
          <Box w={'full'} position={'relative'}>
            <Avatar
              size="xs"
              name={`name`}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&usqp=CAU"
              position={'absolute'}
              top="0px"
              left="15px"
              padding="2px"
            />
            <Avatar
              size="xs"
              name={`name`}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&usqp=CAU"
              position={'absolute'}
              bottom="0px"
              right="-5px"
              padding="2px"
            />
            <Avatar
              size="xs"
              name={`name`}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&usqp=CAU"
              position={'absolute'}
              bottom="0px"
              left="4px"
              padding="2px"
            />
          </Box>
        </Flex>
        <Flex gap={2} flexDirection={'column'} flex={1}>
          <Flex justifyContent={'space-between'} width={'full'}>
            <Flex width="full" alignItems="center">
              <Text fontWeight="bold" fontSize="sm">
                username
              </Text>
              <Image src={verified} h={4} w={4} ml={1} />
            </Flex>
            <Flex alignItems="center" gap={4}>
              <Text fontSize="sm" color="gray.light">
                Time
              </Text>
              <BsThreeDots
                onClick={e => {
                  e.preventDefault();
                  copyURL();
                }}
              />
            </Flex>
          </Flex>
          <Text fontSize="sm">About post </Text>
          <Box
            borderRadius={6}
            overflow="hidden"
            border="1px solid"
            borderColor="gary.light"
            position="relative"
          >
            <Image src={`https://bit.ly/dan-abramov`} name={`name`} w="full" />
          </Box>
          <Flex gap={3} my={1}>
            <Actions liked={liked} handleLikeAndUnlike={handleLike} />
          </Flex>
          <Flex alignItems="center" gap="2">
            <Text color="gray.light" fontSize="sm">
              125 replies
            </Text>
            <Box
              width={0.5}
              height={0.5}
              bg={'gray.light'}
              borderRadius={'full'}
            />
            <Text color="gray.light" fontSize="sm">
              125 likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default Posts;
