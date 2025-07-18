import express from "express";
import clubRouter from './clubes/club'; 
import jugadorRouter from './jugadores/jugador'; 

const router = express.Router();    

router.use("/clubes", clubRouter); 
router.use("/jugadores", jugadorRouter); 

export default router; 

    