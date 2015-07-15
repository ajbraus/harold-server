/*
 * CONTROLLERS
 */

'use strict';

angular.module('myApp.controllers', [])
  .controller('MainCtrl', function ($scope) {
    
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