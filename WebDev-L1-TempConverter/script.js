const form = document.getElementById("converter-form");
const tempInput = document.getElementById("temp-input");
const unitSelect = document.getElementById("unit-select");
const errorMsg = document.getElementById("error-msg");

const outC = document.getElementById("out-c");
const outF = document.getElementById("out-f");
const outK = document.getElementById("out-k");

const ABSOLUTE_ZERO_C = -273.15;

function resetOutputs() {
  outC.textContent = "—";
  outF.textContent = "—";
  outK.textContent = "—";
}

function toCelsius(value, unit) {
  if (unit === "C") return value;
  if (unit === "F") return ((value - 32) * 5) / 9;
  if (unit === "K") return value - 273.15;
  return NaN;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorMsg.textContent = "";

  const rawValue = tempInput.value.trim();
  if (rawValue === "" || Number.isNaN(Number(rawValue))) {
    resetOutputs();
    errorMsg.textContent = "Please enter a valid numeric temperature.";
    return;
  }

  const value = Number(rawValue);
  const unit = unitSelect.value;
  const celsius = toCelsius(value, unit);

  if (celsius < ABSOLUTE_ZERO_C) {
    resetOutputs();
    errorMsg.textContent =
      "Temperature cannot be below absolute zero (-273.15°C / -459.67°F / 0 K).";
    return;
  }

  const fahrenheit = (celsius * 9) / 5 + 32;
  const kelvin = celsius + 273.15;

  outC.textContent = `${celsius.toFixed(2)} °C`;
  outF.textContent = `${fahrenheit.toFixed(2)} °F`;
  outK.textContent = `${kelvin.toFixed(2)} K`;
});