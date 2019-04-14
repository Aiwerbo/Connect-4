import React, { useState } from 'react';
import background from './background.jpg' 
import './App.css';
import CreatePlayers from './createplayers.js'
import Board from './board.js'





function App() {
  
  const [createPlayer, updateCreatePlayer] = useState(true);
  const [currentPlayer1, updatePlayer1] = useState('');
  const [currentPlayer2, updatePlayer2] = useState('');
  
  
  

  const onLogin = (player1, player2, login) => {

    updateCreatePlayer(login)
    updatePlayer1(player1);
    updatePlayer2(player2);
   
  }

  const logOff = (logoff) => {
    
    updateCreatePlayer(logoff);
    

  }

  if(createPlayer){

    return (
      <>
      <CreatePlayers onLogin={onLogin}></CreatePlayers>
    
      </>
    )
  }
  console.log(currentPlayer1)
    return (
 
      <div className="App">
      <img className="background" src={background} alt=""></img>
  
      
        <div className="boardWrapper">

          <Board onLogOff={logOff} currentPlayer1={currentPlayer1} currentPlayer2={currentPlayer2}></Board>
          
       </div>
      

      </div>
      

    );
  
}

export default App;
