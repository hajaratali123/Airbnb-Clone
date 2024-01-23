
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
     email: {
        type: String,
        required: true
    },
    rents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Rent',
        },
    ],
    menu: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Menu',
        }
    ],

});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
