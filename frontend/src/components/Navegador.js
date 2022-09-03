import * as React from "react";
import Button from "@mui/joy/Button";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import Apps from "@mui/icons-material/Apps";
import Link from "@mui/joy/Link";

export default function SelectedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const createHandleClose = (index) => () => {
    setAnchorEl(null);
    if (typeof index === "number") {
      setSelectedIndex(index);
    }
  };

  return (
    <div>
      <Button
        id="selected-demo-button"
        aria-controls={open ? "selected-demo-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        color="neutral"
        onClick={handleClick}
        startIcon={<Apps />}
      >
        App
      </Button>
      <Menu
        id="selected-demo-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={createHandleClose()}
        aria-labelledby="selected-demo-button"
      >
        <MenuItem component={Link} href="/" underline="none">
          Home
        </MenuItem>
        <MenuItem component={Link} href="/campeonatos" underline="none">
          Campeonatos
        </MenuItem>
      </Menu>
    </div>
  );
}
