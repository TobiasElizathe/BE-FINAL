import { Request, Response } from "express";
import Club from "../models/club";
import Jugador from "../models/jugador";


const getClubs = async (req: Request, res: Response) => {
  try {
    const clubs = await Club.find().populate("players");
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
    const club = await Club.findById(id).populate("players");

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

const createClub = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, location, establishedAt } = req.body;

    if (!name || !location || !establishedAt) {
      res.status(400).json({
        message: "Name, location and establishedAt are required.",
        error: true,
      });
      return;
    }

    const newClub = new Club({
      name,
      location,
      establishedAt,
      players: [],
    });

    await newClub.save();

    res.status(201).json({
      message: "Club created successfully",
      data: newClub,
      error: false,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error creating club",
      error: true,
      details: error.message,
    });
  }
};

const updateClub = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, location, establishedAt } = req.body;

    const club = await Club.findByIdAndUpdate(
      id,
      {
        $set: { name, location, establishedAt },
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

export {
  getClubs,
  getClubById,
  createClub,
  updateClub,
  deleteClub,
};

