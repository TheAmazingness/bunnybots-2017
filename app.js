const electron = require('electron');
const {app, BrowserWindow} = electron;
const {ipcMain} = require('electron');

app.on('ready', function () {
  var controls = new BrowserWindow({
    width: 1200,
    height: 600
  });
  controls.loadURL('file://' + __dirname + '/controls.html');
  var display = new BrowserWindow({
    width: 1200,
    height: 900
  });
  display.loadURL('file://' + __dirname + '/display.html');
  ipcMain.on('start', (event, arg) => {
    display.webContents.send('start');
  });
  ipcMain.on('auto', (event, arg) => {
    display.webContents.send('auto');
  });
  ipcMain.on('stop', (event, arg) => {
    display.webContents.send('stop');
  });
  ipcMain.on('before', (event, arg) => {
    display.webContents.send('before');
  });
  ipcMain.on('during', (event, arg) => {
    display.webContents.send('during');
  });
  ipcMain.on('after', (event, arg) => {
    display.webContents.send('after');
  });
  ipcMain.on('rank', (event, arg) => {
    display.webContents.send('rank');
  });
  ipcMain.on('select', (event, arg) => {
    display.webContents.send('select');
  });
  ipcMain.on('team', (event, arg, arg2) => {
    display.webContents.send('team', arg, arg2);
  });
  ipcMain.on('score', (event, arg) => {
    display.webContents.send('score', arg);
  });
  ipcMain.on('captain', (event, arg) => {
    display.webContents.send('captain', arg);
  });
  ipcMain.on('remove', (event, arg) => {
    display.webContents.send('remove', arg);
  });
  ipcMain.on('readd', (event, arg) => {
    display.webContents.send('readd', arg);
  });
  ipcMain.on('reload', (event, arg) => {
    display.webContents.send('reload');
  });
});
