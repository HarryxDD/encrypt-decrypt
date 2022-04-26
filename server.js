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


public_key = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDB/ylR7rZ1OnYUYT2O05HqjLZc
l+Gd4oeaZAjiPD1LIk9zigpfx8an35jmgjEterSY3kkx1qyojQf/u/7FK4Dn+UFd
59OUGxoDlyK5zqYFZTyo+0QWSd4XHyY0f4NFeq7y5U9aftvteWd4MkQbY7gDoRB+
6byxjrn58uoQuns95wIDAQAB
-----END PUBLIC KEY-----`

private_key = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQDB/ylR7rZ1OnYUYT2O05HqjLZcl+Gd4oeaZAjiPD1LIk9zigpf
x8an35jmgjEterSY3kkx1qyojQf/u/7FK4Dn+UFd59OUGxoDlyK5zqYFZTyo+0QW
Sd4XHyY0f4NFeq7y5U9aftvteWd4MkQbY7gDoRB+6byxjrn58uoQuns95wIDAQAB
AoGAN9z6URWkhO1ow0WdLFvQUPJkMRWraoOo+NSFmmAuZkxjBKpjgmFM21qP9RDY
iHglOUAJY8ilv4OdIg9Itg5o9+MqiCT8s9tjsi52fu/UWVpDEzaK8YmDWyJ9lrFf
UBRxw/22tqMG6wIYg6z9ulXZiknHzCtoI7qBy7Dx9m0nFAECQQDvUy61DxxKLTZU
CvMSupXXwaVm+14fEg2hXppGa4fp9DNKzohIXbFCDvwKjUegnhDbmi37VxAg6ViL
V1sZEiAnAkEAz4N2uEpe9rI70LP5AHXIjvCTdJ79/nRKFxwD76bAOjasSz8bcM1D
zIN9RjB85aq2f1Rgg8V3SX6BPs0aIe7MQQJBAM5xzeenujqOV8AVlerBA0MTqy9z
hJR+yT07Uw+N8LcyzRApqsvp7l9Sd75OcswtrdMRY7rdNm99esDwQQgWZ58CQDUD
qgXlAiPWXw+vmvKyJJ3X+mP15n/mZ7NFtf+4wy1cIGJM6g7EcgjCovOWmaH3Hg6j
mNCxVwtQpWZM8dsvbcECQC/tjg/yGt/kIZuY5BUvvlXmYw0dzQRWHyvrdSb0sT//
83MFzo5CumOnAAX4XnHm/RWMji3iuri4L72R9XyE9b4=
-----END RSA PRIVATE KEY-----`

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