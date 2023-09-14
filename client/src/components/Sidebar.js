import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import EventIcon from "@mui/icons-material/Event";

import Cookies from "js-cookie";
import LogoutIcon from "@mui/icons-material/Logout";

import { useState } from "react";
import cookie from "cookie";

import { Link, useNavigate, useLocation } from "react-router-dom";
import Events from "../pages/Events";
import { useEffect } from "react";

function SB() {
  const { collapseSidebar } = useProSidebar();
  const navigate = useNavigate();
  const [role, setRole] = useState(""); // Initialize role with an empty string
  useEffect(() => {
    const userRole =  Cookies.get("role");
    if (userRole) {
      setRole(userRole);
    }
  }, []);
  const handleLogOut = () => {
    
    Cookies.remove("token", { path: "/" });
    Cookies.remove("role", { path: "/" });

    navigate("/signin");
  };

  return (
    <Sidebar style={{ height: "100vh" }}>
      <Menu>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            collapseSidebar();
          }}
          style={{ textAlign: "center" }}
        >
          <h2>{role}</h2>
        </MenuItem>
        <Link to="/home">
          <MenuItem icon={<HomeOutlinedIcon />} label="Home">
            Home
          </MenuItem>
        </Link>
        <Link to="/department">
          <MenuItem icon={<PeopleOutlinedIcon />}>Team</MenuItem>
        </Link>
        <Link to="/event">
          <MenuItem icon={<EventIcon />}>Event</MenuItem>
        </Link>
        <Link to="/setting">
          <MenuItem icon={<SettingsIcon />}>Setting</MenuItem>
        </Link>
        <MenuItem icon={<LogoutIcon />} onClick={handleLogOut}>
          Log Out
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SB;
