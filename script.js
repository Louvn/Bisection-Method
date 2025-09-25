Decimal.set({ precision: 100000 });

function getFirstInterval(squareRoot) {
    var n = new Decimal("1");
    while (n.pow("2").lte(squareRoot)) { // means <=
        n = n.plus("1")
    }
    return [n.minus("1"), n]
}

function calculateMean(...numbers) {
    const sum = numbers.reduce((acc, num) => acc.plus(num), new Decimal("0"));
    return sum.div(new Decimal(numbers.length));
}

function updateTable(lowerBound, upperBound, mean, approximation, endResult=false) {
    const table = document.getElementById("table");
    const row = table.insertRow();

    row.insertCell().textContent = lowerBound.toString();
    row.insertCell().textContent = upperBound.toString();
    row.insertCell().textContent = mean.toString();
    row.insertCell().textContent = approximation.toString();

    if (endResult) {
        row.classList.add("last-row");
    }
}

function bisectionMethod(squareRoot, iterations=100, showTable=true) {
    var squareRoot = new Decimal(squareRoot)
    var [lowerBound, upperBound] = getFirstInterval(squareRoot);
    var mean;
    var approximation;

    for (let iteration = 0; iteration < iterations; iteration++) {
        mean = calculateMean(lowerBound, upperBound);
        approximation = mean.pow(2);
        if (showTable) {
            updateTable(lowerBound, upperBound, mean, approximation, iteration === iterations - 1);
        }

        if (approximation.lt(squareRoot)) { // lower than
            lowerBound = mean;
        } else {
            upperBound = mean;
        }
    }
    document.getElementById("result").innerHTML = `<h1>Annäherung an √${squareRoot} (${iterations} Iterationen):</h1> ${mean}`
    if (!showTable) {
        document.getElementById("table").remove();
    }
}


const params = new URLSearchParams(window.location.search);
bisectionMethod(
    params.get("squareRoot"), 
    params.get("iterations"),
    params.get("showTable") === "on"
);