import React from "react";
import palavras from "./palavras";

import f0 from "../assets/forca0.png";
import f1 from "../assets/forca1.png";
import f2 from "../assets/forca2.png";
import f3 from "../assets/forca3.png";
import f4 from "../assets/forca4.png";
import f5 from "../assets/forca5.png";
import f6 from "../assets/forca6.png";



function App() {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
        "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    const [buttonState, setButtonState] = React.useState('disabled')
    const [shownArray, setShownArray] = React.useState([])
    const targetWord = randomWord();
    const targetArray = simplifyWordArray(targetWord.split(''));

    function simplifyWordArray(wordArray) {
        for (let [idx, l] of wordArray.entries()) {
            if (l === 'á' || l === 'à' || l === 'ã' || l === 'â') {
                wordArray[idx] = 'a';
            }

            if (l === 'é' || l === 'è' || l === 'ê' || l === 'ẽ') {
                wordArray[idx] = 'e';
            }

            if (l === 'í' || l === 'ì') {
                wordArray[idx] = 'i';
            }

            if (l === 'ó' || l === 'ò' || l === 'ô' || l === 'õ') {
                wordArray[idx] = 'o';
            }

            if (l === 'ú' || l === 'ù' || l === 'û' || l === 'ü') {
                wordArray[idx] = 'u';
            }
        }

        return wordArray
    }

    function startGame() {
        setButtonState('enabled');
        console.log(targetWord)
        console.log(targetWord.split(''));
        console.log(targetArray);
        setShownArray(generateGuessArray(targetWord));
    }

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

    function updateGuessArray(clickedLetter) {
        // if ()
    }

    function LetterButton(props) {
        const { letter, buttonState } = props

        return (
            <li>
                <button className={`letterButton ${buttonState}`} onClick={() => updateGuessArray(letter)}>

                    {letter.toUpperCase()}

                </button>
            </li>
        )
    }



    return (
        <main>
            <div className="upper">
                <div className="upperImage">
                    <img src={f0} alt="" />
                </div>
                <div className="upperRight">
                    <button className="wordButton" onClick={startGame}>
                        Escolher palavra
                    </button>
                    <ul className="targetWord">
                        {shownArray.map((l) => <li>{l}</li>)}
                    </ul>
                </div>
            </div>
            <div className="mid">
                <ul className="letterList">
                    {alphabet.map((l, index) => <LetterButton key={index} letter={l} buttonState={buttonState} />)}
                </ul>
            </div>
            <div className="lower">
                <p>
                    Já sei a palavra!
                </p>
                <input className="guessInput" type="text" placeholder="Digite aqui seu chute" />
                <button className="guessButton">
                    Chutar!
                </button>
            </div>
        </main>
    )
}

export default App;