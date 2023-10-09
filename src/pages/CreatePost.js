import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import TextAreaBox from '../components/form/TextAreaBox';
import { useState } from 'react';
import { useRef } from 'react';
import usePreviewImg from '../hooks/useImagePreview';
import { BsFillImageFill } from 'react-icons/bs';
import useFetchApiCall from '../hooks/useFetchApiCall';
import { useNavigate } from 'react-router-dom';
import useToastBox from '../hooks/useToastBox';

const MAX_LENGTH = 500;

const CreatePost = () => {
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const { showToast } = useToastBox();
  const { apiCall, loading } = useFetchApiCall();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const imageRef = useRef();

  const navigate = useNavigate();

  const [postText, setPostText] = useState('');

  const handlePostText = (name, value) => {
    if (value.length <= MAX_LENGTH) {
      setPostText(value);
    }
  };

  const countWord = word => {
    return MAX_LENGTH - word.length;
  };

  const handlePost = async () => {
    const response = await apiCall('post', 'POST', {
      text: postText,
      img: imgUrl,
    });
    if (response.success) {
      showToast('Success', 'Post created successfully');
      setImgUrl('');
      setPostText('');
      onClose();
      navigate(`/${response.username}/post/${response.post.id}`);
    }
  };

  return (
    <>
      <Button
        position="fixed"
        bottom="10"
        right="10"
        leftIcon={<AddIcon />}
        onClick={onOpen}
        bg={useColorModeValue('gray.600', 'gray.700')}
        color={'white'}
        _hover={{
          bg: useColorModeValue('gray.700', 'gray.800'),
        }}
      >
        Posts
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton
            bg={useColorModeValue('gray.600', 'gray.700')}
            color={'white'}
            _hover={{
              bg: useColorModeValue('gray.700', 'gray.800'),
            }}
          />
          <ModalBody>
            <TextAreaBox
              label="About Post"
              value={postText}
              onChange={handlePostText}
              placeholder="Write something about post..."
            />
            <Text
              fontSize={'sm'}
              color="gray.800"
              textAlign="right"
              fontWeight="bold"
              m="1"
            >
              Remaning words {countWord(postText)} / 500
            </Text>
            <BsFillImageFill
              style={{ cursor: 'pointer', marginLeft: '5px' }}
              size={16}
              onClick={() => {
                imageRef.current.click();
              }}
            />
            <Input
              type="file"
              name="image"
              hidden
              ref={imageRef}
              onChange={handleImageChange}
            />
            {imgUrl && (
              <Flex mt="5" width="full" position="relative">
                <Image src={imgUrl} name="Selected Pic" />
                <CloseButton
                  onClick={() => {
                    setImgUrl('');
                  }}
                  bg="gray.800"
                  position="absolute"
                  top="2"
                  right="2"
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handlePost}
              isLoading={loading}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
