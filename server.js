const {copy, concat, compile} = require('./exportify.js');

const StaticServer = require('static-server');

const Twit = require('twit');
const secrets = require('./secrets.json');

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

//let stream = T.stream('statuses/sample');

let stream = { on: function() {} };

stream.on('tweet', (tweet) => {
  console.log(tweet);
  // emit event with tweet as data
});

stream.on('limit', (limitMessage) => {
  console.log(limitMessage);
});

stream.on('disconnect', (disconnectMessage) => {
  console.log(disconnectMessage)
  rerunConnect = true;
  attemptReconnect();
});

stream.on('connected', (response) => {
  rerunConnect = false;
  exponentialDropoff = 1000;
});

let rerunConnect = false;
let exponentialDropoff = 1000;

function attemptReconnect() {
  if (rerunConnect) {
    setTimeout(() => {
      stream = T.stream('statuses/sample');
      exponentialDropoff += exponentialDropoff;
      attemptReconnect();
    }, exponentialDropoff);
  }
}

//setup websockets //////////////////////////////////////

// listen to tweet event, fire websocket event



//start server //////////////////////////////////////////

const server = new StaticServer({
  rootPath: './app',
  port: 1337
});

server.start(() => {
  console.log('server listening to', server.port);
});

