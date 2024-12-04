import express from "express"
import { listUsers, uniqueUser, deleteUser, change_password } from "../controlador/UserControl.js"

const userRoutes = express.Router()

userRoutes.get('/todos', listUsers)
userRoutes.get('/unico', uniqueUser)
userRoutes.delete('/delete', deleteUser)
userRoutes.put('/change-password/:id', change_password);

export { userRoutes }