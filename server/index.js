import { createServer } from 'node:http'
const servidor = createServer((req, res)=>{
    console.log('Hello World!')
    res.write('Ta Funcionando')
    return res.end()
})

servidor.listen(8000);