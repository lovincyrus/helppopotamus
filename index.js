var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var watson = require('watson-developer-cloud');


app.get('/', function(req, res){
  res.sendfile('index.html');
});


// show user connects / disconnects
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


io.emit('some event', { for: 'everyone' });



var conversation = watson.conversation({
  username: '6912bfee-e656-49b8-9870-232c5be8c4c8',
  password: 'rR1HfTCLIgRJ',
  version: 'v1',
  version_date: '2016-07-11'
});

var context={};

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg + jsonContent.output.text);
    conversation.message({
      workspace_id: 'e14c46ac-234c-464b-8e1f-550124fe1f67',
      input: {'text': msg},
      context: context
    },  function(err, response) {
      if (err)
      console.log('error:', err);
      else
      console.log(JSON.stringify(response, null, 2));
    });
  });
});


var fs = require("fs");
var content = fs.readFileSync("response.json");
var jsonContent = JSON.parse(content);
console.log(jsonContent.output.text);



http.listen(3000, function(){
  console.log('listening on *:3000');
});
