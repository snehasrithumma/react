import React, { useEffect, useState } from "react";
import './sudoku.css';

const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]]

export default function Sudoku() {
    const [grid, setGid] = useState(Array(9).fill(null));
    const [winner, setWinnner] = useState('')
    const start = Math.random() < 0.5 ? 'X' : 'O';
    const [currentPlayer, setCurrentPlayer] = useState(start);
    const [turn, setTurn] = useState(0);

    const handleChange = (e, index) => {
        if (currentPlayer === (e.target.value).toUpperCase()) {
            let newGrid = [...grid]
            newGrid[index] = (e.target.value).toUpperCase();
            setGid(newGrid)
            let newPlayer = currentPlayer === 'X' ? 'O' : 'X';
            setCurrentPlayer(newPlayer)
            setTurn(turn + 1)
        }
        else {
            alert(currentPlayer + ' is the current player')
        }
    }


    useEffect(() => {
        lines.forEach((line) => {
            let result = line.map((position) => {
                return grid[position];
            })
            if (!result.includes(null) && (result.every(val => val === 'X') || result.every(val => val === 'O'))) {
                setWinnner(result[0]);
                alert(result[0] + ' won the game!')
                return;
            }
        })
    }, [grid])

    return (
        <div>
            {turn === 0 && winner === '' ? <span>{'Player ' + start + ' can start the Game'}</span> : turn > 0 && turn < 8 && winner === '' ? <span>{'Its Player ' + currentPlayer + ' turn to play'}</span> : turn > 8 && winner === '' ? <span>Its a Draw!</span> :
                winner !== '' ? <span> {`Player ${winner} won the game!`}</span> : <span></span>
            }
            <div className="grid">
                {grid.map((cell, index) => (
                    <input className='cell' key={index} value={cell || ''} maxLength='1' type="text" onChange={(e) => handleChange(e, index)} disabled={winner === 'x' || winner === 'o'} />
                ))}
            </div>
        </div >
    )
}