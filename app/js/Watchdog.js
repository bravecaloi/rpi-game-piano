(function() {
  'use strict'

    var refresh = function(){
      global.watchdog = 30 * 1000;
    }

    var showSplash = function(){
      document.getElementById('splash').style['display'] = 'block';
      global.isSplash = true;
      global.MusicService.fadeOut();
    }

    var hideSplash = function(){
      document.getElementById('splash').style['display'] = 'none';
      global.isSplash = false;
      global.MusicService.fadeIn();
    }

    var startWatchdog = function() {
      refresh();
      var timelapse = 2000;
      setInterval(function() {
        if (global.watchdog < 0) {
          if(!global.isSplash) showSplash();
        } else {
          global.watchdog = global.watchdog - timelapse;
        }
      }, timelapse);
    }

    /** Interface **/
    global.Watchdog = {
      showSplash: showSplash,
      hideSplash: hideSplash,
      refresh: refresh
    }

    startWatchdog();
})();
