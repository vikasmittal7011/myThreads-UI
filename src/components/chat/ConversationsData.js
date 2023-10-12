import {
  Avatar,
  AvatarBadge,
  Flex,
  Image,
  Stack,
  Text,
  WrapItem,
  useColorModeValue,
} from '@chakra-ui/react';

import verified from '../../assets/verified.png';

const ConversationsData = () => {
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
    >
      <WrapItem>
        <Avatar
          size={{ base: 'xs', sm: 'sm', md: 'md' }}
          src="https://bit.ly/dan-abramov"
          name={`username`}
        >
          <AvatarBadge bg="green.500" boxSize="1em" />
        </Avatar>
      </WrapItem>
      <Stack direction="column" fontSize="sm">
        <Text fontWeight="700" display="flex" alignItems="center">
          userName <Image src={verified} w="4" h="4" ml="1" />
        </Text>
        <Text fontSize="xs" display="flex" alignContent="center" gap="1">
          Last message show here
        </Text>
      </Stack>
    </Flex>
  );
};

export default ConversationsData;
