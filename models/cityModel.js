import mongoose from 'mongoose'

const citySchema = mongoose.Schema(
    {
        "id": { type: Number, required: true, unique: true },
        "name": { type: String, required: true },
    },{ timestamps : true });

/* create City model from this schema */

const City = mongoose.model('City', citySchema);

export default City;