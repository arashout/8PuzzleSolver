//Create global variables to pause/start playback
var play = false;
var nextMoveTimer;
//Pick any tile to determine how long the setTimeout needs to wait for animations to finish
var tileElement =  document.getElementsByClassName("tile")[0];
var cssTransitionTime = window.getComputedStyle(tileElement,null).getPropertyValue("transition-duration");
//Has "s" seconds at the end need to truncate and convert to milliseconds
cssTransitionTime = cssTransitionTime.slice(0,-1);
cssTransitionTime = cssTransitionTime * 1000;
function nextMove(solObj){
    //Ensure we are not at the end of the solution
    if(solObj.i !== solObj.solutionBoards.length - 1){
        solObj.solutionBoards[solObj.i + 1].arrangeBlocks();
        solObj.i = solObj.i + 1;
    }
    //If we are at the end, then don't consider anything else
    else{return;}
    //If variable turn on in playMoves then continue to call nextMove
    if(play){
        nextMoveTimer = setTimeout(function() {nextMove(solObj);}, cssTransitionTime);
    }
}
function playMoves(solObj){
    play = true;
    nextMove(solObj);
}
function prevMove(solObj){
    play = false; //Pause playback
    window.clearTimeout(nextMoveTimer); //Clear timeout so nextMove is not called again
    if(solObj.i !== 0){
        solObj.solutionBoards[solObj.i - 1].arrangeBlocks();
        solObj.i = solObj.i - 1;
    }

}