import { createNewGame } from "./minesweeper.js";

$(document).ready(() => {
    const rows = 5;
    const columns = 5;

    var hasUserClicked = false;

    var gameData = false;
    var gameBoard = false;

    for (let i = 0; i < rows; i++) {
        let row = $(`<div class="row"></div>`);
        for (let x = 0; x < columns; x++) {
            let block = $(`<img class="block" src="./assets/blockField.svg"></img>`);
            block.attr('id', `[${x}, ${i}]`);
            block.click(function (e) {
                let blockCoord = JSON.parse(e.target.id);
                if (!hasUserClicked) {
                    hasUserClicked = true;
                    gameData = createNewGame(blockCoord, 5, 5);
                    gameBoard = gameData.board;
                    console.log(gameBoard);
                }
                let blockValue = checkBlock(blockCoord);
                let imgSource = getBlockImg(blockValue);
                $(this).attr('src', imgSource);
            });
            row.append(block);
        }
        $("body").append(row);
    }

    const checkBlock = block => {
        let coord = block;
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

});