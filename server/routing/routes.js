import express from "express";
import { registro, login } from "../controlador/authControl.js"

const routes = express.Router()

routes.post('/registro', registro)

routes.post('/login', login)

export { routes }