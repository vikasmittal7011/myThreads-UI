import { Box, Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react';

const UserSkeleton = () => {
  return [0, 1, 2, 3, 4].map((_, i) => (
    <Flex key={i} gap={2} alignItems="center" p={1} my={2} borderRadius="md">
      <Box>
        <SkeletonCircle size="10" />
      </Box>
      <Flex w="full" flexDirection="column" gap="2">
        <Skeleton h="4" w="80px" />
        <Skeleton h="4" w="90px" />
      </Flex>
      <Flex>
        <Skeleton h="8" w="60px" />
      </Flex>
    </Flex>
  ));
};

export default UserSkeleton;
