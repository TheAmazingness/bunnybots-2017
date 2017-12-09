const {ipcRenderer} = require('electron');
var startSound = new Audio('sounds/charge-1.wav');
var autoSound = new Audio('sounds/three-bells.wav');
var errorSound = new Audio('sounds/fog-blast.wav');
var woosh = new Audio('sounds/woosh.wav');
// var halfMinSound = new Audio('sounds/choo-choo.wav');
var endSound = new Audio('sounds/buzzer.wav');
var before = new Noty({
  text: 'Enter red 1 number: <input class="form-control red-one" type="text"><br>Enter red 2 number: <input class="form-control red-two" type="text"><br>Enter red 3 number: <input class="form-control red-three" type="text"><br>Enter blue 1 number: <input class="form-control blue-one" type="text"><br>Enter blue 2 number: <input class="form-control blue-two" type="text"><br>Enter blue 3 number: <input class="form-control blue-three" type="text"><br>Enter Match Number: <input class="form-control match-number" type="text">',
  type: 'success',
  closeWith: ['button'],
  layout: 'center'
});
var scoreNoty = new Noty({
  text: 'Enter red score: <input class="form-control red-score" type="text"><br>Enter blue score: <input class="form-control blue-score" type="text">',
  type: 'success',
  closeWith: ['button'],
  layout: 'center'
});
for (i = 0; i < 5; i++) {
  eval(`
    var captain` + i + ` = new Noty({
      text: 'Enter alliance captain ` + i + `: <input class="form-control captain-` + i + `" type="text">',
      type: 'success',
      closeWith: ['button'],
      layout: 'center'
    });
  `);
}
var removeNoty = new Noty({
  text: 'Enter team number: <input class="form-control removeTeam" type="text"><br>Enter alliance number: <input class="form-control removeAlliance type="text"><br> Enter pick number: <input class="form-control removePick type="text">',
  type: 'success',
  closeWith: ['button'],
  layout: 'center'
})
var readdNoty = new Noty({
  text: 'Enter team number: <input class="form-control readd" type="text">',
  type: 'success',
  closeWith: ['button'],
  layout: 'center'
})
var team = [];
var score = [];
var captain = [];
var match;
var time;
var remove = [];
var readd;
function timer() {
  var start = [Number($('.ttmin').text()), Number($('.ttsec').text()), Number($('.tasec').text()), Number($('.ttemin').text()), Number($('.ttesec').text())];
  $('.ttsec').text(start[1]--);
  $('.tasec').text(start[2]--);
  $('.btn-auto').click(function () {
    $('.tasec').text('00');
    start[0] = 2;
    start[1] = 15;
    start[2] = '00';
    console.log('early auto');
    ipcRenderer.send('auto');
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
    if ($('.ttmin').text() == 2 && $('.ttsec').text() == 15) {
      autoSound.play();
    }
    if ($('.ttmin').text() <= 2 && $('.tasec').text() <= 0) {
      $('.ttemin').text($('.ttmin').text());
      $('.ttesec').text($('.ttsec').text());
    }
    // if ($('.ttmin').text() == 0 && $('.ttsec').text() == 30) {
    //   halfMinSound.play();
    // }
    if ($('.ttmin').text() == 0 && $('.ttsec').text() == 0) {
      endSound.play();
      clearInterval(time);
    }
  }, 999);
}
$(document).ready(function () {
  $('.btn-start').click(function () {
    clearInterval(time);
    startSound.play();
    $('.ttmin').text(2);
    $('.ttsec').text(30);
    $('.tamin').text(0);
    $('.tasec').text(15);
    $('.ttemin').text(2);
    $('.ttesec').text(15);
    timer();
    console.log('started Timer');
    ipcRenderer.send('start');
  });
  $('.btn-stop').click(function () {
    errorSound.play();
    clearInterval(time);
    console.log('stopped timer');
    ipcRenderer.send('stop');
  });
  $('.btn-before').click(function(){
    before.show();
    $('.red-one').focus();
    $('.match-number').keyup(function () {
      if (event.which == 13) {
        team[0] = $('.red-one').val();
        team[1] = $('.red-two').val();
        team[2] = $('.red-three').val();
        team[3] = $('.blue-one').val();
        team[4] = $('.blue-two').val();
        team[5] = $('.blue-three').val();
        match = $('.match-number').val();
        before.close();
        console.log('before match:', match, team)
        ipcRenderer.send('team', team, match);
        ipcRenderer.send('before');
        $('.noty_close_button').remove();
      }
    })
  })
  $('.btn-after').click(function (){
    scoreNoty.show();
    $('.red-score').focus();
    $('.blue-score').keyup(function () {
      if (event.which == 13) {
        woosh.play();
        score[0] = $('.red-score').val();
        score[1] = $('.blue-score').val();
        console.log('scores:', score)
        new Noty({
          text: "$('.red-one').val('" + team[0] + "'); $('.red-two').val('" + team[1] + "'); $('.red-three').val('" + team[2] + "'); $('.blue-one').val('" + team[3] + "'); $('.blue-two').val('" + team[4] + "'); $('.blue-three').val('" + team[5] + "'); $('.red-score').val('" + score[0] + "'); $('.blue-score').val('" + score[1] + "');",
          closeWith: ['button'],
          type: 'error'
        }).show();
        scoreNoty.close();
        ipcRenderer.send('score', score);
        ipcRenderer.send('after');
      }
    });
  });
  $('.btn-rank').click(function (){
    console.log('Displaying Rankings');
    ipcRenderer.send('rank');
  });
  $('.btn-select').click(function (){
    captain1.show();
    captain2.show();
    captain3.show();
    captain4.show();
    ipcRenderer.send('select');
    $('.captain-1').focus();
    $('.captain-4').keyup(function () {
      if (event.which == 13) {
        captain[0] = $('.captain-1').val();
        captain[1] = $('.captain-2').val();
        captain[2] = $('.captain-3').val();
        captain[3] = $(this).val();
        console.log('Alliance Captians;', captain)
        captain1.close();
        captain2.close();
        captain3.close();
        captain4.close();
        ipcRenderer.send('captain', captain);
      }
    });
  });
  $('.btn-remove').click(function (){
    removeNoty.show();
    $('.removeTeam').focus();
    $('.removePick').keyup(function (){
      if (event.which == 13) {
        remove[0] = $('.removeTeam').val();
        remove[1] = $('.removeAlliance').val();
        remove[2] = $(this).val();
        console.log('Pick Info:', remove)
        removeNoty.close()
        ipcRenderer.send('remove', remove);
      }
    })
  })
  $('.btn-during').click(function (){
    console.log('Displaying timer');
    ipcRenderer.send('during');
  });
  $('.btn-readd').click(function(){
    readdNoty.show();
    $('.readd').focus();
    $('.readd').keyup(function(){
      if (event.which == 13) {
        readd = $('.readd').val();
        readdNoty.close()
        console.log('re-added team:', readd)
        ipcRenderer.send('readd', readd);
      }
    })
  })
  $('.btn-reload').click(function(){
    console.log('Page reloaded');
    ipcRenderer.send('reload')
  })
});
