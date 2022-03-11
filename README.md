# editframe-js

[![npm version](https://badge.fury.io/js/%40editframe%2Feditframe-js.svg)](https://badge.fury.io/js/%40editframe%2Feditframe-js)

`editframe-js` is the offical Node client for interacting with the Editframe API.

**This library currently only works in `Node` environments and does not work in a browser. Additionally, this should
only be used in server environments to protect your API key.**

# Installation

Set your npm access token in your shell or installation will fail when trying to install `@editframe/shared-types`.

```
export NPM_TOKEN=your-token-goes-here
```

```
npm install @editframe/editframe-js

or

yarn add @editframe/editframe-js
```

## Commit Messages and Semantic Release

The `semantic-release` package is used for issuing git tags and releases, as well as publishing the NPM package. It
determines the next version number automatically by checking the commit messages for special tags that you must include.

### Release Types

- `patch`: 1.0 -> 1.0.1
- `minor`: 1.0 -> 1.1
- `breaking`: 1.0 -> 2.0

### Semantic Release Tags

- `build`: patch
- `chore`: none
- `ci`: patch
- `docs`: minor
- `feat`: minor
- `fix` patch
- `perf`: patch
- `refactor`: patch
- `revert`: patch
- `style`: patch
- `test`: patch
- `BREAKING CHANGE`: breaking

When you are committing a change that breaks the current public API of the package, you must add an additional line
below the main commit message with an explanation of the breaking changes, prefixed with the `BREAKING CHANGE: ` tag.

### Example commit

```
feat: adds new feature
```

### Example breaking commit

```
feat: makes xy change

BREAKING CHANGE: this changes the x parameter of type y
```

## Usage

Calls to the Editframe API require a Client ID and an application-specific API token. These keys can be accessed from
the Editframe Developer Portal. These library variables can be provided during instantiation as follows:

```javascript
const { Editframe } = require('@editframe/editframe-js')
// or
import { Editframe, CommonResolutions } from '@editframe/editframe-js'

const CLIENT_ID = 'XXXXXXXXXXXXXXXXXXXXXXX'
const TOKEN = 'XXXXXXXXXXXXXXXXXXXXXXX'

const editframe = new Editframe({ clientId: CLIENT_ID, token: TOKEN })

const composition = await editframe.new({ dimensions: CommonResolutions._1080pVertical })
// or
const composition = await editframe.new({ dimensions: { height: 1920, width: 1080 } })
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
await editframe.videos.get('yKOqd7QnJZ')
```

Constructing a video clip from images and audio :

```javascript
const composition = editframe.videos.new({ dimensions: { height: 700, width: 700 }, duration: 12 })
const imageOne =
  'https://media0.giphy.com/media/gK99k8iMtKeJ2/giphy.gif?cid=ecf05e47iow5n0ep2sb40lm4bh8kvs7sckmh6af7zwwdurvi&rid=giphy.gif&ct=g'
const imageTwo =
  'https://media4.giphy.com/media/52Ywm818WNeuI/giphy.gif?cid=ecf05e4778nj4l3n55qqacjclcj0nf0ux9cqnbv1lsl0d0r2&rid=giphy.gif&ct=g'
const imageThree =
  'https://media4.giphy.com/media/2csuIJj6TmuKA/giphy.gif?cid=ecf05e47zc9z0u2nh4skss842n5fiyu07unyxt8derf9ax1u&rid=giphy.gif&ct=g'
const logo = fs.createReadStream(path.resolve('./logo.png'))
const audioFile = 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_2MG.mp3'

composition.addImage(imageOne, { format: 'fill', start: 0, length: 4 })
composition.addImage(imageTwo, { format: 'fill', start: 4, length: 8 })
composition.addImage(imageThree, { format: 'fill', start: 8, length: 12 })
composition.addImage(logo, { x: 'center', y: 'center' })
composition.addAudio(audioFile)

await composition.encode()
```

Trimming an existing video clip:

```javascript
const composition = await editframe.videos.new({ backgroundColor: '#ffffff' }, './clip.mp4')
composition.setTrim({ start: 0, end: 10 })
composition.encode()
```

Add a filter to an existing video clip:

```javascript
const composition = await editframe.videos.new({ backgroundColor: '#ffffff' }, './clip.mp4')
composition.addFilter({ filter: { filterName: 'grayscale' } })
composition.addFilter({ filter: { filterName: 'fadeIn', options: { color: '#d0d0d0', duration: 3 } } })
composition.encode()
```
