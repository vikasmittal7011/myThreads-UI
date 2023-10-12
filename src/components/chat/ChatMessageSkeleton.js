import { Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react';

const ChatMessageSkeleton = () => {
  return (
    <>
      {[0, 1, 2, 3, 4].map((_, i) => (
        <Flex
          key={i}
          gap="2"
          alignItems="center"
          borderRadius="md"
          p="1"
          alignSelf={i % 2 === 0 ? 'flex-start' : 'flex-end'}
        >
          {i % 2 === 0 && <SkeletonCircle size="7" />}
          <Flex flexDirection="column" gap="2">
            <Skeleton h="8px" w="250px" />
            <Skeleton h="8px" w="250px" />
            <Skeleton h="8px" w="250px" />
          </Flex>
          {i % 2 !== 0 && <SkeletonCircle size="7" />}
        </Flex>
      ))}
    </>
  );
};

export default ChatMessageSkeleton;
