import React, { useEffect, useRef, useState } from "react";
import './wordle.css';
import fiveLetterWords from './words.json'
import Keypad from "./keypad";

const rows = 6;
const cols = 5;


export default function Wordle() {
    const [guess, setGuess] = useState(Array.from({ length: rows }, () => Array(cols).fill('')));
    const [feedback, setFeedback] = useState(Array.from({ length: rows }, () => Array(cols).fill('')));
    const [currentRow, setCurrentRow] = useState(0);
    const [word, setWord] = useState('');
    const [letterColors, setLetterColors] = useState({});
    const [Success, setSuccess] = useState(null)

    // const inputRefs = useRef(
    //     Array.from({ length: rows }, () => Array.from({ length: cols }, () => React.createRef()))
    // ).current;

    useEffect(() => {
        const getRandomWord = () => {
            const rowIndex = Math.floor(Math.random() * fiveLetterWords.length);
            return fiveLetterWords[rowIndex];
        };
        setWord(getRandomWord());
    }, []);

    const handleTextInput = (rowIndex, columnIndex, value) => {
        // if (value.length > 1) return; // Ignore input if more than one character

        setGuess((prevGuess) => {
            const updatedGuess = [...prevGuess];
            updatedGuess[rowIndex] = [...updatedGuess[rowIndex]];
            updatedGuess[rowIndex][columnIndex] = value;
            return updatedGuess;
        });

        // // Move focus based on input
        // if (value && columnIndex < cols - 1) {
        //     inputRefs[rowIndex][columnIndex + 1].current.focus();
        // } else if (!value && columnIndex > 0) {
        //     inputRefs[rowIndex][columnIndex - 1].current.focus();
        // }
    };

    const handleSubmit = () => {
        let enteredWord = guess[currentRow].join('');
        if (!fiveLetterWords.includes(enteredWord)) {
            alert('Not a valid word');
            return;
        }
        console.log("Submitting guess:", enteredWord, word);

        const newFeedback = [...feedback];
        if (guess[currentRow].length === 5) {
            const targetArray = word.split('');
            const feedbackRow = Array(cols).fill('grey');

            //keypad

            const newLetterColors = { ...letterColors };
            //correct position
            guess[currentRow].forEach((element, i) => {
                if (element === targetArray[i]) {
                    feedbackRow[i] = 'green';
                    newLetterColors[element] = 'green';
                }
            });
            //exists in wrong position
            guess[currentRow].forEach((element, i) => {
                if (feedbackRow[i] !== 'green' && targetArray.includes(element)) {
                    feedbackRow[i] = 'orange';
                    if (newLetterColors[element] !== 'green') {
                        newLetterColors[element] = 'orange';
                    }
                }
            });
            //doesnt exist - for key pad
            guess[currentRow].forEach((element, i) => {
                if (newLetterColors[i] !== 'green' && newLetterColors[i] !== 'orange' && !targetArray.includes(element)) {
                    newLetterColors[element] = 'darkgray';
                }
            });
            newFeedback[currentRow] = feedbackRow;
            setFeedback(newFeedback);

            setLetterColors(newLetterColors);

            if (enteredWord === word) {
                alert('Success!');
                setCurrentRow(rows + 1);
                setSuccess(true)
            } else if (currentRow < rows - 1) {
                setCurrentRow(currentRow + 1);
            }
            else if (currentRow === rows - 1) {
                alert('sorry you lost')
            }
        }
    };

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (currentRow >= rows) return; // Prevent input after game over
            if (e.key.match(/^[a-zA-Z]$/)) {
                const index = guess[currentRow].indexOf('');
                if (index < cols) {
                    handleTextInput(currentRow, index, e.key);
                }
            } else if (e.key === 'Enter') {
                handleSubmit();
            } else if (e.key === 'Backspace') {
                const lastindex = guess[currentRow].indexOf('') !== -1 ? guess[currentRow].indexOf('') : cols;
                if (lastindex > 0) {
                    handleTextInput(currentRow, lastindex - 1, '');
                }
            }
        };

        if (currentRow < rows) {
            window.addEventListener('keydown', handleKeyPress);
        }

        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [guess, currentRow]);

    const handleKeyPress = (key) => {
        if (currentRow < rows) {
            const index = guess[currentRow].indexOf('');
            if (index < cols) {
                handleTextInput(currentRow, index, key);
            }
        }
    }

    return (
        Success !== true ? <div>
            <div className="Board">
                <div className="Board-main">
                    {guess.map((row, rowIndex) => (
                        <div key={rowIndex} className="Row-module">
                            {row.map((cell, columnIndex) => (
                                <div data-value={cell}
                                    key={columnIndex}
                                    className={`cell ${feedback[rowIndex][columnIndex]}`}
                                // ref={inputRefs[rowIndex][columnIndex]}
                                >
                                    {cell}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <Keypad letterColors={letterColors} onKeyPress={handleKeyPress} />
        </div> : <div>Congratualtions!</div>
    );
}
