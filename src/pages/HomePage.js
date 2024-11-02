import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row } from 'react-bootstrap';
import TicketCard from '../components/TicketCard' 
import { getTickets } from '../api/tickets';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets(); 
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleCardClick = (ticketId) => {
    navigate(`/update/${ticketId}`);
  };

  return (
    <Container className="mt-4">
      <Card className="text-center mb-4">
        <Card.Body>
          <Card.Title >Create a New Ticket</Card.Title>
          <Card.Text>
            Click below to start creating a support ticket.
          </Card.Text>
          <Button variant="primary" href="/create" style={{ backgroundColor: 'black', borderColor: 'black' }} >Create Ticket</Button>
        </Card.Body>
      </Card>

      <h2>Tickets</h2>
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
            <Card>
              <Card.Body>
                <Card.Text>No tickets found.</Card.Text>
              </Card.Body>
            </Card>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default HomePage;