import Express from "express";
import { criarTabelas } from "./db.js";
import cors from "cors"
import { routes } from './routing/routes.js'
import { userRoutes } from './routing/userRoutes.js'
import { rotas_artistas } from './routing/rotas_artista.js'
import { rotas_albums } from "./routing/rotas_album.js";

const app = Express()
app.use(Express.json())
app.use(cors())
criarTabelas()

app.use('/autenticacao', routes)
app.use('/user', userRoutes)
app.use('/artista', rotas_artistas)
app.use('/album', rotas_albums)


app.listen(8000, '0.0.0.0', () => {
    console.log('Servidor rodando na porta 8000');
  });
  