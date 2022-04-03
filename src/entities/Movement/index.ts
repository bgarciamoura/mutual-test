import mongoose from 'mongoose';

const MovementSchema = new mongoose.Schema({
    UUID: {
        type: String,
        required: true,
        unique: true,
    },
    accountId: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Movement = mongoose.model('Movement', MovementSchema);

export { Movement };
