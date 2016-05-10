var app = angular.module('paintApp',['paintApp.services']);
app.controller('paintController',function($scope,socket){
    var canvas = document.getElementById("paint");
    var ctx = canvas.getContext("2d");
    var started = false;
    $scope.paintLista=null;
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
            //
        }
    };
    function sendPaint(){
        console.log("sending");
        socket.emit('criarPaint',canvas.toDataURL());
    };
    $scope.mudaVersao = function(){
        var index = $scope.selectedVersion;
        if(index!=undefined && index!==""){
            index--;
            $scope.cleanCanvas();
            var img = new Image;
            img.src = $scope.paintLista[index].data;
            img.onload = function(){
                ctx.drawImage(img,0,0); // Or at whatever offset you like
            }
            console.log($scope.paintLista[index].data);
        }
    };
    
    socket.on('atualizarLista', function (data) {
        $scope.paintLista=data;
       // $scope.$apply();
    });
    $scope.salvar= function(){
        sendPaint();
    }
    $scope.cleanCanvas= function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }
});