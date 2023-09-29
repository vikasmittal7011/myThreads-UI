import { Avatar, Divider, Flex, Text } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import Actions from './Actions';

const Replies = () => {
  return (
    <>
      <Flex gap={4} my="3" py="2" width="full">
        <Avatar
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&usqp=CAU"
          name={'name'}
          size="sm"
        />
        <Flex flexDirection="column" gap="1" width="full">
          <Flex justifyContent="space-between" alignItems="center" width="full">
            <Text fontSize="sm" fontWeight="bold">
              {'name'}
            </Text>
            <Flex alignItems="center" gap={4}>
              <Text fontSize="sm" color="gray.light">
                Time
              </Text>
              <BsThreeDots cursor="pointer" />
            </Flex>
          </Flex>
          <Text textAlign="start" fontSize="md">
            Comment
          </Text>
          <Actions />
          <Text color="gray.light" fontSize="sm" textAlign="start">
            Likes
          </Text>
        </Flex>
      </Flex>
      <Divider mb="3" />
    </>
  );
};

export default Replies;
