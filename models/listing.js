const { ref } = require("joi");
const mongoose = require("mongoose");
const Review = require("./review.js");

const listingSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,

    },
    image: {
        url: String,
        filename: String,
        
        // type: String,
        // default: "https://plus.unsplash.com/premium_photo-1706565466097-78de3dcc5067?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // set: (v) =>
        //     v === ""
        //         ? "https://plus.unsplash.com/premium_photo-1706565466097-78de3dcc5067?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        //         : v,
    },
    price: {
        type:Number,
    },
    location: {
        type:String,
    },
    country: {
        type: String,
    },

    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;