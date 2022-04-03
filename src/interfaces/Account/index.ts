import { Document } from 'mongoose';

export interface IAccount extends Document {
    UUID: string;
    cpf: string;
    name: string;
    balance: number;
    created_at: Date;
}
