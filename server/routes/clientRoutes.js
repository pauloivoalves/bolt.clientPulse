import express from 'express';
import { createClient, getClients, updateClient, deleteClient } from '../controllers/clientController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/clients', auth, createClient);
router.get('/clients', auth, getClients);
router.put('/clients/:id', auth, updateClient);
router.delete('/clients/:id', auth, deleteClient);

export default router; 