import React, { useEffect, useState } from "react"
import { Die } from "./components/Die"
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
export default function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(()=>{
    const isHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(isHeld && allSameValue) {
      setTenzies(true)
      console.log('Congrats, you won')
    }

  }, [dice])
  
  function rollDice(){
    setDice(allNewDice())
  }

  function allNewDice(){
    const newDice = []
    for(let i=0; i<10; i++){
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function generateNewDie(){
    return {
      id : nanoid(),
      value : Math.ceil(Math.random()*6),
      isHeld : false,
    }
  }
  
  function holdDice(id){
    setDice((prevDie)=> prevDie.map((die)=>{
      return die.id == id ?
      {...die, isHeld : !die.isHeld} : 
      die
    }))
  }

  function rollDice(){
    if(!tenzies){
      setDice((prevDie)=> prevDie.map((die)=>{
        return die.isHeld ?
        die : 
        generateNewDie()
      }))
    }
    else{
      setTenzies(false)
      setDice(allNewDice())
    }
  }

    return (
        <main>
          {tenzies && <Confetti/>}
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
            {dice.map((die)=>{
              return <Die 
              value={die.value} key={die.id} holdDice={()=> holdDice(die.id)} isHeld={die.isHeld}/>
            })}
          </div>
          <button className="roll--button"
          onClick={rollDice}
          >{tenzies ? 'New Game' : 'Roll'}</button>
        </main>
    )
}