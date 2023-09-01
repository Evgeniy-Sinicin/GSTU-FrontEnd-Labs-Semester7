//#region Connect modules
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
//#endregion

//#region Init vars
const PORT = process.env.PORT || 3000
const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
//#endregion

/**
 * Start app method
 */
async function start() {
    try {
        //#region Connect and set up db 
        await mongoose.connect('mongodb+srv://catpuff:1234qwer@cluster0.wofr3.mongodb.net/todos', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        })
        //#endregion

        //#region Run app
        app.listen(PORT, () => {
            console.log('Server has been started on http://localhost:3000...')
        })
        //#endregion
    } catch (ex) {
        console.log(ex)
    }
}

//#region Main code
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(todoRoutes)

start()
//#endregion