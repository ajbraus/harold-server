/*
 * CONTROLLERS
 */

'use strict';

angular.module('myApp.controllers', [])
  .controller('MainCtrl', function ($scope, $auth, Alert) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };

    $scope.login = function() {
      $auth.login($scope.auth_user)
        .then(function(response) {
          //hide modal
          $('#login-modal').modal('hide');
          //flash alert
          Alert.add('success', "Login Successful", 5000);
        })
        .catch(function(err) {
          Alert.add('danger', err.data.message, 5000);
        });
    }

    $scope.signup = function() {
      $auth.signup($scope.auth_user)
        .then(function(response) {
          //hide modal
          $('#signup-modal').modal('hide');
          //flash alert
          Alert.add('success', "Welcome to Harold", 5000);
          // $location.path('/users/' + response.data._id)
        })
        .catch(function(err) {
          Alert.add('danger', err.data.message, 5000);
        });
    }
  })

  //ARTICLES
  .controller('ArticlesIndexCtrl', function ($scope, Article) {
    $scope.articles = Article.query()
  })

  .controller('ArticleShowCtrl', function ($scope, $routeParams, Article, Campaign) {
    $scope.campaign = Campaign.get({ id: $routeParams.campaignId })
    $scope.article = Article.get({ id: $routeParams.articleId })
  })

  //CAMPAIGNS
  .controller('CampaignsIndexCtrl', function ($scope, Campaign) {
    $scope.campaigns = Campaign.query()
  })

  .controller('CampaignShowCtrl', function ($scope, $routeParams, Campaign) {
    $scope.campaign = Campaign.get({ id: $routeParams.campaignId })
  });

