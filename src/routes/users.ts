import { Router } from "express";

import { createUser, getUsers } from "../controllers/users";

const router = Router()

router.get('/', getUsers);

router.get('/:id');

router.post('/', createUser);

router.delete('/:id');

export default router;