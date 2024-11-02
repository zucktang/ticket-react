import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Nav } from 'react-bootstrap';
import TicketCard from '../components/TicketCard';
import { getTickets } from '../api/tickets';
import { useNavigate } from 'react-router-dom';
import KanbanBoard from '../components/KanbanBoard';

const HomePage = () => {
  const [tickets, setTickets] = useState([]);
  const [activeTab, setActiveTab] = useState('tickets');
  const navigate = useNavigate();

  const fetchTickets = async () => {
    try {
      const data = await getTickets();
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleCardClick = (ticketId) => {
    navigate(`/update/${ticketId}`);
  };

  return (
    <Container className="py-4">
      <Card className="text-center mb-4 shadow-sm border-0">
        <Card.Body className="py-4">
          <Card.Title className="mb-3 fw-bold">Create a New Ticket</Card.Title>
          <Card.Text className="text-muted">
            Click below to start creating a support ticket.
          </Card.Text>
          <Button 
            variant="dark" 
            href="/create" 
            className="px-4 py-2"
          >
            Create Ticket
          </Button>
        </Card.Body>
      </Card>

      <Nav 
        variant="tabs" 
        className="mb-4 border-bottom-0"
        onSelect={(key) => setActiveTab(key)}
      >
        <Nav.Item>
          <Nav.Link 
            eventKey="tickets" 
            active={activeTab === 'tickets'}
            className="px-4"
          >
            List
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            eventKey="kanban" 
            active={activeTab === 'kanban'}
            className="px-4"
          >
            Status
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === 'tickets' && (
        <Row>
          {tickets.length > 0 ? (
            tickets.map(ticket => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onClick={() => handleCardClick(ticket.id)}
              />
            ))
          ) : (
            <div className="col">
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center py-4">
                  <Card.Text className="text-muted">No tickets found.</Card.Text>
                </Card.Body>
              </Card>
            </div>
          )}
        </Row>
      )}

      {activeTab === 'kanban' && (
        <KanbanBoard 
        tickets={tickets} 
        onTicketsRefresh={fetchTickets}
        />
        

      )}
    </Container>
  );
};

export default HomePage;