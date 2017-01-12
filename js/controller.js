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

    document.getElementById("showSol").addEventListener("click", function(){
        showSolution(solObj);
    });
    document.getElementById("randomBtn").addEventListener("click", function(){
        randomBoard(solObj);
    });
    document.getElementById("nextBtn").addEventListener("click", function(){nextMove(solObj);});
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
function showSolution(solObj){
    //Make the message bar pop in
    var msgBar = document.getElementById("messageBar");
    var msgText = document.getElementById("message");
    msgBar.style.opacity = "1";
    msgBar.style.height = "auto";

    //This portion is no longer used since random only chooses boards with solutions
    //But I will keep for when I add user inputted boards
    if(solObj.solutionBoards === null){
        msgText.innerText = "No solution exists for this board try another...";
    }
    else if(solObj.solutionBoards.length == 0){
        msgText.innerText = "At goal board already!";
    }
    else{
        msgText.innerText = "Shortest solution = " + (solObj.solutionBoards.length - 1) + " moves.\nPress next to step through solution";
        //Make my previous and next buttons appear
        document.getElementById("prevBtn").style.opacity = "1";
        document.getElementById("prevBtn").style.height = "auto";
        document.getElementById("nextBtn").style.opacity = "1";
        document.getElementById("nextBtn").style.height = "auto";
        //Make my timer appear
        document.getElementById("timeOutput").style.opacity = "1";
        document.getElementById("timeOutput").style.height = "auto";
        document.getElementById("timeOutput").innerText = "Computation time = " + solObj.compTime + " ms";
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
    //Reset variables and hide old buttons + messages
    solObj.i = 0;
    solObj.solutionBoards = [];
    //Make all buttons and messages go away
    document.getElementById("messageBar").style.opacity = "0";
    document.getElementById("messageBar").style.height = "0px";
    document.getElementById("prevBtn").style.opacity = "0";
    document.getElementById("prevBtn").style.height = "0px";
    document.getElementById("nextBtn").style.opacity = "0";
    document.getElementById("nextBtn").style.height = "0px";
    document.getElementById("timeOutput").style.opacity = "0";
    document.getElementById("timeOutput").style.height = "0px";

    var randomBlocks;
    //This loop insures that only random boards with solutions get through!
    while(true){
        randomBlocks = fisherYates2d(solObj.initialBoard._tiles);
        solObj.initialBoard = new Board(randomBlocks);
        solveBoard(solObj);
        if(solObj.solutionBoards !== null){
            solObj.initialBoard.arrangeBlocks();
            break;
        }
    }

}
function solveBoard(solObj){
    //Create new solver object to find solution for given board, board get solved in constructor of Solver
    var s = new Solver(solObj.initialBoard);
    //solutionBoards contains the all boards between initial and goal board inclusive
    var t0 = performance.now();
    s = new Solver(solObj.initialBoard);
    var t1 = performance.now();
    solObj.solutionBoards = s.solution();
    solObj.compTime = Number(t1 - t0).toFixed(2);
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