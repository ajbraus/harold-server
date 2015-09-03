
'use strict';

angular.module('harold.directives', ['harold.services'])

.directive('titleCase', [function(){ //TODO DOES NOT WORK http://stackoverflow.com/questions/14419651/angularjs-filters-on-ng-model-in-an-input
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, modelCtrl) {
      modelCtrl.$parsers.push(function (inputValue) {
        if (inputValue) {
          var words = inputValue.split(' ');
          for (var i = 0; i < words.length; i++) {
              words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
          }
          var transformedInput = words.join(' ');
          if (transformedInput!=inputValue) {
            modelCtrl.$setViewValue(transformedInput);
            modelCtrl.$render();
          }         

          return transformedInput;     
        }    
      });
    }
  };
}]);