var goalBlocks;
var goalBoard;
window.onload = function() {

    //Create object for tracking solution boards
    //Pass this through all functions
    var solObj = {
        i: 0,
        initialBoard: {},
        solutionBoards: [],
        compTime: 0
    }

    ready(solObj);
    instructions();
    document.getElementById("showSol").addEventListener("click", function(){showSolution(solObj);});
    document.getElementById("randomBtn").addEventListener("click", function(){randomBoard(solObj);});
    document.getElementById("nextBtn").addEventListener("click", function(){nextMove(solObj, false);});
    document.getElementById("playBtn").addEventListener("click", function(){playMoves(solObj);});
    document.getElementById("prevBtn").addEventListener("click", function(){prevMove(solObj);});
}
function ready(solObj){
    goalBlocks = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
    ];
    goalBoard = new Board(goalBlocks);
    //Initialize
    solObj.i = 0;
    solObj.solutionBoards = [];
    solObj.initialBoard = new Board(goalBlocks);
    solObj.initialBoard.arrangeBlocks();
}
