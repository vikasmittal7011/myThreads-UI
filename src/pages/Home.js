import { useEffect, useState } from 'react';

import Posts from '../components/common/Posts';
import NavBar from '../components/common/NavBar';
import PostType from '../components/Home.js/PostType';
import useFetchApiCall from '../hooks/useFetchApiCall';

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

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <PostType
        selectedPost={selectedPost}
        handleSelectedPost={handleSelectedPost}
      />
      <Posts
        updatePost={updatePost}
        posts={selectedPost === 'all' ? allPosts : followPosts}
        loading={loading}
        showMessage="home"
      />
    </>
  );
};

export default Home;
