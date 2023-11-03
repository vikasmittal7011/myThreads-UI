import { Box, Flex, Text } from '@chakra-ui/react';
import NavBar from '../components/common/NavBar';
import InputBox from '../components/form/InputBox';
import { useEffect, useState } from 'react';
import useFetchApiCall from '../hooks/useFetchApiCall';
import UserSkeleton from '../components/home/UserSkeleton';
import UserInfo from '../components/home/UserInfo';
import SuggestedUser from '../components/home/SuggestedUser';
import Loader from '../components/common/Loader';

const Search = () => {
  const { loading, apiCall } = useFetchApiCall();

  const [searchValue, setSearchValue] = useState('');
  const [users, setUsers] = useState([]);
  const [serachLoading, setSerachLoading] = useState(false);

  const handleInput = (id, value) => {
    setSearchValue(value);
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

  const searchUser = async () => {
    if (searchValue) {
      setSerachLoading(true);
      const response = await apiCall(`user/searchuser/${searchValue}`);
      setUsers(response.users);
      setSerachLoading(false);
    }
  };

  useEffect(() => {
    searchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <>
      <NavBar />
      <Box>
        <InputBox
          isRequired={false}
          placeholder="Search user"
          onChange={handleInput}
          value={searchValue}
        />
      </Box>
      {!serachLoading ? (
        <>
          {users?.length > 0 ? (
            <Box>
              <Text my={4} fontWeight="bold">
                Search Result for '{searchValue}'
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
            </Box>
          ) : (
            <Box mt={4}>
              <SuggestedUser />
            </Box>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Search;
