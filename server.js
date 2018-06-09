const {copy, concat, compile} = require('./exportify.js');
const liveServer = require('live-server');

const scripts = [
  './node_modules/tone/build/Tone.min.js',
  './node_modules/tunajs/tuna-min.js'
]
.map(copy)
.reduce(concat, '');

compile(scripts);

liveServer.start({
  root: 'app'
});

