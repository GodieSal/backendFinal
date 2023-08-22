import mongoose from "mongoose";

const cartsCollection = "carts"

const cartsSchema = new mongoose.Schema({
    productosCarrito: [
        {
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Productos', 
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
