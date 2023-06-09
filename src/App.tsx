import React from "react";
import "./App.css";
import ResponsiveAppBar from "./components/Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Container } from "@mui/material";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/AuthContext";
import { HomepageProvider } from "./contexts/HomepageContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HomepageProvider>
          <ResponsiveAppBar />

          <Container sx={{ marginTop: "25px", marginBottom: "50px" }}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* <Route path="*" element={<NoMatch />} /> */}
            </Routes>
          </Container>
        </HomepageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
