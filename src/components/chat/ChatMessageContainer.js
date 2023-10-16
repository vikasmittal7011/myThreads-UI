import {
  Avatar,
  Divider,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect } from 'react';
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

const ChatMessageContainer = () => {
  const user = useRecoilValue(userAtom);
  const selectedConversation = useRecoilValue(selectedConversactionAtom);
  const setConversations = useSetRecoilState(conversationsAtom);
  const [messages, setMessages] = useRecoilState(messagesAtom);
  const { apiCall } = useFetchApiCall();

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
    setConversations(preConv => {
      const update = preConv.conversations.map(a => {
        if (a.id === selectedConversation.id) {
          return {
            ...a,
            lastMessage: { text: message, sender: response.message.sender },
          };
        }
        return a;
      });
      return { conversations: update, loading: false };
    });
  };

  useEffect(() => {
    loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversation]);

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
            <Messages key={i} message={m} ownMessage={m?.sender === user?.id} />
          ))}
      </Flex>
      <ChatMessageInput handleSendMessage={handleSendMessage} />
    </Flex>
  );
};

export default ChatMessageContainer;
