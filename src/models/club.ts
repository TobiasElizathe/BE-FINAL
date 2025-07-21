import mongoose, { Document, Schema } from "mongoose";

export interface Club extends Document {
  nombre: string;
  pais: string;
  fundacion: Date;
  jugadores: mongoose.Types.ObjectId[];
  presidente?: string;
  estadio?: string;
  titulosGanados?: number;
  colores?: string[];
  logoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ClubSchema = new Schema(
  {
    nombre: { type: String, required: true },
    pais: { type: String, required: true },
    fundacion: { type: Date, required: true },
    jugadores: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Jugador",
        default: [],
      },
    ],
    presidente: { type: String },
    estadio: { type: String },
    titulosGanados: { type: Number },
    colores: [{ type: String }],
    logoUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<Club>("Club", ClubSchema);
