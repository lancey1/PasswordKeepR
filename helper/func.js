passwordGenerator = function (passWordLength, passWordUpperCase, passWordLowerCase, passWordNumbers, passWordSpecialChars) {
    let passWord = "";
    let passWordCharList = "";
    if (passWordUpperCase) {
        passWordCharList += getUpperCase();
    }
    if (passWordLowerCase) {
        passWordCharList += getLowerCase();
    }
    if (passWordNumbers) {
        passWordCharList += getNumbers();
    }
    if (passWordSpecialChars) {
        passWordCharList += getSpecialChars();
    }
    for (let i = 0; i < passWordLength; i++) {
        var char = Math.floor(Math.random() * passWordCharList.length);
        passWord += passWordCharList.charAt(char);
    }
    return passWord;
};

getUpperCase = function () {
    return (chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
};

getLowerCase = function () {
    return (chars = "abcdefghijklmnopqrstuvwxyz");
};

getSpecialChars = function () {
    return (chars = "!@#$%^&*()_+=-");
};

getNumbers = function () {
    return (chars = "0123456789");
};

module.exports = {
    passwordGenerator,
}