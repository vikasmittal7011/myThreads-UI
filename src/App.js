import { Container } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { Home, UserPost, UserProfile } from './pages';

function App() {
  return (
    <Container textAlign="center" fontSize="xl">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/:username" element={<UserProfile />} />
        <Route exact path="/:username/post/:postId" element={<UserPost />} />
      </Routes>
    </Container>
  );
}

export default App;
