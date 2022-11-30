var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = -1;

$(document).keypress(function(){
  if(level == -1){
    nextSequence();
  }
});


$(".btn").click(function(e){
    var userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  level=level+1;
  var heading = "Level "+level;
  $("h1").text(heading);
  userClickedPattern = [];
  console.log("Level "+level);
  var random = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[random];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

var userIndex = 0;
var gameIndex = 0;


function playSound(name){
  const audio = new Audio('sounds\\'+name+'.mp3');
  animatePress(name);
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
    $("h1").text("Press A Key to Start");
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
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
  }
  
