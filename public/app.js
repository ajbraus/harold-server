/*
 * ANGULAR APP.JS
 */

'use strict';

angular.module('myApp', ['ngResource',
                         'ngRoute',
                         'satellizer',
                         'myApp.services',
                         'myApp.controllers'])

  .constant('HOST', 'http://localhost:1337/api') //DEV
  // .constant('HOST', 'http://harold-server.herokuapp.com') //PRODUCTION
  
  .config(['$routeProvider', '$locationProvider', '$authProvider', function($routeProvider, $locationProvider, $authProvider) {
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

    $authProvider.baseUrl = '/api'
    $authProvider.loginUrl = '/auth/login';
    $authProvider.signupUrl = '/auth/signup';

    $authProvider.facebook({
      clientId: '624059410963642'
    });
    $authProvider.twitter({
      url: '/auth/twitter'
    });
  }]);
