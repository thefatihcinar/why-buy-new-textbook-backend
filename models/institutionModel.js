import mongoose from 'mongoose'

const institutionSchema = mongoose.Schema(
    {
        "name": { type: String, required: true },
    },{ timestamps : true });

/* create Instituion model from this schema */

const Institution = mongoose.model('Institution', institutionSchema);

export default Institution;