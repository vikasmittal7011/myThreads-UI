import { useEffect, useState } from 'react';

import Posts from '../components/common/Posts';
import NavBar from '../components/common/NavBar';
import PostType from '../components/home/PostType';
import useFetchApiCall from '../hooks/useFetchApiCall';
import { Box, Flex } from '@chakra-ui/react';
import SuggestedUser from '../components/home/SuggestedUser';

const Home = () => {
  const { apiCall } = useFetchApiCall();

  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState('all');
  const [allPosts, setAllPosts] = useState([]);
  const [followPosts, setFollowPosts] = useState([]);

  const handleSelectedPost = () => {
    setSelectedPost(selectedPost === 'all' ? 'follow' : 'all');
  };

  const fetchPosts = async () => {
    setLoading(true);
    const follow = await apiCall('post/feed');
    if (follow.success) {
      setFollowPosts(follow.posts);
    }
    const all = await apiCall('post/posts');
    if (all.success) {
      setAllPosts(all.posts);
    }
    setLoading(false);
  };

  const updatePost = post => {
    let index, selectingPost;
    if (selectedPost === 'all') {
      index = allPosts.findIndex(p => post.id === p.id);
      selectingPost = [...allPosts];
      selectingPost[index] = post;
      setAllPosts(selectingPost);
      return;
    } else {
      index = followPosts.findIndex(p => post.id === p.id);
      selectingPost = [...followPosts];
      selectingPost[index] = post;
      setFollowPosts(selectingPost);
      return;
    }
  };

  const deletePost = id => {
    if (selectedPost === 'all') {
      const afterDeletePost = allPosts.filter(p => p.id !== id);
      setAllPosts(afterDeletePost);
      return;
    } else {
      const afterDeletePost = followPosts.filter(p => p.id !== id);
      setFollowPosts(afterDeletePost);
      return;
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <Flex gap={10} alignItems="flex-start">
        <Box flex={70}>
          <PostType
            selectedPost={selectedPost}
            handleSelectedPost={handleSelectedPost}
          />
          <Posts
            updatePost={updatePost}
            posts={selectedPost === 'all' ? allPosts : followPosts}
            loading={loading}
            showMessage="home"
            deletePost={deletePost}
          />
        </Box>
        <Box flex={30} display={{ base: 'none', md: 'block' }}>
          <SuggestedUser />
        </Box>
      </Flex>
    </>
  );
};

export default Home;
