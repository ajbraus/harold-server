/*
 * ANGULAR APP.JS
 */

'use strict';

angular.module('myApp', ['ngResource',
                         'ui.router',
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
  
  .config(['$stateProvider', '$locationProvider', '$authProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $authProvider, $urlRouterProvider) {
    
    $stateProvider
      //ARTICLES
      .state('articles', {
        url: '/'
      , templateUrl: 'templates/articles-index'
      , controller: 'ArticlesIndexCtrl'
      })
      .state('article-new', {
        url: '/articles/new'
      , templateUrl: 'templates/articles-new'
      , controller: 'NewArticleCtrl'
      })
      .state('article', {
        url: '/campaigns/:campaignId/articles/:articleId'
      , templateUrl: 'templates/articles-show'
      , controller: 'ArticleShowCtrl'
      })
      .state('article-edit', {
        url: '/articles/edit/:articleId'
      , templateUrl: 'templates/articles-edit'
      , controller: 'ArticleEditCtrl'
      })

      //CAMPAIGNS
      .state('campaigns', {
        url: '/campaigns'
      , templateUrl: 'templates/campaigns-index'
      , controller: 'CampaignsIndexCtrl'
      })
      .state('campaign-new', {
        url: '/campaigns/new'
      , templateUrl: 'templates/campaigns-new'
      , controller: 'NewCampaignCtrl'
      })
      .state('campaign', {
        url: '/campaigns/:campaignId'
      , templateUrl: 'templates/campaigns-show'
      , controller: 'CampaignShowCtrl'
      })
      .state('campaign-edit', {
        url: '/campaigns/edit/:campaignId'
      , templateUrl: 'templates/campaigns-edit'
      , controller: 'CampaignEditCtrl'
      })

      // BROWSE
      .state('search', {
        url: '/search'
      , templateUrl: 'templates/search-index'
      , controller: 'SearchCtrl'
      })

      //DASHBOARD
      .state('me', {
        abstract: true
      , url: '/me'
      , templateUrl: 'templates/dashboard'
      , controller: 'DashboardCtrl'
      })
        .state('me.drafts', {
          url: '/drafts'
        , templateUrl: 'templates/dashboard-drafts'
        })
        .state('me.campaigns', {
          url: '/campaigns'
        , templateUrl: 'templates/dashboard-campaigns'
        })

      //PROFILE
      .state('me.edit', {
        url: '/edit'
      , templateUrl: 'templates/user-edit'
      , controller: 'UserEditCtrl'
      })

      .state('settings', {
        url: '/settings'
      , templateUrl: 'templates/user-settings'
      , controller: 'UserEditCtrl'
      })

      .state('show', {
        url: '/@:handle'
      , templateUrl: 'templates/user-show'
      , controller: 'UserShowCtrl'
      });

    $urlRouterProvider.otherwise('/');

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
