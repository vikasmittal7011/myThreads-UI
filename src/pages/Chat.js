import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import NavBar from '../components/common/NavBar';
import Conversations from '../components/chat/Conversations';
import ChatMessages from '../components/chat/ChatMessages';
import conversationsAtom from '../atoms/conversationAtom';
import useFetchApiCall from '../hooks/useFetchApiCall';
import useSocketContext from '../hooks/useSocketContext';

const Chat = () => {
  const { socket } = useSocketContext();
  const { apiCall } = useFetchApiCall();

  const setConversations = useSetRecoilState(conversationsAtom);

  const getConversations = async () => {
    setConversations({ loading: true });
    const response = await apiCall('message/conversation');
    if (response.success) {
      setConversations({
        loading: false,
        conversations: response.conversations,
      });
    }
  };

  useEffect(() => {
    socket?.on('messageSeen', ({ conversationId }) => {
      setConversations(preConv => {
        const update = preConv.conversations.map(a => {
          if (a.id === conversationId) {
            return {
              ...a,
              lastMessage: { ...a.lastMessage, seen: true },
            };
          }
          return a;
        });
        return { conversations: update, loading: false };
      });
    });
  }, [socket, setConversations]);

  useEffect(() => {
    getConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <Box
        position="absolute"
        left="50%"
        transform={'translate(-50%)'}
        width={{
          base: '100%',
          md: '80%',
          lg: '750px',
        }}
        px={4}
      >
        <Flex
          gap="4"
          flexDirection={{ base: 'column', md: 'row' }}
          maxW={{ sm: '400px', md: 'full' }}
          mx="auto"
        >
          <Conversations />
          <ChatMessages />
        </Flex>
      </Box>
    </>
  );
};

export default Chat;
