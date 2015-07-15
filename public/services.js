/*
 * SERVICES
 */

'use strict';

angular.module('myApp.services', [])
  .factory('Article', function ($resource, HOST) {
    return $resource(HOST + '/articles/:id', { id: '@id' })
  })
  .factory('Campaign', function ($resource, HOST) {
    return $resource(HOST + '/campaigns/:id', { id: '@id' })
  })

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
  }]);
