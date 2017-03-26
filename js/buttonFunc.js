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
        msgText.innerText = "Shortest solution = " + (solObj.solutionBoards.length - 1) + " moves";
        //Make my previous and next buttons appear
        document.getElementById("prevBtn").style.opacity = "1";
        document.getElementById("prevBtn").style.height = "auto";
        document.getElementById("playBtn").style.opacity = "1";
        document.getElementById("playBtn").style.height = "auto";
        document.getElementById("nextBtn").style.opacity = "1";
        document.getElementById("nextBtn").style.height = "auto";
        //Make my timer appear
        document.getElementById("timeOutput").style.opacity = "1";
        document.getElementById("timeOutput").style.height = "auto";
        document.getElementById("timeOutput").innerText = "Computation time = " + solObj.compTime + " ms";
    }
}
function instructions(){
    var msgBar = document.getElementById("messageBar");
    var msgText = document.getElementById("message");
    msgBar.style.opacity = "1";
    msgBar.style.height = "auto";
    msgText.innerText = "Press RANDOM BOARD then GET SOLUTON to begin!"
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
    document.getElementById("playBtn").style.opacity = "0";
    document.getElementById("playBtn").style.height = "0px";
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
