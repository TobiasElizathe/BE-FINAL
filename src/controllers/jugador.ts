import { Request, Response } from "express";
import Jugador from "../models/jugador";
import Club from "../models/club";

const getJugadores = async (req: Request, res: Response) => {
  try {
    const jugadores = await Jugador.find().populate("club");
    res.status(200).json({
      message: "Jugadores obtenidos correctamente",
      data: jugadores,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getJugadoresById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jugador = await Jugador.findById(id).populate("club");

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
    const { nombre, apellido, fechaNacimiento, posicion, club } = req.body;

    if (!nombre || !apellido || !fechaNacimiento || !posicion || !club) {
      return res.status(400).json({
        message: "Faltan campos obligatorios",
        error: true,
      });
    }

    const existingClub = await Club.findById(club);
    if (!existingClub) {
      return res.status(404).json({
        message: "Club no encontrado",
        error: true,
      });
    }

    const nuevoJugador = new Jugador({
      nombre,
      apellido,
      fechaNacimiento,
      posicion,
      club,
    });

    await nuevoJugador.save();

    res.status(201).json({
      message: "Jugador creado correctamente",
      data: nuevoJugador,
      error: false,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error al crear jugador",
      error: true,
      details: error.message,
    });
  }
};

const updateJugador = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, fechaNacimiento, posicion, club } = req.body;

    const jugador = await Jugador.findByIdAndUpdate(
      id,
      {
        $set: { nombre, apellido, fechaNacimiento, posicion, club },
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

const desactivateJugador = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jugador = await Jugador.findByIdAndUpdate(
      id,
      { $set: { activo: false } },
      { new: true }
    );

    if (!jugador) {
      return res.status(404).json({
        message: "Jugador no encontrado",
        error: true,
      });
    }

    res.status(200).json({
      message: "Jugador desactivado correctamente",
      data: jugador,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      error: true,
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


const activateJugador = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jugador = await Jugador.findByIdAndUpdate(
      id,
      { $set: { activo: true } },
      { new: true }
    );

    if (!jugador) {
      return res.status(404).json({
        message: "Jugador no encontrado",
        error: true,
      });
    }

    res.status(200).json({
      message: "Jugador activado correctamente",
      data: jugador,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      error: true,
    });
  }
};

const transferJugador = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nuevoClubId } = req.body;

    const jugador = await Jugador.findById(id);
    if (!jugador) {
      return res.status(404).json({
        message: "Jugador no encontrado",
        error: true,
      });
    }

    const nuevoClub = await Club.findById(nuevoClubId);
    if (!nuevoClub) {
      return res.status(404).json({
        message: "Nuevo club no encontrado",
        error: true,
      });
    }

    // Si querés guardar historial, descomentá esto:
    jugador.transferencias?.push({
      desde: jugador.club,
      hacia: nuevoClubId,
      fecha: new Date(),
    });

    jugador.club = nuevoClubId;
    await jugador.save();

    res.status(200).json({
      message: "Transferencia realizada correctamente",
      data: jugador,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Error en la transferencia",
      error: true,
    });
  }
};

export {
  getJugadores,
  getJugadoresById,
  createJugador,
  updateJugador,
  deleteJugador,
  desactivateJugador,
  activateJugador,
  transferJugador,
getJugadoresByClub,
};
