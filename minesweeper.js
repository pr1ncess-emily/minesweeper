export function createNewGame(origin, ratio, mineCount) {
    var firstBlock = origin;
    var safeRadius = 2;
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

        const setSafeAreas = (board, firstBlock) => {
            let safeBoard = JSON.parse(JSON.stringify(board));
            let minX = firstBlock[0] - safeRadius;
            let maxX = firstBlock[0] + safeRadius;
            let minY = firstBlock[1] - safeRadius;
            let maxY = firstBlock[1] + safeRadius;
            for (let i = minY; i <= maxY; i++) {
                let row = safeBoard[i];
                if (row) {
                    row.forEach((value, index) => {
                        if (index >= minX && index <= maxX) {
                            row[index] = "S";
                        }
                    });
                }
            }
            return safeBoard;
        }
        
        Board = setSafeAreas(Board, firstBlock);
        console.log(JSON.parse(JSON.stringify(Board)));

        // TODO: set mines to "X" before placing next mine
        const getRandomPosition = board => {
            let getRandAxis = () => {return Math.round(Math.random() * (boardRatio - 1))};
            let x = getRandAxis();
            let y = getRandAxis();
            if (board[y][x] === "S" || board[y][x] === "X") {
                console.log("Can't place mine!");
                return getRandomPosition(board);
            } else {
                return [y, x];
            }
        }

        const placeMine = () => {
            let position = getRandomPosition(Board);
            minePositions.push(position);
            return;
        }

        for (; minesToPlace > 0; minesToPlace--) {
            placeMine();
        }

        console.log(minePositions);

        minePositions.forEach((position) => {
            let x = position[1];
            let y = position[0];
            Board[y][x] = "X";
        });

        minePositions.forEach((position) => {
            let x = position[1];
            let y = position[0];
            // increment positions in 3x3 radius around mine
            for (let newY = y - 1; newY < y + 2; newY++) {
                if (Board[newY]) {
                    for (let newX = x - 1; newX < x + 2; newX++) {
                        if (typeof Board[newY][newX] === "number" || Board[newY][newX] === "S") {
                            if (Board[newY][newX] === "S") {
                                Board[newY][newX] = 0;
                            }
                            Board[newY][newX] += 1;
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