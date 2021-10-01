import AppBar from "@mui/material/AppBar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { FC, useState } from "react";
import { useAuth } from "../../context/auth.context";
import { useHistory } from "react-router";
import CustomPopover from "../../commons/CustomPopover";

interface HeaderProps {
  children: any;
}

const Header: FC<HeaderProps> = ({ children }) => {
  const history = useHistory();
  const { isAuthenticate } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    if (!isAuthenticate) {
      history.push("/login");
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToHome = () => {
    history.push("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { sm: "block" } }}
            onClick={goToHome}
          >
            MY APP
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              {isAuthenticate ? (
                <AccountCircle />
              ) : (
                <Typography variant="body1" color="text.white">
                  Se connecter
                </Typography>
              )}
            </IconButton>
            <CustomPopover
              open={Boolean(anchorEl)}
              handleClose={handleClose}
              anchorEl={anchorEl}
            />
          </Box>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};
export default Header;
