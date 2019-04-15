import React, { useState, useEffect } from 'react';
import './App.css';

function Board(props) {
  let trCounter = 0;
  
  const player1 = 1;
  const player2 = 2;
  const [currentPlayer, updateCurrentPlayer] = useState(player2);
  const [board, updateBoard] = useState([]);
  const [gameOver, updateGameOver] = useState(false);
  const [winner, updateWinner] = useState('');
  const [looser, updateLooser] = useState(null);
  
  useEffect(() => { 

    newBoard();
    
  }, []);
  
    const newBoard = () => {
    
      let board = [];
      for(let i=0; i<7; i++) {
      board.push(new Array(6).fill(0));
      updateBoard(board)
  }
}

  const updateWinnerFn = (player) => {
    if(player === 1){
      updateLooser(player1)
      return 'The winner is ' + props.currentPlayer1
    }
    else{
      updateLooser(player2)
      return 'The winner is ' + props.currentPlayer2
    }
    
  }

  const play = (e) => {

      if(gameOver){
        return;
      }

       let x = e.target.id.split("");
       let col = x[0];
      // let row = x[1];
       const table = [...board];
       let newArr = table[col];

       let addLast = newArr.lastIndexOf(0);

       if(addLast === -1){
        
         return;
       }
       updateCurrentPlayer(currentPlayer === player1 ? player2 : player1)
       newArr[addLast] = currentPlayer === player1 ? player2 : player1;
       
      updateBoard(table);
      checkHoraz(board);
      checkVert(board)
      checkDigLeft(board)
      checkDigRight(board)
      checkDraw(board)
      
  }

  const newGame = () => {
    
    newBoard();
    updateWinner('')
    updateGameOver(false);
    updateCurrentPlayer(looser)
  }

  const checkHoraz = (board) => {
    
      for (let row = 3; row < 7; row++) {
        for (const [col] of board.entries()) {
          if (board[row][col]) {
            if (board[row][col] === board[row - 1][col] && board[row][col] === board[row - 2][col] && board[row][col] === board[row - 3][col]) {

              updateWinner(updateWinnerFn(board[row][col]))
              updateGameOver(true); 
              updateCurrentPlayer(null)
              
              
            }
            
          }
        }
      }
        
  }
  const checkVert = (board) => {

    for (const [row] of board.entries()) {
      for (const [col] of board.entries()) {
        if (board[row][col]) {
          if (board[row][col] === board[row][col + 1] && board[row][col] === board[row][col + 2] && board[row][col] === board[row][col + 3]) {

                updateWinner(updateWinnerFn(board[row][col]))
                updateGameOver(true);
                updateCurrentPlayer(null)
        }
     
      }
      
    }
  }
}

  const checkDigLeft = (board) => {
    
    
    for (let row = 3; row < 7; row++) {
      for (const [col] of board.entries()) {
        if (board[row][col]) {
          if (board[row][col] === board[row - 1][col + 1] && board[row][col] === board[row - 2][col + 2] && board[row][col] === board[row - 3][col + 3]) {
            
                updateWinner(updateWinnerFn(board[row][col]))
                updateGameOver(true);
                updateCurrentPlayer(null)
          }
        }
      }
    }
  }
  const checkDigRight = (board) => {
   
    for (let row = 3; row < 7; row++) {
      for (let col = 3; col < 7; col++) {
        if (board[row][col]) {
          if (board[row][col] === board[row - 1][col - 1] && board[row][col] === board[row - 2][col - 2] && board[row][col] === board[row - 3][col - 3]) {
            
              updateWinner(updateWinnerFn(board[row][col]))
              updateGameOver(true);
              updateCurrentPlayer(null)
          }
        }
        
      }
    }
  }
  const checkDraw = (board) => {
    for (const [row] of board.entries()) {
      for (const [col] of board.entries()) {
        if (board[row][col] === 0) {
          
          return;
        }
      }
    }

    updateWinner("It's a draw");
    updateGameOver(true);
    updateCurrentPlayer(null)
    updateLooser(looser)
    //return 'draw';    
  }

  const logOff = (e) => {
   
    const logoff = true;
    props.onLogOff(logoff)
  }
  

  const renderBoard = (row, index) => {
  
      let redDiv = <div id={trCounter.toString() + (index)} className="div redDiv" ></div>;
      let yellowDiv = <div id={trCounter.toString() + (index)} className="div yellowDiv" ></div>

      let rows = row.map((x, index) => {

        if(x === 1){
          return(
            <td onClick={play} id={trCounter.toString() + (index)} key={index + 1} className="td">{redDiv}</td>
          );
        }
        if(x === 2){
          return(
            <td onClick={play} id={trCounter.toString() + (index)} key={index + 1} className="td">{yellowDiv}</td>
          );
        }

        return(
          <td key={index + 1} className="td" onClick={play} id={trCounter.toString() + (index)}>
            <div id={trCounter.toString() + (index)} className="div whiteDiv" />
          </td>
      );
      })
      
      trCounter++;
        return(
          <tr id={trCounter.toString() -1} className="tr" key={index +1}>
          {rows}
        </tr>
        )
        
      }
      
    
    const table = board.map(renderBoard) 
    
    return(
  
      
      <>
   
      <div className="buttonWinnerWrapper">
      <button className="logOff" onClick={logOff}>Log Off!</button>
      <button className="resetGame" onClick={newGame}>New Game!</button>
      <div className="winnerMessage">{winner}</div>
      </div>
      <div className="backOfTable"></div>
      <div className="playersWrapper">
      <p className="players" style={{opacity: currentPlayer === player2 ? "1" : '0.5'}}>Black:  {props.currentPlayer1}</p>
      <p className="players" style={{opacity: currentPlayer === player1 ? "1" : '0.5'}}>White:  {props.currentPlayer2}</p>
      </div> 
      <table className="table">
      
        <tbody>
          {table}
        </tbody>
       
      </table> 
     
      
      </>
     
    
    )
}
    
export default Board;