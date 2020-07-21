/** randomizeBlocks Jquery Plugin.
* Simple jquery plugin to randomize block movements
* Divs must be first fixed to work.
* Call on an array of jquery object.
*/
(function($) {

  $.fn.randomizeBlocks = function() {
    return this.each(function() {
            animateDiv($(this));
    });
  };

  function makeNewPosition($container) {
      // Get viewport dimensions (remove the dimension of the div)
      var h = $container.height() - 10;
      var w = $container.width() - 10;

      var nh = Math.floor(Math.random() * h);
      var nw = Math.floor(Math.random() * w);

      return [nh, nw];

  }

  function animateDiv($target) {
      var newq = makeNewPosition($target.parent());
      var oldq = $target.offset();
      var speed = calcSpeed([oldq.top, oldq.left], newq);

      $target.animate({
          top: newq[0],
          left: newq[1]
      }, speed, function() {
          animateDiv($target);
      });

  };

  function calcSpeed(prev, next) {

      var x = Math.abs(prev[1] - next[1]);
      var y = Math.abs(prev[0] - next[0]);

      var greatest = x > y ? x : y;

      var speedModifier = 0.05;

      var speed = Math.ceil(greatest / speedModifier);

      return speed;

  }

}( jQuery ));


var word = "vocabulary";
const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;
const englishRegex = /^[a-zA-Z0-9?><;,{}[\]\-_+=!@#$%\^&*|']+$/;

//----------------------------------------------

// Function to get the Ultimate Json for audio links
function getUltimate(){
  return $.getJSON('../src/data/ultimate.json');
}


$('#test').on('click', function() {
  $(this).randomizeBlocks();
})


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// DOCUMENT READY
$(document).ready(function() {

  // if statement for if it's a new game
  // TODO: set the localstorage 'score' as zero once game ends

  if (window.localStorage.getItem('score') != null) {
    $('#score').text("Score: " + window.localStorage.getItem('score'));
  } else {
    window.localStorage.setItem('score', 0);
  }

  //Incrementing through a list of words stored in storage
  var loWords = JSON.parse(window.localStorage.getItem('word_data'));

  var random = getRandomInt(loWords.length);
  while (random == window.localStorage.getItem('randomNumber')) {
    if (loWords.length <= 1) {
      break;
    } else {
      random = getRandomInt(loWords.length);
    }
  }
  window.localStorage.setItem('randomNumber', random);
  word = loWords[random];


  //displaying syllables to html
  var listSyllables = [];
  listSyllables = syllabify(word);

  let counter = 1;
  let clickedWord = "";
  let to_be_hooked = [];

  for (var i = 0; i < listSyllables.length; i++){
    //
    let divCon = document.createElement("div");
    divCon.id = "divCon";
    divCon.className = "syllable";
    let div = document.createElement("div");
    divCon.appendChild(div);
    div.className = "syllable";
    div.id = i + "";
    div.innerHTML = listSyllables[i];
    divCon.style.top = getRandomInt(window.innerHeight) / 1.5 + "px";
    divCon.style.left = getRandomInt(window.innerWidth) / 1.5 + "px";

    divCon.onclick = ()=>{
      if (div.getAttribute('id') < counter && div.style.backgroundColor != '#A7E8BD'){
        divCon.style.backgroundColor = '#A7E8BD';
        clickedWord += div.innerHTML;
        setTimeout(function() {
          checkCorrect(clickedWord);
        }, 100);
        counter++;

      } else if (div.style.backgroundColor == '#A7E8BD') {
        console.log("already selected syllable");
      } else {
        divCon.style.backgroundColor = '#EFA7A7';
        setTimeout(function () {
          divCon.style.backgroundColor = 'white';
        }, 1500);
      }
    }

    to_be_hooked.push(divCon);
  }

  to_be_hooked.forEach(element => {
    $('#mainContent').append(element);
  });


  //Loading audio file
  var audio = document.getElementById('word-audio');

  $('.syllable').randomizeBlocks();


  $('#half-speed').on('click', function() {
    audio.playbackRate = 0.5;
    document.getElementById("half-speed").style = "background-color:#FFD972";
    document.getElementById("quarter-speed").style = "background-color:rgba(0,0,0,0)";
    document.getElementById("full-speed").style = "background-color: rgba(0,0,0,0)";
    document.getElementById("two-speed").style = "background-color:rgba(0,0,0,0)";
  });

  $('#quarter-speed').on('click', function() {
    audio.playbackRate = 0.75;
    document.getElementById("half-speed").style = "background-color:rgba(0,0,0,0)";
    document.getElementById("quarter-speed").style = "background-color:#FFD972";
    document.getElementById("full-speed").style = "background-color:rgba(0,0,0,0)";
    document.getElementById("two-speed").style = "background-color:rgba(0,0,0,0)";
  });

  $('#full-speed').on('click', function() {
    audio.playbackRate = 1.0;
    document.getElementById("half-speed").style = "background-color:rgba(0,0,0,0)";
    document.getElementById("quarter-speed").style = "background-color:rgba(0,0,0,0)";
    document.getElementById("full-speed").style = "background-color:#FFD972";
    document.getElementById("two-speed").style = "background-color:rgba(0,0,0,0)";
  });

  $('#two-speed').on('click', function() {
    audio.playbackRate = 2.0;
    document.getElementById("half-speed").style = "background-color:rgba(0,0,0,0)";
    document.getElementById("quarter-speed").style = "background-color:rgba(0,0,0,0)";
    document.getElementById("full-speed").style = "background-color:rgba(0,0,0,0)";
    document.getElementById("two-speed").style = "background-color:#FFD972";
  });

  getUltimate().done(function(json) {
    let we = JSON.stringify(word).replace(/\r\n/g, ' ').replace(/[\r\n]/g, ' ');
    $('#word-audio').attr('src', parseaws(word, json))
  })

  // WIN EVENT FUNCTION
  function win() {
    window.localStorage.setItem('score', parseInt(window.localStorage.getItem('score')) + 1);
    loWords.splice(random, 1);

    window.localStorage.setItem('word_data', JSON.stringify(loWords));
    $('#overlay-con').css('display', 'flex');
    $('#wrap').css('filter', 'blur(15px)');
    checkGameEnd();
  }

  function checkCorrect(clickedWord) {
    if(clickedWord == word){
      win();
        setTimeout(function () {
            // window.alert("You won the game.");

            location.reload();}, 3000);
    }
  }

  function checkGameEnd() {
    if (JSON.parse(localStorage.getItem('word_data')) < 1) {
      displayFinalWin();
    }
  }

  checkGameEnd();

  // Testing displaying win popup
  $(document).on('click', '#skip', function() {
    window.location.href = window.location.href;
  })
})


//match:
//zero or more set of constant, then
//one or more set of set of vowels, then,
//either:
//consonant followed by end of word, or,
//consonant followed by another consonant

function syllabify(word) {
    //takes a string and returns a list
    // if (englishRegex.test(word) ) {
      return word.match(syllableRegex);
    // } else {
    //   return asianWord(word);
    // }
}

// function asianWord(word) {
//   var asianBroken = [];

//   for (var i = 0; i < word.length; i++) {
//     asianBroken[i] = word[i];
//   }
//   return asianBroken;
// }


function parseaws(word, json) {
  var loLinks = json[word];
  for (var i = 0; i < loLinks.length; i++) {
    if (loLinks[i].startsWith("http://s3.amazonaws.com")) {
      return loLinks[i];
    }

  }
  return loLinks[0];
}

function displayFinalWin() {
  window.localStorage.clear();
  setTimeout(function() {
    window.location.href = "./win/winner-screen.html";
  }, 200)
}
