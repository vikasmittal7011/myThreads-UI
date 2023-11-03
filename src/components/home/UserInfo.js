import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';
import useFetchApiCall from '../../hooks/useFetchApiCall';
import { useState } from 'react';

const UserInfo = ({ user, updateUserFollowing }) => {
  const { apiCall } = useFetchApiCall();
  const userInfo = useRecoilValue(userAtom);

  const [loading, setLoading] = useState(false);

  const handleFollowAndUnfollow = async () => {
    setLoading(true);
    const response = await apiCall(`user/followUser/${user?._id}`, 'PATCH');

    if (response.success || response) {
      updateUserFollowing(user?._id, (user = userInfo?.id));
    }

    setLoading(false);
  };

  return (
    <Flex gap={2} justifyContent="space-between" alignItems="center" mb="3">
      <Flex gap={2} as={Link} to={`/${user?.username}`}>
        <Avatar src={user?.image} />
        <Box>
          <Text fontSize="sm" fontWeight="bold">
            {user?.username}
          </Text>

          <Text fontSize="sm" color="gray.light">
            {user?.name}
          </Text>
        </Box>
      </Flex>
      <Button
        size="sm"
        onClick={handleFollowAndUnfollow}
        isLoading={loading}
        color={user?.followers?.includes(userInfo?.id) ? 'black' : 'white'}
        _hover={{
          color: user?.followers?.includes(userInfo?.id) ? 'black' : 'white',
          opacity: '.8',
        }}
        bg={user?.followers?.includes(userInfo?.id) ? 'white' : 'blue.400'}
      >
        {user?.followers?.includes(userInfo?.id) ? 'UnFollow' : 'Follow'}
      </Button>
    </Flex>
  );
};

export default UserInfo;
