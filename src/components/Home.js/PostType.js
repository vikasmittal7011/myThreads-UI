import { Flex, Text } from '@chakra-ui/react';

const PostType = ({ selectedPost, handleSelectedPost }) => {
  return (
    <Flex width={'full'}>
      <Flex
        flex={1}
        borderBottom={
          selectedPost === 'all' ? '1.5px solid white' : '1px solid gray'
        }
        justifyContent={'center'}
        pb={3}
        color={selectedPost === 'follow' && 'gray.light'}
        cursor={'pointer'}
        onClick={handleSelectedPost}
      >
        <Text fontWeight="bold">Threads</Text>
      </Flex>
      <Flex
        flex={1}
        borderBottom={
          selectedPost === 'follow' ? '1.5px solid white' : '1px solid gray'
        }
        justifyContent={'center'}
        color={selectedPost === 'all' && 'gray.light'}
        pb={3}
        cursor={'pointer'}
        onClick={handleSelectedPost}
      >
        <Text fontWeight="bold">Following</Text>
      </Flex>
    </Flex>
  );
};

export default PostType;
