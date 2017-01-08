//Object.prototype.valueOf
//NOTE: "0" represents a free space
/**
 * Constructor for Board object
 * In: NxN blocks of ints
 */
function Board(blocks){
    this._tiles = blocks;
    this.dimension = this._tiles.length;
    this._manhattan = -1; //Initialize manhattan score to represent it is not cached yet
}
//API METHODS
/**
 * The manhattan distance is the distance between two points along grid lines
 * I use this as my heuristic cost
 * returns an integer value corresponding with the total value of all tiles
 * manhattan distances from correct location
 */
Board.prototype.manhattan = function(){
    //First check if manhattan has already been computed
    if(this._manhattan === -1){
        this._manhattan = 0;
        var a, b, val;
        for(var i = 0; i < this.dimension; i++){
            for(var j = 0; j < this.dimension; j++){
                val = this._tiles[i][j];
                if(val !== 0){//If not free space
                    //Formulas for finding actual coordinates of where value SHOULD be
                    a = Math.floor( (val - 1) / this.dimension)
                    b = (val - 1) - a * this.dimension;

                    this._manhattan += Math.abs(i - a);
                    this._manhattan += Math.abs(j - b);
                }
            }
        }
    }
    return this._manhattan;
}
Board.prototype.valueOf = function(){
    return this.manhattan();
}
Board.prototype.isGoal = function(){
    for(var i = 0; i < this.dimension; i++){
        for(var j = 0; j < this.dimension; j++){
            if(this._tiles[i][j] !== this.goalValueAt(i,j)){return false;}
        }
    }
    return true;
}
//HELPER METHODS
Board.prototype.goalValueAt = function(i, j){
    if(i === this.dimension - 1 && j === this.dimension - 1){ return 0;}
    //Formula for the goal value
    return 1 + i * this.dimension + j;
}
/**
 * This function creates a copy of the array 
 * for when new board objects need to be created
 */
Board.prototype.copyMatrix = function(currentArray){
    var newArray = [];
    
    for (var i = 0; i < currentArray.length; i++)
        newArray[i] = currentArray[i].slice();
    return newArray;
}
/**
 * Function to swap tiles given there x and y coordinates
 */
Board.prototype.swap = function(i, j, a, b){
   var swapTiles = this.copyMatrix(this._tiles);
   var tempTile = swapTiles[i][j];
   swapTiles[i][j] = swapTiles[a][b];
   swapTiles[a][b] = tempTile;
   return swapTiles;
}
//DEBUGGING METHODS
Board.prototype.toString = function (){
    var stringRep = "";
    
    for(var i = 0; i < this.dimension; i++){
        for(var j = 0; j < this.dimension; j++){
            stringRep += this._tiles[i][j] + " ";
        }
        stringRep += "\n";
    }
    return stringRep;
}