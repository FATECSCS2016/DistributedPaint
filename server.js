var express = require('express');
var app = express();
var paintLista=[];
var version = 1;
app.use(express.static('public'));
var server = app.listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
var io = require('socket.io')(server);
var nUsers=0;

io.on('connection', function(socket)
{
  socket.emit('atualizarLista',paintLista);
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