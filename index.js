const express = require('express')
const gtts = require('node-gtts')('pt-br');
var path = require('path');
var filepath = path.join(__dirname, 'output.wav');

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    const text = req.body.text

    gtts.save(filepath, text, async function() {
        console.log('save done');
        await res.download('output.wav')
    })
})

app.listen(3000, () => {
    console.log('Server is listen on port 3000')
})