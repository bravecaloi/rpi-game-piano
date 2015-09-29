exports.touched = function(req, res) {
  global.Watchdog.refresh();

  if (global.isSplash == true) {

    global.Watchdog.hideSplash();

  } else {

    var key = Number(req.params.number);
    switch (key) {
      case 00:
      case 01:
      case 02:
      case 03:
      case 04:
      case 05:
      case 06:
        global.GameController.checkFruitsPosition(key);
        break;
      case 07:
      case 08:
      case 09:
      case 10:
        global.NotificationsService.changeInstrument(key);
        global.GameController.startSong();
        break;
      case 11:
        global.GameController.scrollUpSong();
        global.GameController.startSong();
        break;
      default:
        console.log('No key definition for ' + key);
    }

  }

  res.send('OK');
};
