function setup() {
    var pq = new MinPQ();
    var blocks = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0]
        ];
    var b1 = new Board(blocks);
    console.log(b1.valueOf());
    var n1 = new Node(b1, 5, null);
    console.log(n1.valueOf());
}

function draw() {

}