import Express from "express";
import { criarTabelas } from "./db.js";
import cors from "cors"
import { routes } from "./routing/routes.js";
import { userRoutes } from "./routing/userRoutes.js"

const app = Express()
app.use(Express.json())
app.use(cors())

app.use('/autenticacao', routes)
app.use('/usuarios', userRoutes)

app.listen(8000)