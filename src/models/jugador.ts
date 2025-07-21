import mongoose, { Document, Schema } from "mongoose";

export interface Jugador extends Document {
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  posicion: string;
  numeroCamiseta: number;
  club: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

const JugadorSchema = new Schema(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    posicion: { type: String, required: true },
    numeroCamiseta: { type: Number, required: true },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<Jugador>("Jugador", JugadorSchema);
