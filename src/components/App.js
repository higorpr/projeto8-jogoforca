import f0 from "../assets/forca0.png";
import f1 from "../assets/forca1.png";
import f2 from "../assets/forca2.png";
import f3 from "../assets/forca3.png";
import f4 from "../assets/forca4.png";
import f5 from "../assets/forca5.png";

function LetterButton(props) {
    return (
        <li>
            <button className="letterButton">
                <p>
                    {props.letter}
                </p>
            </button>
        </li>
    )
}
function App() {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    return (
        <main>
            <div className="upper">
                <img src={f0} alt="" />
                <button className="wordButton">
                    Escolher palavra
                </button>
            </div>
            <div className="lower">
                <ul className="letterList">
                    {alphabet.map((l, index) => <LetterButton key={index} letter={l} />)}
                </ul>
            </div>
        </main>
    )
}

export default App;