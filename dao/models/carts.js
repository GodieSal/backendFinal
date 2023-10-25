import mongoose from "mongoose";

const cartsCollection = "carts"

const cartsSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin', 
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Producto', 
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
})

const CartsModel = mongoose.model(cartsCollection, cartsSchema)

export default CartsModel;
