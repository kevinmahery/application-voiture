import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FC } from "react";
import { useAuth } from "../../context/auth.context";

interface CustomPopoverProps {
  open: boolean;
  anchorEl: any;
  handleClose: () => void;
}

const CustomPopover: FC<CustomPopoverProps> = ({
  open,
  anchorEl,
  handleClose,
}) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <Menu
      id="positioned-menu"
      aria-labelledby="positioned-button"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
    </Menu>
  );
};
export default CustomPopover;
