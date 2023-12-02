const dictionary= {  
    "-----":"0",
    ".----":"1",
    "..---":"2",
    "...--":"3",
    "....-":"4",
    ".....":"5",
    "-....":"6",
    "--...":"7",
    "---..":"8",
    "----.":"9",

    ".-": "a",
    "-...": "b",
    "-.-.": "c",
    "-..": "d",
    ".": "e",
    "..-.":"f",
    "--.": "g",
    "....": "h",
    "..": "i",
    ".---": "j",
    "-.-": "k",
    ".-..": "l",
    "--": "m",
    "-.": "n",
    "---": "o",
    ".--.": "p",
    "--.-": "q",
    ".-.": "r",
    "...": "s",
    "-": "t",
    "..-": "u",
    "...-": "v",
    ".--": "w",
    "-..-": "x",
    "-.--": "y",
    "--..": "z",

    "–·––·": "č",
    "–·–··": "ć",
    "––·–·": "dž",
    "–··––": "đ",
    "––––·–": "š",
    "––··–": "ž",
    
    ".-.-.-": ".",
    "..--..": "?",
    "-.-.--": "!",
    "---···": ":",
    "-····-": "-",
    "--..--": ",",
    "·----·": "'",
    "··--·-": "_",
    "-·-·-·": ";",
    "-·--·": "(",
    "-·--·-": ")",
    "-···-": "=",
    "·-·-·": "+",
    "-··-·": "/",
    "·-···": "&",
    "···-··-": "$",
    "·-··-·-": "€",
    "·--·-·": "@",
    "·-·-·-": "#",
    "···-·": "^",
    "-·-·--": "<",
    "-·-·-·-": ">"
 };
 
 function decodeMorseCode(morseCode) {
    const dotSymbol = document.getElementById("dotSymbol").value || ".";
    const dashSymbol = document.getElementById("dashSymbol").value || "-";
    const spaceSymbol = document.getElementById("spaceSymbol").value || " ";
    const separatorSymbol = document.getElementById("separatorSymbol").value || "   ";

    const words = morseCode.trim().split(separatorSymbol);
    const decodedWords = words.map((word) => {
        const wordWithStandardSymbols = word.split(spaceSymbol).map((symbol) => {
            return dictionary[symbol] || ' ';
        }).join("");

        return wordWithStandardSymbols;
    });

    return decodedWords.join(" ");
}

function encodeText(text) {
    const dotSymbol = document.getElementById("dotSymbol").value || ".";
    const dashSymbol = document.getElementById("dashSymbol").value || "-";
    const spaceSymbol = document.getElementById("spaceSymbol").value || " ";
    const separatorSymbol = document.getElementById("separatorSymbol").value || "   ";

    const words = text.toLowerCase().split(" ");
    const encodedWords = words.map((word) => {
        const letters = Array.from(word);
        const encodedLetters = letters.map((letter) => {
            for (const key in dictionary) {
                if (dictionary[key] === letter) {
                    return key;
                }
            }
        });
        return encodedLetters.join(spaceSymbol);
    });

    let encodedText = encodedWords.join(separatorSymbol);

    return encodedText;
}

document.getElementById("text").addEventListener("input", function () {
    const text = document.getElementById("text").value;
    document.getElementById("morse-code").value = encodeText(text);
});

document.getElementById("morse-code").addEventListener("input", function () {
    const morse = document.getElementById("morse-code").value;
    document.getElementById("text").value = decodeMorseCode(morse);
});

function clearText() {
    document.getElementById("text").value = "";
    document.getElementById("morse-code").value = "";

}

function copyText(elementId) {
    var copyText = document.getElementById(elementId);
    copyText.select();
    document.execCommand("copy");
}

const dotSymbolInput = document.getElementById("dotSymbol");
const dashSymbolInput = document.getElementById("dashSymbol");
const spaceSymbolInput = document.getElementById("spaceSymbol");
const separatorSymbolInput = document.getElementById("separatorSymbol");

dotSymbolInput.addEventListener("input", validateSymbolInput);
dashSymbolInput.addEventListener("input", validateSymbolInput);
spaceSymbolInput.addEventListener("input", validateSymbolInput);
separatorSymbolInput.addEventListener("input", validateSymbolInput);

let lastTypedValue = "";

function validateSymbolInput(event) {
    const inputElement = event.target;
    const inputValue = inputElement.value;

    setTimeout(() => {
        if (inputValue.length > 1) {
            inputElement.value = lastTypedValue;
        } else {
            lastTypedValue = inputValue;
        }

        const allInputs = [dotSymbolInput, dashSymbolInput, spaceSymbolInput, separatorSymbolInput];
        const duplicateSymbol = allInputs.find((input) => input !== inputElement && input.value === inputValue);

        if (duplicateSymbol || inputElement.value==' ') {
            inputElement.value = "";
        }
    }, 0);
}
