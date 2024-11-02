import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';

const KanbanBoard = ({ tickets = [] }) => {
  const statuses = [
    { id: 'pending', title: 'Pending', textColor: 'text-warning' },
    { id: 'accepted', title: 'Accepted', textColor: 'text-primary' },
    { id: 'resolved', title: 'Resolved', textColor: 'text-success' },
    { id: 'rejected', title: 'Rejected', textColor: 'text-danger' }
  ];

  const getTicketsByStatus = (status) => {
    return tickets.filter(ticket => ticket.status === status);
  };

  return (
    <Row className="g-3">
      {statuses.map(status => (
        <Col key={status.id} xs={12} md={6} lg={3}>
          <Card className="shadow-sm h-100">
            <Card.Header className="d-flex justify-content-between align-items-center bg-white">
              <h6 className={`mb-0 ${status.textColor}`}>
                {status.title}
              </h6>
              <Badge bg="secondary" className="rounded-pill">
                {getTicketsByStatus(status.id).length}
              </Badge>
            </Card.Header>
            <Card.Body className="p-2" style={{ minHeight: '500px' }}>
              {getTicketsByStatus(status.id).map(ticket => (
                <Card key={ticket.id} className="mb-2">
                  <Card.Body className="p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <small className="text-muted">#{ticket.id}</small>
                    </div>
                    <h6 className="mb-2">{ticket.title}</h6>
                    <p className="small text-muted mb-2">
                      {ticket.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center border-top pt-2 mt-2">
                      <small className="text-muted">
                        last updated: {new Date(ticket.last_updated).toLocaleString()}
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              ))}
              {getTicketsByStatus(status.id).length === 0 && (
                <div className="text-center p-3 border border-dashed rounded">
                  <small className="text-muted">No tickets</small>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default KanbanBoard;