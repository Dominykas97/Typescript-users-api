import { Router } from "express";

import { createUser, getUsers, getUser } from "../controllers/users";

const router = Router()

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', createUser);

router.delete('/:id');

export default router;