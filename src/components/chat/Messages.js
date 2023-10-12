import { Avatar, Flex, Text } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';

import { selectedConversactionAtom } from '../../atoms/conversationAtom';

const Messages = ({ ownMessage, message }) => {
  const selectedConversation = useRecoilValue(selectedConversactionAtom);
  console.log(message);
  return (
    <>
      {ownMessage ? (
        <Flex gap="2" alignSelf="self-end">
          <Text maxW="350px" bg={'blue.400'} p="1" borderRadius="md">
            {message?.text}
          </Text>
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
