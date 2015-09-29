exports.touched = function(req, res) {
  global.Watchdog.refresh();

  if (global.isSplash == true) {
    global.Watchdog.hideSplash();
  }

  var key = Number(req.params.number);
  global.GameController.createFruit(key);

  res.send('OK');
};
