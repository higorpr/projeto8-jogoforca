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
        wordArray,
        maskedArray,
        setMaskedArray,
        errors,
        setErrors
    } = props;

    const [disableButton, setDisableButton] = React.useState(false);

    function updateGuessArray(clickedLetter) {
        // setClicked(true);
        // tries++;
        console.log(wordArray);
        console.log(maskedArray)
        setDisableButton(true)
        console.log(clickedLetter)

        if (wordArray.includes(clickedLetter)) {
            let auxMask = [...maskedArray];
            for (let i = 0; i < wordArray.length; i++) {
                if (wordArray[i] === clickedLetter) {
                    auxMask[i] = clickedLetter
                    setMaskedArray(auxMask);
                }
            }
        } else {
            setErrors(errors + 1);
        }
    }

    if (gameStarted === false) {
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
        "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    const hangEvolution = [f0, f1, f2, f3, f4, f5, f6];


    const [started, setStarted] = React.useState(false)
    // Generate random word
    const [targetWord, setTargetWord] = React.useState(randomWord());
    console.log(targetWord);
    // Generate array of simplified version of targetWord
    const targetArray = simplifyWordArray(targetWord.split(''));
    console.log(targetArray)
    // Generate masked array of targetArray

    const [shownArray, setShownArray] = React.useState([]);
    console.log(shownArray)

    const [errors, setErrors] = React.useState(0);
    const gameOn = (started === false) ? false : true;

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
        for (let [idx, l] of arr.entries()) {
            if (l === 'á' || l === 'à' || l === 'ã' || l === 'â') {
                arr[idx] = 'a';
            }

            if (l === 'é' || l === 'è' || l === 'ê' || l === 'ẽ') {
                arr[idx] = 'e';
            }

            if (l === 'í' || l === 'ì') {
                arr[idx] = 'i';
            }

            if (l === 'ó' || l === 'ò' || l === 'ô' || l === 'õ') {
                arr[idx] = 'o';
            }

            if (l === 'ú' || l === 'ù' || l === 'û' || l === 'ü') {
                arr[idx] = 'u';
            }

            if (l === 'ç') {
                arr[idx] = 'c';
            }
        }

        return arr
    }

    function startGame() {
        if (started === false) {
            setStarted(true);
            setShownArray(generateGuessArray(targetWord))
            // console.log(shownArray)

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
                    <ul className="targetWord">
                        {shownArray.map((l, index) => <li key={index} >{l}</li>)}
                    </ul>
                </div>
            </div>
            <div className="mid">
                <ul className="letterList">
                    {alphabet.map((l, index) => <LetterButton key={index}
                        letter={l}
                        gameStarted={started}
                        wordArray={targetArray}
                        maskedArray={shownArray}
                        setMaskedArray={setShownArray}
                        errors={errors}
                        setErrors={setErrors} />)}
                </ul>
            </div>
            <div className="lower">
                <p>
                    Já sei a palavra!
                </p>
                <input className="guessInput" type="text" placeholder="Digite aqui seu chute" disabled={!gameOn} />
                <button className={`guessButton ${gameOn ? 'enabled' : 'disabled'}`} disabled={!gameOn}>
                    Chutar!
                </button>
            </div>
        </main>
    )
}

export default App;