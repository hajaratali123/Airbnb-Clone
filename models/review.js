const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const reviewSchema = new Schema({
    Comment:String,
    rating:{
        type:String,
        min:1,
        max:5

    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
     listing: {  // Update the field name to 'listing'
        type: Schema.Types.ObjectId,
        ref: "Listing", // Reference the Listing model
      },
})
let Review = mongoose.model("Review",reviewSchema);
module.exports = Review;