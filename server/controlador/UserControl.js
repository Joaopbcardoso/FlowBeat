import { User } from '../db.js'

const listUsers = async (req, res) => {
    if(!User){
        res.send('Não há usuários')
    }
    else{    
    const findUsers = await User.findAll()
    res.send(findUsers)
}

}

export { listUsers }