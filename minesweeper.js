export function createNewGame (origin, ratio, mineCount) {
    var firstBlock = origin;
    var boardRatio = ratio;
    var minePositions = [];
    var Row = new Array(boardRatio);
    var Board = new Array(boardRatio).fill(null);
    Row.fill(0);
    Board.fill(0);
    Board = Board.map(val => Array(boardRatio).fill(0));
    
    /*
        ! If the board size is too small and there are too many mines, the program will not have enough spots to place mines in or will take too long trying to find spots
    */
    const createMinePositions = () => {

        var minesToPlace = mineCount;

        const placeMine = () => {
            const getRandomInt = (min, max) => {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min) + min);
            }
            let position = new Array(2);
            // x
            function getXPosition () {
                let x = getRandomInt(0, boardRatio);
                if (x > (firstBlock[0] - 2) && x < (firstBlock[0] + 2)) {
                    return getXPosition();
                } else {
                    return x;
                }
            }
            position[0] = getXPosition();
            // y
            const getYPosition = () => {
                let y = getRandomInt(0, boardRatio);
                if (y > (firstBlock[1] - 2) && y < (firstBlock[1] + 2)) {
                    return getYPosition();
                } else {
                    return y;
                }
            }
            position[1] = getYPosition();
            if (Board[position[1]][position[0]] === "X") {
                return placeMine();
            }
            minePositions.push(position);
            let row = Board[position[1]];
            row[position[0]] = 'X';
            return;
        }
    
        for (; minesToPlace > 0; minesToPlace--) {
            placeMine();
        }
    
        minePositions.forEach((position) => {
            let y = position[1];
            let x = position[0];
            // increment positions in 3x3 radius around mine
            for(let newY = y-1; newY < y+2; newY++) {
                if (Board[newY]) {
                    for(let newX = x-1; newX < x+2; newX++) {
                        if (typeof Board[newY][newX] == "number") {
                            Board[newY][newX]+= 1;
                        }
                    }
                }
            }
        });
    }

    createMinePositions();

    return {
        board: Board,
        mines: minePositions,
    };
} 