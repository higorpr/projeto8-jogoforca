import React from "react";
import palavras from "./palavras";

import f0 from "../assets/forca0.png";
import f1 from "../assets/forca1.png";
import f2 from "../assets/forca2.png";
import f3 from "../assets/forca3.png";
import f4 from "../assets/forca4.png";
import f5 from "../assets/forca5.png";
import f6 from "../assets/forca6.png";

function LetterButton(props) {
    const {
        letter,
        gameStarted,
        simpleArray,
        maskedArray,
        setMaskedArray,
        errors,
        setErrors,
        setWordColor,
        gameEnded,
        setGameEnded,
        targetWord,
        targetArray,
    } = props;
    const [disableButton, setDisableButton] = React.useState(false);

    function updateGuessArray(clickedLetter) {
        setDisableButton(true)

        if (simpleArray.includes(clickedLetter)) {
            let auxMask = [...maskedArray];
            for (let i = 0; i < targetArray.length; i++) {
                if (simpleArray[i] === clickedLetter) {
                    auxMask[i] = targetArray[i]
                    setMaskedArray(auxMask);
                    console.log(targetArray);
                    console.log(auxMask);

                    if (!auxMask.includes('_')) {
                        setMaskedArray(targetWord.split(''));
                        setWordColor('green');
                        setGameEnded(true);
                    }
                }
            }
        } else {
            let nErrors = errors + 1;
            setErrors(nErrors);
            if (nErrors === 6) {
                setWordColor('red');
                setMaskedArray(targetWord.split(''));
                setGameEnded(true);
            }
        }
    }



    if (gameStarted === false || gameEnded === true) {
        return (
            <li>
                <button className={`letterButton`} disabled >

                    {letter.toUpperCase()}

                </button>
            </li>
        )
    } else {
        return (
            <li>
                <button className={`letterButton`} disabled={disableButton} onClick={() => updateGuessArray(letter)}>

                    {letter.toUpperCase()}

                </button>
            </li>
        )
    }
}

function App() {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
        "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",];

    const hangEvolution = [f0, f1, f2, f3, f4, f5, f6];

    // const initialStates = {
    //     iStarted: false,
    //     iTargetWord: randomWord(),
    //     iShownArray: [],
    //     iErrors: 0,
    //     iWordColor: ''
    // };


    const [started, setStarted] = React.useState(false)

    // Generate random word
    const [targetWord, setTargetWord] = React.useState(randomWord());
    console.log(targetWord);

    // Generate array of simplified version of targetWord
    let targetArray = (targetWord.split(''));
    let simpleArray = simplifyWordArray(targetArray);

    // Generate masked array of targetArray
    const [shownArray, setShownArray] = React.useState([]);

    // Error count
    const [errors, setErrors] = React.useState(0);

    const [wordColor, setWordColor] = React.useState('');
    const [gameEnded, setGameEnded] = React.useState(true);
    const [inputGuess, setInputGuess] = React.useState('');

    function randomWord() {
        const word = palavras[Math.floor(Math.random() * palavras.length)];
        return word;
    }

    function generateGuessArray(word) {
        const outArray = [];
        for (let i = 0; i < word.length; i++) {
            outArray.push('_');
        }
        return outArray
    }

    function simplifyWordArray(arr) {
        let out_arr = [...arr];
        for (let [idx, l] of arr.entries()) {
            if (l === 'á' || l === 'à' || l === 'ã' || l === 'â') {
                out_arr[idx] = 'a';
            }

            if (l === 'é' || l === 'è' || l === 'ê' || l === 'ẽ') {
                out_arr[idx] = 'e';
            }

            if (l === 'í' || l === 'ì') {
                out_arr[idx] = 'i';
            }

            if (l === 'ó' || l === 'ò' || l === 'ô' || l === 'õ') {
                out_arr[idx] = 'o';
            }

            if (l === 'ú' || l === 'ù' || l === 'û' || l === 'ü') {
                out_arr[idx] = 'u';
            }

            if (l === 'ç') {
                out_arr[idx] = 'c';
            }
        }

        return out_arr;
    }

    function startGame() {
        if (started === false) {
            setStarted(true);
            setShownArray(generateGuessArray(simpleArray))
            setGameEnded(false);
        } else {
            window.location.reload(true);
            setGameEnded(true);
        }
    }

    function checkWord(word) {
        word = word.toLowerCase();
        setShownArray(targetWord.split(''));
        setGameEnded(true);
        if (word === targetWord) {         
            setWordColor('green');
        } else {
            setWordColor('red');
            setErrors(6)
        }
    }

    return (
        <main>
            <div className="upper">
                <div className="upperImage">
                    <img src={hangEvolution[errors]} alt="" />
                </div>
                <div className="upperRight">
                    <button className="wordButton" onClick={startGame}>
                        Escolher palavra
                    </button>
                    <ul className={`targetWord ${wordColor}`}>
                        {shownArray.map((l, index) => <li key={index} >{l}</li>)}
                    </ul>
                </div>
            </div>
            <div className="mid">
                <ul className="letterList">
                    {alphabet.map((l, index) => <LetterButton key={index}
                        letter={l}
                        gameStarted={started}
                        setGameStarted={setStarted}
                        simpleArray={simpleArray}
                        maskedArray={shownArray}
                        setMaskedArray={setShownArray}
                        errors={errors}
                        setErrors={setErrors}
                        setWordColor={setWordColor}
                        gameEnded={gameEnded}
                        setGameEnded={setGameEnded}
                        targetWord={targetWord}
                        targetArray={targetArray}
                    />)}
                </ul>
            </div>
            <div className="lower">
                <p>
                    Já sei a palavra!
                </p>
                <input className="guessInput" type="text" placeholder={(!gameEnded) ? "Digite aqui seu chute" : ''} disabled={gameEnded} onChange={(e) => setInputGuess(e.target.value)} value={inputGuess} />
                <button className='guessButton' disabled={gameEnded} onClick={() => checkWord(inputGuess)}>
                    Chutar!
                </button>
            </div>
        </main>
    )
}

export default App;