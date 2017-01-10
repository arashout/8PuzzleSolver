function setup() {
    var blocks = [
        [6, 1, 0],
        [5, 2, 4],
        [7, 3, 8]
        ];
    var b = new Board(blocks);
    var s = new Solver(b);
    var sol = s.solution();

    var workSpace = document.getElementById("theBoards");
    for (var i = sol.length - 1; i >= 0; i--) {
        if(i !== sol.length - 1){
            var boardId = "board" + (i + 1);
            var prevBoard = document.getElementById(boardId);
        }
        var divBoard = document.createElement("Div");
        divBoard.className = "board";
        divBoard.id = "board" + i;
        workSpace.appendChild(divBoard);
        sol[i].drawHTML(divBoard.id);  
    }
}
window.onload = setup;