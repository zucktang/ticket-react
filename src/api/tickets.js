import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const getTickets = async () => {
    const res = await axios.get(`${API_BASE_URL}/tickets/`);
    console.log(`${API_BASE_URL}/tickets/`)
    return res.data;
};

export const getTicket = async (ticketId) => {
    const res = await axios.get(`${API_BASE_URL}/tickets/${ticketId}/`);
    return res.data;
};

export const createTicket = async (ticketData) => {
    const res = await axios.post(`${API_BASE_URL}/tickets/`, ticketData);
    return res.data;
};

export const updateTicket = async (ticketId, updatedTicketData) => {
    const res = await axios.patch(`${API_BASE_URL}/tickets/${ticketId}/`, updatedTicketData);
    return res.data;
};


