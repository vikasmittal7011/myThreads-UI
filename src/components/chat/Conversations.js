import { Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import InputBox from '../form/InputBox';
import { SearchIcon } from '@chakra-ui/icons';
import ConversationsSkeleton from './ConversationsSkeleton';
import ConversationsData from './ConversationsData';

const Conversations = () => {
  return (
    <Flex
      flex={30}
      gap="2"
      flexDirection="column"
      maxW={{
        md: '250px',
        lg: 'full',
      }}
      mx="auto"
    >
      <Text fontWeight="700" color={useColorModeValue('gray.600', 'gray.400')}>
        Your Conversations
      </Text>
      <Flex gap="2" alignItems="center">
        <InputBox isRequired={false} placeholder="Search user" />
        <Button size="sm">
          <SearchIcon />
        </Button>
      </Flex>
      {false && <ConversationsSkeleton />}
      {<ConversationsData />}
    </Flex>
  );
};

export default Conversations;
