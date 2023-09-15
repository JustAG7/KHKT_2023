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
import cookie from "cookie";
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
  let cookies = cookie.parse(document.cookie);
  useEffect(() => {
    const userRole = Cookies.get("role");
    cookies = cookie.parse(document.cookie);
    axios.get(`http://localhost:1991/api/users/${cookies.id}`, {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2Q1NmNjODQ3ZDEzYjU4NTQ4ZmE4YyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NDc0NDY4NH0.-46_84WMGYlTwA9Zdpb7mLFZTL51m5L7An_dPQeNS7o` },
      })
      .then((res) => {
        setName(res.data.name);
      })

    if (userRole) {
      setRole(userRole);
    }
  }, []);
  const handleLogOut = () => {
    document.cookie = cookie.serialize("token", "", {
      maxAge: -1,
      path: "/",
    });
    document.cookie = cookie.serialize("role", "", {
      maxAge: -1,
      path: "/",
    });
    document.cookie = cookie.serialize("id", "", {
      maxAge: -1,
      path: "/",
    });

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
          cookies.role === "admin" && 
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
