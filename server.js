const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')

const app = express()

const port = process.env.PORT||3000

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

app.use('/static', express.static(path.join(__dirname,'public')))

app.get('/', (req, res) => {
    res.render('base', {title: 'Crypt'})
})

app.post('/', (req, res) => {
    console.log(res.end(JSON.stringify(req.body)))
})

app.listen(port, () => {
    console.log("Listening...");
})