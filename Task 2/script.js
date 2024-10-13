const board=document.querySelectorAll('.cell');
const statusText=document.getElementById('status');
const restartButton=document.getElementById('restart');

let gameBoard=["","","","","","","","",""];
let currentPlayer="X"
let isGameOver=false;

const wc=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
board.forEach(cell =>{
    cell.addEventListener('click',onCellClick);
});
restartButton.addEventListener('click',restartGame);

function onCellClick(e){
    const cellIndex=e.target.getAttribute('data-index');
    if(gameBoard[cellIndex]===""&& !isGameOver){
        gameBoard[cellIndex]=currentPlayer;
        e.target.innerText=currentPlayer;
        if(checkWin(gameBoard, currentPlayer)){
            statusText.innerText=`Player ${currentPlayer} Winss!`;
            isGameOver=true;
        }
        else if(isDraw()){
            statusText.innerText="Noone wins its a draw!";
            isGameOver=true;
        }
        else
        {
            currentPlayer="O";
            compMove();
        }
    }
}

function compMove(){
    setTimeout(()=>{
        const bestMove=minimax(gameBoard, "O",-Infinity,Infinity).index;
    gameBoard[bestMove]="O";
    document.querySelector(`[data-index='${bestMove}']`).innerText="O";

    if(checkWin(gameBoard,"O")){
        statusText.innerText="Oops computer defeats you";
        isGameOver=true;
    }
    else if(isDraw()){
        statusText.innerText="Noone wins its a draw!";
        isGameOver=true;
    }
    else{
        currentPlayer="X";
    }
    }, 300);
    
}

function checkWin(board,player){
    return wc.some(combination =>{
        return combination.every(index => board[index]===player);
    });
}

function isDraw(){
    return gameBoard.every(cell => cell!="");
}

function minimax(newBoard,player,alpha,beta){
    const avspot = newBoard.map((val,idx)=> val === ""? idx:null).filter(v=>v!==null);
    if(checkWin(newBoard,"O")){
        return{score:10};
    }
    else if(checkWin(newBoard,"X")){
        return{score:-10};
    }
    else if(avspot.length===0){
        return{score:0};
    }
    let moves=[];
    avspot.forEach(index => {
        let move={};
        move.index=index;
        newBoard[index]=player;
        if(player === "O"){
            let result=minimax(newBoard,"X",alpha,beta);
            move.score=result.score;
            alpha=Math.max(alpha,move.score);
        }
        else{
            let result=minimax(newBoard,"O",alpha,beta);
            move.score=result.score;
            beta=Math.min(beta,move.score);
        }
        newBoard[index]="";
        moves.push(move);

        if(alpha>=beta) return move;
        
    });

    let bestMove;
    if(player==="O"){
        let bestScore=-Infinity;
        moves.forEach(move =>{
            if(move.score>bestScore){
                bestScore=move.score;
                bestMove=move;
            }
        });
    }
    else{
        let bestScore=Infinity;
        moves.forEach(move =>{
            if(move.score<bestScore){
                bestScore=move.score;
                bestMove=move
            }
        });
    }
    return bestMove;
}

function restartGame(){
    gameBoard=["","","","","","","","",""];
    currentPlayer="X";
    isGameOver=false;
    board.forEach(cell =>{
        cell.innerText="";
    });
    statusText.innerText="Lets play";
}