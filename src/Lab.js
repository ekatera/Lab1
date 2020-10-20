import React, { useState, useEffect } from 'react';
import './Lab.css';
import './bootstrap.min.css';
import dataFromFile from "./data/lang.json";

const Question = () => {
  // list of all vocabularies
  const [questList, setQuestList] = useState({});
  const [currentQuest, setQuest] = useState();
  const [currentResponse, setResponse] = useState('');
  const [listOfFiles, setFileList] = useState(null);
  
  // read info about all available vocabulary files, once
  useEffect(() => {
    let extractedFiles = [];
    dataFromFile.map( (data) => {
         extractedFiles.push(data);
        });
    setFileList(extractedFiles);
  },[setFileList]);

  // choose random word from loaded voc file
  const randomWord = () => {
    console.log("QUEST LIST ", questList);

    let wordArray  = Object.keys(questList);
    console.log(wordArray);
    let randomNumber = Math.random();
    let randomWord = wordArray[ Math.floor(randomNumber * wordArray.length)];
    setResponse('');
    setQuest(questList[randomWord]);
  };

  // check user's answer 
  const checkAnswer = () => {
    let answ = Object.keys(questList).find(key => questList[key] === currentQuest);
    if (currentResponse.length > 0) {
      if (currentResponse.toLowerCase() === answ.toLowerCase()) {
        console.log("right!!!")
      } else {
        console.log("wrong");
      }
    } else {
      console.log("empty");
    }
    randomWord();
  }

  //show right answer
  const showAnswer = () => {
    setResponse(Object.keys(questList).find(key => questList[key] === currentQuest));
  }

  //load words from chosen vocabulary
  const loadQuizHandler = (fileToLoad) => {
    console.log("READING WORDS from ", fileToLoad);
    let words = require('./data/' + fileToLoad);
    words.map((word) => {         
      for (const [key, value] of Object.entries(word)) {
        console.log(`${key}: ${value}`);
        handleClick(`${key}`, `${value}`)
      }
    }); 
   // randomWord();
  }

  const handleClick = (key, val) => {
    setQuestList({
      ...questList,
      [key] : [val]
    })
  }
  //output
  return(
  [
    <input type="text" value = {currentQuest} name="input" readOnly />,
    <input type="text" name="answer" value={currentResponse}  onChange={(e)=>setResponse(e.target.value)}  />,
    <button type="submit" onClick={(e)=>randomWord()}>CHECK</button>,
    <button type="submit" onClick={(e)=>checkAnswer()}>HINT</button>,
    <button type="submit" onClick={()=>showAnswer()}>SHOW ANSWER</button>,
    <div id="quiz_block">
        {listOfFiles != null ? (
        listOfFiles.map((file) => <Quiz click={(e) => loadQuizHandler(file.name)} name={file.name} language={file.language} numberOfWords={file.numberOfWords} key={file.id}></Quiz>)
        ) : null}
    </div>
  ]
  )
} 

// quiz contains info about available vocabulary files 
function Quiz(props){
  return(
    <div id="quiz" onClick={props.click}>
    <p>File: {props.name}</p>
    <p>Number of words: {props.numberOfWords}</p>
    <p>Language: {props.language}</p>
  </div>
  )
}

function Lab() {
  return (
    <div className="App">
    <Question/>

    </div>
  )
}

export default Lab;
