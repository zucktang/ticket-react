import React from 'react';
import './TicketCard.css'; // Custom CSS for styling

const TicketCard = ({ ticket, onClick}) => {
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
                <div className="card-body text-center">
                    <h5 className="card-title">{ticket.title}</h5>
                    <p className="card-text">{ticket.description}</p>
                    <p className="card-status">Status: {ticket.status}</p>
                </div>
            </div>
        </div>
    );
};

export default TicketCard;