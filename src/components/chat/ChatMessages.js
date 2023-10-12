import { Flex, Text } from '@chakra-ui/react';
import { GiConversation } from 'react-icons/gi';
import ChatMessageContainer from './ChatMessageContainer';

const ChatMessages = () => {
  return (
    <>
      {/* <NotSelectedChatMessage /> */}

      <ChatMessageContainer />
    </>
  );
};

const NotSelectedChatMessage = () => (
  <Flex
    flex="70"
    borderRadius="md"
    p="2"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    height="400px"
  >
    <GiConversation size={100} />
    <Text fontSize="20">Select a GiConversation to start chanting</Text>
  </Flex>
);

export default ChatMessages;
