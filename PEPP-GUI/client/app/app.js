
var app = angular.module('pepp-app', ['ngRoute', 'pepp.templates', 'pepp-module-all']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/tab/:name?', {
            templateUrl: 'tabs/home.html'
        })
        .otherwise({
            redirectTo: '/'
        })

});