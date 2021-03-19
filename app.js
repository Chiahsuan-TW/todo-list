//import packages
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const exphbs = require('express-handlebars')

//setting connection
mongoose.connect('mongodb://localhost/todo-list',  { useNewUrlParser: true,useUnifiedTopology: true  })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error',()=>{
    console.log('mongodb error!')
})
// 連線成功
db.once('open',()=>{
    console.log('mongodb connected!')
})

//setting template engine
app.engine('hbs', exphbs({defaultLayout:'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

//setting routers
app.get('/',(req,res)=>{
    res.render('index')
})

//start and listen the server
app.listen(port, ()=>{
    console.log(`The server is running on http://localhost:${port}`)
})