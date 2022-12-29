var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
$(document).on("keydown",function(){
        if(level<1){
            $("#keyboardGIF").slideUp();
            $(".row").removeClass("hidden");  
            setTimeout(function (){
                nextSequence();
            },400)
        }
    }
);

function nextSequence() {
    level++;
    $("h1").html("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

// console.log("Game: " + gamePattern);                     Cheats.

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}

$(".btn").on("click",handler);                          //Handler functions are usually Callback functions.
function handler(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

// console.log("User: " + userClickedPattern);              Cheats.

    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    checkSequence(userClickedPattern.length-1);
}

function checkSequence(i){
    
    if(userClickedPattern[i]===gamePattern[i]){
        if(i===(gamePattern.length-1)){
            setTimeout(function (){
                nextSequence();
            },1000)
            userClickedPattern = [];
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        
        setTimeout(function (){
                            $("body").removeClass("game-over");
                    }, 200);
    
        $("h1").html("Game Over! Press any key to restart.");

        startOver();
    }
        
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

function playSound(chosenColor){
    var audio = new Audio("sounds/" + chosenColor + ".mp3");
    audio.play();
}

function animatePress(clickedColor){
    $("#" + clickedColor).addClass("pressed");
    setTimeout(function (){
        $("#" + clickedColor).removeClass("pressed");
    }, 100);
}
