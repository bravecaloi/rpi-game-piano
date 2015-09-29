(function() {
  'use strict'

  var app = angular.module(GAME_APP_NAME);

  app.service('FruitService', function() {

    var SPEED_FRUITS = 3;

    /**
     * Animates a fruit across the screen
     */
    var animateFruit = function(fruit, callback){
      fruit.elem.style['-webkit-animation-name'] = 'moveit';
      fruit.elem.style['-webkit-animation-duration'] = SPEED_FRUITS + 's';
      fruit.elem.style['display'] = 'block';

      fruit.elem.addEventListener('webkitAnimationEnd', function(){
        callback(fruit);
      }, false);

      fruit.elem.addEventListener('animationEnd', function(){
        callback(fruit);
      }, false);
    }

    /**
     * Creates a new div .note and appends it
     * to the #song element
     */
    var createFruit = function(i, tone, time) {
      // div class="note pos01 apple"
      var span = document.createElement('span');
      // var p = document.createElement('p');
      var elem = document.createElement('div');

      // p.innerHTML = tone;
      elem.id = 'fruit' + i;
      elem.className = 'animated-fruit note ' + FRUITS[tone] + ' col-' + tone;

      elem.appendChild(span);
      // elem.appendChild(p);
      document.getElementById('song').appendChild(elem);

      return {
        'tone': tone,
        'elem': elem,
        'hit': false,
        'delay': time
      }
    };

    //The threashold is a fixed area
    var threshold = document.getElementById('threashold').getBoundingClientRect();

    /**
     * Verifies if an element is overlapping with
     * the threashold
     */
    var overlapsThreshold = function(elem) {
      var elemPos = elem.getBoundingClientRect();

      // If some is false, then there is no overlapping
      return !(
        threshold.top > elemPos.bottom ||
        threshold.right < elemPos.left ||
        threshold.bottom < elemPos.top ||
        threshold.left > elemPos.right
      );
    }


    /**
     * Available Methods
     */
    return {
      createFruit: createFruit,
      overlapsThreshold: overlapsThreshold,
      animateFruit: animateFruit
    };

  });

})();
