function setup() {
    var pq = new MinPQ();
    pq.insert(5);
    pq.insert(7);
    pq.insert(1);
    pq.insert(6);
    pq.insert(2);
    alert(pq);
    console.log(pq.delMin());
    alert(pq);
}

function draw() {

}