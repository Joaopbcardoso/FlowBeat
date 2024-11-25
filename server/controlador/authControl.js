import bcryptjs from "bcrypt";
import { User } from "../db.js";
import jsonwebtoken from "jsonwebtoken";

const registro = async (req, res) => {
    const { nome, sobrenome, email, senha, dataNascimento } = req.body;
    if (!nome || !sobrenome || !email || !senha || !dataNascimento) {
        res.send('você deve preencher todos os campos');
        return;
    }

    const userExiste = await User.findOne({ where: { email: email } });
    if (userExiste) {
        res.send('O usuário já existe');
        return;
    }

    const senhaCriptografada = bcryptjs.hashSync(senha, 10);
    await User.create({ nome, sobrenome, email, senha: senhaCriptografada, dataNascimento });
    res.send('Usuário Criado');
};

const login = async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.send('Você deve preencher todos os campos');
    }

    const userExiste = await User.findOne({ where: { email: email } });
    if (!userExiste) {
        return res.send('Este usuário não existe');
    }

    const senhaValida = bcryptjs.compareSync(senha, userExiste.senha);
    if (!senhaValida) {
        return res.send('Senha inválida');
    }

    const token = jsonwebtoken.sign(
        {
            nome: userExiste.nome,
            sobrenome: userExiste.sobrenome,
            email: userExiste.email,
            status: userExiste.status
        },
        'chavecriptografiajwt',
        { expiresIn: 100 * 60 * 5 } 
    );


    const decodedToken = jsonwebtoken.decode(token);

    res.json({
        mensagem: "Usuário logado",
        token: token,
        userData: decodedToken 
    });
};

export { registro, login };