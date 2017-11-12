class Cell {
    constructor(i, j){
        this.i = i;
        this.j = j; 
        this.walls = [true, true, true, true]; // [top, right, bottom, left ]
        this.visited = false;
        this.inStack = false;
        this.touched = false;
        this.inSolveStack = false;
    }
    
    show() {
        var x = this.i * cellSize;
        var y = this.j * cellSize;
        stroke(255);
        if  (this.walls[0]){
            line(x           , y           , x + cellSize, y           );    
        }
        
        if (this.walls[1]){
            line(x + cellSize, y           , x + cellSize, y + cellSize);    
        }
        
        if (this.walls[2]){
            line(x + cellSize, y + cellSize, x           , y + cellSize);    
        }
        
        if (this.walls[3]){
            line(x           , y + cellSize, x           , y           );     
        }
        if(generatingPhase){
            if (this.visited){
                noStroke();
                fill(255, 0 , 255, 75);
                rect(x, y, cellSize, cellSize);
            }

            if (this.inStack){
                noStroke();
                fill(0,0,255, 75);
                rect(x, y, cellSize, cellSize);
            }
        }
        else{
            if (this.inSolveStack){
                noStroke();
                fill(255,0,0,75);
                rect(x, y, cellSize, cellSize);
            }
        }
    }
    
    index(i, j) {
        //Boundary check
        if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1){
            return -1;
        }
        return(i + j * cols);
    }
    
    getRandomNeighbor() {
        var neighbors = [];
        var i = this.i;
        var j = this.j
        var top    = grid[this.index(i, j - 1)];
        var right  = grid[this.index(i + 1, j)];
        var bottom = grid[this.index(i, j + 1)];
        var left   = grid[this.index(i - 1, j)];
        
        if (top && !top.visited){
            neighbors.push(top);
        }
        if(right && !right.visited){
            neighbors.push(right);
        }
        if(bottom && !bottom.visited){
            neighbors.push(bottom);
        }
        if(left && !left.visited){
            neighbors.push(left);
        }
        
        if(neighbors.length > 0){
            var randomIndex = floor(random(0, neighbors.length ));
            return(neighbors[randomIndex]);
        }
        else{
            return undefined; 
        }        
    }
    
    getRandomPath() {
        var paths = [];
        var i = this.i;
        var j = this.j;
        
        for(var k = 0; k < this.walls.length; k++){
            if (this.walls[k] == false){
                if(k == 0){
                    var top = grid[this.index(i, j - 1)];
                    if (top && !top.touched){
                        paths.push(top);
                    }
                }
                else if (k == 1) {
                    var right = grid[this.index(i + 1, j)];
                    if (right && !right.touched){
                        paths.push(right);
                    }
                }
                else if (k == 2) {
                    var bottom = grid[this.index(i, j + 1)];
                    if (bottom && !bottom.touched){
                        paths.push(bottom);
                    }
                }
                else if (k == 3) {
                    var left = grid[this.index(i - 1, j)];
                    if (left && !left.touched){
                        paths.push(left);
                    }
                }
            }
        }
        
        if (paths.length > 0){
            var randomIndex = floor(random(0,paths.length));
            return(paths[randomIndex]);
        }
        else{
            return undefined;
        }
    }
    
    highlight() {
        var x = this.i * cellSize;
        var y = this.j * cellSize;
        noStroke();
        fill(0, 255, 0, 75);
        rect(x, y, cellSize, cellSize);
    }
}