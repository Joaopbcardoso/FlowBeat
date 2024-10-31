import { User } from '../db.js'

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


export { listUsers, uniqueUser, deleteUser }