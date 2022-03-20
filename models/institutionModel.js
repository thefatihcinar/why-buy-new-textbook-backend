import mongoose from 'mongoose'

const instituionSchema = mongoose.Schema(
    {
        "name": { type: String, required: true },
    },{ timestamps : true });

/* create Instituion model from this schema */

const Instituion = mongoose.model('Instituion', instituionSchema);

export default Instituion;