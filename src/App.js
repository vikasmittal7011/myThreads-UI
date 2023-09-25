import { Container } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { UserPost, UserProfile } from './pages';

function App() {
  return (
    <Container textAlign="center" fontSize="xl">
      <Routes>
        <Route exact path="/:id" element={<UserProfile />} />
        <Route exact path="/:id/post/:postId" element={<UserPost />} />
      </Routes>
    </Container>
  );
}

export default App;
