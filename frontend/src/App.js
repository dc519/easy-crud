import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import ViewerPage from './pages/ViewerPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div style={{ padding: '2rem' }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<AdminPage />} />
          <Route path="/view" element={<ViewerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
