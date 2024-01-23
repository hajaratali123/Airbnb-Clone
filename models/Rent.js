// rent.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentSchema = new Schema({
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
   
});

const Rent = mongoose.model('Rent', rentSchema);
module.exports = Rent;
