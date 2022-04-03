import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
    UUID: {
        type: String,
        required: true,
        unique: true,
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Account = mongoose.model('Account', AccountSchema);

export { Account };
