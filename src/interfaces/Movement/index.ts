import { Document } from 'mongoose';

export interface IMovement extends Document {
    UUID: string;
    accountId: string;
    value: number;
    created_at: Date;
}
