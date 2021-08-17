//production or development env for mongoose
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

//express
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const stocksRouter = require('./routes/stocks')

//setting views and layouts of MVC
app.set('view engine', 'ejs')
app.set('views', __dirname+'/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ 
    extended: true,
    limit: '10mb'
}))

//mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

//loading routes (or) contoller of MVC
app.use('/', indexRouter)
app.use('/stocks', stocksRouter)

//localhost listen
app.listen(process.env.PORT || 3000)