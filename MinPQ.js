//This is a minimum priority queue implemented using a binary heap

//Binary Heap Properties
//Parent of node k is at k/2
//Children of node k are at 2k and 2k+1
function MinPQ(){
    //Note: Root is at index 1 for easier arithemetic
    this._pq = [null];
    this.size = 0;
}
//API METHODS
MinPQ.prototype.insert = function(item){
    this._pq.push(item);
    this.size++;
    this.swim(this.size);
}
MinPQ.prototype.peek = function(){
    if(this.size === 0) {throw "Empty Queue";}
    return this._pq[1];
}
MinPQ.prototype.delMin = function(){
    if(this.size === 0) {throw "Empty Queue";}
    var minItem = this._pq[1];
    //Exchange min item with last place item
    this.exchange(1, this.size);
    //Delete last item (now min item) and decrement size
    this._pq.pop();
    this.size--;
    //Sink new first place item (previous last place) into proper position
    this.sink(1);
    return minItem;
}
//HELPER METHODS: To implement priority queue
MinPQ.prototype.swim = function(k){
    var j; //j is parent index
    while(k > 1){
        j = Math.floor(k/2); //Integer division to get parent index
        if(this.more(j,k)){
            this.exchange(j, k);
            k = j; //Now the current item is at parent index
        }
        else{
            break;
        }
    }
}
MinPQ.prototype.sink = function(k){
    var i = k*2; //Left Child
    //We want the "better child to be promoted" so we have to compare both children
    while(i <= this.size){
        //Find the "better" child
        if(i < this.size && this.more(i, i+1)){i++;}
        //Ensure child is "better" than parent before exchanging
        if(!this.more(k, i)){break;}
        this.exchange(k, i);
        k = i;
    }
    
}
MinPQ.prototype.exchange = function(i, j){
    var temp = this._pq[i];
    this._pq[i] = this._pq[j];
    this._pq[j] = temp;
}
/**
 * Checks whether item at index 'i' is larger than item at index 'j' 
 */
MinPQ.prototype.more = function(i, j){
    //NOTE: To do this comparison the object needs to have implemented "valueOf" method
    return this._pq[i] > this._pq[j];
}
//DEBUGGING METHODS
MinPQ.prototype.toString = function (){
    var stringRep = "";
    //Bit size means how many bits are need to represent the index number
    //I use to represent the tree, everytime bitsize changes -> go down a branch
    var prevBitSize = 1;
    var curBitSize = 1;
    
    for(var i = 1; i < this._pq.length; i++){
        curBitSize = i.toString(2).length;
        if(curBitSize !== prevBitSize){
            stringRep += "\n";
            prevBitSize = curBitSize;
        }
        stringRep += this._pq[i].toString() + " ";
    }
    return stringRep;
}