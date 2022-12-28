import { defaultMaxListeners } from "events";
import { Router } from "express";

const router = Router()

router.get('/');

router.get('/:id');

router.post('/');

router.delete('/:id');

export default router;