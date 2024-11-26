import { User } from '../db.js'
import bcryptjs from 'bcrypt'

const listUsers = async (req, res) => {
    const allUsers = await User.findAll()
    res.send(allUsers)
}

const uniqueUser = async(req, res) =>{
    const { email } = req.body
    if(!email){
        res.send('você deve preencher todos os campos')
        return
    }
    const userExiste = await User.findOne({ where: {email: email} })
    res.send(userExiste)
}

const deleteUser = async(req, res) =>{
    const { email } = req.body
    const Delete = await User.destroy({ where: {email: email} })
    if(Delete){
        res.send('Usuário Deletado')
    }else('Usuário não Existe')
}

const updatePassword = async (req, res) => {
  const data = req.body;
  const user = await User.findOne({ where: { email: data.email } });
  if (!user) {
      res.send("Usuário não encontrado.")
      return
  }

  const senhaCriptografada = bcryptjs.hashSync(data.senha, 10);

  user.senha = senhaCriptografada;
  await user.save();
  res.send('Senha atualizada com sucesso.')
}


export { listUsers, uniqueUser, deleteUser, updatePassword }