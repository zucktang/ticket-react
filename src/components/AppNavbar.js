import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const AppNavbar = () => {
  return (
    <Navbar className="py-3 bg-white">
      <Container>
        <Navbar.Brand 
          href="/" 
          className="fw-bold"
          style={{ 
            fontSize: '1.4rem',
          }}
        >
          TICKETNP
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
