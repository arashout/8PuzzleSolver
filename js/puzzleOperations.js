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