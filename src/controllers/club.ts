import { Request, Response } from "express";
import Club from "../models/club";

const getClubs = async (req: Request, res: Response) => {
  try {
    const clubs = await Club.find().populate("jugadores");
    res.status(200).json({
      message: "Clubs fetched successfully",
      data: clubs,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getClubById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const club = await Club.findById(id).populate("jugadores");

    if (!club) {
      return res.status(404).json({
        message: "Club not found",
        error: true,
      });
    }

    res.status(200).json({
      message: "Club fetched successfully",
      data: club,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const createClub = async (req: Request, res: Response) => {
  try {
    const nuevoClub = new Club(req.body);
    const clubGuardado = await nuevoClub.save();
    res.status(201).json(clubGuardado);
  } catch (error: any) {
    // Especificar 'any' para manejar el error como objeto
    console.error("Error al crear el club:", error); // Mejorar el manejo de errores para dar más detalle al frontend

    if (error.name === "ValidationError") {
      // Mongoose Validation Error
      const errors: { [key: string]: string } = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({
        message: "Validation failed",
        errors: errors, // Esto envía los mensajes de error de Mongoose
      });
    } else if (error.code === 11000) {
      // MongoServerError para duplicados (ej. si tienes un campo 'unique')
      return res.status(409).json({
        message: "Duplicate key error",
        detail: error.message,
      });
    } // Para otros errores inesperados del servidor

    res.status(500).json({
      message: "Internal Server Error",
      detail: error.message || "Error desconocido al crear el club",
    });
  }
};

const updateClub = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const club = await Club.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!club) {
      return res.status(404).json({
        message: "Club not found",
        error: true,
      });
    }

    res.status(200).json({
      message: "Club updated",
      data: club,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Error updating club",
      error: true,
    });
  }
};

const deleteClub = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const club = await Club.findByIdAndDelete(id);

    if (!club) {
      return res.status(404).json({
        message: "Club not found",
        error: true,
      });
    }

    res.status(200).json({
      message: "Club deleted",
      data: club,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export { getClubs, getClubById, createClub, updateClub, deleteClub };
