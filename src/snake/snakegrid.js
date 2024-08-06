import React from 'react';
import { GridElement } from "./snakeGirdElement";

// Renders an empty space to the grid.
function EmptySpace() {
    return <div className="grid-element" />;
}

// Renders a snake head (light green).
function SnakeHead() {
    return <div className="grid-element snake head" />;
}

// Renders a snake tail (dark green).
function SnakeTail() {
    return <div className="grid-element snake tail" />;
}

// Renders a gray rock.
function Rock() {
    return <div className="grid-element rock" />;
}

// Renders a red apple.
function Apple() {
    return <div className="grid-element apple" />;
}



// Get the appropriate grid element component based on type.
function getGridElement(ge, row, col) {
    const key = `${row}-${col}-${ge}`;
    switch (ge) {
        case GridElement.EMPTY_SPACE:
            return <EmptySpace key={key} />;
        case GridElement.SNAKE_HEAD:
            return <SnakeHead key={key} />;
        case GridElement.SNAKE_TAIL:
            return <SnakeTail key={key} />;
        case GridElement.ROCK:
            return <Rock key={key} />;
        case GridElement.APPLE:
            return <Apple key={key} />;
        default:
            return null;
    }
}

// Renders the game grid.
export function GameGrid(props) {
    return (
        <div className="grid-container">
            {props.grid.map((row, i) => (
                <div className="grid-row" key={i}>
                    {row.map((elem, j) => getGridElement(elem, i, j))}
                </div>
            ))}
        </div>
    );
}
