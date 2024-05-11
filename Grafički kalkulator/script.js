// Definiranje glavnih varijabli
var canvas = document.getElementById("graphCanvas"); // Dohvaćanje HTML canvas elementa
var ctx = canvas.getContext("2d"); // Dohvaćanje 2D konteksta crtanja za canvas
var colors = ["red", "blue", "green", "purple", "black"]; // Niz boja za grafove funkcija
var colorIndex = 0; // Indeks trenutne boje - crvena boja
var functionPaths = []; // Niz za pohranu staza funkcija (kako bi olakšao budući razvoj aplikacije)

ctx.lineWidth = 1; // Debljina linije
ctx.strokeStyle = 'black'; // Boja linije

// Ažuriranje grafa na unos korisnika
document.addEventListener('input', function(event) {
    requestAnimationFrame(updateGraph); // Traži animacijski okvir za ažuriranje grafa
});

// Obrada klikova na gumbima za funkcije
document.addEventListener('click', function(event) {
    var target = event.target;
    if (target.classList.contains('toggleButton')) {
        toggleFunctionVisibility(target); // Poziva funkciju za sakrivanje/prikazivanje funkcije
    } else if (target.classList.contains('removeButton')) {
        removeInputField(target); // Poziva funkciju za uklanjanje funkcije
    }
});

// Dodavanje novog polja za unos funkcije
function addInputField() {
    var inputContainer = document.getElementById("inputContainer"); // Dohvaćanje kontejnera za unos polja
    var newInputRow = document.createElement('div'); // Stvaranje novog retka
    newInputRow.className = 'inputRow'; // Dodjeljivanje klase

    var newInput = document.createElement('input'); // Stvaranje novog polja za unos funkcija
    newInput.type = 'text'; // Tip input polja
    newInput.className = 'functionInput'; // Dodjeljivanje klase
    newInput.placeholder = 'Upiši funkciju'; // Postavljanje teksta u dijelu za unos
    newInputRow.appendChild(newInput); // Dodavanje polja za unos u novonastali redak

    var toggleButton = document.createElement('button'); // Stvaranje gumba za sakrivanje/prikazivanje funkcije
    toggleButton.className = 'toggleButton'; // Dodjeljivanje klase
    toggleButton.innerHTML = '<i class="fas fa-eye"></i>'; // Početna ikona za sakrivanje/prikazivanje funkcije
    newInputRow.appendChild(toggleButton); // Dodavanje gumba u novnostali redak

    var removeButton = document.createElement('button'); // Stvaranje gumba za brisanje funkcije
    removeButton.className = 'removeButton'; // Dodjeljivanje klase
    removeButton.innerHTML = '<i class="fas fa-trash"></i>'; // Ikona za brisanje funkcije
    newInputRow.appendChild(removeButton); // Dodavanje gumba u novonastali redak

    inputContainer.appendChild(newInputRow); // Dodavanje redka u kontejner
    assignColor(newInput); // Dodjeljivanje boje input polju
}

// Dodjeljivanje boje polju za unos funkcija
function assignColor(input) {
    input.style.borderColor = colors[colorIndex % colors.length]; // Dodavanje dizajna za rub polja za unos funkcije
    colorIndex++; // Povećanje indeksa boje (tako da sljedeća funkcija, ne bude iste boje)
}

