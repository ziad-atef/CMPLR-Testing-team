const {
    byText
} = require('appium-flutter-finder');

module.exports.ScreenContains = (text) => {
    return byText(text);
}
module.exports.CreatePasswordDots = (password) => {
    return ''.padEnd(password.length, '•');
}