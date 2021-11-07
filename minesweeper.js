export function createNewGame (ratio, mineCount) {
    var boardRatio = ratio;
    var minePositions = [];
    var Row = new Array(boardRatio);
    var Board = new Array(boardRatio).fill(null);
    Row.fill(0);
    Board.fill(0);
    Board = Board.map(val => Array(boardRatio).fill(0));
    
    const placeMine = () => {
        const getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }
        let position = new Array(2);
        position[0] = getRandomInt(0, boardRatio);
        position[1] = getRandomInt(0, boardRatio);
        minePositions.push(position);
        let row = Board[position[0]];
        row[position[1]] = 'X';
    }
    for (let i = mineCount; i > 0; i--) {
        placeMine();
    }

    minePositions.forEach((position) => {
        let y = position[0];
        let x = position[1];
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

    return {
        board: Board,
        mines: minePositions,
    };
} 