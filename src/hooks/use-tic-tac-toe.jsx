import { useEffect, useState } from "react"


const useTicTacToe = (boardSize =3) => {
    console.log(boardSize,"boardsizesss9999");
    const initailPart = () => Array(boardSize * boardSize).fill(null)
    console.log(initailPart(),"initial");
    
    const [board, setBoard] = useState(initailPart);
    // const [winnerPattern,setWinnerPatern]= useState()
    useEffect(()=>{
        setBoard(initailPart)
    },[boardSize])
    console.log(board,"board");
    const [isXNext, setIsXNext] = useState(true)
    const winningPatterns = calculateWinningPatterns(boardSize);
// console.log(winningPatterns,"winnig patterns");

    

    const handleClick = (index) => {
        //check the winner
        const winner = calculateWinner(board,winningPatterns);
        console.log(winner);
        if (winner || board[index]) return
        let newBoard = [...board]
        newBoard[index] = isXNext ? 'X' : 'O'
        setBoard(newBoard)
        setIsXNext(!isXNext)

    }
    // const calculateWinner = (board) => {
    //     for (let i = 0; i < winningPatterns.length; i++) {
    //         let [a, b, c] = winningPatterns[i]
    //         if (board[a] && board[a] === board[b] && board[a] === board[c]) {
    //             return board[a]
    //         }


    //     }
    //     return null
    // }
    
    const calculateWinner = (board) => {
        console.log(winningPatterns,"eeeeeeeee");
        for (let i = 0; i < winningPatterns.length; i++) {
            console.log("herrrrrr");
            const pattern = winningPatterns[i];
            console.log(pattern,"patternss");
            const firstCell = board[pattern[0]];
            console.log(firstCell,"first cell");
            if (firstCell) {
                let winnerFound = true;
                for (let j = 1; j < pattern.length; j++) {
                    if (board[pattern[j]] !== firstCell) {
                        winnerFound = false;
                        break;
                    }
                }
                if (winnerFound) {
                    // setWinnerPatern(pattern)
                    // console.log(pattern,"patternss");
                    return {firstCell,pattern};
                }
                // if (winnerFound) {
                //     // setWinnerPatern(pattern)
                //     // console.log(pattern,"patternss");
                //     return firstCell;
                // }
            }
        }
        return null;
    };
    
    const resetGame = () => {
        setBoard(initailPart())
        setIsXNext(true)
    }

    const getStatusMessage = () => {
        const winner = calculateWinner(board);
        console.log(winner, "winner");
        if (winner) {
            // setWinnerPatern(winner.pattern)
            return `Player ${winner.firstCell} wins!!!`}
        if (!board.includes(null)) return 'its a Draw'
        return `Its Player ${isXNext ? 'X' : 'O'} turn`
    }
    return { board, handleClick, getStatusMessage, resetGame,calculateWinner }
}


const calculateWinningPatterns = (boardSize) => {

    const patterns = [];
    // rows
    for (let i = 0; i < boardSize; i++) {
        const row = [];
        for (let j = 0; j < boardSize; j++) {
            //   console.log(i* boardSize+j);
            row.push(i * boardSize + j)
        }
        patterns.push(row)
    }
    //coloumn 
    for (let i = 0; i < boardSize; i++) {
        let coloumn = []
        for (let j = 0; j < boardSize; j++) {
            coloumn.push(j * boardSize + i)
        }
        patterns.push(coloumn)
    }
    let diaganol1 = [];
    let diaganol2 = [];
    for (let i = 0; i < boardSize; i++) {
        diaganol1.push(i * boardSize + i);
        console.log(diaganol2,"before");
        diaganol2.push((i+1) * (boardSize-1) )
        console.log(diaganol2,"afetr");
    }
    console.log(diaganol2,"diagonal");
    patterns.push(diaganol1)
    patterns.push(diaganol2)
    return patterns
}
export default useTicTacToe