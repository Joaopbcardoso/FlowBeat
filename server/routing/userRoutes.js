import express from "express"
import { listUsers, uniqueUser, deleteUser, updatePassword } from "../controlador/userControl.js"

const userRoutes = express.Router()

userRoutes.get('/todos', listUsers)
userRoutes.get('/unico', uniqueUser)
userRoutes.delete('/delete', deleteUser)
userRoutes.post('/updatePassword', updatePassword);

export { userRoutes }