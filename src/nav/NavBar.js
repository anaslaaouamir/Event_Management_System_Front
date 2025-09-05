import * as React from 'react';
import { useContext } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SearchIcon from '@mui/icons-material/Search';
import DataContext from '../context/DataContext';
import { Link } from 'react-router-dom';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

function ResponsiveAppBar() {

  const { token , logout} = useContext(DataContext);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // ✅ Get search state from DataContext
  const { search, setSearch } = useContext(DataContext);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo Desktop */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar-mobile"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar-mobile"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              PaperProps={{
                sx: { backgroundColor: 'grey.900', color: 'white' },
              }}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              
              <Link to={`/`}>
                <MenuItem key='home' onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center', color: 'white' }}>
                    Home
                  </Typography>
                </MenuItem>
                </Link>

            </Menu>
          </Box>

          {/* Logo Mobile */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {/* Pages for Desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
            <Link to={`/`}>
            <Button
                key='Home'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
              </Link>
          </Box>

          {/* ✅ Search Bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <input
              id="search"
              type="text"
              placeholder="Search Events"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '8px 8px 8px 40px',
                borderRadius: '4px',
                border: 'none',
                outline: 'none',
                width: '12ch',
                transition: 'width 0.3s',
                color: 'inherit',
                backgroundColor: 'transparent',
              }}
              onFocus={(e) => (e.target.style.width = '20ch')}
              onBlur={(e) => (e.target.style.width = '12ch')}
            />
          </Search>

          {/* Avatar Menu */}
          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar-user"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                sx: { backgroundColor: 'grey.900', color: 'white' },
              }}
            >
              {token
                ? 
                <div>
                    <MenuItem
                      key="logout"
                      onClick={logout}
                      sx={{ color: 'white' }}
                    >
                      <Typography sx={{ textAlign: 'center', color: 'white' }}>
                        Logout
                      </Typography>
                    </MenuItem>

                    <Link to={`/my_reservations`}>
                    <MenuItem
                      key="My Reservations"
                      sx={{ color: 'white' }}
                    >
                      <Typography sx={{ textAlign: 'center', color: 'white' }}>
                        My Reservations
                      </Typography>
                    </MenuItem>
                    </Link>

                </div> 
  
                : null }

    {!token ?
    <div>
    <Link to={`/login`}>
    <MenuItem
      key='login'
      onClick={handleCloseUserMenu}
      sx={{ color: 'white' }}
    >
      <Typography sx={{ textAlign: 'center', color: 'white' }}>
        Login
      </Typography>
    </MenuItem> 
    </Link>

    <Link to={`/`}>
    <MenuItem
      key='register'
      onClick={handleCloseUserMenu}
      sx={{ color: 'white' }}
    >
      <Typography sx={{ textAlign: 'center', color: 'white' }}>
        Register
      </Typography>
    </MenuItem> 
    </Link>
    </div>
: null }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
