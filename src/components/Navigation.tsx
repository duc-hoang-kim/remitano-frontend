import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useAuthenticate } from "../contexts/AuthContext";
import useLogout from "../features/authentication/hooks/useLogout";
import AddVideoButton from "../features/videos/components/AddVideoButton";
import AddVideoMenuItem from "../features/videos/components/AddVideoMenuItem";
import truncateText from "../utils/truncateText";

const WEB_NAME = "Funny Movies";

function ResponsiveAppBar() {
  const { fetchLogout } = useLogout();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthenticate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const onClickLogin = () => {
    navigate("/login");
    handleCloseNavMenu();
  };

  const onClickLogout = () => {
    fetchLogout();
    handleCloseNavMenu();
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HomeIcon
            sx={{ display: { xs: "none", md: "flex", color: "black" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 600,
              color: "black",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            {WEB_NAME}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {!isAuthenticated() && (
                <MenuItem key="login" onClick={onClickLogin}>
                  <Typography textAlign="center">Login / Registry</Typography>
                </MenuItem>
              )}
              {isAuthenticated() && [
                <MenuItem key="logout" onClick={onClickLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>,

                <AddVideoMenuItem key="add video" onClick={handleCloseNavMenu} />,

                <MenuItem key="current user" onClick={handleCloseNavMenu}>
                  <Typography>{truncateText(user?.email, 10)}</Typography>
                </MenuItem>,
              ]}
            </Menu>
          </Box>
          <HomeIcon
            sx={{ display: { xs: "flex", md: "none", color: "black" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 600,
              color: "black",
            }}
            onClick={() => navigate("/")}
          >
            {WEB_NAME}
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", flexDirection: "row-reverse" },
            }}
          >
            {!isAuthenticated() && (
              <Button
                onClick={onClickLogin}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Login / Register
              </Button>
            )}

            {isAuthenticated() && (
              <>
                <Button
                  onClick={onClickLogout}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Logout
                </Button>

                <AddVideoButton />

                <Typography
                  sx={{
                    mr: 3,
                    my: 2,
                    color: "white",
                    display: "block",
                    transform: "translateY(5px)",
                  }}
                >
                  Welcome {user?.email}
                </Typography>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
