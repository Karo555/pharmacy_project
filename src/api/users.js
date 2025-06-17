import express from 'express';
import { getUserById } from './database';

const router = express.Router();

router.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await getUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
