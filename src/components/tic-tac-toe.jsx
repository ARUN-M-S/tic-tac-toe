import React, { useEffect, useState } from "react";
import useTicTacToe from "../hooks/use-tic-tac-toe";

const TicTacToe = () => {
    const [boardSize, setBoardSize] = useState(3); // Default board size is 3x3
    const [highlightedCellIndex, setHighlightedCellIndex] = useState(null); // State to store the index of the highlighted cell
    console.log(highlightedCellIndex,"patern found");
    
    const handleSizeChange = (event) => {
        // const newSize = parseInt(event.target.value);
        setBoardSize(parseInt(event.target.value));
        resetGame(); // Reset the game when board size changes
    };

    const { board, handleClick, resetGame, getStatusMessage,calculateWinner } = useTicTacToe(boardSize);
   // Add useEffect to log the board whenever it changes

   console.log(calculateWinner,"winneee22222");
    useEffect(() => {
        document.documentElement.style.setProperty('--board-size', boardSize);
    }, [boardSize]);
    useEffect(()=>{
        if(calculateWinner?.pattern) setHighlightedCellIndex(calculateWinner?.pattern)
        console.log(calculateWinner,"winneee");
    },[calculateWinner])
    return (
        <div>
           
            <div className="game">
            <div>
                <label htmlFor="boardSize">Select Board Size:</label>
                <select id="boardSize" className="board_size" value={boardSize} onChange={handleSizeChange}>
                    <option value={3}>3x3</option>
                    <option value={4}>4x4</option>
                    <option value={5}>5x5</option>
                    {/* Add more options for larger board sizes if needed */}
                </select>
            </div>
            <div className="status_row">
                <div className="status">{getStatusMessage()}</div>
                <button className="reset" onClick={resetGame}>
                    Reset Game
                </button>
                </div>
                <div className="board">
                    {board.map((cell, index) => (
                        <button className={`cell cell-${index}`} key={index} onClick={() => {
                            handleClick(index);
                            setHighlightedCellIndex(index); // Highlight the clicked cell
                        }}>
                            {cell}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TicTacToe;
