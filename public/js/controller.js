angular.module('paintApp.controllers',[])
.controller('loginController',function($scope,$state,user){
    $scope.logar=function(){
        if($scope.inputNome==undefined || $scope.inputNome==''){
            alert("Digite seu nome, POR FAVOR!!!!!!!!!");
        }else{
             console.log($scope.inputNome+" is logging!!!");
             user.set($scope.inputNome);
             $state.go('paint');
        }
    }
})
.controller('adminController',function($scope,socket,user){
    $scope.paintLista=null;
    socket.on('atualizarLista', function (data) {
        $scope.paintLista=data;
       // $scope.$apply();
    });
})
.controller('paintController',function($scope,socket,user){
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
        console.log(user.get());
        var data={
            nome:user.get(),
            data:canvas.toDataURL()
        }
        socket.emit('criarPaint',data);
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
            console.log($scope.paintLista[index].nome);
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