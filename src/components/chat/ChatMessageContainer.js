import {
  Avatar,
  Divider,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import verified from '../../assets/verified.png';
import ChatMessageSkeleton from './ChatMessageSkeleton';
import Messages from './Messages';
import ChatMessageInput from './ChatMessageInput';

const ChatMessageContainer = () => {
  return (
    <Flex
      flex={70}
      bg={useColorModeValue('gray.200', 'gray.dark')}
      borderRadius="md"
      flexDirection="column"
    >
      <Flex pl="4" width="full" h="12" alignItems="center" gap="2">
        <Avatar size="sm" src="https://bit.ly/dan-abramov" name={`username`} />
        <Text fontWeight="700" display="flex" alignItems="center">
          userName <Image src={verified} w="4" h="4" ml="1" />
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
        {false && <ChatMessageSkeleton />}
        <Messages ownMessage={true} />
        <Messages ownMessage={true} />
        <Messages ownMessage={false} />
        <Messages ownMessage={true} />
        <Messages ownMessage={false} />
        <Messages ownMessage={true} />
        <Messages ownMessage={false} />
      </Flex>
      <ChatMessageInput />
    </Flex>
  );
};

export default ChatMessageContainer;
