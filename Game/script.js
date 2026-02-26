//--------------Sound--------------------------------

//see in the KeyCode



//----------------------------------------------------
var boy = document.getElementById("boy");
var background = document.getElementById("background");
var intro = document.getElementById("intro");

IdleAnimationNumber = 0;
IdleImageNumber = 0;
var runAnimationNumber = 0;
var RunImageNumber = 0;
var backgroundPositionX = 0;
var movebackgroundAnimationId = 0;

// ---------------- Idle Animation ----------------
function IdleAnimation() {
    IdleImageNumber++;
    if (IdleImageNumber == 16) IdleImageNumber = 1;
    boy.src = "resources/png/Idle (" + IdleImageNumber + ").png";
}

function IdleAnimationStart() {
    IdleAnimationNumber = setInterval(IdleAnimation, 150);
}

// ---------------- Run Animation ----------------
function runAnimatoin() {
    RunImageNumber++;
    if (RunImageNumber == 16) RunImageNumber = 1;
    boy.src = "resources/png/Run (" + RunImageNumber + ").png";
}

function runAnimationStart() {
    runAnimationNumber = setInterval(runAnimatoin, 100);
    clearInterval(IdleAnimationNumber);
}
//-----------------scoreBoard-----------------------
var score=0;


// ---------------- Move Background ----------------
function moveBackground() {

    backgroundPositionX -= 20;
    background.style.backgroundPositionX = backgroundPositionX + "px";
    score=score+1;
    document.getElementById("score").innerHTML=score;
}
//---------------sounds---------------------
let jumpSound =new Audio("resources/sounds/jumpSound.mp3");
let musicSound =new Audio("resources/music/sandy_rush_loop.m4a");
      


// ---------------- Key Press ----------------
function keyCheck(event) {
    var KeyCode = event.which;
    if (KeyCode == 13) {
        
        
          // Enter key
        // Hide intro
        intro.classList.add("hide");

        // Zoom out background and boy
        background.classList.add("zoom-out");
        boy.classList.add("zoom-out");
        

        // Start game after zoom out
        setTimeout(() => {
              musicSound.play();
            if(runAnimationNumber == 0) runAnimationStart();
            if(movebackgroundAnimationId == 0)
                movebackgroundAnimationId = setInterval(moveBackground, 100);
        }, 500);
        if(boxAnimationId==0){
            boxAnimationId= setInterval(boxAnimation,100);
        }
    }
    if(KeyCode==32){
        jumpSound.play();
        musicSound.play();
        // Hide intro
        intro.classList.add("hide");

        // Zoom out background and boy
        background.classList.add("zoom-out");
        boy.classList.add("zoom-out");
        if(jumpAnimationNumber==0){
            jumpAnimationStart();
            if(movebackgroundAnimationId == 0){
                movebackgroundAnimationId = setInterval(moveBackground, 100);
                }

        }
         if(boxAnimationId==0){
            boxAnimationId= setInterval(boxAnimation,100);
        }
    }
}

// ---------------- Start Game ----------------
function startGame() {
    IdleAnimationStart();
    // At start: background and boy are already zoomed in via CSS (scale 1.5)
}

//----------------------------------------------------------
var boyMargintop=400
var jumpImageNumber = 1;
function jumpAnimation(){


    
    jumpImageNumber=jumpImageNumber+1;

    if(jumpImageNumber<=6){
        boyMargintop =boyMargintop-30;
        boy.style.marginTop=boyMargintop +"px";



    }
    if(jumpImageNumber>=12){
         boyMargintop =boyMargintop+30;
         boy.style.marginTop=boyMargintop +"px";
    }

    if(jumpImageNumber==16){
        jumpImageNumber=1;
        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber=0;
        RunImageNumber=0;
        runAnimationStart();
    }
    boy.src="resources/png/Jump ("+jumpImageNumber+").png";

}

var jumpAnimationNumber=0;

function jumpAnimationStart(){
    clearInterval(IdleAnimationNumber);
    RunImageNumber=0;
    clearInterval(runAnimationNumber);
    jumpAnimationNumber=setInterval(jumpAnimation,100);
    

}

//----------------------------Absolute Game---------------------------------

boxMarginLeft =2000;
function createBoxes(){

    for(var i=0; i<=1000 ;i++){

            var box= document.createElement("div");
            box.className="box";
            document.getElementById("background").appendChild(box);
            box.style.marginLeft = boxMarginLeft + "px";

            boxMarginLeft=boxMarginLeft+500;
            box.id="box"+i;

            if(i<5){
                boxMarginLeft=boxMarginLeft+500;

            }
            if(i>=5 & i<5){
                boxMarginLeft=boxMarginLeft+400;
            }
            if(i>=5 & i<10){
                boxMarginLeft=boxMarginLeft+300;
            }
            if(i>=10 & i<20){
                boxMarginLeft=boxMarginLeft+200;
            }
            if(i>=25 & i<30){
                boxMarginLeft=boxMarginLeft+100;
            }
            if(i>=30 & i<50){
                boxMarginLeft=boxMarginLeft+50;
            }
            if(i>=50){
                boxMarginLeft=boxMarginLeft+25;
            }


    }
    
}

var boxAnimationId =0;
function boxAnimation(){
    for(var i=0;i<1000;i++){

        var box=document.getElementById("box"+i);
        var currentMarginLeft=getComputedStyle(box).marginLeft;
        var newMarginLeft=parseInt(currentMarginLeft)-40;
        box.style.marginLeft=newMarginLeft+"px";
        if(newMarginLeft>=-80 & newMarginLeft<=80){

           if(boyMargintop>=350){
            clearInterval(boxAnimationId);
        
            clearInterval(runAnimationNumber);
            runAnimationNumber=-1;

            clearInterval(jumpAnimationNumber);
            jumpAnimationNumber=-1;
            clearInterval(movebackgroundAnimationId);
            movebackgroundAnimationId=-1;
            deadAnimationNumber = setInterval(boyDeadAnimation,100);
        
    }

}

    }
}
//-------------------GameOverSound--------------------------------

let overSound =new Audio("resources/sounds/overSound.wav");

//--------------------GameOver-----------------------------------------

deadImageNumber=1;
deadAnimationNumber=0;
function boyDeadAnimation(){
    deadImageNumber=deadImageNumber+1;
    if(deadImageNumber==16){
        overSound.play();
        overSound.loop = false;
        deadImageNumber=15;
        document.getElementById("end").style.visibility="visible";
        document.getElementById("endScore").innerHTML=score;
        
        
        
    }
    boy.src="resources/png/Dead ("+deadImageNumber+").png";

}

function reload(){
    location.reload();
}