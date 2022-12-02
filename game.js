var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = -1;


$(".btn").click(function(e){
  if(level == -1){
    animatePress(e.target.id);
    playSound("start");
    setTimeout(function(){
      nextSequence();
    }, 6000);
  }
  else if(level >= 0){
      var userChosenColor = e.target.id;
      userClickedPattern.push(userChosenColor);

      playSound(userChosenColor);
      animatePress(userChosenColor);
      checkAnswer(userClickedPattern.length-1);
    }
});

function nextSequence(){
  level=level+1;
  var heading = "Level "+level;
  $("h1").text(heading);
  userClickedPattern = [];
  var random = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[random];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
}

var userIndex = 0;
var gameIndex = 0;


function playSound(name){
  const audio = new Audio('sounds\\'+name+'.mp3');
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function (){
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}
function startOver(){
    level = -1;
    gamePattern = [];
    $("h1").text("Click any button to Start");
  }

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function (){
        nextSequence();
      }
      ,1000);
      }
    } else{
      playSound("wrong");
      animatePress(currentLevel);
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
  }
