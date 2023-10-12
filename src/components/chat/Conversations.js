import { Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useRecoilValue } from 'recoil';

import InputBox from '../form/InputBox';
import ConversationsData from './ConversationsData';
import ConversationsSkeleton from './ConversationsSkeleton';
import conversationsAtom from '../../atoms/conversationAtom';

const Conversations = () => {
  const conversations = useRecoilValue(conversationsAtom);
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
      {conversations.loading && <ConversationsSkeleton />}
      {!conversations.loading &&
        conversations.conversations.map((c, i) => (
          <ConversationsData key={i} conversation={c} />
        ))}
    </Flex>
  );
};

export default Conversations;
