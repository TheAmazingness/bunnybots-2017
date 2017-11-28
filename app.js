const electron = require('electron');
const {app, BrowserWindow, ipc} = electron;

app.on('ready', function () {
  var controls = new BrowserWindow({
    width: 900,
    height: 600
  });
  controls.loadURL('file://' + __dirname + 'controls.html');
  var display = new BrowserWindow({
    width: 1200,
    height: 900
  });
});
