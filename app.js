//import packages
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const port = 3000
const exphbs = require('express-handlebars')
const routes = require('./routes')

require('./config/mongoose')

//setting template engine
app.engine('hbs', exphbs({defaultLayout:'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({extended: true}))

app.use(methodOverride('_method'))

app.use(routes)


//start and listen the server
app.listen(port, ()=>{
    console.log(`The server is running on http://localhost:${port}`)
})