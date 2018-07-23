(function(angular) {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('myApp', [
        'ngRoute',
        'preloader.module',

        'myApp.eventsFactory',
        'myApp.mainCtrl',
        'myApp.mainFactory',
        'myApp.project1Ctrl',
        'myApp.project2Ctrl',
        'myApp.project3Ctrl',
        'myApp.project4Ctrl',
        'myApp.version',
        'pascalprecht.translate',
        'myApp.modelData'

    ])

    .config(['$locationProvider', '$routeProvider', '$translateProvider', function($locationProvider, $routeProvider, $translateProvider) {
        //$locationProvider.hashPrefix('!');

        $routeProvider.otherwise({
            redirectTo: '/proyectos/aguas-de-valencia'
        });

    }]);

}(window.angular));
