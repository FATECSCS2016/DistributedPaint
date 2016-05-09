var express = require('express');
var app = express();
var paintLista=[];
var version = 1;
app.use(express.static('public'));
var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
var io = require('socket.io')(server);
var nUsers=0;

io.on('connection', function(socket)
{
  socket.on("login",function(name)
  {
    socket.name=name;
    nUsers++;
    console.log('The user: ' + name+" is now logged!");
    console.log(nUsers+" usuarios logados!");
    io.emit('receberPaint',name);
    //io.emit('chat message', name+" logado!");
  });
  
  socket.on("criarPaint",function(data)
  {
    paintLista.push({version:version,data:data});
    version++;
    console.log(paintLista);
    io.emit('atualizarLista',paintLista);
  });
  
  socket.on('disconnect', function ()
  {
      if(nUsers>0)
      {
        nUsers--;
      }
       console.log(socket.name+': '+' se desconectou!');
       io.emit('chat message',socket.name+': '+' se desconectou!');
  });
});