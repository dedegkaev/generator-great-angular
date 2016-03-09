angular.module('<%= appname %>', ['ui.bootstrap','<%= routerModuleName %>','ngAnimate']);

<% if (!uirouter) { %>
angular.module('<%= appname %>').config(function($routeProvider) {

    $routeProvider.otherwise({redirectTo:'/'});

});
<% } %>

<% if (uirouter) { %>
angular.module('<%= appname %>').config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

});
<% } %>


angular.module('<%= appname %>').run(function($rootScope) {
<% if (uirouter) { %>
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

    });

    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, fromState, fromParams) {

    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){

    });

    $rootScope.$on('$viewContentLoaded', function(event, toState, toParams, fromState, fromParams, error){

    });

    $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){

    });
<% } %>
});
