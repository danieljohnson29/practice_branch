// Import necessary components and modules
import { useState } from "react";
import { Layout } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import ContentPage from "./components/Content";
import HeaderPage from "./components/Header";
import Sidebar from "./components/Sidebar";
import SpreadSheetsPage from "./components/SpreadSheetsPage"; // Import SpreadSheetsPage component
import "./App.css";
import Login from "./components/Login";
import { RootState } from "./redux/store";

const { Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  
  console.log('05-17 isAuthenticated: ', isAuthenticated);
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout
                style={{
                  background: darkMode ? "#2b2b2b" : "#f0f2f5",
                  transition: "background 0.1s",
                  minHeight: "100vh",
                }}
              >
                <HeaderPage
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  toggleDarkMode={toggleDarkMode}
                  darkMode={darkMode}
                />
                <Layout
                  style={{
                    background: darkMode ? "#1f1f1f" : "#8492A6",
                    transition: "background 0.1s",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Sidebar collapsed={collapsed} darkMode={darkMode} />
                  <Content
                    style={{
                      padding: "24px",
                      margin: "0px 20px 20px 0px",
                      flex: 1,
                      overflow: "auto",
                      background: darkMode ? "#2b2b2b" : "#fff",
                      color: darkMode ? "#fff" : "#000",
                      transition: "background 0.1s, color 0.1s",
                      borderRadius: 10,
                    }}
                  >
                    {/* Define routes for different pages */}
                    <Routes>
                      {/* <Route
                        path="/"
                        element={<ContentPage darkMode={darkMode} />}
                      /> */}
                      <Route
                        path="/spreadsheets"
                        element={<SpreadSheetsPage darkMode={darkMode} />}
                      />
                    </Routes>
                  </Content>
                </Layout>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
