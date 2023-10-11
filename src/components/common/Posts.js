import {
  Avatar,
  Box,
  Flex,
  Image,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

import Loader from './Loader';
import ShowTime from './ShowTime';
import Actions from '../user/Actions';
import verified from '../../assets/verified.png';

const Posts = ({ posts, loading, showMessage = 'user', updatePost }) => {
  const navigate = useNavigate();

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
                    onClick={e => {
                      e.preventDefault();
                      navigate(`/${p?.postedBy?.username}`);
                    }}
                  />
                  <Box w={1} h={'full'} bg="gray.light" my={2}></Box>
                  {<ShowAvatars replies={p.replies} />}
                </Flex>
                <Flex gap={2} flexDirection={'column'} flex={1}>
                  <Flex justifyContent={'space-between'} width={'full'}>
                    <Flex width="full" alignItems="center">
                      <Text
                        fontWeight="bold"
                        fontSize="sm"
                        onClick={e => {
                          e.preventDefault();
                          navigate(`/${p?.postedBy?.username}`);
                        }}
                      >
                        {p?.postedBy?.username}
                      </Text>
                      <Image src={verified} h={4} w={4} ml={1} />
                    </Flex>
                    <Flex alignItems="center" gap={4}>
                      <ShowTime time={p.createdAt} />
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
                    <Actions post={p} updatePost={updatePost} />
                  </Flex>
                </Flex>
              </Flex>
            </Link>
          ))}
        </>
      ) : (
        <Text my={5} as="h1">
          {showMessage === 'user' ? (
            <>
              No Post Found,
              <ChakraLink as={Link} to="/" mx="2">
                wonna post one
              </ChakraLink>
            </>
          ) : (
            <>Post Not Found</>
          )}
        </Text>
      )}
    </>
  );
};

const ShowAvatars = ({ replies }) => (
  <Box w={'full'} position={'relative'}>
    {replies?.length === 0 && <Text textAlign="center">🥱</Text>}
    {replies?.[0] && (
      <Avatar
        size="xs"
        name={replies?.[0]?.userId?.name}
        src={replies?.[0]?.userId?.image}
        position={'absolute'}
        top="0px"
        left="15px"
        padding="2px"
      />
    )}
    {replies?.[1] && (
      <Avatar
        size="xs"
        name={replies?.[1]?.userId?.name}
        src={replies?.[1]?.userId?.image}
        position={'absolute'}
        bottom="0px"
        right="-5px"
        padding="2px"
      />
    )}
    {replies?.[2] && (
      <Avatar
        size="xs"
        name={replies?.[3]?.userId?.name}
        src={replies?.[3]?.userId?.image}
        position={'absolute'}
        bottom="0px"
        left="4px"
        padding="2px"
      />
    )}
  </Box>
);

export default Posts;
