import express from "express"
import { listUsers } from "../controlador/UserControl.js"

const userRoutes = express.Router()

userRoutes.get('/todos', listUsers)

export { userRoutes }