//import packages
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = 3000
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')

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

app.use(bodyParser.urlencoded({extended: true}))

//setting routers
app.get('/',(req,res)=>{
    Todo.find()
    .lean()
    .then( todos => res.render('index', {todos}) )
    .catch( error =>console.log(error))
})

app.get('/todos/new',(req,res)=>{
    res.render('new')
})

app.post('/todos', (req,res)=>{
    const name = req.body.name
    return Todo.create({name})
     .then(() => res.redirect('/'))
     .catch(error => console.log(error) )
})

app.get('/todos/:id',(req,res)=>{
    const id =req.params.id
    return Todo.findById(id)
    .lean()
    .then( todo => res.render('detail', {todo}))
    .catch(error => console.log(error) )
})

app.get('/todos/:id/edit',(req,res)=>{
    const id =req.params.id
    return Todo.findById(id)
    .lean()
    .then( todo => res.render('edit', {todo}))
    .catch(error => console.log(error) )
})

app.post('/todos/:id/edit',(req,res)=>{
    const name = req.body.name
    const id = req.params.id
    return Todo.findById(id)
    .then( todo =>{
        todo.name = name
        return todo.save() 
    })
    .then(()=> res.redirect(`/todos/${id}`))
    .catch(error => console.log(error) )
})

app.post('/todos/:id/delete', (req,res)=>{
    const id = req.params.id
    return Todo.findById(id)
     .then( todo => todo.remove())
     .then(()=> res.redirect('/'))
     .catch(error => console.log(error) )
})


//start and listen the server
app.listen(port, ()=>{
    console.log(`The server is running on http://localhost:${port}`)
})