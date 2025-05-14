const Ticket = require('../models/Ticket');
require('dotenv').config();
// Get all tickets - only accessible by admin
exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new ticket - accessible by any user
exports.createTicket = async (req, res) => {
    const { email, subject, problem } = req.body;
    try {
        if (!email || !subject || !problem) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newTicket = new Ticket({
            email,
            subject,
            problem
        });

        const savedTicket = await newTicket.save();
        res.status(201).json({ 
            message: 'Ticket created successfully', 
            ticket: savedTicket 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};