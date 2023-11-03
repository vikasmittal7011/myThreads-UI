import { Suspense } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { Route, Routes, useLocation } from 'react-router-dom';
import {
  Authentication,
  Chat,
  Home,
  Search,
  Settings,
  UpdateProfile,
  UserPost,
  UserProfile,
} from './pages';
import Protected from './components/common/Protected';
import Loader from './components/common/Loader';

function App() {
  const { pathname } = useLocation();

  return (
    <Box position="relative" width="full">
      <Container
        maxW={pathname === '/' ? { base: '620px', md: '900px' } : '620px'}
      >
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Protected>
                  <Home />
                </Protected>
              }
            />
            <Route exact path="/auth" element={<Authentication />} />
            <Route
              exact
              path="/update-profile"
              element={
                <Protected>
                  <UpdateProfile />
                </Protected>
              }
            />
            <Route
              exact
              path="/chat"
              element={
                <Protected>
                  <Chat />
                </Protected>
              }
            />
            <Route
              exact
              path="/setting"
              element={
                <Protected>
                  <Settings />
                </Protected>
              }
            />
            <Route
              exact
              path="/search"
              element={
                <Protected>
                  <Search />
                </Protected>
              }
            />
            <Route exact path="/:username" element={<UserProfile />} />
            <Route
              exact
              path="/:username/post/:postId"
              element={<UserPost />}
            />
          </Routes>
        </Suspense>
      </Container>
    </Box>
  );
}

export default App;
