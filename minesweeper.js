export function createNewGame (origin, ratio, mineCount) {
    var firstBlock = origin;
    var boardRatio = ratio;
    var minePositions = [];
    var Row = new Array(boardRatio);
    var Board = new Array(boardRatio).fill(null);
    Row.fill(0);
    Board.fill(0);
    Board = Board.map(val => Array(boardRatio).fill(0));
    
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
                    console.log('too close');
                } else {
                    return x;
                }
                return getXPosition();
            }
            position[0] = getXPosition();
            // y
            const getYPosition = () => {
                let y = getRandomInt(0, boardRatio);
                if (y > (firstBlock[1] - 2) && y < (firstBlock[1] + 2)) {
                    console.log('too close');
                } else {
                    return y;
                }
                return getYPosition();
            }
            position[1] = getYPosition();
            minePositions.push(position);
            let row = Board[position[1]];
            row[position[0]] = 'X';
            console.log(`
                Origin: ${firstBlock},\n
                Mines: ${minePositions}
            `);
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