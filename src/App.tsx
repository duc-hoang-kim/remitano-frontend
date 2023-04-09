import React from 'react';
import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './components/navigation';
import AuthProvider from './contexts/authProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ResponsiveAppBar/>

        <Routes>
          <Route index element={<HomePage />} />

          {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
