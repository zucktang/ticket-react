import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getTickets } from '../api/tickets';

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            const data = await getTickets();
            console.log("Fetched Tickets in KanbanBoard:", data);
            setTickets(data);
        };
        fetchTickets();
    }, []);

    const statuses = ['pending', 'accepted', 'resolved', 'rejected'];

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {statuses.map(status => (
                <div key={status} style={{ width: '25%' }}>
                    <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                    {tickets.filter(ticket => ticket.status === status).map(ticket => (
                        <div key={ticket.id}>
                            <h3>{ticket.title}</h3>
                            <p>{ticket.description}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

KanbanBoard.propTypes = {
    tickets: PropTypes.array
};

export default KanbanBoard;