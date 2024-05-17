import { Avatar, Button, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import {
  HiOutlineHome,
  HiOutlineLogout,
  HiOutlineViewList,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import "../css/Sidebar.css"; // Import the CSS file
import Typography from "antd/es/typography/Typography";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/authSlice";

const Sidebar = ({ collapsed, darkMode }: any) => {
  const user: any = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    const token = localStorage.getItem("token") || "";
    dispatch(logout(token)); // Dispatch the login action with user info
  };

  return (
    <Sider
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth="80"
      style={{
        background: darkMode ? "#1f1f1f" : "#8492A6",
        transition: "background 0.1s",
        padding: 5,
        position: "relative",
      }}
    >
      <div>
        <Menu
          style={{
            background: darkMode ? "#1f1f1f" : "#8492A6",
            transition: "background 0.1s",
            color: darkMode ? "#1f1f1f" : "#8492A6",
            border: "none",
          }}
          mode="inline"
          className={darkMode ? "dark-mode" : "light-mode"}
        >
          <Menu.Item key="home" icon={<HiOutlineHome />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="spreadsheets" icon={<HiOutlineViewList />}>
            <Link to="/spreadsheets">Spreadsheets</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div
        className="sidebar-footer"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px 16px",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
        >
          <Avatar
            style={{
              backgroundColor: "#1890ff",
              verticalAlign: "middle",
              marginRight: 8,
              marginBottom: 8,
            }}
          >
            {user?.name.charAt(0).toUpperCase()}
          </Avatar>
          {!collapsed && (
            <Typography style={{ color: "#fff", marginBottom: 10 }}>
              {user?.name}
            </Typography>
          )}
        </div>
        <Button onClick={handleLogout} style={{ width: "100%" }}>
          {collapsed ? <HiOutlineLogout /> : "Logout"}
        </Button>
      </div>
    </Sider>
  );
};

export default Sidebar;
