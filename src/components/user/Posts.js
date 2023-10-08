import {
  Avatar,
  Box,
  Flex,
  Image,
  Text,
  useToast,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import { useState } from 'react';

import Actions from './Actions';
import Loader from '../common/Loader';
import verified from '../../assets/verified.png';

const Posts = ({ posts, loading }) => {
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

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {posts?.length > 0 ? (
        <>
          {posts?.map((p, i) => (
            <Link to={`/${p?.postedBy?.username}/post/${p.id}`} key={i}>
              <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={'column'} alignItems={'center'}>
                  <Avatar
                    size="md"
                    name={`${p?.postedBy?.name}`}
                    src={`${p?.postedBy?.image}`}
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
                        {p?.postedBy?.username}
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
                  <Text textAlign="start" fontSize="sm">
                    {p?.text}
                  </Text>
                  <Box
                    borderRadius={6}
                    overflow="hidden"
                    border="1px solid"
                    borderColor="gary.light"
                    position="relative"
                  >
                    {p?.img && (
                      <Image
                        src={`${p?.img}`}
                        name={`${p?.postedBy?.name}`}
                        w="full"
                      />
                    )}
                  </Box>
                  <Flex gap={3} my={1}>
                    <Actions
                      liked={p?.likes?.length}
                      handleLikeAndUnlike={handleLike}
                    />
                  </Flex>
                  <Flex alignItems="center" gap="2">
                    <Text color="gray.light" fontSize="sm">
                      {p?.replies?.length} replies
                    </Text>
                    <Box
                      width={0.5}
                      height={0.5}
                      bg={'gray.light'}
                      borderRadius={'full'}
                    />
                    <Text color="gray.light" fontSize="sm">
                      {p?.likes?.length} likes
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Link>
          ))}
        </>
      ) : (
        <Text my={5}>
          No Post Found,
          <ChakraLink as={Link} to="/" mx="2">
            wonna post one
          </ChakraLink>
        </Text>
      )}
    </>
  );
};

export default Posts;
