function Solver(initialBoard){
    var orgPQ = new TinyQueue(); //Priority Queue for the original board
    var twinPQ = new TinyQueue(); //Priority Queue for twin board
    //Remember that if we find solution for TWIN board then the original is UNSOLVABLE

    //Initial setup
    var initialTwin = initialBoard.twin();
    var curNode = new Node(initialBoard, 0, null);
    var twinCurNode = new Node(initialTwin, 0, null);
    orgPQ.push(curNode);
    twinPQ.push(twinCurNode);

    //We are going to alternate processing nodes from original priority queue
    //and the twin priority queue, which ever one arrives at the answer determines
    //if there exists a solution

    //Furthermore, the A* algorithm ensures that his will be the shortest route
    //Minimum number of moves

    while(true){

        //Process Node closest to goal
        curNode = orgPQ.pop();
        twinCurNode = twinPQ.pop();

        //Check if goal reached
        if(curNode.board.isGoal()){
            this.minMoves = curNode.moves;
            this.isSolvable = true;
            this.finalNode = curNode;
            break;
        }
        else if(twinCurNode.board.isGoal()){
            this.minMoves = -1;
            this.isSolvable = false;
            break;
        }

        //Add Neighbors for next node
        var curNeighbors = curNode.board.neighbors();
        var twinCurNeighbors = twinCurNode.board.neighbors();
        var b, n;
        for(var i = 0; i < curNeighbors.length; i++){
            b = curNeighbors[i]; //Current Neighboring Board
            //Critical Optimizations!
            //Ignore any boards that are the same as board from one step before
            if(curNode.prev !== null && curNode.prev.board.equals(b)){continue;}
            //Ignore boards that are same as initial boards
            if(initialBoard.equals(b)){continue;}
            //Add all other boards to priority queue as nodes
            //With incremented number of moves and reference to current node
            n = new Node(b, curNode.moves + 1, curNode);
            orgPQ.push(n);
        }
        
        //Same thing as before but with twin board
        for(i = 0; i < twinCurNeighbors.length; i++){
            b = twinCurNeighbors[i]; 
            if(twinCurNode.prev !== null && twinCurNode.prev.board.equals(b)){continue;}
            //Ignore boards that are same as initial boards
            if(initialTwin.equals(b)){continue;}

            //Add all other boards to priority queue as nodes
            //With incremented number of moves and reference to current node
            n = new Node(b, twinCurNode.moves + 1, twinCurNode);
            twinPQ.push(n);
        }
    }

}

/**
 * Returns an array of board objects if a solution exists
 * Otherwise returns null
 */
Solver.prototype.solution = function(){
    var arr = [];
    var curNode = this.finalNode;
    if(this.isSolvable){
        //Step-back through solution
        while(true){
            if(curNode === null){break;}
            arr.push(curNode.board);
            curNode = curNode.prev;
        }
        //Reverse solution - so it is START to FINISH
        return arr.reverse();
    }
    return null;
}