import mongoose , { Document, Schema } from "mongoose";
 export interface Jugador extends Document 
 {
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    posicion: string;
    club: mongoose.Types.ObjectId;
    isActive: boolean;
    createdAt: Date;
    updatedAt?: Date;
 
   transferencias?: {
    desde: mongoose.Types.ObjectId;
    hacia: mongoose.Types.ObjectId;
    fecha: Date;
  }[];
}

const JugadorSchema = new Schema(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    posicion: { type: String, required: true },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    isActive: { type: Boolean, default: true },

    
    transferencias: [
      {
        desde: { type: mongoose.Schema.Types.ObjectId, ref: "Club" },
        hacia: { type: mongoose.Schema.Types.ObjectId, ref: "Club" },
        fecha: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true, 
  }
);


export default mongoose.model<Jugador>("Jugador", JugadorSchema);
