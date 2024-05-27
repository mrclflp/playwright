function generateCheckDigits(iban) {
  iban = iban.substr(4) + iban.substr(0, 4); // Move the country code and check digits to the end
  iban = iban.split('').map(ch => isNaN(ch) ? ch.charCodeAt(0) - 55 : ch).join(''); // Convert letters to digits
  let remainder = BigInt(iban) % 97n;
  return (98n - remainder).toString().padStart(2, '0');
}

// Predefined Slovak bank codes
const slovakBanks = {
  "6500": "Bank One",
  "5900": "Bank Two",
  // Add more bank codes as needed
};

function generateRandomIBAN() {
  const countryCode = "SK";
  const bankCodes = Object.keys(slovakBanks);
  const bankCode = bankCodes[Math.floor(Math.random() * bankCodes.length)];
  const accountNumber = Math.random().toString().substr(2, 16); // Example length for account number

  const partialIBAN = countryCode + '00' + bankCode + accountNumber;
  const checkDigits = generateCheckDigits(partialIBAN);
  const iban = countryCode + checkDigits + bankCode + accountNumber;

  return iban;
}

// Example usage:
const randomIBAN = generateRandomIBAN();
console.log("Random IBAN for Slovakia:", randomIBAN);

/*
In this JavaScript code:

The generateCheckDigits function calculates the check digits for the IBAN.
slovakBanks is an object containing predefined Slovak bank codes.
The generateRandomIBAN function randomly selects a bank code from the slovakBanks object, generates a random account number, and constructs the IBAN accordingly.
You can extend the slovakBanks object with more bank codes as needed.
*/