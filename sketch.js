function setup() {
    var pq = new MinPQ();
    var blocks = [
        [6, 1, 0],
        [5, 2, 4],
        [7, 3, 8]
        ];
    var b1 = new Board(blocks);
    var s = new Solver(b1);
    var sol = s.solution();
    for(var i = 0; i < sol.length; i++){
        alert(sol[i]);
    }
}

function draw() {

}