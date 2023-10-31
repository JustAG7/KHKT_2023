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
import axios from "axios";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function SB() {
  const { collapseSidebar } = useProSidebar();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const ipAddress = window.location.hostname;
  useEffect(() => {
    const userRole = Cookies.get("role");
    axios.get(`http://${ipAddress}:1991/api/users/${Cookies.get("id")}`, {

      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }).then((res) => {
      setName(res.data.name);
    });
    setRole(userRole);
  }, []);
  const handleLogOut = () => {
    
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("id");


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
        <h3 className="ml-7">Welcome {name}</h3>
        <hr className="my-2 mt-5 border-blue-gray-50" />
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
        {
          Cookies.get('role') === "admin" && 
          <Link to="/users">
            <MenuItem icon={<PeopleOutlinedIcon />}>Users</MenuItem>
          </Link>
        }
        <MenuItem icon={<LogoutIcon />} onClick={handleLogOut}>
          Log Out
        </MenuItem>

      </Menu>
    </Sidebar>
  );
}

export default SB;
