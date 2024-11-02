import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TicketForm from '../components/TicketForm';
import { createTicket } from '../api/tickets';
import { Alert } from 'react-bootstrap';

const CreateTicketPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleFormSubmit = async (ticketData) => {
        try {
            await createTicket(ticketData);
            navigate('/', { state: { message: "Ticket created successfully!", type: "success" } });
        } catch (error) {
            console.error("Error creating ticket:", error);
            setError("There was an issue creating the ticket. Please try again.");
        }
    };

    return (
        <div className="my-4">
            <h4 className="text-center">Create a New Ticket</h4>
            {error && (
                <Alert variant="danger" onClose={() => setError(null)} dismissible>
                    {error}
                </Alert>
            )}
            <TicketForm onSubmit={handleFormSubmit} showStatusField={false} submitText="Create" />
        </div>
    );
};

export default CreateTicketPage;