// Ažuriranje grafa
function updateGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Brisanje prethodnog sadržaja na canvasu (moguća optimizacija u ovom dijelu)
    drawAxes(ctx, canvas); // Crtanje osi i brojeva na grafu

    // Resetira niz za pohranu staza prije ažuriranja
    functionPaths = [];

    // Dohvaćanje svih redaka s input poljima
    var inputRows = Array.from(document.querySelectorAll('.inputRow'));

    // Iteracija kroz svaki redak
    inputRows.forEach(row => {
        var input = row.querySelector('.functionInput'); // Dohvaćanje input polja u retku
        var expression = input.value.trim(); // Dohvaćanje izraza iz input polja

        // Provjera je li unesen izraz
        if (expression !== '') {
            try {
                var minX = -10; // Minimalna vrijednost x
                var maxX = 10;  // Maksimalna vrijednost x
                var scale = canvas.width / (maxX - minX); // Razmjera grafa prema širini canvasa

                // Provjera vidljivosti funkcije
                if (!input.classList.contains('hidden')) {
                    var path = new Path2D(); // Stvaranje nove putanje
                    var xStart = 0; // Početna x koordinata
                    var yStart = canvas.height / 2 - evaluateExpression(expression, minX) * scale; // Početna y koordinata
                    path.moveTo(xStart, yStart); // Postavljanje početne točke putanje

                    // Iteracija kroz piksele na x osi
                    for (var xPixel = 0; xPixel < canvas.width; xPixel++) {
                        var x = (xPixel / scale) + minX; // Pretvaranje piksela u x koordinatu
                        var y = evaluateExpression(expression, x); // Izračunavanje y vrijednosti funkcije
                        var yPixel = canvas.height / 2 - y * scale; // Pretvaranje y vrijednosti u piksele na canvasu

                        // Provjera da li je y piksel unutar granica canvasa
                        if (yPixel >= 0 && yPixel <= canvas.height) {
                            path.lineTo(xPixel, yPixel); // Povezivanje točaka ako je y unutar granica
                        } else {
                            path.moveTo(xPixel, yPixel); // Pomakni se na sljedeću točku ako je y izvan granica
                        }
                    }

                    functionPaths.push({ path: path, color: input.style.borderColor }); // Dodavanje putanje u niz staza
                }
            } catch (error) {}
        }
    });

    // Iscrtavanje svih staza odjednom
    functionPaths.forEach(functionPath => {
        ctx.strokeStyle = functionPath.color; // Postavljanje boje za crtanje
        ctx.lineWidth = 2; // Debljina linije
        ctx.stroke(functionPath.path); // Crtanje putanje
    });

    // Dodavanje novog input polja ako je zadnje popunjeno
    var lastInput = inputRows[inputRows.length - 1].querySelector('.functionInput');
    if (lastInput.value.trim() !== '') {
        addInputField(); // Dodavanje novog input polja
    }
}

// Promjena vidljivosti funkcije
function toggleFunctionVisibility(button) {
    var row = button.parentNode; // Dohvaćanje "roditelja" gumba
    var input = row.querySelector('.functionInput'); // Dohvaćanje input polja
    if (input.classList.contains('hidden')) {
        input.classList.remove('hidden');
        button.innerHTML = '<i class="fas fa-eye"></i>'; // Postavljanje ikone oka
    } else {
        input.classList.add('hidden');
        button.innerHTML = '<i class="fas fa-eye-slash"></i>'; // Postavljanje ikone prekriženog oka
    }
    requestAnimationFrame(updateGraph); // Traži animacijski okvir za ažuriranje grafa
}

// Uklanjanje input polja za funkciju
function removeInputField(button) {
    var inputContainer = document.getElementById("inputContainer"); // Dohvaćanje kontejnera za input polja
    var inputRows = Array.from(document.querySelectorAll('.inputRow')); // Dohvaćanje svih redaka
    var row = button.parentNode; // Dohvaćanje roditelja gumba
    row.parentNode.removeChild(row); // Uklanjanje redka
    if (inputRows.length === 1 && inputRows[0] === row) {
        addInputField(); // Dodavanje novog input polja ako je zadnje uklonjeno
    }
    requestAnimationFrame(updateGraph); // Traži animacijski okvir za ažuriranje grafa
}

