import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';

import usefetchApiCall from '../hooks/useFetchApiCall';
import NavBar from '../components/common/NavBar';
import Header from '../components/user/Header';
import Posts from '../components/user/Posts';
import Loader from '../components/common/Loader';

const UserProfile = () => {
  const { apiCall, loading } = usefetchApiCall();
  const username = useParams().username;

  const [user, setUser] = useState('nothing');
  const [error, setError] = useState('');
  const [posts, setPosts] = useState();

  const fetchUserProfile = async () => {
    const response = await apiCall(`user/profile/${username}`);
    if (response.success || response) {
      setUser(response.user);
    } else {
      setUser('Not found');
      setError(response.message);
    }
  };

  const fetchUserPost = async () => {
    const response = await apiCall(`post/user-post/${user.id}`);
    if (response.success || response) {
      setPosts(response.posts);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    if (user.name) {
      fetchUserPost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleFollowAndUnfollow = async () => {
    const response = await apiCall(`user/followUser/${user.id}`, 'PATCH');

    if (response.success || response) {
      fetchUserProfile();
    }
  };

  return (
    <>
      <NavBar />
      {user === 'nothing' ? (
        <Loader />
      ) : (
        <>
          {!error ? (
            <>
              {user && (
                <Header
                  user={user}
                  loading={loading}
                  handleFollowAndUnfollow={handleFollowAndUnfollow}
                />
              )}
              <Posts posts={posts} loading={loading} />
            </>
          ) : (
            <Text>{error}</Text>
          )}
        </>
      )}
    </>
  );
};

export default UserProfile;
