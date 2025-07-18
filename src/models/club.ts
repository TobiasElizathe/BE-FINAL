import mongoose, { Document, Schema } from "mongoose";
import { Jugador } from "./jugador";


export interface Club extends Document {
    name: string;
    location: string;
    establishedAt?: Date;
    players: mongoose.Types.ObjectId[];
    president?: string;
    stadium?: string;
    titlesWon?: number;
    logoUrl?: string;
    createdAt: Date;
    updatedAt?: Date;
}

const clubSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        establishedAt: {
            type: Date,
            required: true,
        },
        players: [{
            type: mongoose.Types.ObjectId,
            ref: 'Jugador',
            default: [],
        }],
        president: {
            type: String,
            required: false,
        },
        stadium: {
            type: String,
            required: false,
        },
        titlesWon: {
            type: Number,
            required: false,
        },
        logoUrl: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Club = mongoose.model<Club>('Club', clubSchema);

export default Club;