import Express from "express";
import { criarTabelas, User } from "./db.js";
import bcryptjs from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import cors from "cors"

const app = Express()
app.use(Express.json())
app.use(cors())

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

app.post('/login', async (req, res) => {
    const { email, senha, } = req.body
    if (!email || !senha) {
        res.send('voce deve preencher todos itens')
    }
    const userExiste = await User.findOne({ where: { email: email } })
    if (!userExiste) {
        res.send('Este usuario não existe')
        return
    }

    const senhaValida = bcryptjs.compareSync(senha, userExiste.senha)
    if(!senhaValida){
        res.send('senha invalida')
        return
    }

    const token = jsonwebtoken.sign(
        {
            "nome_completo": `${userExiste.nome} ${userExiste.sobrenome}`,
            "email": userExiste.email,
            "status": userExiste.status
    },
    'chavecriptografiajwt',
    {expiresIn: 100*60*5}
    )
    console.log(token);
    res.send("usuario criado com sucesso")
})
app.listen(8000)