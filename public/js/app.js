var app = angular.module('paintApp',['ui.router','paintApp.services','paintApp.controllers']);

app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/login");
  //
  // Now set up the states
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "login.html",
      controller:"loginController"
    })
    .state('paint', {
      url: "/paint",
      templateUrl: "paint.html",
      controller:"paintController"
    })
    .state('admin', {
      url: "/admin",
      templateUrl: "admin.html",
      controller:"adminController"
    });
});