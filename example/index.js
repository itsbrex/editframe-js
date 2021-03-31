const Editframe = require('@editframe/editframe-js')
const fs = require('fs')
const http = require('http')
const port = 3000

const CLIENT_ID = ''
const TOKEN = ''

const requestHandler = (request, response) => {
  response.setHeader("Content-Type", "application/json")
  const editframe = new Editframe({ clientId: CLIENT_ID, token: TOKEN })
  switch (request.url) {
    case "/applications":
      editframe.applications.all().then((applications) => {
        response.end(JSON.stringify(applications))
      }).catch((err) => {
        console.log(err)
      })
      break
    case "/videos":
      editframe.videos.all().then((videos) => {
        response.end(JSON.stringify(videos))
      }).catch((err) => {
        console.log(err)
      })
      break
    case "/videos/create":
      const video = editframe.videos.build({ aspectRatio: '1:1', backgroundColor: 'black', duration: 10, hd: false })
      video.addAudio(fs.createReadStream('./files/audio.mp3'))
      video.addImage(fs.createReadStream('./files/image.png'), { format: 'fit' })
      video.addWaveform({ 
        style: 'line', 
        height: 100, 
        color: '#be5c5c', 
        backgroundColor: 'transparent', 
        y: 'b:40' 
      })
      video.encode().then(data => {
        // video is processing
        response.end(JSON.stringify(data))
      }).catch(err => {
        // response failed, view error
        response.end(JSON.stringify(err.body))
      })
      break
    default:
      response.writeHead(404);
      response.end(JSON.stringify({ error: '404' }));
  }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('[editframe.js] Error : ', err)
  }
})