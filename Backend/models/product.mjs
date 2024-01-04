import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: {
        type: String,
    },
     brand: {
        type: String,
    },
    price: {
        type: String,
    },
    
    image : {
    type: String,
    
    } ,

    rating: {
        type: String,
    }
})

export default mongoose.model("Product", productSchema)