import { User } from '../db.js'
import bcryptjs from 'bcrypt'

const listUsers = async (req, res) => {
    const allUsers = await User.findAll()
    res.send(allUsers)
}

const uniqueUser = async (req, res) => {
    const { email } = req.body
    if (!email) {
        res.send('você deve preencher todos os campos')
        return
    }
    const userExiste = await User.findOne({ where: { email: email } })
    res.send(userExiste)
}

const deleteUser = async (req, res) => {
    const { email } = req.body
    const Delete = await User.destroy({ where: { email: email } })
    if (Delete) {
        res.send('Usuário Deletado')
    } else ('Usuário não Existe')
}
const change_password = async (req, res) => {
    try {
        const user_id = req.params.id;
        const { novaSenha } = req.body;

        if (!novaSenha) {
            return res.status(400).send('Todos os campos devem ser preenchidos');
        }
        const user = await User.findOne({ where: { id: user_id } });

        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }
        const senhaCriptografada = bcryptjs.hashSync(novaSenha, 10);
        user.senha = senhaCriptografada;
        await user.save();
        const { senha, ...userWithoutPassword } = user.toJSON();
        return res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error('Erro na troca de senha:', error);
        return res.status(500).send('Erro interno do servidor');
    }
}


export { listUsers, uniqueUser, deleteUser, change_password }