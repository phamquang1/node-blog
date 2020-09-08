
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const sortMiddleware = require('./app/middlewares/sort.middleware')

const path = require('path')
// const { urlencoded } = require('express')
const app = express()
const port = 3000

const route = require('./routes/index')
const db = require('./config/db/index')

//connect DB
db.connect();
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
// use middleware
app.use(sortMiddleware)

//
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

// Để dùng các file tĩnh như css...
app.use(express.static(path.join(__dirname,'public')))

//http logger
// app.use(morgan('combined'))

//template engine
app.engine('handlebars', handlebars({
  helpers : require('./helpers/sortable.handlebars')
}));
app.set('view engine', 'handlebars');
app.set('views',path.join(__dirname,'resources','views'))

// Routes init
route(app)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})