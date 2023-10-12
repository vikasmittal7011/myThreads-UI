import { Box, Flex } from '@chakra-ui/react';
import NavBar from '../components/common/NavBar';
import Conversations from '../components/chat/Conversations';
import ChatMessages from '../components/chat/ChatMessages';

const Chat = () => {
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
        p={4}
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
