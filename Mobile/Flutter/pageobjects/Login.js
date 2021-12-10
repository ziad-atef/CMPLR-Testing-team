const {
    byValueKey
} = require('appium-flutter-finder');
module.exports = class Login {
    loginButtonPOM() {
        return byValueKey('LoginButton');
    }
    loginWithEmailButtonPOM() {
        return undefined;
    }
    emailFieldPOM() {
        return undefined;
    }
    passwordFieldPOM() {
        return undefined;
    }
    showPasswordCheckBoxPOM() {
        return undefined;
    }
    forgetPasswordPOM() {
        return undefined;
    }
    errorMessagePOM() {
        return undefined;
    }
    logButtonPOM() {
        return undefined;
    }
}