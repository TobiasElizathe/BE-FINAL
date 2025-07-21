import mongoose, { Document, Schema } from "mongoose";

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

const ClubSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    establishedAt: { type: Date, required: true },
    players: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Jugador",
        default: [],
      },
    ],
    president: { type: String },
    stadium: { type: String },
    titlesWon: { type: Number },
    logoUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<Club>("Club", ClubSchema);
