import { Request, Response } from "express";
import Jugador from "../models/jugador";



const getJugadores = async (req: Request, res: Response) => {
  try {
    const jugadores = await Jugador.find().populate("club"); // <- populate del club

    res.status(200).json({
      message: "Jugadores obtenidos correctamente",
      data: jugadores,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      data: null,
      error: true,
    });
  }
};

const getJugadoresById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jugador = await Jugador.findById(id).populate("club"); // <- populate del club

    if (!jugador) {
      return res.status(404).json({
        message: "Jugador no encontrado",
        error: true,
      });
    }

    res.status(200).json({
      message: "Jugador obtenido correctamente",
      data: jugador,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};
const createJugador = async (req: Request, res: Response) => {
  try {
    const nuevoJugador = new Jugador(req.body);
    await nuevoJugador.save();
       res.status(201).json({
      message: "jugador created successfully",
      data: nuevoJugador,
      error: false,
    });
    return;
  } catch (error : any) {
  res.status(400).json({error: error.message});
  }
};

const updateJugador = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jugador = await Jugador.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!jugador) {
      return res.status(404).json({
        message: "Jugador no encontrado",
        error: true,
      });
    }

    res.status(200).json({
      message: "Jugador actualizado correctamente",
      data: jugador,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Error al actualizar jugador",
      error: true,
    });
  }
};

const deleteJugador = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jugador = await Jugador.findByIdAndDelete(id);

    if (!jugador) {
      return res.status(404).json({
        message: "Jugador no encontrado",
        error: true,
      });
    }

    res.status(200).json({
      message: "Jugador eliminado",
      data: jugador,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};




const getJugadoresByClub = async (req: Request, res: Response) => {
    try {
        const { clubId } = req.params;

        const jugadores = await Jugador.find({ club: clubId }).populate('club', 'name');

        if (jugadores.length === 0) {
            return res.status(404).json({ message: 'No se encontraron jugadores para este club.' });
        }

        return res.status(200).json(jugadores);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener jugadores del club', error });
    }
};





export {
  getJugadores,
  getJugadoresById,
  createJugador,
  updateJugador,
  deleteJugador,
  getJugadoresByClub,
};
