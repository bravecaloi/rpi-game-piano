(function() {
  'use strict'

  var app = angular.module(GAME_APP_NAME);

  app.controller('GameMechanicsController', function($scope, $timeout, FruitService, NotificationsService) {
    var ctrl = this;


    var fruitAnimationEnds = function(fruit){
      fruit.elem.style.webkitAnimationName = '';
      fruit.elem.style['display'] = 'none';
    }

    var delay = 500;
    var index = 0;
    var createFruit = function(key){
      var fruit = FruitService.createFruit( index++, TONES[key],  delay );
      FruitService.animateFruit(fruit, fruitAnimationEnds);
    }

    var animateFruit = function(fruit){
      $timeout(function(mFruit) {
        return function() {
          FruitService.animateFruit(mFruit, fruitAnimationEnds);
        };
      }(fruit), fruit.delay * DELAY_UNIT_TIME);
    }

    /** Interface for the TouchController **/
    global.GameController = {
      createFruit: createFruit
    }

  });

})();
