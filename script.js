'use strict';

// Field elements
const field = document.querySelector('#password');
const textValue = document.querySelector('.text-value');
const textValueLength = document.querySelector('.text-length');

// Other elements
const sections = document.querySelectorAll('section');
const first = document.querySelector('.first');
const second = document.querySelector('.second');
const third = document.querySelector('.third');

// Colors
const grey = 'grey';
const red = 'red';
const yellow = 'yellow';
const green = 'green';

// Letters checking
const letterCheck = function (value) {
  return /[a-zA-Z]+/.test(value);
};

// Digits checking
const digitCheck = function (value) {
  return /\d+/.test(value);
};

// Symbols checking
const symbolCheck = function (value) {
  return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+/.test(value);
};

// Default behavior
sections.forEach(s => (s.style.backgroundColor = grey));

// Listen the input event
field.addEventListener('input', function (e) {
  // User's input value
  const inputValue = e.target.value;
  // User's input value length
  const inputValueLength = inputValue.length;

  // Display password
  textValue.textContent = inputValue ? `Your password: ${inputValue}` : '';
  // Display password length
  textValueLength.textContent = inputValueLength
    ? `Your password length: ${inputValueLength}`
    : '';

  //////////////////////////////////////////////////////////////////////////

  // Less than 8 characters
  inputValueLength < 8
    ? sections.forEach(s => (s.style.backgroundColor = red))
    : sections.forEach(s => (s.style.backgroundColor = grey));

  // Positive case (8 and more characters)
  if (inputValueLength > 7) {
    // When strong strength (letters-digits-symbols)
    if (
      letterCheck(inputValue) &&
      digitCheck(inputValue) &&
      symbolCheck(inputValue)
    ) {
      sections.forEach(s => (s.style.backgroundColor = green));
      return true;
    }
    // When medium strength (letters-digits/letters-symbols/digits-symbols)
    if (
      (letterCheck(inputValue) && digitCheck(inputValue)) ||
      (letterCheck(inputValue) && symbolCheck(inputValue)) ||
      (digitCheck(inputValue) && symbolCheck(inputValue))
    ) {
      first.style.backgroundColor = yellow;
      second.style.backgroundColor = yellow;
      third.style.backgroundColor = grey;
      return true;
    }

    // When easy strength (letters/digits/symbols)
    if (
      letterCheck(inputValue) ||
      digitCheck(inputValue) ||
      symbolCheck(inputValue)
    ) {
      first.style.backgroundColor = red;
      second.style.backgroundColor = grey;
      third.style.backgroundColor = grey;
      return true;
    }
  }

  // Back to the default behavior
  if (inputValueLength === 0)
    sections.forEach(s => (s.style.backgroundColor = grey));
});
