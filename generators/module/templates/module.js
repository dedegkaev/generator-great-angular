angular.module('<%= appname %>', ['ui.bootstrap','<%= routerModuleName %>','ngAnimate']);
<% if (!uirouter) { %>angular.module('<%= appname %>').config(function($routeProvider) {
    /* Add New States Above */
});
<% } %>
<% if (uirouter) { %>angular.module('<%= appname %>').config(function($stateProvider, $urlRouterProvider) {
    /* Add New States Above */
});<% } %>
