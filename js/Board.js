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
/**
 * Basically if you can solve a "twin" board, you proven that there
 * exists no solution to the original board
 * This function creates a twin board by making an illegal swap
 * An illegal swap means not using the free SPACE tile to swap
 * NOTE: this looks like a n^2 function but practically it is constant time
 */
Board.prototype.twin = function(){
    var j = 0;
    for (var i = 0; i < this.dimension; i++) {
        //Make sure that no tile to be swapped is free space
        if (this._tiles[i][j] !== 0 && this._tiles[i][j + 1] !== 0) {
            return new Board(this.swap(i, j, i, j + 1));
        }
    }
    throw "No plausible twin swaps found";
}
/**
 * This function returns the neighboring boards
 * Boards that are one LEGAL move away from the original
 */
Board.prototype.neighbors = function(){
    //Find space coordinates
    var spaceLoc = this.spaceCoords();
    var r = spaceLoc.i;
    var c = spaceLoc.j;
    var neigh = [];
    
    //All Cases
    if (r > 0) {neigh.push(new Board(this.swap(r, c, r - 1, c)));}
    if (c > 0) {neigh.push(new Board(this.swap(r, c, r, c - 1)));}
    if (r < this.dimension - 1) {neigh.push(new Board(this.swap(r, c, r + 1, c)));}
    if (c < this.dimension - 1) {neigh.push(new Board(this.swap(r, c, r, c + 1)));}

    return neigh;
}
Board.prototype.equals = function(anotherBoard){
    if(anotherBoard == this){return true;}//Same object instance
    if(anotherBoard === null){return false;}
    //Check for correct object type
    if((anotherBoard.constructor.name !== this.constructor.name)){return false;}
    
    if(this.dimension !== anotherBoard.dimension){return false;}
    //Finally check each individual tile for equality
    for (var i = 0; i < this.dimension; i++) {
        for (var j = 0; j < this.dimension; j++) {
            if(this._tiles[i][j] !== anotherBoard._tiles[i][j]){ return false;}
        }
    }
    return true;
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
/**
 * Returns an object that contains the coordinates of the
 * free SPACE tile
 */
Board.prototype.spaceCoords = function(){
    for (var i = 0; i < this.dimension; i++) {
        for (var j = 0; j < this.dimension; j++) {
            if (this._tiles[i][j] === 0) {
                return {i: i, j: j};
            }
        }
    }
    throw "No SPACE tile found";
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
//DRAWING METHODS
/**
 * This function moves the tiles to the correct position
 */
Board.prototype.arrangeBlocks = function(){   
    //Classes determine position of tiles
    //Hard-coded values...
    var posDict = {
        "00":"pos0",
        "01":"pos1",
        "02":"pos2",
        "10":"pos3",
        "11":"pos4",
        "12":"pos5",
        "20":"pos6",
        "21":"pos7",
        "22":"pos8"
    }
    var tile, tileNum, key, prevClass;
    for(var i = 0; i < this.dimension; i++){
        for(var j = 0; j < this.dimension; j++){
            //Using the tile value we can reference DOM element
            tileNum = parseInt(this._tiles[i][j]);
            tile = document.getElementById("tile" + tileNum);

            //Use position of tile to create key
            key = i.toString() + j.toString();

            //Remove previous position class
            prevClass = tile.classList.item(1);
            if(prevClass !== null){
                tile.classList.remove(prevClass);
            }
            //Add new position class according to dictionary
            tile.classList.add(posDict[key]);
        }
    }
}