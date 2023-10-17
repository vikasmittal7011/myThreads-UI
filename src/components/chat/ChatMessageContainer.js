import {
  Avatar,
  Divider,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import verified from '../../assets/verified.png';

import Messages from './Messages';
import ChatMessageInput from './ChatMessageInput';
import ChatMessageSkeleton from './ChatMessageSkeleton';
import conversationsAtom, {
  messagesAtom,
  selectedConversactionAtom,
} from '../../atoms/conversationAtom';
import userAtom from '../../atoms/userAtom';
import useFetchApiCall from '../../hooks/useFetchApiCall';
import useSocketContext from '../../hooks/useSocketContext';

const ChatMessageContainer = () => {
  const { socket } = useSocketContext();
  const { apiCall } = useFetchApiCall();

  const user = useRecoilValue(userAtom);
  const selectedConversation = useRecoilValue(selectedConversactionAtom);
  const setConversations = useSetRecoilState(conversationsAtom);
  const [messages, setMessages] = useRecoilState(messagesAtom);

  const messageRef = useRef(null);

  const loadMessages = async () => {
    if (selectedConversation.dummy) {
      setMessages([]);
      return;
    }
    setMessages({ ...messages, loading: true });
    const response = await apiCall(`message/${selectedConversation.userId}`);
    if (response.success) {
      setMessages({ messages: response.messages, loading: false });
    }
  };

  const updateConversation = (message, id) => {
    setConversations(preConv => {
      const update = preConv.conversations.map(a => {
        if (a.id === id) {
          return {
            ...a,
            lastMessage: { text: message, sender: id },
          };
        }
        return a;
      });
      return { conversations: update, loading: false };
    });
  };

  const handleSendMessage = async message => {
    const response = await apiCall('message', 'POST', {
      recipientId: selectedConversation?.userId,
      message,
    });

    if (response.success) {
      let newMessage;
      if (messages?.messages?.length > 0) {
        newMessage = [...messages?.messages, response.message];
      } else {
        newMessage = [response.message];
      }
      setMessages({
        ...messages,
        messages: newMessage,
      });
    }

    updateConversation(message, response.message.conversationId);
  };

  useEffect(() => {
    loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversation]);

  useEffect(() => {
    socket.on('newMessage', message => {
      if (selectedConversation.id === message.conversationId) {
        let oldData = { ...messages };
        oldData.messages = [...oldData.messages, message];
        setMessages(oldData);
      }
      updateConversation(message.text, message.conversationId);
    });
    return () => socket.off('newMessage');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, messages, setMessages]);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Flex
      flex={70}
      bg={useColorModeValue('gray.200', 'gray.dark')}
      borderRadius="md"
      flexDirection="column"
    >
      <Flex pl="4" width="full" h="12" alignItems="center" gap="2">
        <Avatar
          size="sm"
          src={selectedConversation?.image}
          name={selectedConversation?.username}
        />
        <Text fontWeight="700" display="flex" alignItems="center">
          {selectedConversation?.username}{' '}
          <Image src={verified} w="4" h="4" ml="1" />
        </Text>
      </Flex>

      <Divider />

      <Flex
        flexDir="column"
        gap="4"
        my="4"
        px="2"
        overflowY="auto"
        height="400px"
      >
        {messages.loading && <ChatMessageSkeleton />}
        {!messages.loading &&
          messages?.messages?.map((m, i) => (
            <Flex
              key={i}
              direction="column"
              ref={
                messages?.messages?.length - 1 ===
                messages?.messages?.indexOf(m)
                  ? messageRef
                  : null
              }
            >
              <Messages message={m} ownMessage={m?.sender === user?.id} />
            </Flex>
          ))}
      </Flex>
      <ChatMessageInput handleSendMessage={handleSendMessage} />
    </Flex>
  );
};

export default ChatMessageContainer;
