import React from 'react';
import './TicketCard.css';

const TicketCard = ({ ticket, onClick }) => {
  const statusColors = {
    pending: 'text-warning',
    accepted: 'text-primary',
    resolved: 'text-success',
    rejected: 'text-danger',
  };

  return (
    <div className="col-md-3 mb-4">
      <div
        className="card h-100 ticket-card"
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        <img 
          src={ticket.image ? ticket.image : '/ticket.jpg'}
          alt="Ticket Thumbnail" 
          className="card-img-top" 
        />
        <div className="card-body d-flex flex-grow-1 flex-column">
          <h5 className="card-title text-center">{ticket.title}</h5>
          <p className="card-text text-secondary text-center" style={{ fontSize: '0.9rem' }}>
            {ticket.description}
          </p>
          <p className={`card-status mt-auto text-center ${statusColors[ticket.status]}`} style={{ fontSize: '1 rem' }}>
            {ticket.status}
          </p>
        </div>
      </div>
      </div>
  );
};

export default TicketCard;