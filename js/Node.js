/**
 * Nodes will be used in the solver class
 * I'm honestly not sure if it is completely necessary 
 * but I don't know enough about javascript to implement differently
 * For now I will translate my JAVA version directly over
 */
function Node(board, moves, prevNode){
    this.board = board; //Board object
    this.moves = moves; //Current number of moves
    this.prev = prevNode; //Reference to the previous Node
}
/**
 * This let's us compare different Nodes to determine which is 
 * closer to the GOAL board => The one with the lower value...
 */
Node.prototype.valueOf = function(){
    return this.moves + this.board.manhattan();
}