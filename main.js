var express = require('express')
var fs = require('@smartkx/fs')
var vue = require('@smartkx/vue')

var file = `${__dirname}/html/index.html`

var data = {
    name: 'Neil is a Gimpy Boy',
    list: {
        items: [
            'ready',
            'set',
            'go!!!!!!!'
        ]
    }
}

var port = 3142

var app = express()

app.use(express.static('assets'))

app.get('/', async (req, res) => {
    console.log(`${new Date().toISOString()} GET ${req.originalUrl}`)
    try {
        var template = await fs.read({ file })
        var html = await vue.render(template, data)
        //var html = await vue.renderFile(test.file, test.data)
        console.log(html)
        res.send(html)
    } catch(e) {
        res.status(500).send(e.message)
    }
})

app.listen(port)