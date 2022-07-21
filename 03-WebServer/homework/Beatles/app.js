var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]


http.createServer((req, res) => {
  if(req.url === "/"){
    const htmlRead = fs.readFileSync(__dirname + '/index.html');
    res.writeHead(200)
    res.end(htmlRead)
  }
  if (req.url === "/api") {
    res.writeHead(200, {"Content-Type": "application/json"})
    const beatlesJson = JSON.stringify(beatles)
    res.end(beatlesJson)
  } else {
    if( req.url.startsWith('/api/')) {
      const getNameFromUrl = req.url.slice(5).replace('%20', ' ')
      const foundBeatle = beatles.find(beatle => beatle.name.toLowerCase() === getNameFromUrl.toLowerCase())
      if (foundBeatle) {
        res.end(JSON.stringify(foundBeatle))
      } else {
        res.end("404, beatle no encontrado")
      }
      
    } else{
      const getNameFromUrl = req.url.slice(1).replace('%20', ' ')
      const foundBeatle = beatles.find(beatle => beatle.name.toLowerCase() === getNameFromUrl.toLowerCase())
      if (!foundBeatle) {
        res.end("404, beatle no encontrado")
      } else {
       var htmlRead =    fs.readFileSync(__dirname + '/beatle.html', 'utf8')    
       htmlRead =htmlRead.replace('{titulo}', foundBeatle.name)
                         .replace('{nombre}', foundBeatle.name).replace('{fecha}', foundBeatle.birthdate)
                         .replace('{img}', foundBeatle.profilePic)
       res.end(htmlRead)
      }
    }
  }
}).listen(3001, () => {
  console.log("server escuchando correctamente")
})
