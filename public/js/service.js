angular.module('paintApp.services',[])
.factory('user', function () {
  //var socket = io.connect('http://paint-vapp1.rhcloud.com/');
  var nome = "";
  return {
    set: function (n) {
      nome=n;
    },
    get: function () {
      return nome;
    }
  };
})
.factory('socket', function ($rootScope) {
  //var socket = io.connect('http://paint-vapp1.rhcloud.com/');
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});