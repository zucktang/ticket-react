
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateTicketPage from './pages/CreateTicketPage';
import UpdateTicketPage from './pages/UpdateTicketPage';
import TicketListPage from './pages/TicketListPage';
import HomePage from './pages/HomePage';
import { Container } from 'react-bootstrap'; 
import AppNavbar from './components/AppNavbar';

function App() {
  return (
    <Container fluid className="p-3">
      <AppNavbar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateTicketPage />} />
        <Route path="/update/:id" element={<UpdateTicketPage />} />
      </Routes>
    </Container>
  );
}

export default App;