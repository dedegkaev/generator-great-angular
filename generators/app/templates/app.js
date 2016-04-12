angular.module('<%= appname %>', ['ui.bootstrap', '<%= routerModuleName %>', '<%= requestsSvcName %>', 'ngAnimate']);
<% if (!uirouter) { %>
angular.module('<%= appname %>').config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({redirectTo:'/'});
    $locationProvider.html5Mode(true);
});
<% } %><% if (uirouter) { %>
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
