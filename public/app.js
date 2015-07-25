/*
 * ANGULAR APP.JS
 */

'use strict';

angular.module('myApp', ['ngResource',
                         'ngRoute',
                         'ngSanitize',
                         'ngTouch',
                         'angular.filter',
                         'satellizer',
                         'angularMoment',
                         'angular-medium-editor',
                         'myApp.services',
                         'myApp.controllers'])

  // .constant('HOST', 'http://localhost:1337/api') //DEV
  .constant('HOST', 'http://inqyer.herokuapp.com/api') //PRODUCTION
  
  .config(['$routeProvider', '$locationProvider', '$authProvider', function($routeProvider, $locationProvider, $authProvider) {
    $routeProvider
      //ARTICLES
      .when('/', {
        templateUrl: 'templates/articles-index'
      , controller: 'ArticlesIndexCtrl'
      })
      .when('/campaigns/:campaignId/articles/new', {
        templateUrl: 'templates/articles-new'
      , controller: 'NewArticleCtrl'
      })
      .when('/campaigns/:campaignId/articles/:articleId', {
        templateUrl: 'templates/articles-show'
      , controller: 'ArticleShowCtrl'
      })
      .when('/campaigns/:campaignId/articles/edit/:articleId', {
        templateUrl: 'templates/articles-edit'
      , controller: 'ArticleEditCtrl'
      })

      //CAMPAIGNS
      .when('/campaigns', {
        templateUrl: 'templates/campaigns-index'
      , controller: 'CampaignsIndexCtrl'
      })
      .when('/campaigns/new', {
        templateUrl: 'templates/campaigns-new'
      , controller: 'NewCampaignCtrl'
      })
      .when('/campaigns/:campaignId', {
        templateUrl: 'templates/campaigns-show'
      , controller: 'CampaignShowCtrl'
      })
      .when('/campaigns/edit/:campaignId', {
        templateUrl: 'templates/campaigns-edit'
      , controller: 'CampaignEditCtrl'
      })

      // BROWSE
      .when('/search', {
        templateUrl: 'templates/search-index'
      , controller: 'SearchCtrl'

      // query with param
      // see articles and campaigns that match that query
      })

      //USERS
      .when('/me', {
        templateUrl: 'templates/user-dashboard'
      , controller: 'DashboardCtrl'
      })

      .when('/profile/edit', {
        templateUrl: 'templates/user-edit'
      , controller: 'UserEditCtrl'
      })

      .when('/settings', {
        templateUrl: 'templates/user-settings'
      , controller: 'UserEditCtrl'
      })

      .when('/@:handle', {
        templateUrl: 'templates/user-show'
      , controller: 'UserShowCtrl'
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
