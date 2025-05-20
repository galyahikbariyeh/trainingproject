const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true 
    },
    subject: { 
        type: String, 
        required: true 
    },
    problem: { 
        type: String, 
        required: true 
    },
    /*createdAt: {
        type: Date,
        default: Date.now
    }*/
});

module.exports = mongoose.model('ticket', TicketSchema);
//updare
