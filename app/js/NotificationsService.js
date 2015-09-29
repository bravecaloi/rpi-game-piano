(function() {
  'use strict'

  var app = angular.module(GAME_APP_NAME);

  app.service('NotificationsService', function($rootScope) {

    var userPoints = 0;

    var feedbackText = document.getElementById('feedbackText');
    var pointsCounter = document.getElementById('pointsCounter');
    var totalPoints = document.getElementById('totalPoints');

    // Instruments
    var keyInstrument = {
      7: 'instrumentIcon1',
      8: 'instrumentIcon2',
      9: 'instrumentIcon3',
      10: 'instrumentIcon4'
    };
    var selectedInstrument;

    function setFeedback(str) {
      feedbackText.innerHTML = str;
    }

    var startGameCounter = 3;
    var startGameCounterWatcher = undefined;

    function showStartGameCounter() {
      document.getElementById('game_finished').style['display'] = 'none';
      document.getElementById('game_counter').style['display'] = 'block';
      document.getElementById('game_counter_text').innerHTML = 'Empieza en ' + startGameCounter;
      if (startGameCounterWatcher != undefined) {
        clearInterval(startGameCounterWatcher);
      }

      startGameCounterWatcher = setInterval(function() {
        if (startGameCounter == 0) {
          startGameCounter = 3;
          clearInterval(startGameCounterWatcher);
          document.getElementById('game_counter').style['display'] = 'none';
          startGameCounterWatcher = undefined;
          $rootScope.$broadcast('finishStartGameCounter');
        } else {
          document.getElementById('game_counter_text').innerHTML = 'Empieza en ' + --startGameCounter;
        }
      }, 1000);
    }

    var gameFinished = function(total) {
      var percent = (userPoints * 100) / total;
      var express = '';

      if(percent >= 90) express = ' Perfecto!';
      if(percent < 90 && percent >= 70) express = ' Excelente!';
      if(percent < 70 && percent >= 30) express = ' Muy Bien!';
      if(percent < 30) express = ' A seguir practicando...';

      document.getElementById('game_finished').style['display'] = 'block';
      document.getElementById('game_finished_text').innerHTML =  userPoints + ' / ' +  total + ' Puntos <br /> ' + express;
    }

    var prevCounterType = 'excellent';

    function animatePointsCounter(str, type) {
      pointsCounter.classList.remove(prevCounterType);
      pointsCounter.classList.add('bounceIn');
      pointsCounter.classList.add(type);
      pointsCounter.innerHTML = str;
      setTimeout(function() {
        pointsCounter.classList.remove('bounceIn');
        prevCounterType = type;
      }, 500);
    }

    var changeInstrument = function(key) {
      if (selectedInstrument != undefined) {
        selectedInstrument.classList.remove('active');
        selectedInstrument.classList.remove('animated');
        selectedInstrument.classList.remove('wobble');
      }
      selectedInstrument = document.getElementById(keyInstrument[key]);
      selectedInstrument.classList.add('active');
      selectedInstrument.classList.add('animated');
      selectedInstrument.classList.add('wobble');
    }

    var resetPoints = function() {
      userPoints = 0;
      totalPoints.innerHTML = userPoints;
    }

    /**
     * Activated when a Fruit is correctly hit
     */
    var fruitHit = function(fruit) {
      setFeedback('Muy bien!');
      fruit.hit = true;
      fruit.elem.style['opacity'] = 0.5;
      animatePointsCounter('+1', 'excellent');
      totalPoints.innerHTML = ++userPoints;
    }

    /**
     * Activated when a fruit was missed
     */
    var fruitMissed = function(fruit) {
      setFeedback('Se escapó ' + fruit.tone + '!');
      animatePointsCounter('0', 'bad');
    }


    /**
     * Activated when a note is played but no fruit is hit
     */
    var toneFailed = function(note) {
      // do nothing
    }


    /** Interface for the TouchController **/
    global.NotificationsService = {
      changeInstrument: changeInstrument
    }


    /**
     * Available Methods
     */
    return {
      fruitHit: fruitHit,
      fruitMissed: fruitMissed,
      toneFailed: toneFailed,
      changeInstrument: changeInstrument,
      resetPoints: resetPoints,
      showStartGameCounter: showStartGameCounter,
      gameFinished: gameFinished
    };

  });

})();
