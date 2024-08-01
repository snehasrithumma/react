import React, { useState } from "react";
import './sudoku.css'

export default function Sudoku() {
    const [grid, setGid] = useState(Array(81).fill(null));

    const handleChange = (e, index) => {
        let newGrid = [...grid]
        newGrid[index] = e.target.value;
        setGid(newGrid)
    }

    return (
        <div className="grid">
            {grid.map((cell, index) => (
                <input className='cell' key={index} value={cell || ''} maxLength='1' type="number" onChange={(e) => handleChange(e, index)}
                    min='1' max='9' />
            ))}
        </div>
    )
}