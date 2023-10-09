import { Avatar, Divider, Flex, Text } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import Actions from './Actions';

const Replies = ({ replies }) => {
  return (
    <>
      {replies?.map((r, i) => (
        <>
          <Flex gap={4} my="3" py="2" width="full">
            <Avatar src={r?.userId?.image} name={r?.userId?.name} size="sm" />
            <Flex flexDirection="column" gap="1" width="full">
              <Flex
                justifyContent="space-between"
                alignItems="center"
                width="full"
              >
                <Text fontSize="sm" fontWeight="bold">
                  {r?.userId?.name}
                </Text>
                <Flex alignItems="center" gap={4}>
                  <Text fontSize="sm" color="gray.light">
                    Time
                  </Text>
                  <BsThreeDots cursor="pointer" />
                </Flex>
              </Flex>
              <Text textAlign="start" fontSize="md">
                {r?.text}
              </Text>
              <Actions />
              <Text color="gray.light" fontSize="sm" textAlign="start">
                Likes
              </Text>
            </Flex>
          </Flex>
          <Divider mb="3" />
        </>
      ))}
    </>
  );
};

export default Replies;
