function setup() {
    var pq = new MinPQ();
    var blocks = [
        [1, 2, 8],
        [4, 5, 6],
        [7, 3, 0]
        ];
    var tiles = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0]
        ];
    var b1 = new Board(blocks);
    var b2 = new Board(tiles);
    console.log(b1.isGoal());
    console.log(b2.isGoal());
    console.log(b1.swap(0,0,2,2));
}

function draw() {

}