import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import UserManagement from "./scenes/user/UserManagement"; 
import MarketManagement from "./scenes/market/MarketManagement"; 
import ServiceManagement from "./scenes/service/ServiceManagement"; 
import EmailDLManagement from "./scenes/mail/EmailDLManagement"; 
import SystemSettingsAndAlerts from "./scenes/systemsettings/SystemSettingsAndAlerts";
import RoleAccessManagement from "./scenes/role/RoleAccessManagement";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  // Check if current route is neither the sign-up nor sign-in page
  const showSidebar = location.pathname !== "/signup" && location.pathname !== "/signin";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* Conditionally render the sidebar based on the route */}
          {showSidebar && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<UserManagement />} /> 
              <Route path="/market" element={<MarketManagement />} />
              <Route path="/service" element={<ServiceManagement />} />
              <Route path="/email" element={<EmailDLManagement />} />
              <Route path="/system" element={<SystemSettingsAndAlerts />} />
              <Route path="/role" element={< RoleAccessManagement/>} />
              
              
              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
