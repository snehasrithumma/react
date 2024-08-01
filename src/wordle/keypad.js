import React from 'react';
import './keypad.css';

const Keypad = ({ letterColors, onKeyPress }) => {
    console.log(letterColors)
    const rows = [
        'qwertyuiop',
        'asdfghjkl',
        'zxcvbnm'
    ];

    return (
        <div className="keypad">
            {rows.map((row, rowindex) => (
                rowindex !== 2 ?
                    <div key={rowindex} className="keypad-row">
                        {row.split('').map((letter, index) => (
                            <button key={letter} className={`key ${letterColors[letter] || 'grey'}`} onClick={() => onKeyPress(letter)}>
                                {letter}
                            </button>
                        ))}
                    </div>
                    :
                    <div key={rowindex} className="keypad-row">
                        <button key='Enter' className='enter' onClick={() => onKeyPress('Enter')}>
                            Enter
                        </button>
                        {row.split('').map((letter, index) => (
                            <button key={letter} className={`key ${letterColors[letter] || 'grey'}`} onClick={() => onKeyPress(letter)}>
                                {letter}
                            </button>

                        ))}
                        <button key='Backspace' className='backspace' onClick={() => onKeyPress('Backspace')}>
                            Del
                        </button>
                    </div>

            ))}
        </div>
    );
};

export default Keypad;