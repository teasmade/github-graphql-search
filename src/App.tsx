import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { RepoProvider } from './contexts/RepoProvider';

import ReposPage from './pages/ReposPage';
import FavoritesPage from './pages/FavoritesPage';

import { AppBar, Toolbar, Typography } from '@mui/material';

function App() {
  return (
    <>
      <RepoProvider>
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                RSearch
                <Link to="/">Github Repo Search</Link>
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                <Link to="/favorites">Favorites</Link>
              </Typography>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route
              path="/favorites"
              element={<FavoritesPage />}
            />
            <Route
              path="/"
              element={<ReposPage />}
            />
          </Routes>
        </Router>
      </RepoProvider>
    </>
  );
}

export default App;
