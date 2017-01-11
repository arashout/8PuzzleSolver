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
    //Measure times
    var t0 = performance.now();
    var s = new Solver(solObj.initialBoard);
    var t1 = performance.now();
    var timeDiff = t1 - t0;
    //solutionBoards contains the all boards between initial and goal board inclusive
    solObj.solutionBoards = s.solution();
    //Get ready to post message for user
    var msgBar = document.getElementById("messageBar");
    var msgText = document.getElementById("message");
    var timeBar = document.getElementById("timeOutput");
    var timeText = document.getElementById("timeMessage");

    if(solObj.solutionBoards === null){
        msgBar.style.opacity = "1";
        msgBar.style.height = "auto";
        msgText.innerText = "No solution exists for this board try another...";

        document.getElementById("prevBtn").style.opacity = "0";
        document.getElementById("prevBtn").style.height = "0px";
        document.getElementById("nextBtn").style.opacity = "0";
        document.getElementById("nextBtn").style.height = "0px";

        timeBar.style.opacity = "1";
        timeBar.style.height = "auto";
        timeText.innerText = "Took " + timeDiff + " ms to determine answer.";
    }
    else{
        msgBar.style.opacity = "1";
        msgBar.style.height = "auto";
        msgText.innerText = "Shortest solution = " + (solObj.solutionBoards.length - 1) + " moves.\nPress next to step through solution";

        document.getElementById("prevBtn").style.opacity = "1";
        document.getElementById("prevBtn").style.height = "auto";
        document.getElementById("nextBtn").style.opacity = "1";
        document.getElementById("nextBtn").style.height = "auto";

        timeBar.style.opacity = "1";
        timeBar.style.height = "auto";
        timeText.innerText = "Took " + Number(timeDiff).toFixed(2) + " ms to determine answer.";
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
    document.getElementById("messageBar").style.opacity = "0";
    document.getElementById("messageBar").style.height = "0px";
    document.getElementById("prevBtn").style.opacity = "0";
    document.getElementById("prevBtn").style.height = "0px";
    document.getElementById("nextBtn").style.opacity = "0";
    document.getElementById("nextBtn").style.height = "0px";
    document.getElementById("timeOutput").style.opacity = "0";
    document.getElementById("timeOutput").style.height = "0px";

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