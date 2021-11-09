export function createNewGame (origin, ratio, mineCount) {
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

        const placeMine = () => {

            let position = new Array(2);

            // ranges = array of 2 ranges
            const getRandomPosition = ranges => {
                console.log(ranges);
                let index;
                if (Math.random() > 0.5) {
                    index = 1;
                } else {
                    index = 0;
                }
                let selectedRange = ranges[index];
                if (!selectedRange) {
                    index ? index = 0 : index = 1;
                    selectedRange = ranges[index];
                } 
                // Return position (includes both)
                return Math.floor(Math.random() * (selectedRange[0] - selectedRange[1] + 1) + selectedRange[0]);
            }

            const getAxisPosition = (axis) => {
                let firstBlockPosition;
                if (axis === 'x') {
                    firstBlockPosition = firstBlock[0];
                } else {
                    firstBlockPosition = firstBlock[1];
                }
                const safeBoundLower = () => {
                    let bound = (firstBlockPosition - safeRadius);
                    if (bound < 0) {
                        return false;
                    } else {
                        return [0, bound];
                    }
                }
                const safeBoundUpper = () => {
                    let bound = (firstBlockPosition + safeRadius);
                    if (bound > (ratio - 1)) {
                        return false;
                    } else {
                        return [bound, (ratio - 1)];
                    }
                }
                return getRandomPosition([safeBoundLower(), safeBoundUpper()]);
            }
            
            position[0] = getAxisPosition("x");
            position[1] = getAxisPosition("y");

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