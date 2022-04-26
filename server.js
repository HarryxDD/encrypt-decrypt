const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')

const NodeRSA = require('node-rsa')
const key = new NodeRSA({b: 1024})

const app = express()

const port = process.env.PORT||3000


// var encrypted = key.encrypt(text, 'base64') // public
// console.log('encrypted: ', encrypted)

// const decrypted = key.decrypt(encrypted, 'utf8') // private
// console.log('decrypted: ', decrypted)


//  GENERATE PUBLIC AND PRIVATE KEY

// var public_key = key.exportKey('public')
// var private_key = key.exportKey('private')
// console.log(`${public_key} \n ${private_key}`)


public_key = ``

private_key = ``

let key_private = new NodeRSA(private_key)
let key_public = new NodeRSA(public_key)

var message = ''
var encryptText = ''

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

app.use('/static', express.static(path.join(__dirname,'public')))

app.get('/', (req, res) => {
    res.render('base', {encrypt: '', decrypt: ''})
})

app.post('/', (req, res) => {
    message = req.body.text
    encryptText = key_public.encrypt(message, 'base64')
    res.render('base', {encrypt: encryptText, decrypt: ''})
})

app.get('/decrypt', (req, res) => {
    var decryptText = key_private.decrypt(encryptText, 'utf8')
    res.render('base', {encrypt: encryptText, decrypt: decryptText})
})

app.listen(port, () => {
    console.log("Listening...");
})
