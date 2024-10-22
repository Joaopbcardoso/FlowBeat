import Express from "express";
import { criarTabelas, User } from "./db.js";
import bcryptjs from "bcrypt"

const app = Express()
app.use(Express.json())
//criarTabelas()

app.post('/registro', async (req, res) =>{
    const{ nome, sobrenome, email, senha, dataNascimento } = req.body
    if(!nome || !sobrenome || !email || !senha || !dataNascimento){
        res.send('você deve preencher todos os campos')
        return
    }
const userExiste = await User.findOne({ where: {email: email} })
if(userExiste){
    res.send('O usuário já existe')
    return
}
    const senhaCriptografada = bcryptjs.hashSync(senha, 10)
    const teste = await User.create({nome, sobrenome, email, senha: senhaCriptografada, dataNascimento})
    res.send('Usuário Criado')

    
})



app.post('/login', (req, res) =>{
    const{ email, senha } = req.body
    if(!email || !senha){
        res.send('você deve preencher todos os campos')
    }
    res.send('Usuário Logado')
})

app.listen(8000);