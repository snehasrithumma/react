import React from 'react';
import { useEffect, useState } from "react";
import { GridElement } from "./snakeGirdElement";
import { GameGrid } from "./snakegrid";
import "./snake.css";

const GRID_WIDTH = 20;
const GRID_LENGTH = 16;

const oppositeDirection = {
    ArrowUp: "ArrowDown",
    ArrowDown: "ArrowUp",
    ArrowLeft: "ArrowRight",
    ArrowRight: "ArrowLeft",
};

// Utility function that returns a random integer between 0 and max-1, inclusive.
// function getRandomInt(max: number): number {
//   return Math.floor(Math.random() * max);
// }

const getRandomPosition = () => ({
    x: Math.floor(Math.random() * GRID_WIDTH),
    y: Math.floor(Math.random() * GRID_LENGTH),
});
const snake_inital_position = [{ x: 1, y: 0 }, { x: 0, y: 0 }];
const intialstate = {
    snakePosition: snake_inital_position,
    snakeDirection: "ArrowDown",
    speed: 500,
    applePosition: getRandomPosition(),
    rockPosition: getRandomPosition(), // check if cooliding with apple position
    isGameOver: false,
    length: 1
}
// TO DO: Add your Snake game here!
export default function Snake() {
    const [state, setState] = useState(intialstate);
    const [grid, setGrid] = useState(
        Array.from({ length: GRID_WIDTH }, () =>
            Array(GRID_LENGTH).fill(GridElement.EMPTY_SPACE)
        )
    );

    //updateGrid
    useEffect(() => {
        if (state.isGameOver) return;
        const newGrid = Array.from({ length: GRID_WIDTH }, () =>
            Array(GRID_LENGTH).fill(GridElement.EMPTY_SPACE)
        );
        state.snakePosition.forEach((segment, index) => {
            if (index === 0) {
                if (segment.x < 0 || segment.x > GRID_WIDTH - 1 || segment.y < 0 || segment.y > GRID_LENGTH - 1) {
                    setState({
                        ...state,
                        isGameOver: true
                    })
                }
                else if (segment.x === state.rockPosition.x && segment.y === state.rockPosition.y) {
                    setState((prevState) => ({
                        ...prevState,
                        isGameOver: true,
                    }))
                }
                else {
                    newGrid[segment.x][segment.y] = GridElement.SNAKE_HEAD;
                }
            }
            else {
                newGrid[segment.x][segment.y] = GridElement.SNAKE_TAIL;
            }
        })
        newGrid[state.applePosition.x][state.applePosition.y] = GridElement.APPLE;
        newGrid[state.rockPosition.x][state.rockPosition.y] = GridElement.ROCK;
        setGrid(newGrid);
    }, [state]);

    //HANdLE KEY INPUTS
    const handleKeydown = (e) => {
        let newDirection;
        switch (e.key) {
            case "ArrowUp":
                newDirection = "ArrowUp";
                break;
            case "ArrowDown":
                newDirection = "ArrowDown";
                break;
            case "ArrowLeft":
                newDirection = "ArrowLeft";
                break;
            case "ArrowRight":
                newDirection = "ArrowRight";
                break;
            default:
                return;
        }
        setState((prevState) => {
            if (newDirection !== oppositeDirection[prevState.snakeDirection]) {
                return {
                    ...prevState,
                    snakeDirection: newDirection,
                };
            }
            else {
                return {
                    ...prevState
                }
            }
        });
    };

    //event listners on keydown
    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);
        return () => window.removeEventListener("keydown", handleKeydown);
    }, []);

    useEffect(() => {
        if (state.isGameOver) return;
        const interval = setInterval(() => {
            let newSnakePosition = [...state.snakePosition];
            const head = { ...newSnakePosition[0] }; // Copy current head position
            newSnakePosition.pop();  // head as tail
            switch (state.snakeDirection) {
                case "ArrowUp":
                    head.x = head.x - 1;
                    break;
                case "ArrowDown":
                    head.x = head.x + 1;
                    break;
                case "ArrowLeft":
                    head.y = head.y - 1;
                    break;
                case "ArrowRight":
                    head.y = head.y + 1;
                    break;
                default:
                    break;
            }

            if (head.x === state.applePosition.x && head.y === state.applePosition.y) {

                //SNAKE EATS APPLE
                const newpositions = [state.applePosition, ...state.snakePosition]
                const currentlength = state.length
                setState((prevState) => ({
                    ...prevState,
                    snakePosition: newpositions,
                    applePosition: getRandomPosition(),
                    length: currentlength + 1
                }));
            }
            else {
                newSnakePosition = [head, ...newSnakePosition]
                setState((prevState) => ({
                    ...prevState,
                    snakePosition: newSnakePosition,
                }));

            }
        }, state.speed);
        return () => clearInterval(interval);
    }, [state]);

    const startGame = (e) => {
        e.preventDefault();
        setState(intialstate);
    }

    return (
        <>
            {/* Example 3x3 game grid */}
            <div><button onClick={(e) => startGame(e)}>New Game</button></div>
            {!state.isGameOver ? <GameGrid grid={grid} /> :
                <div>{`snake length :${state.length}`}</div>}
        </>
    );
}
