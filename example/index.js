const Editframe = require('@editframe/editframe-js')
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
      video.addAudio('https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_1MG.mp3')
      video.addImage('https://images.unsplash.com/photo-1504266411383-1b1d524195f1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80')
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