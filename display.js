var remove = [];
var ranking = {};
var sorted = [];
var teamCount = 0;
var sortedTeams = {};
var teamsList = {
    '955': 'CV Robotics',
    '997': 'Spartan Robotics',
    '1425': 'Error Code Xero',
    '1540C': 'Flaming Chickens - Chalupa',
    '1540K': 'Flaming Chickens - King Bass',
    '1540T': 'Flaming Chickens - Tricerabots',
    '2374': 'Crusaderbots',
    '2411': 'Rebel @lliance',
    '2471': 'Mean Machine',
    '2521': 'SERT',
    '2635': 'Lake Monsters',
    '2733': 'Pigmice',
    '2898': 'Flying Hedgehogs',
    '3131': 'Gladiators',
    '3636': 'General Robotics',
    '3674': '4H Cloverbots',
    '3711A': 'Iron Mustangs - A',
    '3711B': 'Iron Mustangs - B',
    '3813': 'Bits & Bots',
    '4043': 'Nerd Herd',
    '4692': 'Metal Mallards',
    '5450': 'SHREC Robotics',
    '5970': 'Beavertronics',
    '6485': 'Mystic Biscuit',
    '6863': 'A5 Robotics'
};
require('electron').ipcRenderer.on('start', (event) => {
  $('.ttmin').text(2);
  $('.ttsec').text(30);
  $('.tamin').text(0);
  $('.tasec').text(15);
  $('.ttemin').text(2);
  $('.ttesec').text(15);
  timer();
});
require('electron').ipcRenderer.on('stop', (event) => {
  clearInterval(time);
});
require('electron').ipcRenderer.on('before', (event) => {
  $('.body-div').addClass('hide');
  $('.before').removeClass('hide');
});
require('electron').ipcRenderer.on('during', (event) => {
  $('.body-div').addClass('hide');
  $('.during').removeClass('hide');
});
require('electron').ipcRenderer.on('after', (event) => {
  $('.body-div').addClass('hide');
  $('.after').removeClass('hide');
});
require('electron').ipcRenderer.on('rank', (event) => {
  $('.body-div').addClass('hide');
  $('.rank').removeClass('hide');
});
require('electron').ipcRenderer.on('select', (event) => {
  $('.body-div').addClass('hide');
  $('.select').removeClass('hide');
  $('.json').load('https://cgscomwww.catlin.edu/pengt/Ranking/bunnybots-2017-ranking-file-randomness.json', function () {
    ranking = JSON.parse($(this).text());
    for (var team in ranking) {
      if (ranking.hasOwnProperty(team)) {
        sorted[teamCount] = ranking[team]['rp'];
        teamCount++;
      }
    }
    sorted = sorted.sort(function (a, b) {return b - a;});
    for (var i = 0; i < sorted.length; i++) {
      for (var team in ranking) {
        if (ranking.hasOwnProperty(team)) {
          if (ranking[team]['rp'] == sorted[i]) {
            eval('sortedTeams.' + (ranking[team]['name']).toLowerCase().replace(/\s+/g, '').replace('@', 'a').replace('4h', '').replace('&', 'and').replace('-', '') + ' = "' + team + '"');
          }
        }
      }
    }
    for (var thing in sortedTeams) {
        if (sortedTeams.hasOwnProperty(thing)) {
          if (Object.keys(teamsList).indexOf(sortedTeams[thing])>=0) {
            $('.alliancelist').append('<p class = "' + sortedTeams[thing] +'">' + sortedTeams[thing] + ' - ' + teamsList[sortedTeams[thing]] + ' - ' + ranking[sortedTeams[thing]]['rp'] + '</p>');
        }
      }
    }
    $('.alliancelist').animate({scrollTop: $('.alliancelist').get(0).scrollHeight}, 10000);
    $('.alliancelist').animate({scrollTop: 0}, 10000);
    autoscroll = setInterval(function () {
      $('.alliancelist').animate({scrollTop: $('.alliancelist').get(0).scrollHeight}, 10000);
      $('.alliancelist').animate({scrollTop: 0}, 10000);
    }, 22000);
  });
});
require('electron').ipcRenderer.on('team', (event, arg, arg2) => {
  $('.matchnumber').text(arg2);
  $('.redone').text(arg[0]);
  $('.redtwo').text(arg[1]);
  $('.redthree').text(arg[2]);
  $('.blueone').text(arg[3]);
  $('.bluetwo').text(arg[4]);
  $('.bluethree').text(arg[5]);
});
require('electron').ipcRenderer.on('score', (event, arg) => {
  $('.redscore').text(arg[0]);
  $('.bluescore').text(arg[1]);
});
require('electron').ipcRenderer.on('score', (event, arg) => {
  $('.redscore').text(arg[0]);
  $('.bluescore').text(arg[1]);
});
require('electron').ipcRenderer.on('remove', (event, arg) => {
  var remove = arg
  $('.team' + remove[1] + '-' + remove[2]).text(remove[0]);
  console.log(remove[0])
  if (Object.keys(teamsList).indexOf(remove[0])>=0) {
    $('.' + remove[0]).addClass('hide')
  }
});
var count = 0;
var time;
function timer() {
  var start = [Number($('.ttmin').text()), Number($('.ttsec').text()), Number($('.tasec').text()), Number($('.ttemin').text()), Number($('.ttesec').text())];
  $('.ttsec').text(start[1]--);
  $('.tasec').text(start[2]--);
  require('electron').ipcRenderer.on('auto', (event) => {
    $('.tasec').text('00');
    start[0] = 2;
    start[1] = 15;
    start[2] = '00';
  });
  time = setInterval(function () {
    if ($('.ttsec').text() <= 10 && $('.ttsec').text() > 0) {
      $('.ttsec').text('0' + start[1]--);
    } else if ($('.ttsec').text() == 00) {
      start[1] = 59;
      $('.ttsec').text(start[1]--);
      $('.ttmin').text(start[0] -= 1);
    } else {
      $('.ttsec').text(start[1]--);
    }
    if ($('.tasec').text() <= 10 && $('.tasec').text() > 0) {
      $('.tasec').text('0' + start[2]--);
    } else if ($('.tasec').text() <= 00) {
      $('.tasec').text('00');
    } else if ($('.tasec').text() > 0) {
      $('.tasec').text(start[2]--);
    }
    if ($('.ttmin').text() <= 2 && $('.tasec').text() <= 0) {
      $('.ttemin').text($('.ttmin').text());
      $('.ttesec').text($('.ttsec').text());
    }
    if ($('.ttmin').text() == 0 && $('.ttsec').text() == 0) {
      clearInterval(time);
    }
  }, 999);
}
require('electron').ipcRenderer.on('captain', (event, arg) => {
  var captain = arg;
  $('.captain1').text(captain[0]);
  $('.captain2').text(captain[1]);
  $('.captain3').text(captain[2]);
  $('.captain4').text(captain[3]);
  if (Object.keys(teamsList).indexOf(captain[0])>=0) {
    $('.' + captain[0]).addClass('hide')
  }
  if (Object.keys(teamsList).indexOf(captain[1])>=0) {
    $('.' + captain[1]).addClass('hide')
  }
  if (Object.keys(teamsList).indexOf(captain[2])>=0) {
    $('.' + captain[2]).addClass('hide')
  }
  if (Object.keys(teamsList).indexOf(captain[3])>=0) {
    $('.' + captain[3]).addClass('hide')
  }
});
require('electron').ipcRenderer.on('readd', (event, arg) => {
  var readd = arg;
  $('.' + readd).removeClass('hide')
})
require('electron').ipcRenderer.on('reload', (event, arg) => {
  document.location.reload();
})
//Possible things to do: Create minute timer for setup - talk to Tristan see if there is an easy way to use his timer. BUGTEST!!!!
