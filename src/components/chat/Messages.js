import { Avatar, Box, Flex, Image, Skeleton, Text } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { BiCheckDouble } from 'react-icons/bi';

import { selectedConversactionAtom } from '../../atoms/conversationAtom';
import { useState } from 'react';

const Messages = ({ ownMessage, message }) => {
  const selectedConversation = useRecoilValue(selectedConversactionAtom);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {ownMessage ? (
        <Flex gap="2" alignSelf="self-end">
          {message.text && (
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
          )}
          {message.img && !isLoading && (
            <Flex w="200px" mt="5">
              <Image
                src={message.img}
                hidden
                onLoad={() => {
                  setIsLoading(true);
                }}
              />
              <Skeleton w="200px" h="200px" />
            </Flex>
          )}
          {message.img && isLoading && (
            <Flex w="200px" mt="5">
              <Image src={message.img} alt="Image message" borderRadius={4} />
              <Box
                alignSelf="flex-end"
                ml="1"
                color={message.seen && 'blue.400'}
                fontWeight="bold"
              >
                <BiCheckDouble size={16} />
              </Box>
            </Flex>
          )}
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
          {message.text && (
            <Text
              maxW="350px"
              color="black"
              bg={'gray.400'}
              p="1"
              borderRadius="md"
            >
              {message?.text}
            </Text>
          )}
          {message.img && !isLoading && (
            <Flex w="200px" mt="5">
              <Image
                src={message.img}
                hidden
                onLoad={() => {
                  setIsLoading(true);
                }}
              />
              <Skeleton w="200px" h="200px" />
            </Flex>
          )}
          {message.img && isLoading && (
            <Flex w="200px" mt="5">
              <Image src={message.img} alt="Image message" borderRadius={4} />
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
};

export default Messages;
