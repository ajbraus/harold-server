/*
 * SERVICES
 */

'use strict';

angular.module('myApp.services', [])
  .factory('Article', function ($resource, HOST) {
    return $resource(HOST + '/articles/:id', { id: '@id' })
  })
  .factory('Campaign', function ($resource, HOST) {
    return $resource(HOST + '/campaigns/:id', { id: '@id' }, {
      update: { method: 'PUT' }
    })
  })
  .factory('User', function ($resource, HOST) {
    return $resource(HOST + '/users/:id', { id: '@id' })
  })

  .factory('AuthService', function (User, $http) {
    return {
      CurrentUser: function() {
        return $http.get('/api/me');
      },
      updateCurrentUser: function(data) {
        return $http.put('/api/me', data);
      }
    };
  })

  .factory('Alert', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
    var alertService;
    $rootScope.globalAlerts = [];
    return alertService = {
      add: function(type, msg, timeout) {
        $rootScope.globalAlerts = [];
        $rootScope.globalAlerts.push({
          type: type,
          msg: msg,
          close: function() {
            return alertService.closeAlert(this);
          }
        });
        if (timeout) { 
          $timeout(function(){ 
            alertService.closeAlert(this); 
          }, timeout); 
        }
      },
      closeAlert: function(alert) {
        return this.closeAlertIdx($rootScope.globalAlerts.indexOf(alert));
      },
      closeAlertIdx: function(index) {
        return $rootScope.globalAlerts.splice(index, 1);
      },
      clear: function(){
        $rootScope.globalAlerts = [];
      }
    };
  }])

  .factory('Socket', ['socketFactory', function (socketFactory) {
    var socket = socketFactory();
    // {
        // ioSocket: io.connect('http://localhost:1337/')
      // , prefix: ''
    // }
    socket.forward('broadcast.join_room')
    socket.forward('broadcast.post');
    socket.forward('broadcast.comment');
    socket.forward('broadcast.vote_up');
    socket.forward('broadcast.vote_down');
    return socket
  }])


  ;
