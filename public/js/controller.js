var app = angular.module('paintApp',['paintApp.services']);
app.controller('paintController',function($scope,socket){
    var canvas = document.getElementById("paint");
    var ctx = canvas.getContext("2d");
    var started = false;
    $scope.mousePressed=false; 
    $scope.mouseF = function($event){
        var border=canvas.getBoundingClientRect();
        var x = $event.originalEvent.pageX;
        var y = $event.originalEvent.pageY;
        x-=border.left;
        y-=border.top;
        //if($scope.mousePressed)console.log({x:x,y:y});
        if($scope.mousePressed && !started){
            ctx.beginPath();
            ctx.moveTo(x, y);  
            started = true;
        }
        else if(started && $scope.mousePressed) {
                ctx.lineTo(x, y);
                ctx.stroke();
        }
        else if(started && !$scope.mousePressed){
            started=false;
            sendPaint();
        }
    };
    function sendPaint(){
        console.log("sending");
        socket.emit('criarPaint',canvas.toDataURL());
    }
    
    
    socket.on('atualizarLista', function (data) {
        console.log(data);
    });
    socket.emit('criarPaint', {
      message: "teste"
    });
});