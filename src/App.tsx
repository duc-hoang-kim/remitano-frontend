import "./App.css";
import ResponsiveAppBar from "./components/navigation";
import AuthProvider from "./contexts/authProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import { Container } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ResponsiveAppBar />

        <Container sx={{ marginTop: "25px", marginBottom: "50px" }}>
          <Routes>
            <Route index element={<HomePage />} />

            {/* <Route path="*" element={<NoMatch />} /> */}
          </Routes>
        </Container>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
