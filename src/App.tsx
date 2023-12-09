import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { RepoProvider } from './contexts/RepoProvider';
import NavLink from './components/NavLink';
import ReposPage from './pages/ReposPage';
import FavoritesPage from './pages/FavoritesPage';

import { AppBar, Toolbar, Typography, Container, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';

function App() {
  return (
    <>
      <RepoProvider>
        <Router>
          <AppBar position="sticky">
            <Container maxWidth="md">
              <Toolbar>
                <Typography
                  variant="h5"
                  sx={{ flexGrow: 1 }}
                >
                  <NavLink
                    to="/"
                    label="Github Repo Finder"
                    isHeader
                  />
                </Typography>
                <NavLink
                  to="/"
                  label={
                    <>
                      <SearchIcon />
                      Search
                    </>
                  }
                />
                <NavLink
                  to="/favorites"
                  label={
                    <>
                      <FavoriteIcon />
                      Favorites
                    </>
                  }
                />
              </Toolbar>
            </Container>
          </AppBar>
          <Container
            maxWidth="md"
            // style={{ marginTop: '3rem' }}
          >
            <Paper
              elevation={3}
              sx={{ backgroundColor: '#f5f5f5', paddingBottom: 1 }}
            >
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
            </Paper>
          </Container>
        </Router>
      </RepoProvider>
    </>
  );
}

export default App;
