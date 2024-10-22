import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
// import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
// import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';

const Item = ({ title, to, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();

  return (
    <MenuItem
      active={location.pathname === to} // Check if current location matches the item's 'to' prop
      style={{
        color: colors.grey[100],
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box
      sx={{
        flex: '1 1 auto', // Allow it to grow and shrink
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#e2726e !important",
        },
        "& .pro-menu-item.active": {
          color: "#db4f4a !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="10px"
                marginTop="-60px" // Apply negative margin here
              >
                {!isCollapsed && (
                  <Box mb="25px">
                    <img
                      alt="profile-user"
                      width="160px"
                      height="160px"
                      src={`../../assets/logo_bg_img.png`}
                      style={{ cursor: "pointer" }}
                    />
                  </Box>
                )}

                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box>
            <Item
              title="User Management"
              to="/"
              icon={<CrisisAlertIcon />}
            />

            <Item
              title="Market Management"
              to="/market"
              icon={<PeopleOutlinedIcon />}
            />
            <Item
              title="Service Management"
              to="/service"
              icon={<DonutSmallIcon />}
            />
            <Item
              title="Email DL Management"
              to="/email"
              icon={<ReceiptOutlinedIcon />}
            />

            <div style={{ height: "20px" }} />

            <Item
              title="System Settings & Alerts"
              to="/system"
              icon={<SummarizeOutlinedIcon />}
            />
            <Item
              title="Role Management"
              to="/role"
              icon={<ReceiptOutlinedIcon />}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

