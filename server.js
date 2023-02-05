const http = require('http')
const fs = require('fs')

const host = 'localhost'
const port = 8080

const httpServer = http.createServer(httpHandler)

httpServer.listen(port, host, () => {
    console.log(`HTTP server was ranning at http://${host}:${port}`)
})

function httpHandler(req, res) {
    let fileName = null
    if (req.url === '/') {
        fileName = 'index.html'
    } else {
        fileName = req.url
    }
    fs.readFile('./assets/' + fileName, function (err, data) {
        if (err == null) {
            res.writeHead(200, { 'Content-type': 'text/html' })
            res.write(data)
            res.end()
        } else {
            fs.readFile('./assets/error.html', function(err, data) {
                res.writeHead(404, {'Content-type' : 'text/html'})
                res.write(data)
                res.end()
            })
            console.log(err)
        }
    })
}
