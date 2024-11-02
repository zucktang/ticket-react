import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TicketForm from '../components/TicketForm';
import { getTicket, updateTicket } from '../api/tickets';
import { useParams } from 'react-router-dom';

const UpdateTicketPage = () => {
  const { id } = useParams();
  const [ticketData, setTicketData] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const ticket = await getTicket(id);
        setTicketData(ticket);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    fetchTicket();
  }, [id]);

  const handleFormSubmit = async (updatedData) => {
    try {
      const updatedTicket = await updateTicket(id, updatedData);
      navigate('/', { state: { message: "Ticket updated successfully!", type: "success" } });
      console.log("Ticket Updated:", updatedTicket);
    } catch (error) {
      console.error("Error updating ticket:", error);
      setError("There was an issue updating the ticket. Please try again.");
    }
  };

  return (
    <div className="my-4">
      <h4 className="text-center">Update Ticket</h4>
      {ticketData && <TicketForm onSubmit={handleFormSubmit} initialData={ticketData} showStatusField={true} />}
    </div>
  );
};

export default UpdateTicketPage;