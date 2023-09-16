const buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        newSequence();
        started = true;
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                newSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 300);

        startOver();
    }
}

function newSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level);
    var randomNumber =  Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(fileName){
    var audio = new Audio("sounds/" + fileName + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}

