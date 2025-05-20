const express = require('express');

const { createTicket,getAllTickets } = require('../controllers/ticketController');
const { adminAuth ,getAllUsers} = require('../controllers/userController');
const router = express.Router();

// Route to create a new ticket (public)
router.post('/createTicket', createTicket);
router.get('/getAllTickets',getAllTickets );
// Route to get all tickets (admin only)
router.get('/users',adminAuth,getAllUsers)

module.exports = router;