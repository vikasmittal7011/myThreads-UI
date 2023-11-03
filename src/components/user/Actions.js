import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

import InputBox from '../form/InputBox';
import userAtom from '../../atoms/userAtom';
import useToastBox from '../../hooks/useToastBox';
import useFetchApiCall from '../../hooks/useFetchApiCall';

const Actions = ({ post, updatePost }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const user = useRecoilValue(userAtom);
  const { showToast } = useToastBox();
  const { apiCall, loading } = useFetchApiCall();
  const [isLikeing, setIsLikeing] = useState(false);
  const [text, setText] = useState('');

  const handleRePost = async () => {
    const response = await apiCall('post/repost', 'POST', post);
    if (response.success) {
      showToast('Repost successfully');
      updatePost(response.post);
    }
  };

  const handleText = (name, value) => {
    setText(value);
  };

  const handleLikeAndUnlike = async () => {
    if (isLikeing) return;
    setIsLikeing(true);
    const response = await apiCall(`post/toggleLike/${post.id}`, 'PATCH');
    if (response.success) {
      updatePost(response.post);
      showToast('Success', response.message);
    }
    setIsLikeing(false);
  };

  const handleReply = async () => {
    if (text) {
      const response = await apiCall(`post/replie/${post.id}`, 'PATCH', {
        text,
      });
      if (response.success) {
        updatePost(response.post);
        onClose();
      }
      setText('');
    } else {
      showToast('Warning', 'Enter some text to reply', 'warning');
    }
  };

  return (
    <Flex flexDirection="column">
      <Flex gap={3} my={2} onClick={e => e.preventDefault()} cursor="pointer">
        <LikeSVG
          user={user}
          post={post}
          handleLikeAndUnlike={handleLikeAndUnlike}
        />

        <CommentSVG
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          handleText={handleText}
          handleReply={handleReply}
          loading={loading}
        />

        <RepostSVG handleRePost={handleRePost} />

        <ShareSVG showToast={showToast} post={post} />
      </Flex>

      <Flex alignItems="center" gap="2">
        <Text color="gray.light" fontSize="sm">
          {post?.replies?.length} replies
        </Text>
        <Box width={0.5} height={0.5} bg={'gray.light'} borderRadius={'full'} />
        <Text color="gray.light" fontSize="sm">
          {post?.likes?.length} likes
        </Text>
      </Flex>
    </Flex>
  );
};

export default Actions;

const LikeSVG = ({ user, post, handleLikeAndUnlike }) => (
  <svg
    aria-label="Like"
    color={post?.likes?.includes(user?.id) ? 'rgb(237, 73, 86)' : ''}
    fill={post?.likes?.includes(user?.id) ? 'rgb(237, 73, 86)' : 'transparent'}
    height="19"
    role="img"
    viewBox="0 0 24 22"
    width="20"
    onClick={handleLikeAndUnlike}
  >
    <path
      d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z"
      stroke="currentColor"
      strokeWidth="2"
    ></path>
  </svg>
);

const CommentSVG = ({
  isOpen,
  onClose,
  onOpen,
  handleText,
  handleReply,
  loading,
}) => (
  <>
    <svg
      aria-label="Comment"
      color=""
      fill=""
      height="20"
      role="img"
      viewBox="0 0 24 24"
      width="20"
      onClick={onOpen}
    >
      <title>Comment</title>
      <path
        d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <InputBox label="Reply Text" onChange={handleText} />
        </ModalBody>

        <ModalFooter>
          <Button
            size="sm"
            colorScheme="blue"
            mr={3}
            isLoading={loading}
            onClick={handleReply}
          >
            Reply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
);

const RepostSVG = ({ handleRePost }) => (
  <svg
    aria-label="Repost"
    color="currentColor"
    fill="currentColor"
    height="20"
    role="img"
    viewBox="0 0 24 24"
    width="20"
    onClick={handleRePost}
  >
    <title>Repost</title>
    <path
      fill=""
      d="M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1Zm-6.41-3.496-1.795 1.795a1 1 0 1 0 1.414 1.414l3.5-3.5a1.003 1.003 0 0 0 0-1.417l-3.5-3.5a1 1 0 0 0-1.414 1.414l1.794 1.794H8.27A5.277 5.277 0 0 0 3 9.271V13.5a1 1 0 0 0 2 0V9.271a3.275 3.275 0 0 1 3.271-3.27Z"
    ></path>
  </svg>
);

const ShareSVG = ({ showToast, post }) => (
  <svg
    aria-label="Share"
    color=""
    fill="rgb(243, 245, 247)"
    height="20"
    role="img"
    viewBox="0 0 24 24"
    width="20"
    onClick={() => {
      const currentLocation =
        window.location.origin + `/${post.postedBy.username}/post/${post.id}`;
      navigator.clipboard.writeText(currentLocation).then(() => {
        showToast('URL is copyed', currentLocation);
      });
    }}
  >
    <title>Share</title>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="22"
      x2="9.218"
      y1="3"
      y2="10.083"
    ></line>
    <polygon
      fill="none"
      points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
    ></polygon>
  </svg>
);
