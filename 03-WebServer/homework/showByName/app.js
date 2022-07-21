var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http.createServer((req, res) => {
    if(req.url === "/") {
        res.end("showByName API")
    } else {
        try {
            const Image = fs.readFileSync(__dirname + `/images/${req.url}_doge.jpg`)
            
            res.writeHead(200, {"Content-Type": "Image/jpeg"})
            res.end(Image)
        } catch (error) {
            res.writeHead(404)
            res.end("404, imagen no encontrada")
        }
        
    }
    /*if(req.url === "/arcoiris") {
        const Image = fs.readFileSync(__dirname + '/images/arcoiris_doge.jpg')

        res.writeHead(200, {"Content-Type": "Image/jpeg"})
        res.end(Image)

    } else if (req.url === "/badboy") {
        const Image = fs.readFileSync(__dirname + '/images/badboy_doge.jpg')

        res.writeHead(200, {"Content-Type": "Image/jpeg"})
        res.end(Image)
    }*/
   
}).listen(3001, () => {
    console.log("server escuchando en el puerto 3001")
})