// Evaluacija izraza za x i dobivanje y vrijednosti funkcije
function evaluateExpression(expression, x) {
    var scope = { x: x }; // Dohvaćanje vrijednosti x
    var parser = math.parser(); // Stvaranje parsera za izračunavanje izraza
    parser.evaluate('f(x) = ' + expression); // Evaluacija izraza
    return parser.evaluate('f(' + x + ')'); // Dobivanje rezultata
}

// Crtanje osi na grafu
function drawAxes(ctx, canvas) {
    // Postavljanje boje za osi
    ctx.strokeStyle = 'black'; // Boja linije

    // Crtanje x osi
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2); // Početak linije
    ctx.lineTo(canvas.width, canvas.height / 2); // Kraj linije
    ctx.stroke(); // Crtanje linije

    // Crtanje y osi
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0); // Početak linije
    ctx.lineTo(canvas.width / 2, canvas.height); // Kraj linije
    ctx.stroke(); // Crtanje linije

    // Crtanje brojeva i rešetki na osima
    ctx.font = "12px Arial"; // Postavljanje fonta
    ctx.fillStyle = "black"; // Boja teksta

    // Crtanje brojeva i rešetki na x osi
    for (var i = -9; i <= 9; i++) {
        var x = canvas.width / 2 + i * 50; // Pozicija broja na x osi
        if (i !== 0) {
            var text = i.toString(); // Tekst broja
            var textWidth = ctx.measureText(text).width; // Širina teksta

            // Crtanje rešetki na x osi
            ctx.beginPath();
            ctx.moveTo(x + 0.5, 0); // Početak linije
            ctx.lineTo(x + 0.5, canvas.height); // Kraj linije
            ctx.strokeStyle = "lightgray"; // Boja linije
            ctx.lineWidth = 0.5; // Debljina linije
            ctx.stroke(); // Crtanje linije

            // Crtanje broja na x osi
            ctx.fillText(text, x - textWidth / 2, canvas.height / 2 + 20); // Crtanje teksta
        }
    }

    // Crtanje brojeva i rešetki na y osi
    for (var i = -7; i <= 7; i++) {
        var y = canvas.height / 2 - i * 50; // Pozicija broja na y osi
        if (i !== 0) {
            var text = i.toString(); // Tekst broja
            var textWidth = ctx.measureText(text).width; // Širina teksta

            // Crtanje rešetki na y osi
            ctx.beginPath();
            ctx.moveTo(0, y + 0.5); // Početak linije
            ctx.lineTo(canvas.width, y + 0.5); // Kraj linije
            ctx.strokeStyle = "lightgray"; // Boja linije
            ctx.lineWidth = 0.5; // Debljina linije
            ctx.stroke(); // Crtanje linije

            // Crtanje broja na y osi
            ctx.fillText(text, canvas.width / 2 - textWidth - 10, y + 5); // Crtanje teksta
        }
    }

    // Crtanje "rešetki" za brojeve na osima
    ctx.beginPath();
    ctx.strokeStyle = "black"; // Boja linije
    ctx.lineWidth = 1; // Debljina linije

    // Crtanje "rešetki" na x osi
    for (var i = -9; i <= 9; i++) {
        var x = canvas.width / 2 + i * 50; // Pozicija rešetke
        if (i !== 0) {
            ctx.moveTo(x, canvas.height / 2 - 3); // Početak linije
            ctx.lineTo(x, canvas.height / 2 + 3); // Kraj linije
        }
    }

    // Crtanje "rešetki" na y osi
    for (var i = -7; i <= 7; i++) {
        var y = canvas.height / 2 - i * 50; // Pozicija rešetke
        if (i !== 0) {
            ctx.moveTo(canvas.width / 2 - 3, y); // Početak linije
            ctx.lineTo(canvas.width / 2 + 3, y); // Kraj linije
        }
    }

    ctx.stroke(); // Crtanje linije
}

// Dodavanje početnog input polja za funkciju
addInputField(); // Poziv funkcije za dodavanje polja
updateGraph(); // Poziv funkcije za ažuriranje grafa
