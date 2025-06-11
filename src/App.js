import "./App.css";
import React, { useState, useEffect, createContext } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import LoginComponent from "./components/dashboard/components/custom/LoginComponent";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useFetcher,
} from "react-router-dom";
import SingupComponent from "./components/dashboard/components/custom/SignupComponent";
import Test from "./components/dashboard/components/custom/test";
import UsersPage from "./components/users/Users";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider,
  CssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import CustomChatCreationPage from "./components/customchart/CustomChatCreationPage";
import CityContextProvider from "./contexts/CityContext";
import SheetContextProvider from "./contexts/SheetContext";
import DateContextProvider from "./contexts/DateContext";
import { LicenseInfo } from "@mui/x-license";
function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  //Activate MUI Pro license
  LicenseInfo.setLicenseKey(process.env.MUI_LICENSE_KEY);
  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("jwt-token");
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  const theme = createTheme({
    colorSchemes: {
      dark: true,
    },
  });


  return (
    <DateContextProvider>
      <CityContextProvider>
        <SheetContextProvider>
          <ThemeProvider theme={{ [MATERIAL_THEME_ID]: theme }}>
            <JoyCssVarsProvider>
              <CssBaseline enableColorScheme />

              <Router>
                <Routes>
                  <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                  />
                  <Route path="/login" element={<LoginComponent />} />
                  <Route path="/signup" element={<SingupComponent />} />
                  <Route path="/test" element={<Test />} />
                  <Route
                    path="/users"
                    element={
                      <ProtectedRoute>
                        <UsersPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/custom"
                    element={
                      <ProtectedRoute>
                        <CustomChatCreationPage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Router>
            </JoyCssVarsProvider>
          </ThemeProvider>
        </SheetContextProvider>
      </CityContextProvider>
    </DateContextProvider>
  );
}

export default App;
