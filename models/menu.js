// models/menu.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    itemType: String,
    foodItems: [String],
    price: Number,
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
