import express from "express";
import { getAllUsers, newUser, getUser, deleteUser } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";
const app = express.Router();

app.post('/new', newUser);
app.get('/getall', adminOnly, getAllUsers);
app.get('/:id', getUser)
app.delete('/:id', adminOnly, deleteUser)


export default app;