import { Router } from "express";
import { createUser, getUsers, getUser, deleteUser } from "../controllers/users";

const router = Router()
router.get('/:id', getUser);
router.get('/:age?/:type?/:role?/:occupation?', getUsers);
router.post('/', createUser);
router.delete('/:id', deleteUser);

export default router;