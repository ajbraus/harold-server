/*
 * ANGULAR APP.JS
 */

'use strict';

angular.module('myApp', ['ngResource',
                         'ngRoute',
                         'myApp.services',
                         'myApp.controllers'])

  .constant('HOST', 'http://localhost:1337/api') //DEV
  // .constant('HOST', 'http://harold-server.herokuapp.com') //PRODUCTION

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/articles-index'
      , controller: 'ArticlesIndexCtrl'
      })
      .when('/campaigns', {
        templateUrl: 'templates/campaigns-index'
      , controller: 'CampaignsIndexCtrl'
      })
      .when('/campaigns/:campaignId', {
        templateUrl: 'templates/campaigns-show'
      , controller: 'CampaignShowCtrl'
      })
      .when('/campaigns/:campaignId/articles/:articleId', {
        templateUrl: 'templates/articles-show'
      , controller: 'ArticleShowCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
  }]);
