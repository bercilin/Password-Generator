
//Storing HTML id in variable


const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numberEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');


//Inserting fun into object


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}



//Generate Event listener

generateEl.addEventListener('click', () => {
    const length = lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(
        length, hasUpper, hasLower, hasNumber, hasSymbol
    );

});


//Copy password to clipboard

clipboardEl.addEventListener('click', () => {
    const textArea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) {
        return;
    }

    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert('Password copied to clipboard');
})



//Generate Password function

function generatePassword(length, upper, lower, number, symbol) {
    //Initialize a password variable

    //Loop over the length and call generator fun for each type
    //Add final password to the password variable and return


    let generatePassword = "";
    const typesCount = upper + lower + number + symbol;

    //Filter out unchecked types

    const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(item => Object.values(item)[0]);
    console.log('typesArr:', typesArr);


    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatePassword += randomFunc[funcName]();
        });
    }
    const finalPassword = generatePassword.slice(0, length);
    return finalPassword;


}



//Generator function

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbol = '!@#$%^&*(){}[]=<>/.,';
    return symbol[Math.floor(Math.random() * symbol.length)];
}

console.log(getRandomLower());