var app = angular.module("blogPage", ["ui.router", "textAngular"]);

app.config(($stateProvider, $urlRouterProvider) => {

    $urlRouterProvider.otherwise("/");

    $stateProvider.state("admin-all-blogs", {
        url: "/blogs",
        templateUrl: "/admin/blogs-page",
        controller: "ListDeleteCtrl"
    })
        .state("admin-create-blog", {
            url: "/blog/new",
            templateUrl: "/admin/blog/new",
            controller: "CreateUpdateCtrl"
        })
        .state("admin-update-blog", {
            url: "/blog/:id/update",
            templateUrl: "/admin/blog/update",
            controller: "CreateUpdateCtrl"
        })
})