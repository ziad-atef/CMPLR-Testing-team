const {
    byValueKey
} = require('appium-flutter-finder');
module.exports = class Login {
    signupButtonPOM() {
        return byValueKey('SignupButton');
    }
}