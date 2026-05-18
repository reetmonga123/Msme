let chart;

const rate = document.getElementById("rate");
const inflation = document.getElementById("inflation");
const green = document.getElementById("green");

const rateVal = document.getElementById("rateVal");
const inflationVal = document.getElementById("inflationVal");
const greenVal = document.getElementById("greenVal");

rate.oninput = () => rateVal.innerText = rate.value;
inflation.oninput = () => inflationVal.innerText = inflation.value;
green.oninput = () => greenVal.innerText = green.value;

function calculateRisk(r, i, g) {
    return (r * 0.7) + (i * 0.6) - (g * 1.3);
}

function runSimulation() {

    let r = parseFloat(rate.value);
    let i = parseFloat(inflation.value);
    let g = parseFloat(green.value);

    let risk = calculateRisk(r, i, g);

    let status = "";

    if (risk < 3) status = "🟢 Low Risk – MSME Stable";
    else if (risk < 7) status = "🟠 Medium Risk – Caution Required";
    else status = "🔴 High Risk – MSME Under Stress";

    document.getElementById("resultBox").innerHTML =
        "Risk Score: " + risk.toFixed(2) + "<br>" + status;

    updateChart(r, i, g, risk);
}

function updateChart(r, i, g, risk) {

    let ctx = document.getElementById("riskChart").getContext("2d");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Interest Rate", "Inflation", "Sustainability", "Risk Score"],
            datasets: [{
                label: "MSME Impact",
                data: [r, i, g, risk],
                backgroundColor: ["#ff9800", "#f44336", "#4caf50", "#9c27b0"]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}