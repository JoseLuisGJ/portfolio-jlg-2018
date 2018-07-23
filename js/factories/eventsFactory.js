(function(angular) {

    'use strict';

    angular.module('myApp.eventsFactory', [])

    .factory("eventsFactory", ['$rootScope', function($rootScope) {
        return {
            subscribe: function(scope, callback) {
                var handler = $rootScope.$on('notifying-service-event', callback);
                scope.$on('$destroy', handler);
            },

            notify: function() {
                $rootScope.$emit('notifying-service-event');
            }
        };
    }]);

}(window.angular));
