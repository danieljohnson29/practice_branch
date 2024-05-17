import { Switch } from "antd";
import { Header } from "antd/es/layout/layout";
import { GiHamburgerMenu } from "react-icons/gi";
import "../css/HeaderPage.css"; // Import the CSS file

const HeaderPage = ({
  collapsed,
  setCollapsed,
  toggleDarkMode,
  darkMode,
}: any) => {
  return (
    <Header className={darkMode ? "dark-mode-header" : "light-mode-header"}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <GiHamburgerMenu
          onClick={() => setCollapsed(!collapsed)}
          style={{ marginLeft: 15, cursor: "pointer" }}
          size={18}
        />
      </div>
      <Switch
        checked={darkMode}
        onChange={toggleDarkMode}
        checkedChildren="Light"
        unCheckedChildren="Dark"
        style={{
          marginLeft: 10,
          backgroundColor: darkMode ? "#b8b8b8" : "#3C4858",
        }}
      />
    </Header>
  );
};

export default HeaderPage;
