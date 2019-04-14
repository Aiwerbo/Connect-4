import React, { useState } from 'react';
import background from './background.jpg' 
import './App.css';

function CreatePlayers (props){
  const [player1, updatePlayer1] = useState('');
  const [player2, updatePlayer2] = useState('');
 

  const startGame = (e) => {
    console.log(props)
    e.preventDefault();
    const login = false;
    const changePage = true;
    props.onLogin(player1, player2, login, changePage)
  }

  const inputPlayer1 = (e) => {
    updatePlayer1(e.target.value)
  }

  const inputPlayer2 = (e) => {
    updatePlayer2(e.target.value)
  }

  
  return(
    
    <>
      <img className="background" src={background} alt=""></img>
      <div className="startPageWrapper">
      <div className="header">Advanced Javascript Labb 4</div>
      <form>
      <label className="playerText">Black</label><br/>
      <input className="inputs" type="text" maxLength="15" onChange={inputPlayer1}></input><br/>
      <label className="playerText">White</label><br/>
      <input className="inputs" type="text" maxLength="15" onChange={inputPlayer2}></input><br/>
      <input className="startGameButton" type="submit" value="Start game" onClick={startGame}></input>
      </form>
      
      </div>
     
      
    </>
   
  )

}

export default CreatePlayers;