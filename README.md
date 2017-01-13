# 8PuzzleSolver
One of the assignments for the Princeton Algorithms-I on Coursera I took during the end of the 2016 was to build a sliding puzzle solver.
The course is really great and I learned a substantial amount about data structures and building efficient algorithms, but the one caveat was that everything had to be completed in the Java programming language. 
This made it much more difficult to sure my progress on the internet so I decided to port over one my favorite assignments into Javascript and the result is what you see [here](https://arashout.github.io/8PuzzleSolver/)

## Minimum Priority Queue
At the heart of the application is the Priority Queue data structure which has worst case running times of log(O(N)) for inserts and deletions.
This is critical because the A* algorithm for solving the puzzles using the PQ at every iteration in the main while loop in [Solver.js](js/Solver.js). I quickly learned that having a slow implementation of the basic building block algorithm will cause the browser to essentially crash.   

## A* Algorithm
Before I explain how the Solver works I need explain some background information about the puzzle.
### Neighboring Boards
A neighboring board to the original board is basically the board you would get after a legal move. e.g. Moving a tile into a free space.
For example, if the free space was in the middle of the board then this board has 4 neighbors after 1 move, since tiles can be moved into the free space from 4 directions
### Manhattan Distance
To solve the puzzle, we need a way to determine how close we are the goal board, that is the board where all the tiles are in ascending order (left to right, top to bottom). The way I accomplish this is by determining the manhattan distance of the tiles that are in the wrong spot TO where they should be.
### Scoring Function
The final scoring function used in the A* search combines the sum of number of moves currently made to reach the board and the manhattan distances of the tiles in the wrong place on the current board.
### Nodes
A node is an object I have defined that contains a board, the manhattan distance of the board, the number of moves to reach the board and some utility functions for comparing them. Furthermore, it references the previous Node that it is a neighbor of (So that you can backtrack the solution)
### Basic Steps for the Solver
1. Delete + Return the Node with the lowest score on the MinPQ
2. Check if the board on the node is goal board - If yes then stop
3. Insert neighbors of the current board to MinPQ
   * Note: When the priority compares the nodes during insertions the nodes are also processed (Manhattan Distance and scoring function determined)
4. Repeat!

### Critical Optimizations
If you have board B1 and it has neighbors B2, B3, B4 one of the neighbors is going to be the board B1. This is a useless result and A\* will end up exploring this node. Thus when determing the nodes to add to the MinPQ we make sure to remove this neighbor!
### Other Optimizations
I cached the value of the manhattan function so that it doesn't need to be recomputed each time boards are compared to each other.
## Lessons
### Java doesn't translate directly over to Javascript
As mentioned before this app is essentially a port of an assignment I did in Java. Java is a object oriented language but Javascript is not necessary one. I tried my best to imitate object oriented design with Javascript prototypes but I'm not sure if I was using the language to it's full potential.
### Animating things is hard
Porting over my solution from Java felt like the easy part of the project, animating all the tiles moving and sliding was much more difficult. I also didn't have a lot of experience with callback functions so that was a learning experience as well (The play button uses a callback function, with setTimeout)
### There's still a significant amount of optimizations left
Here's a list that comes to mind
* Using 1D arrays for the tiles instead of 2D to save memory
* Using only 1 MinPQ for the twin and initial board
* Using better version of scoring function like linear conflict
* Using a better algorithm like IDA* (iterative deepening A*)
