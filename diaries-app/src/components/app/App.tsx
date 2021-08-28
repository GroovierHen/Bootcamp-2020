import { FC, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Spinner } from '@chakra-ui/react';

import { RootState } from '../../rootReducer';

const Auth = lazy(() => import('../auth/Auth'));
const Home = lazy(() => import('../home/Home'));

const App: FC = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <Suspense
              fallback={
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="100vh"
                >
                  <Spinner size="xl" />
                </Box>
              }
            >
              {isLoggedIn ? <Home /> : <Auth />}
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
