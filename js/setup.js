window.onload = function() {

    var board = ready();
    //Create new solver object to find solution for given board
    var s = new Solver(board);

    //solArr contains the between the initial board and goal board inclusive
    var solArr = s.solution();
    //Create object for tracking which board the user wants to see
    var solObj = {
        i: 0,
        solutionBoards: solArr
    }
    document.getElementById("nextBtn").addEventListener("click", function(){nextMove(solObj);});
    document.getElementById("prevBtn").addEventListener("click", function(){prevMove(solObj);});
}
function ready(){
    var blocks = [
    [6, 1, 0],
    [5, 2, 4],
    [7, 3, 8]
    ];
    var b = new Board(blocks);
    b.arrangeBlocks();
    return b;
}

function nextMove(solObj){
    if(solObj.i !== solObj.solutionBoards.length){
        solObj.solutionBoards[solObj.i + 1].arrangeBlocks();
        solObj.i = solObj.i + 1;
    }

}
function prevMove(solObj){
    if(solObj.i !== 0){
        solObj.solutionBoards[solObj.i - 1].arrangeBlocks();
        solObj.i = solObj.i - 1;
    }

}
function fisherYates(myArray) {
    for(var i = 0; i< myArray.length; i++) {
       k = myArray[i].length;
       while(k--){
            j = Math.floor(Math.random() * (myArray.length - 1));
            tempk = myArray[i][k];
            tempj = myArray[i][j];
            myArray[i][k] = tempj;
            myArray[i][j] = tempk;
       }
    }
}