import express from "express";
import {
  getClubs,
  createClub,
  getClubById,
  updateClub,
  deleteClub,
  desactivateClub,
  activateClub,
} from "../../controllers/club";

const router = express.Router();

router.get("/", getClubs);
router.post("/", createClub);
router.get("/:id", getClubById);
router.put("/update/:id", updateClub);
router.delete("/delete/:id", deleteClub);
router.patch("/:id/desactivate", desactivateClub);
router.patch("/:id/activate", activateClub);

export default router;
