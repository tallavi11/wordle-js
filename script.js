
const GOAL_LENGTH = 4;
const GAME_LENGTH = 10;
let currentTurn = GAME_LENGTH;
let restartInProgress = false;

// let guess = [0,1,3,5];
// let target = [1,2,3,4,5];
// let answer = checkGuess(target, guess);
function makeTarget() {
    let target = []
    for (let i = 0; i < GOAL_LENGTH; i++) {
        // making a random number between 0 and 9(inclusive)
        target[i] = Math.floor(Math.random() * 10); 
    }


    return target
}


let target = makeTarget();

function dictPush(dict, key, value) {
    if (dict[key] === undefined) {
        dict[key] = [value];        
    } else {
        dict[key].push(value);
    }
}


function checkGuess(target, guess) {

    let answer = [];
    // 0 means not on board, 1 means in wrong spot, 2 means in right spot
    
    // this block creates two dictionaries of guess and target
    let guessDict = {};
    let targetDict = {};
    for (let i = 0; i< GOAL_LENGTH; i++) {
        dictPush(guessDict,guess[i],i);    
    }   
    console.log("guess is", guessDict);
    for (let i = 0; i< GOAL_LENGTH; i++) {
        dictPush(targetDict,target[i],i);

    }
    console.log("target is", targetDict);

    // this block compares guessDict and targetDict
    for (const [key, value] of Object.entries(guessDict)) { 
        console.log("key is ", key,"value is ", value, Object.entries(guessDict));

    }
























    
    
    return answer;
}

function checkGuessOld(target, guess) {
    let answer = [];
    
    for (let i = 0; i < GOAL_LENGTH; i++) {
        answer [i] = "wrong";
        let containsDuplicates = false;
        if (guess[i] === target[i]) {
            answer[i] = "right";          
        } else {          
            for (let j = 0; j < GOAL_LENGTH; j++) {
                if (guess[i] === target[j]) {
                    answer[i] = "half-way";
                    break;
                }
            }
        }
    }
    
    return answer;
}

function validateGuess(guess) {
    
    
    if (!Number.isInteger(+guess)) {
        console.log("ERROR: guess must a series of whole numbers between 0 and 9");
        return false;
    }
    
    if (guess.length !== GOAL_LENGTH ) {
        console.log("ERROR: guess must be ", GOAL_LENGTH, " numbers long, not more or less");
        return false;
    }
    return true;
}

function addHistory(guessArray, guessOutput) {
    const newBox = document.createElement("div");
    newBox.className = "history-box";
    
    for (let i =0; i < guessArray.length; i++) {
        const histSpan = document.createElement("span");
        histSpan.className = guessOutput[i];
        histSpan.innerText = guessArray[i];
        newBox.appendChild(histSpan);
            



    }



    // const histSpan = document.createElement("span");
    // histSpan.className = "right";
    // histSpan.innerText = "1";
    // newBox.appendChild(histSpan);



    const historyBox = document.getElementById("history");
    historyBox.prepend(newBox);  
    
    
    

    // // historyBox.innerHTML+="<div class='history-box'>"+guessString+"</div>";
    // historyBox.innerHTML+="<div class='history-box'>";
    // for (const i = 0; i < guessArray.length; i++) {
    //     // if (guessOutput[i] === 2) {
    //     historyBox.innerHTML+="<span class='right' >"+ guessArray[i] +"</span>";
    //     // }
    // } 
    // historyBox.innerHTML+="</div>";
    //   "<span class='right' >1</span>"+
    //   "<span class='wrong'>2</span>"+
    //   "<span class='half-way'>3</span>"+
    //   "<span class='wrong'>4</span>"+
    // "</div>"

}

function nextTurn() {
    const turnCounter = document.getElementById("turn-counter");
    currentTurn --;
    turnCounter.innerText = currentTurn;

}

function isGameOver(guessOutput) {

    let isWon = isWinningGuess(guessOutput);
    let isLost = currentTurn < 1;

    if(isLost || isWon) {
        gameOver(isWon)
        return true;
    }
    
    return false;
}

function isWinningGuess (guessOutput) {
    for (let i =0; i < guessOutput.length; i++) {
        if (guessOutput[i] !== "right"){
            return false;
        }
    }
    return true;
}


function gameOver(isWon) {
    console.log ("Game Over you have won? ", isWon);

    document.getElementById("target").innerText=target.join("");
    document.getElementById("guess-button").value="Restart";
    const inputBox = document.getElementById("guess-input");
    const gameOverText = document.createElement('p');
    gameOverText.id = "game-over";

    if (isWon) {
        gameOverText.innerHTML= "You Win!";
    } else {
        gameOverText.innerHTML = "You Lose";
    }
    

    inputBox.parentNode.replaceChild(gameOverText, inputBox);
    

    // to put in the gameover function:  replace textbox with
    // you won or lost, replace guess button with restart button
}

function gameStart() {

    const gameOverText = document.getElementById("game-over");
    const inputBox = document.createElement("input");
    inputBox.type="text";
    inputBox.id="guess-input";
    inputBox.name="guess-input";
    inputBox.autocomplete="off";
    inputBox.maxlength="4";
    inputBox.minlength="4";
    inputBox.autofocus="true";

    gameOverText.parentNode.replaceChild(inputBox, gameOverText);
    currentTurn = GAME_LENGTH;
    const turnCounter = document.getElementById("turn-counter");
    turnCounter.innerText = currentTurn;
    target = makeTarget();
    document.getElementById("target").innerText= "????";
    document.getElementById("guess-button").value="Guess";
    const historyBox = document.getElementById("history");
    while(historyBox.firstChild) {
        historyBox.removeChild(historyBox.firstChild);
    }
    
    
    // to put in game start function: 
    // replace restart button with guess button,
    // replace win text with textbox, reset turn counter,

}

function processGuess() {
    
    
    if (restartInProgress) {
        gameStart();
        restartInProgress = false;
    }
    const guessInput = document.getElementById("guess-input");
    const guessString = guessInput.value;
  
    if (validateGuess(guessString)) {
        let guessStringArray=guessString.split("");
        let guessArray=[];
        for (let i = 0; i < GOAL_LENGTH; i++) {
            let slot= +guessStringArray[i]
            guessArray.push(slot);
        }
        let guessOutput=checkGuessOld(target, guessArray);
        console.log("guess is ", guessArray, "target is ", target, "results are ", guessOutput);
        addHistory(guessArray, guessOutput);
        nextTurn();
        if (isGameOver(guessOutput)) {
            restartInProgress = true;
        }
    }
    guessInput.value = "";
    guessInput.focus();
    
    
    // return false always to prevent moving to a new page
    // return false;
}




window.onload=function() {
    
    // document.getElementById("target").innerText=target.join("");
    document.getElementById("guess-button").onclick=processGuess;
    
}





