import express from 'express';
import{
    getJugadores,
    createJugador,
    getJugadoresById,
    updateJugador,
    deleteJugador,   
    getJugadoresByClub
} from '../../controllers/jugador';


const router = express.Router();

router.get('/', getJugadores);
router.post('/', createJugador);
router.get('/:id', getJugadoresById);
router.put('/update/:id', updateJugador);
router.delete('/delete/:id', deleteJugador);    
router.get('/club/:clubId', getJugadoresByClub);



export default router;