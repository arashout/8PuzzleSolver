window.onload = function() {

    var board = ready();
    var s = new Solver(board);
    var sol = s.solution();
    var i = 1;
    document.getElementById("next").addEventListener("click", function(){
        i = nextMove(sol, i);
    });
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

function nextMove(solution, i){
    solution[i].arrangeBlocks();
    i++;
    return i;
}