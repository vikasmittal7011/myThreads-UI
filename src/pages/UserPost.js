import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import NavBar from '../components/common/NavBar';

import verified from '../assets/verified.png';
import { BsThreeDots } from 'react-icons/bs';
import Actions from '../components/user/Actions';
import { useState } from 'react';
import Replies from '../components/user/Replies';
import useToastBox from '../hooks/useToastBox';
import useFetchApiCall from '../hooks/useFetchApiCall';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../components/common/Loader';

const UserPost = () => {
  const postId = useParams().postId;
  console.log(postId);
  const { showToast } = useToastBox();
  const { apiCall, loading } = useFetchApiCall();

  const [liked, setLiked] = useState(false);
  const [post, setPost] = useState();

  const handleLike = () => {
    setLiked(!liked);
  };

  const copyURL = () => {
    const currentLocation = window.location.href;
    navigator.clipboard.writeText(currentLocation).then(() => {
      showToast('URL is copyed', currentLocation);
    });
  };

  const loadPost = async () => {
    const response = await apiCall(`post/${postId}`);
    if (response.success) {
      setPost(response.post);
    }
  };

  useEffect(() => {
    loadPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  return (
    <>
      <NavBar />
      {loading ? (
        <Loader />
      ) : (
        <>
          {post && (
            <>
              <Flex>
                <Flex alignItems="center" gap={2} width="full">
                  <Avatar
                    src={post?.postedBy?.image}
                    name={post?.postedBy?.name}
                    size="md"
                  />
                  <Flex alignItems="center">
                    <Text fontSize="sm" fontWeight="bold">
                      {post?.postedBy?.name}
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
                {post?.text}
              </Text>
              <Box
                borderRadius={6}
                overflow="hidden"
                border="1px solid"
                borderColor="gary.light"
                position="relative"
              >
                {post?.img && (
                  <Image src={post?.img} name={post?.postedBy?.name} w="full" />
                )}
              </Box>
              <Flex gap={3} my={1} cursor="pointer">
                <Actions liked={liked} handleLikeAndUnlike={handleLike} />
              </Flex>
              <Flex alignItems="center" gap="2">
                <Text color="gray.light" fontSize="sm">
                  {post?.replies?.length} replies
                </Text>
                <Box
                  width={0.5}
                  height={0.5}
                  bg={'gray.light'}
                  borderRadius={'full'}
                />
                <Text color="gray.light" fontSize="sm">
                  {post?.likes?.length} likes
                </Text>
              </Flex>
              <Divider my="4" />
              <Flex justifyContent="space-between">
                <Flex gap={2}>
                  <Text fontSize={'2xl'}>👏</Text>
                  <Text color="gray.light">
                    Get the app to like, reply and post.
                  </Text>
                </Flex>
                <Button>Get</Button>
              </Flex>
              <Divider my="4" />
              <Replies replies={post?.replies} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default UserPost;
