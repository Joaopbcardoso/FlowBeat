import Express from "express";

const app = Express()
app.use(Express.json())

app.post('/registro', (req, res) =>{
    const{ nome, sobrenome, email, senha, dataNascimento } = req.body
    if(!nome || !sobrenome || !email || !senha || !dataNascimento){
        res.send('você deve preencher todos os campos')
    }
    console.log(email);
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