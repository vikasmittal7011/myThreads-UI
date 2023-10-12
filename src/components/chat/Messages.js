import { Avatar, Flex, Text } from '@chakra-ui/react';

const Messages = ({ ownMessage }) => {
  console.log(ownMessage);
  return (
    <>
      {ownMessage ? (
        <Flex gap="2" alignSelf="self-end">
          <Text maxW="350px" bg={'blue.400'} p="1" borderRadius="md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text>
          <Avatar src="" w="7" h="7" />
        </Flex>
      ) : (
        <Flex gap="2" alignSelf="self-start">
          <Avatar src="" w="7" h="7" />
          <Text
            maxW="350px"
            color="black"
            bg={'gray.400'}
            p="1"
            borderRadius="md"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Messages;
