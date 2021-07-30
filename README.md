# editframe-js

`editframe-js` is the offical Node client for interacting with the Editframe API.

**This library currently only works in `Node` environments and does not work in a browser. Additionally, this should only be used in server environments to protect your API key.**

# Installation

```
npm install @editframe/editframe-js
```

## Usage

Calls to the Editframe API require a Client ID and an application-specific API token. These keys can be accessed from the Editframe Developer Portal. These library variables can be provided during instantiation as follows:

```javascript
const Editframe = require('@editframe/editframe-js')

const CLIENT_ID = '95c8iVaFny0zyKOqd7QnJZ'
const TOKEN = '3kVr62bFsulhyKOqd7QnJZ'

const editframe = new Editframe({ clientId: CLIENT_ID, token: TOKEN })
```

Retrieving applications registered to user : 

```javascript 
await editframe.applications.all()
```

Retrieving videos belonging to an authorized application

```javascript 
await editframe.videos.all()
```

Retrieving an encoding/encoded video

```javascript 
await editframe.videos.find('yKOqd7QnJZ')
```

Constructing a video clip from images and audio :

```javascript 
const video = editframe.videos.build({ resolution: '700x700', duration: 12 })
const imageOne = 'https://media0.giphy.com/media/gK99k8iMtKeJ2/giphy.gif?cid=ecf05e47iow5n0ep2sb40lm4bh8kvs7sckmh6af7zwwdurvi&rid=giphy.gif&ct=g'
const imageTwo = 'https://media4.giphy.com/media/52Ywm818WNeuI/giphy.gif?cid=ecf05e4778nj4l3n55qqacjclcj0nf0ux9cqnbv1lsl0d0r2&rid=giphy.gif&ct=g'
const imageThree = 'https://media4.giphy.com/media/2csuIJj6TmuKA/giphy.gif?cid=ecf05e47zc9z0u2nh4skss842n5fiyu07unyxt8derf9ax1u&rid=giphy.gif&ct=g'
const logo = fs.createReadStream(path.resolve('./logo.png'))
const audioFile = 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_2MG.mp3'

video.addImage(imageOne, { format: 'fill', start: 0, end: 4 })
video.addImage(imageTwo, { format: 'fill', start: 4, end: 8 })
video.addImage(imageThree, { format: 'fill', start: 8, end: 12 })
video.addImage(logo, { x: 'center', y: 'center' })
video.addAudio(audioFile)

await video.encode()
```

Trimming an existing video clip:

```javascript 
const video = editframe.videos.fromClip(fs.createReadStream(path.resolve('./clip.mp4')))
video.trim(0, 10)
video.encode()
```

Add a filter to an existing video clip:

```javascript 
const video = editframe.videos.fromClip(fs.createReadStream(path.resolve('./clip.mp4')))
video.mute().filter('grayscale').fadein({ duration: 3 })
video.encode()
```