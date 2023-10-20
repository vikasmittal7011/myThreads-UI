import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { BiCheckDouble } from 'react-icons/bi';

import { selectedConversactionAtom } from '../../atoms/conversationAtom';

const Messages = ({ ownMessage, message }) => {
  const selectedConversation = useRecoilValue(selectedConversactionAtom);
  return (
    <>
      {ownMessage ? (
        <Flex gap="2" alignSelf="self-end">
          <Flex maxW="350px" bg={'green.800'} p="1" borderRadius="md">
            <Text color="white">{message?.text}</Text>
            <Box
              alignSelf="flex-end"
              ml="1"
              color={message.seen && 'blue.400'}
              fontWeight="bold"
            >
              <BiCheckDouble size={16} />
            </Box>
          </Flex>
          <Avatar src="" w="7" h="7" />
        </Flex>
      ) : (
        <Flex gap="2" alignSelf="self-start">
          <Avatar
            src={selectedConversation.image}
            w="7"
            h="7"
            name={selectedConversation.username}
          />
          <Text
            maxW="350px"
            color="black"
            bg={'gray.400'}
            p="1"
            borderRadius="md"
          >
            {message?.text}
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Messages;
