//import packages
const express = require('express')
const app = express()
const port = 3000

//setting routers
app.get('/',(req,res)=>{
    res.send('Hello World')
})

//start and listen the server
app.listen(port, ()=>{
    console.log(`The server is running on http://localhost:${port}`)
})