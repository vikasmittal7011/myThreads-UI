import { Flex, Text } from '@chakra-ui/react';

import useFetchApiCall from '../../hooks/useFetchApiCall';
import UserSkeleton from './UserSkeleton';
import UserInfo from './UserInfo';
import { useEffect, useState } from 'react';

const SuggestedUser = () => {
  const { loading, apiCall } = useFetchApiCall();
  const [users, setUsers] = useState([]);

  const loadSuggestedUser = async () => {
    const response = await apiCall('user/suggested/user');
    setUsers(response.users);
  };

  const updateUserFollowing = (id, currentUser) => {
    const updatedUsers = users.map(user => {
      if (user._id === id) {
        if (user.followers.includes(currentUser)) {
          user.followers.splice(user.followers.indexOf(currentUser), 1);
        } else {
          user.followers.push(currentUser);
        }
        return user;
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  useEffect(() => {
    loadSuggestedUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Text mb={4} fontWeight="bold">
        Suggested User
      </Text>
      <Flex flexDirection="column">
        {loading && <UserSkeleton />}
        {!loading &&
          users.map((user, i) => (
            <UserInfo
              user={user}
              key={i}
              updateUserFollowing={updateUserFollowing}
            />
          ))}
      </Flex>
    </>
  );
};

export default SuggestedUser;
