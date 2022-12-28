import { Router } from "express";
import { createUser, getUsers, getUser, deleteUser } from "../controllers/users";

const router = Router()
router.get('/:age?/:type?/:role?/:occupation?', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.delete('/:id', deleteUser);

export default router;