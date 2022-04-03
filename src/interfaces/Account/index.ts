import { Document } from 'mongoose';

export interface IAccount extends Document {
    UUID: string;
    cpf: string;
    name: string;
    created_at: Date;
}
