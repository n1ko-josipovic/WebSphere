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
 }; //Riječnik znakova s njihovim prijevodom tj. morseova abeced ili tablica
 
 // Funkcija za dekodiranje morseovog koda
 function decodeMorseCode(morseCode) {
    // Dobivanje simbola za točku, crticu, razmak između znakova i razmak između riječi
    // Ako korisnik nije postavio simbol, koristi se zadani symbol
    const dotSymbol = document.getElementById("dotSymbol").value || ".";
    const dashSymbol = document.getElementById("dashSymbol").value || "-";
    const spaceSymbol = document.getElementById("spaceSymbol").value || " ";
    const separatorSymbol = document.getElementById("separatorSymbol").value || "   ";

    const words = morseCode.trim().split(separatorSymbol); // Razdvajanje morseovog koda na pojedinačne riječi
    const decodedWords = words.map((word) => { // Dekodiranje svake riječi
        const wordWithStandardSymbols = word.split(spaceSymbol).map((symbol) => { // Zamjena korisnički definiranih simbola standardnim morseovim simbolima u svakoj riječi
            return dictionary[symbol] || ' '; // Koristi razmak ako simbol nije pronađen u rječniku
        }).join("");

        return wordWithStandardSymbols;
    });

    return decodedWords.join(" "); // Spajanje dekodiranih riječi u rečenicu
}

// Funkcija za kodiranje teksta u morseov kod
function encodeText(text) {
    // Dobivanje simbola za točku, crticu, razmak između znakova i razmak između riječi
    // Ako korisnik nije postavio simbol, koristi se zadani symbol
    const dotSymbol = document.getElementById("dotSymbol").value || ".";
    const dashSymbol = document.getElementById("dashSymbol").value || "-";
    const spaceSymbol = document.getElementById("spaceSymbol").value || " ";
    const separatorSymbol = document.getElementById("separatorSymbol").value || "   ";

    // Razdvajanje teksta na riječi
    const words = text.toLowerCase().split(" ");
    // Kodiranje svake riječi
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

    // Spajanje kodiranih riječi u tekst
    let encodedText = encodedWords.join(separatorSymbol);

    return encodedText;
}

// Dodavanje event listener-a na unos teksta tj. pokrećemo ovu funkciju upisom teksta
document.getElementById("text").addEventListener("input", function () {
    const text = document.getElementById("text").value;
    // Kodiranje teksta i postavljanje rezultata u polje za morseov kod
    document.getElementById("morse-code").value = encodeText(text);
});

// Dodavanje event listener-a na unos morseovog koda
document.getElementById("morse-code").addEventListener("input", function () {
    const morse = document.getElementById("morse-code").value;
    // Dekodiranje morseovog koda i postavljanje rezultata u polje za tekst
    document.getElementById("text").value = decodeMorseCode(morse);
});

// Funkcija za brisanje teksta
function clearText() {
    document.getElementById("text").value = "";
    document.getElementById("morse-code").value = "";

}

// Funkcija za kopiranje teksta
function copyText(elementId) {
    var copyText = document.getElementById(elementId);
    copyText.select();
    document.execCommand("copy");
}

// Postavljanje event listener-a za unos simbola i validacija unosa
const dotSymbolInput = document.getElementById("dotSymbol");
const dashSymbolInput = document.getElementById("dashSymbol");
const spaceSymbolInput = document.getElementById("spaceSymbol");
const separatorSymbolInput = document.getElementById("separatorSymbol");

dotSymbolInput.addEventListener("input", validateSymbolInput);
dashSymbolInput.addEventListener("input", validateSymbolInput);
spaceSymbolInput.addEventListener("input", validateSymbolInput);
separatorSymbolInput.addEventListener("input", validateSymbolInput);

let lastTypedValue = "";

// Funkcija za validaciju unosa simbola
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
        // Provjera duplikata simbola i praznog prostora
        const duplicateSymbol = allInputs.find((input) => input !== inputElement && input.value === inputValue);

        if (duplicateSymbol || inputElement.value==' ') {
            inputElement.value = "";
        }
    }, 0);
}

// Generiranje tablice za prikaz Morseove abecede
const morseTable = document.getElementById('morseTable');
const numberOfColumns = 4;

const morseEntries = Object.entries(dictionary);

const numberOfRows = Math.ceil(morseEntries.length / numberOfColumns);

// Razdjeljivanje Morseovih unosa u stupce
const tableStructure = Array.from({ length: numberOfRows }, (_, rowIndex) => {
    const start = rowIndex * numberOfColumns;
    const end = start + numberOfColumns;
    return morseEntries.slice(start, end).map(([morse, letter]) => ({ morse, letter }));
});

// Prikazivanje Morseove tablice
tableStructure.forEach(columnItems => {
    const column = document.createElement('div');
    column.classList.add('morse-column');

    columnItems.forEach(({ morse, letter }) => {
        const row = document.createElement('div');
        row.classList.add('morse-row');

        const morseCell = document.createElement('div');
        morseCell.classList.add('morse-cell');
        morseCell.textContent = morse;

        const letterCell = document.createElement('div');
        letterCell.classList.add('letter-cell');
        letterCell.textContent = letter;

        row.appendChild(morseCell);
        row.appendChild(letterCell);
        column.appendChild(row);
    });

    morseTable.appendChild(column);
});
