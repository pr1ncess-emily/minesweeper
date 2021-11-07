import { createNewGame } from "./minesweeper.js";

$(document).ready(() => {
    const rows = 5;
    const columns = 5;
    
    const gameData = createNewGame(5,6);
    const gameBoard = gameData.board;

    const checkBlock = block => {
        let coord = JSON.parse(block);
        let x = coord[0];
        let y = coord[1];
        return gameBoard[y][x];
    }

    const getBlockImg = type => {
        let assetSources = {
            'X': './assets/blockMine.svg',
            1: './assets/blockOne.svg',
            2: './assets/blockTwo.svg',
            3: './assets/blockThree.svg',
            4: './assets/blockFour.svg',
            5: './assets/blockFive.svg',
            6: './assets/blockSix.svg',
            7: './assets/blockSeven.svg',
            8: './assets/blockEight.svg',
            0: './assets/blockBlank.svg',
        }
        return assetSources[type];
    }

    for (let i = 0; i < rows; i++){
        let row = $(`<div class="row"></div>`);
        for (let x = 0; x < columns; x++) {
            let block = $(`<img class="block" src="./assets/blockField.svg"></img>`);
            block.attr('id', `[${x}, ${i}]`);
            block.click(function (e) {
                let blockValue = checkBlock(e.target.id);
                let imgSource = getBlockImg(blockValue);
                console.log(imgSource);
                $(this).attr('src', imgSource);
            });
            row.append(block);
        }
        $("body").append(row);
    }

    console.log(gameBoard);
});