import { Box, Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react';

const ConversationsSkeleton = () => {
  return (
    <>
      {[0, 1, 2, 3, 4].map((_, i) => (
        <Flex key={i} gap="4" alignItems="center" borderRadius="md" p="1">
          <Box>
            <SkeletonCircle size="10" />
          </Box>
          <Flex width="full" flexDirection="column" gap="3">
            <Skeleton h="10px" w="60%" />
            <Skeleton h="8px" w="100%" />
          </Flex>
        </Flex>
      ))}
    </>
  );
};

export default ConversationsSkeleton;
