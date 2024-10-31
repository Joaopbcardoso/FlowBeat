import express from "express"
import { listUsers, uniqueUser, deleteUser } from "../controlador/userControl.js"

const userRoutes = express.Router()

userRoutes.get('/todos', listUsers)
userRoutes.get('/unico', uniqueUser)
userRoutes.delete('/delete', deleteUser)

export { userRoutes }