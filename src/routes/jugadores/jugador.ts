import express from 'express';
import{
    getJugadores,
    createJugador,
    getJugadoresById,
    updateJugador,
    desactivateJugador,
    activateJugador,
    deleteJugador,   
    transferJugador,   
    getJugadoresByClub
} from '../../controllers/jugador';


const router = express.Router();

router.get('/', getJugadores);
router.post('/', createJugador);
router.get('/:id', getJugadoresById);
router.put('/update/:id', updateJugador);
router.patch('/:id/desactivate', desactivateJugador);
router.patch('/:id/activate', activateJugador);
router.delete('/delete/:id', deleteJugador);
router.put('/:id/transfer', transferJugador);
router.get('/club/:clubId', getJugadoresByClub);



export default router;