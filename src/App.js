import { Container } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Authentication, Home, UserPost, UserProfile } from './pages';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/userAtom';

function App() {
  const token = useRecoilValue(userAtom);
  console.log(token);
  return (
    <Container textAlign="center" fontSize="xl">
      <Routes>
        <Route
          exact
          path="/"
          element={token ? <Home /> : <Navigate to="/auth" />}
        />
        <Route exact path="/auth" element={<Authentication />} />
        <Route exact path="/:username" element={<UserProfile />} />
        <Route exact path="/:username/post/:postId" element={<UserPost />} />
      </Routes>
    </Container>
  );
}

export default App;
