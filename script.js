// recipient.js

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const recipient = urlParams.get("to"); // ?to=Name

// Capitalize first letter of each word
function capitalizeWords(str) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

// If "to" parameter exists, update the recipient name
if (recipient) {
  document.getElementById("recipient-name").textContent = capitalizeWords(recipient);
}
