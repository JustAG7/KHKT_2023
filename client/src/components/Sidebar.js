import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import EventIcon from '@mui/icons-material/Event';

import TabEvent from "./TabEvent";

import {Link, useNavigate, useLocation} from 'react-router-dom';

function SB() {
  const { collapseSidebar } = useProSidebar();
  const location = useLocation();
  return (
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
      <Sidebar style={{ height: "100vh" }}>
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            {" "}
            <h2>Admin</h2>
          </MenuItem>

          <MenuItem icon={<HomeOutlinedIcon />} label="Home"> Home </MenuItem>
            
          <MenuItem icon={<PeopleOutlinedIcon />}>Team</MenuItem>
          <Link to = "/event">
            <MenuItem icon={<EventIcon />}>
              Events
            </MenuItem>
          </Link>
          <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
        </Menu>
      </Sidebar>
      <main className="p-10 w-full">
        
          {location.pathname === "/event" || location.pathname === "/event/:id" ? <TabEvent /> : null}
        
      </main>
    </div>
  );
}

export default SB;