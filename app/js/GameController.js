(function() {
  'use strict'

  var app = angular.module(GAME_APP_NAME);

  app.controller('GameMechanicsController', function($scope, $timeout, $interval, FruitService, NotificationsService, MusicService) {
    var ctrl = this;


    var fruitAnimationEnds = function(fruit){
      fruit.elem.style.webkitAnimationName = '';
      fruit.elem.style['display'] = 'none';
    }

    var delay = 500;
    var index = 0;
    var createFruit = function(key){

      var tone = TONES[Math.floor(Math.random() * 11)];
      var fruit = FruitService.createFruit( index++, TONES[key], tone, delay );
      FruitService.animateFruit(fruit, fruitAnimationEnds);

      document.getElementById('note-' + key).classList.add('active');
      document.getElementById('note-' + key).classList.add('bounce');
      setTimeout(function () {
        document.getElementById('note-' + key).classList.remove('active');
        document.getElementById('note-' + key).classList.remove('bounce');
      }, 700);

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
