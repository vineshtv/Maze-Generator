// maze generator using recursive backtracker algorithm in the below wiki.
// https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker

var rows, cols;
var cellSize = 20;
let grid = [];
var current;
let stack = [];
var generatingPhase = true;
let solveStack = [];
var solved = false;

function setup() {
	createCanvas(400, 400);
    background(0);
    cols = floor(width/cellSize);
    rows = floor(height/cellSize); 
    //frameRate(5);
    
    for(var j = 0; j < rows; j++){
        for(var i = 0; i < cols; i++){
            let cell = new Cell(i, j);
            grid.push(cell);
        }
    }
    
    //Step 1 . Make the initial cell the current cell and mark it as visited
    //         (the marking of visited is done in the draw function)
    current = grid[0];
    //current = grid[floor(random(0,grid.length))];
    
}
 
function draw() {
    background(51);
    for(var i = 0; i < grid.length; i++){
        grid[i].show();
    }
    
    if (generatingPhase){
        console.log("generating the maze now.");
        current.visited = true;
        current.highlight();
        // Step 2.1.1 - Choose randomly one of the unvisited neighbours.
        var next = current.getRandomNeighbor();
        if (next){
            // Step 2.1.2 - Push the current cell to the stack.
            stack.push(current);
            current.inStack = true;

            // Step 2.1.3 - Remove the wall between the current cell and the chosen cell.
            removeWalls(current, next);

            // Step 2.1.4 - Make the chosen cell the current cell and mark it as visited.
            next.visited = true;
            current = next;
        }
        else{
            // Step 2.2 - Else if stack is not empty
            if(stack.length > 0){
                // Step 2.2.1 - Pop a cell from the stack
                // Step 2.2.2 - Make it the current cell
                current = stack.pop();
                current.inStack = false;

            }
        }
        
        if (stack.length == 0){
            generatingPhase = false;
        }
    }
    else if (!solved){
        console.log("Trying to solve now.");
        current.touched = true;
        current.highlight();
        
        
        var next = current.getRandomPath();
        if(next){
            solveStack.push(current);
            current.inSolveStack = true;
            
            next.touched = true;
            current = next;
            //console.log(next.i, next.j);
        }
        else{
            if(solveStack.length > 0){
                current = solveStack.pop();
                current.inSolveStack = false;
            }
        }
        
        //console.log("now in ", current.i, current.j);
        //console.log("final ", rows, cols);
        if (current.i == rows - 1 && current.j == cols - 1){
            solved = true;
            //Hack to highlight the final node.
            current.inSolveStack = true;
        }
    }
}

function removeWalls(a, b) {
    var x = a.i - b.i;
    
    if (x == 1){
        a.walls[3] = false;
        b.walls[1] = false;
    }
    else if (x == -1){
        a.walls[1] = false;
        b.walls[3] = false;
    }
    
    var y = a.j - b.j;
    
    if(y == 1){
        a.walls[0] = false;
        b.walls[2] = false;
    }
    else if (y == -1){
        a.walls[2] = false;
        b.walls[0] = false;
    }
}