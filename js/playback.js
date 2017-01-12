function nextMove(solObj, play){
    if(solObj.i !== solObj.solutionBoards.length - 1){
        solObj.solutionBoards[solObj.i + 1].arrangeBlocks();
        solObj.i = solObj.i + 1;
    }
    else{return;}
    if(play){
        setTimeout(function() {nextMove(solObj, true);}, 500);
    }
}
function playMoves(solObj){
    nextMove(solObj, true);
}
function prevMove(solObj){
    if(solObj.i !== 0){
        solObj.solutionBoards[solObj.i - 1].arrangeBlocks();
        solObj.i = solObj.i - 1;
    }

}