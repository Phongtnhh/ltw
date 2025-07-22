import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './shared/contexts/AuthContext';
import ClientApp from './client/ClientApp';
import AdminApp from './admin/AdminApp';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Admin routes */}
          <Route path="/admin/*" element={<AdminApp />} />

          {/* Client routes (default) */}
          <Route path="/*" element={<ClientApp />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
