import express from 'express';
import{
    getClubs,
    createClub,
    getClubById,
    updateClub,
    deleteClub,
} from '../../controllers/club';


const router = express.Router();

router.get('/', getClubs);
router.post('/', createClub);
router.get('/:id', getClubById);
router.put('/update/:id', updateClub);
router.delete('/delete/:id', deleteClub);

export default router;