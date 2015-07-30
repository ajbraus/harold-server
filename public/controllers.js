/*
 * CONTROLLERS
 */

'use strict';

angular.module('myApp.controllers', [])
  .controller('MainCtrl', function ($scope, $auth, $http, $rootScope, HOST, AuthService, Alert) {
    $scope.search = {}
    $scope.newSearch = function() {
      console.log($scope.search)
      $http.post(HOST + '/search', $scope.search)
        .success(function(data) {
          console.log(data)
        })
        .error(function(data){

        })
    }

    AuthService.CurrentUser().then(function(response) {
      $scope.user = response.data
    })

    $scope.isAuthenticated = function() {
      // return $auth.isAuthenticated();
      return $auth.isAuthenticated();
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };

    $scope.login = function() {
      $auth.login($scope.login_user)
        .then(function(response) {
          //hide modal
          $('#login-modal').modal('hide');
          //flash alert
          Alert.add('success', "Login Successful", 5000);
        })
        .catch(function(err) {
          Alert.add('danger', err.data.message, 5000);
        });
      $scope.login_user = {};
    }

    $scope.logout = function() {
      $auth.logout();
    }

    $scope.signup = function() {
      $auth.signup($scope.reg_user)
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
      $scope.reg_user = {};
    }
  })

  //ARTICLES
  .controller('ArticlesIndexCtrl', function ($scope, Article) {
    $scope.articles = Article.query();
  })

  .controller('ArticleShowCtrl', function ($scope, $stateParams, Article) {
    $scope.article = Article.get({ id: $stateParams.articleId });
  })

  .controller('ArticleEditCtrl', function ($scope, $location, $stateParams, $timeout, $rootScope, Article) {
    $scope.mediumOptions = { "placeholder": "Body",
                             "spellcheck": true,
                             "targetBlank": true,
                             "disableDoubleReturn": true }

    $scope.silentSave = function() {
      console.log('saving')
      $scope.saving = true;

      Article.update($scope.article, 
        function(data) {
          console.log("saved")
          $timeout(function() {
            $scope.saving = false;
            console.log('hide saving')
          }, 400);
        },
        function(data) {
          console.log("error")
          $timeout(function() {
            $scope.saving = false;
            console.log('hide saving')
          }, 400);
        });
    }

    $scope.article = Article.get({ id: $stateParams.articleId })

    $scope.createArticle = function() {
      Article.save($scope.article, 
        function(data) {
          console.log(data)
          $location.path('/campaigns/' + data.campaign + '/articles/' + data._id);
        },
        function(data) {

        });
    }
  })


  //CAMPAIGNS
  .controller('CampaignsIndexCtrl', function ($scope, Campaign) {
    $scope.campaigns = Campaign.query()
  })

  .controller('NewCampaignCtrl', function ($scope, $location, Campaign) {
    $scope.campaign = {}

    $scope.createCampaign = function() {
      Campaign.save($scope.campaign, 
        function(data) {
          console.log(data)
          $location.path('/campaigns/' + data._id);
        },
        function(data) {

        });
    }
  })

  .controller('CampaignEditCtrl', function ($scope, $location, $stateParams, Campaign) {
    $scope.campaign = Campaign.get({ id: $stateParams.campaignId })
    console.log($scope.campaign)
    $scope.createCampaign = function() {
      Campaign.update({ id: $stateParams.campaignId }, $scope.campaign, 
        function(data) {
          console.log(data)
          $location.path('/campaigns/' + data._id);
        },
        function(data) {

        });
    }
  })

  .controller('CampaignShowCtrl', function ($scope, $location, $stateParams, Campaign) {
    console.log('service fetching campaign')
    $scope.campaign = Campaign.get({ id: $stateParams.campaignId })
  })


  // USERS
  .controller('DashboardCtrl', function ($scope, $state, $location, Article, AuthService) {
    function setStateName(current_state) {
      var stateString = current_state.name.split('.')[1]
      $scope.state = stateString.charAt(0).toUpperCase() + stateString.slice(1); 
    }
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
      setStateName(toState);
    })

    $scope.newArticle = {};
    $scope.createArticle = function() {
      Article.save($scope.newArticle,
        function(data) {
          console.log(data)
          $location.path('articles/edit/' + data._id)
        },
        function(data) {
          console.log(data)
        })
    }

    AuthService.CurrentUser().then(function(response) {
      $scope.user = response.data
    })

  })

  .controller('UserShowCtrl', function ($scope, $stateParams, AuthService, User) {
    $scope.user = User.get({ id: $stateParams.handle });
  })

  .controller('UserEditCtrl', function ($scope, $location, AuthService) {
    AuthService.CurrentUser().then(function(response) {
      $scope.user = response.data
    })

    $scope.updateUser = function() {
      console.log($scope.user)
      AuthService.updateCurrentUser($scope.user).then(function(response) {
        $scope.user = response.data;
        $location.path('/dashboard');
      })
    }
  })


  ;

