function simulateDH() {
    // Benutzereingaben
    const p = parseInt(document.getElementById("p").value);
    const g = parseInt(document.getElementById("g").value);
    const x = parseInt(document.getElementById("x").value);
    const y = parseInt(document.getElementById("y").value);

    // Validierung: Prüfen, ob p eine Primzahl ist
    if (!isPrime(p)) {
        document.getElementById("output").textContent = "Fehler: p muss eine Primzahl sein.";
        return;
    }

    // Validierung: Prüfen, ob g kleiner als p ist
    if (g >= p) {
        document.getElementById("output").textContent = "Fehler: g muss kleiner als p sein.";
        return;
    }

    // Berechnungen
    const a = modExp(g, x, p); // Alice: a = g^x mod p
    const b = modExp(g, y, p); // Bob: b = g^y mod p

    // Gemeinsame Schlüsselberechnung
    const aliceKey = modExp(b, x, p); // Alice: schlüssel = b^x mod p
    const bobKey = modExp(a, y, p); // Bob: schlüssel = a^y mod p

    // Ergebnisse anzeigen
    const output = `
    Öffentliche Zahlen:
    p = ${p}
    g = ${g}

    Alice berechnet: 
    Alice's geheime Zahl (x) = ${x}
    g^x mod p = a 
    ${g}^${x} mod ${p} = ${a}

    Bob berechnet:
    Bob's geheime Zahl (y) = ${y} 
    g^y mod p = b
    ${g}^${y} mod ${p} = ${b}

    Gemeinsamer Schlüssel:
    Alice berechnet: 
    b^x mod p = Schlüssel
    ${b}^${x} mod ${p} = ${aliceKey}
    Bob berechnet: 
    a^y mod p = Schlüssel
    ${a}^${y} mod ${p} = ${bobKey}
    `;
    
    document.getElementById("output").textContent = output;
}

// Funktion zur modularen Exponentialberechnung (g^x mod p)
function modExp(base, exp, mod) {
    let result = 1;
    base = base % mod; // In der Regel den Wert innerhalb des Modulus
    while (exp > 0) {
        // Wenn exp ungerade ist, multipliziere mit dem Basiswert
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        // exp wird halbiert, und die Basis wird zum Quadrat genommen
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    return result;
}

// Funktion zur Prüfung, ob eine Zahl eine Primzahl ist
function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;

    // Schnelle Prüfung auf Teilbarkeit durch 2 oder 3
    if (n % 2 === 0 || n % 3 === 0) return false;

    // Überprüfe alle Zahlen der Form 6k ± 1 bis zur Quadratwurzel von n
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }

    return true;
}
