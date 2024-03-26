const passwordInput = document.getElementById('password');
const inputs = [...document.querySelectorAll('input:not([type="text"])')]
// console.log(inputs);

const lengthInput = document.getElementById('length');
const lengthText = document.getElementById('length-text')

const copyButton = document.querySelector('.copy')
const regenarateButton = document.querySelector('.genarate')

// console.log(passwordInput, lengthInput, lengthText, copyButton);\

const symbols = ['@', '#', '$', '%'];
const numbers = [2, 3, 4, 5, 6, 7, 8, 9];

const similarNumbers = [0, 1];
const similarLowercase = ['i', 'l', 'o']
const similarUppercase = ['I', 'L', 'O']

const skip = [8, 11, 14];

const characterCodes = Array.from(Array(26)).map((_,i) => i+97)
// console.log(characterCodes);

const lowercaseLetters = characterCodes.map(code => String.fromCharCode(code)).filter((_, i) => !skip.includes(i));
const uppercaseLetters = lowercaseLetters.map(letter => letter.toUpperCase());

console.log(lowercaseLetters);
console.log(uppercaseLetters);

copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(passwordInput.value)
    // alert(`COPIED!`)
    copyButton.classList.add('copied')
    setTimeout(() => {copyButton.classList.remove('copied')}, 3000)
})

const updatePassword = () => {
    const lengthInputValue = lengthInput.value;
    const checkboxValues = inputs.slice(1).map(input => input.checked)
    console.log(checkboxValues);
    const password = generate(lengthInputValue, ...checkboxValues)
    passwordInput.value = password

    lengthText.textContent = lengthInputValue
}

inputs.forEach((inputsItem) => inputsItem.addEventListener('input', updatePassword))
regenarateButton.addEventListener('click', updatePassword)

const generate = (lengthPassword, hasSymbols, hasNumbers, hasLowercase, hasUppercase, hasSimilar) => {
    let avialiableCharacter = [
        ...(hasSymbols ? symbols : []),
        ...(hasNumbers ? numbers : []),
        ...(hasLowercase ? lowercaseLetters : []),
        ...(hasUppercase ? uppercaseLetters : [])
    ]

    if(hasSimilar) {
        if(hasNumbers) {
            avialiableCharacter = [...avialiableCharacter, ...similarNumbers]
        }

        if(hasLowercase) {
            avialiableCharacter = [...avialiableCharacter, ...similarLowercase]
        }

        if(hasUppercase) {
            avialiableCharacter = [...avialiableCharacter, ...similarUppercase]
        }
    }
    // console.log(avialiableCharacter);

    let password = '';

    if(avialiableCharacter.length === 0) return '';

    for(let i = 0; i < lengthPassword; i++) {
        const randomIndex = Math.floor(Math.random() * avialiableCharacter.length) 
        console.log(randomIndex);

        password += avialiableCharacter[randomIndex]
        console.log(password);
    }

    return password;
}

updatePassword()