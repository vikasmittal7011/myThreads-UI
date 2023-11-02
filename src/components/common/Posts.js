import {
  Avatar,
  Box,
  Flex,
  Image,
  Text,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

import Loader from './Loader';
import ShowTime from './ShowTime';
import Actions from '../user/Actions';
import verified from '../../assets/verified.png';
import { DeleteIcon } from '@chakra-ui/icons';
import { useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';
import useFetchApiCall from '../../hooks/useFetchApiCall';
import { useState } from 'react';
import useToastBox from '../../hooks/useToastBox';

const Posts = ({
  posts,
  loading,
  showMessage = 'user',
  updatePost,
  deletePost,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { apiCall } = useFetchApiCall();
  const { showToast } = useToastBox();
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteingPost = async id => {
    if (isDeleting) return;
    onClose();
    setIsDeleting(true);
    const response = await apiCall(`post/${id}`, 'DELETE');
    if (response.success) {
      showToast('Success', 'Post delete successfully');
      deletePost(id);
    }
    setIsDeleting(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {posts?.length > 0 ? (
        <>
          {posts?.map((p, i) => (
            <Link to={`/${p?.postedBy?.username}/post/${p?.id}`} key={i}>
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
                      {p?.postedBy?.verified && (
                        <Image src={verified} h={4} w={4} ml={1} />
                      )}
                    </Flex>
                    <Flex alignItems="center" gap={4}>
                      <ShowTime time={p.createdAt} />
                      {p?.postedBy?.id === user?.id &&
                        showMessage === 'user' && (
                          <DeleteIcon
                            size={12}
                            onClick={e => {
                              e.preventDefault();
                              onOpen();
                            }}
                          />
                        )}
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
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Are Want To Delete This Post</ModalHeader>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      No
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        deleteingPost(p.id);
                      }}
                    >
                      Yes
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Link>
          ))}
        </>
      ) : (
        <Text my={5} as="h1">
          {showMessage === 'user' ? (
            <>User Not Have Post</>
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
