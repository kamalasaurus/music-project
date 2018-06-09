const {copy, concat, compile} = require('./exportify.js');

const EventEmitter = require('events');

const liveServer = require('live-server');

const Twit = require('twit');
const secrets = JSON.parse(require('./secrets.json'));

//build upon launch //////////////////////////////////////

const scripts = [
  './node_modules/tone/build/Tone.min.js',
  './node_modules/tunajs/tuna-min.js'
]
.map(copy)
.reduce(concat, '');

compile(scripts);

//setup Twit ////////////////////////////////////////////

const T = new Twit(secrets);
//const stream = T.stream('statuses/filter', {track: 'love'});

const stream = T.stream('statuses/sample');

stream.on('tweet', (tweet) => {
  console.log(tweet);
});

//setup websockets //////////////////////////////////////




liveServer.start({
  root: 'app'
});

