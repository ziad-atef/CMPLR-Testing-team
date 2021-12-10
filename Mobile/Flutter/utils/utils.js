const {
    buText
} = require('appium-flutter-finder');

module.exports.ScreenContains = async (text) => {
    return buText(text);
}
module.exports.CreatePasswordDots = (password) => {
    return ''.padEnd(password.length, '•');
}