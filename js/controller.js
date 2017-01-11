window.onload = function() {

    //Create object for tracking solution boards
    //Pass this through all functions
    var solObj = {
        i: 0,
        initialBoard: {},
        solutionBoards: []
    }

    ready(solObj);

    document.getElementById("solveBtn").addEventListener("click", function(){
        solveBoard(solObj);
    });
    document.getElementById("randomBtn").addEventListener("click", function(){
        randomBoard(solObj);
    });
    document.getElementById("nextBtn").addEventListener("click", function(){nextMove(solObj);});
    document.getElementById("prevBtn").addEventListener("click", function(){prevMove(solObj);});
}
function ready(solObj){
    var basicBlocks = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
    ];
    //Initialize
    solObj.i = 0;
    solObj.solutionBoards = [];
    solObj.initialBoard = new Board(basicBlocks);
    solObj.initialBoard.arrangeBlocks();
}
function solveBoard(solObj){
    //Create new solver object to find solution for given board, board get solved in constructor of Solver
    var s = new Solver(solObj.initialBoard);

    //solutionBoards contains the all boards between initial and goal board inclusive
    solObj.solutionBoards = s.solution();
    if(solObj.solutionBoards === null){
        alert("No solution exists");
    }
    else{
        alert("Found");
    }
}
function nextMove(solObj){
    if(solObj.i !== solObj.solutionBoards.length - 1){
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
function randomBoard(solObj){
    //Reset variables
    solObj.i = 0;
    solObj.solutionBoards = [];

    var randomBlocks = fisherYates2d(solObj.initialBoard._tiles);
    solObj.initialBoard = new Board(randomBlocks);
    solObj.initialBoard.arrangeBlocks();
}
function fisherYates2d(myArray) {
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
    return myArray;
}