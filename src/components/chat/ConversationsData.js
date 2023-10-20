import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Image,
  Stack,
  Text,
  WrapItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { BiCheckDouble } from 'react-icons/bi';
import { useRecoilState, useRecoilValue } from 'recoil';

import verified from '../../assets/verified.png';

import userAtom from '../../atoms/userAtom';
import { selectedConversactionAtom } from '../../atoms/conversationAtom';
import useSocketContext from '../../hooks/useSocketContext';

const ConversationsData = ({ conversation }) => {
  const { onlineUsers } = useSocketContext();

  const { lastMessage } = conversation;
  const participants = conversation.participants[0];
  const color = useColorModeValue('gray.600', 'gray.dark');
  const user = useRecoilValue(userAtom);
  const [selectedConversation, setSelectedConversationState] = useRecoilState(
    selectedConversactionAtom
  );

  const handleclick = () => {
    setSelectedConversationState({
      id: conversation.id,
      userId: participants?.id,
      username: participants?.username,
      image: participants?.image,
      dummy: conversation?.dummy,
    });
  };

  return (
    <Flex
      gap="4"
      alignItems="center"
      p="1"
      borderRadius="md"
      _hover={{
        cursor: 'pointer',
        color: 'white',
        bg: useColorModeValue('gray.600', 'gray.dark'),
      }}
      onClick={handleclick}
      bg={selectedConversation.id === conversation.id && color}
    >
      <WrapItem>
        <Avatar
          size={{ base: 'xs', sm: 'sm', md: 'md' }}
          src={participants?.image}
          name={participants?.name}
        >
          {onlineUsers?.includes(participants?.id) && (
            <AvatarBadge bg="green.500" boxSize="1em" />
          )}
        </Avatar>
      </WrapItem>
      <Stack direction="column" fontSize="sm">
        <Text fontWeight="700" display="flex" alignItems="center">
          {participants?.username} <Image src={verified} w="4" h="4" ml="1" />
        </Text>
        <Text fontSize="xs" display="flex" alignContent="center" gap="1">
          {lastMessage?.sender === user?.id && (
            <Box
              alignSelf="flex-end"
              ml="1"
              color={lastMessage.seen && 'blue.400'}
              fontWeight="bold"
            >
              <BiCheckDouble size={20} />
            </Box>
          )}
          {lastMessage?.text.length > 18
            ? lastMessage?.text.subString(0, 18) + '...'
            : lastMessage?.text}
        </Text>
      </Stack>
    </Flex>
  );
};

export default ConversationsData;
