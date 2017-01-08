function setup() {
    var pq = new MinPQ();
    var blocks = [
        [1, 2, 3],
        [4, 0, 6],
        [7, 8, 5]
        ];
    var b1 = new Board(blocks);
    var neighbors = b1.neighbors();
    for(var i = 0; i < neighbors.length; i++){
        alert(neighbors[i]);
    }
}

function draw() {

}