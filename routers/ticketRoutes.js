const express = require('express');
const router = express.Router();
const { createTicket, getAllTickets } = require('../controllers/ticketController');
const { adminAuth } = require('../controllers/userController');

// Route to create a new ticket (public)
router.post('/create', createTicket);

// Route to get all tickets (admin only)
router.get('/users',adminAuth,getAllTickets)

module.exports = router;