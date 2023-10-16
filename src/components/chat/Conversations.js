import { Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import InputBox from '../form/InputBox';
import ConversationsData from './ConversationsData';
import ConversationsSkeleton from './ConversationsSkeleton';
import conversationsAtom, {
  selectedConversactionAtom,
} from '../../atoms/conversationAtom';
import { useState } from 'react';
import useFetchApiCall from '../../hooks/useFetchApiCall';
import userAtom from '../../atoms/userAtom';
import useToastBox from '../../hooks/useToastBox';

const Conversations = () => {
  const user = useRecoilValue(userAtom);

  const { apiCall } = useFetchApiCall();
  const { showToast } = useToastBox();

  const [conversations, setConversations] = useRecoilState(conversationsAtom);
  const selectedConversation = useSetRecoilState(selectedConversactionAtom);

  const [username, setUsername] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const serachUser = async () => {
    setIsSearching(true);
    const response = await apiCall('user/profile/' + username);
    if (response.success) {
      if (response.user.id === user.id) {
        showToast('Error', 'You cannot message yourself', 'error');
        setIsSearching(false);
        return;
      }
      if (
        conversations.conversations.find(
          conv => conv.participants[0].id === response.user.id
        )
      ) {
        selectedConversation({
          id: conversations.conversations.find(
            conv => conv.participants[0].id === response.user.id && conv.id
          ),
          userId: response.user.id,
          username: response.user.username,
          image: response.user.image,
        });
        setIsSearching(false);
        return;
      }

      const dummyConv = {
        dummy: true,
        lastMessage: {
          text: '',
          sender: '',
        },
        id: Date.now(),
        participants: [
          {
            id: response.user.id,
            image: response.user.image,
            username: response.user.username,
          },
        ],
      };
      let newConv = { ...conversations };
      newConv.conversations = [...newConv.conversations, dummyConv];

      setConversations(newConv);

      // setConversations(oldCon => [...oldCon , [oldCon.conversations]: [...oldCon.conversations, dummyConv]])
    }
    setUsername('');
    setIsSearching(false);
  };

  const handleChange = (name, value) => {
    setUsername(value);
  };

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
        <InputBox
          isRequired={false}
          placeholder="Search user"
          onChange={handleChange}
          value={username}
        />
        <Button size="sm" onClick={serachUser} isLoading={isSearching}>
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
