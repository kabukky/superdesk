define([
    'angular'
], function(angular) {
    'use strict';

    angular.module('superdesk.menu', []).
        directive('sdMenu', function($route) {
            return {
                templateUrl: 'scripts/superdesk/menu/menu.html',
                replace: false,
                priority: -1,
                link: function(scope, element, attrs) {
                    scope.items = [];
                    angular.forEach($route.routes, function(route) {
                        if ('menu' in route) {
                            var item = {label: route.menu.label, priority: route.menu.priority, href: route.originalPath};
                            if (route.menu.parent === undefined) {
                                scope.items.push(item);
                            } else {
                                var found = false;
                                for (var i = 0; i < scope.items.length; i = i + 1) {
                                    if (scope.items[i].label === route.menu.parent) {
                                        found = true;
                                        if (scope.items[i].items === undefined) {
                                            scope.items[i].items = [];
                                        }
                                        scope.items[i].items.push(item);
                                    }
                                }
                                if (found === false) {
                                    var maxPriority = 0;
                                    for (var i = 0; i < scope.items.length; i = i + 1) {
                                        if (scope.items.priority > maxPriority) {
                                            maxPriority = scope.items.priority;
                                        }
                                    }
                                    var parent = {label: route.menu.parent, priority: maxPriority + 1, items: [item]};
                                    scope.items.push(parent);
                                }
                            }
                        }
                    });
                }
            };
        });
});
