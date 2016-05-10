/*var canvas = null;
var ctx =null;
var mouseClicked=false;
var socket = io();
var socket = io.connect('127.0.0.1:8080'); 
$(document).ready(function(){
    $("#text1").text("Hello world!");
    canvas = document.getElementById("paint");
    ctx = canvas.getContext("2d"); 
    canvas.addEventListener("mousedown",function(event){mouseClicked=true},false);
    canvas.addEventListener("mouseup",function(event){mouseClicked=false},false);
    canvas.addEventListener("mousemove",getMousePosition);
});
var started = false;
function getMousePosition(event)
{
    var x = event.clientX;//gets the x position of the mouse click
    var y = event.clientY; //gets the y position of the mouse click
    var border=canvas.getBoundingClientRect();//checks the bounding of the canvas
    x-=border.left;//decreases x by subtracting left margin size of the canvas
    y-=border.top;//decreases y by subtracting top margin size of the canvas
    //console.log({x:x,y:y, mouseState: mouseClicked})
   if(mouseClicked && !started){
        ctx.beginPath();
        ctx.moveTo(x, y);  
        started = true;
   }
   else if(started && mouseClicked) {
            ctx.lineTo(x, y);
            ctx.stroke();
   }
   else if(started && !mouseClicked){
       started=false;
       sendPaint();
   }
}
function sendPaint(){
    var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //canvas232(canvas.toDataURL());
    console.log("sending");
    socket.emit('criarPaint',canvas.toDataURL());
}
socket.on('receberPaint',function(data){
    canvas2 = document.getElementById("paint2");
    ctx2 = canvas2.getContext("2d"); 
    var img = new Image;
    img.src = data;
    img.onload = function(){
        ctx2.drawImage(img,0,0); // Or at whatever offset you like
    }
});

socket.on('atualizarLista',function(data){
    $("#paintLista").empty();
    $.each(data,function(key,value){
        console.log(key+":"+value.version);
        $("#paintLista").append('<li id='+value.version+'>'+value.version+'</li>');
    });
});
$("#paintLista li").click(function(){
    console.log(this.id);
    console.log(oi);
});*/