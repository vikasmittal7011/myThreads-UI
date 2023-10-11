import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';

import Header from '../components/user/Header';
import Posts from '../components/common/Posts';
import Loader from '../components/common/Loader';
import NavBar from '../components/common/NavBar';
import usefetchApiCall from '../hooks/useFetchApiCall';

const UserProfile = () => {
  const { apiCall } = usefetchApiCall();
  const username = useParams().username;

  const [user, setUser] = useState('nothing');
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  const fetchUserProfile = async () => {
    const response = await apiCall(`user/profile/${username}`);
    if (response.success || response) {
      setUser(response.user);
    } else {
      setUser('Not found');
    }
  };

  const fetchUserPost = async () => {
    setPostLoading(true);
    const response = await apiCall(`post/user-post/${user.id}`);
    if (response.success || response) {
      setPosts(response.posts);
    }
    setPostLoading(false);
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
    setLoading(true);
    const response = await apiCall(`user/followUser/${user.id}`, 'PATCH');

    if (response.success || response) {
      fetchUserProfile();
    }
    setLoading(false);
  };

  const updatePost = post => {
    let index, selectingPost;
    index = posts.findIndex(p => post.id === p.id);
    selectingPost = [...posts];
    selectingPost[index] = post;
    setPosts(selectingPost);
  };

  return (
    <>
      <NavBar />
      {user === 'nothing' ? (
        <Loader />
      ) : (
        <>
          {user.name ? (
            <>
              <Header
                user={user}
                loading={loading}
                handleFollowAndUnfollow={handleFollowAndUnfollow}
              />
              <Posts
                posts={posts}
                loading={postLoading}
                updatePost={updatePost}
              />
            </>
          ) : (
            <Text>User Not Found</Text>
          )}
        </>
      )}
    </>
  );
};

export default UserProfile;
