const {
    byValueKey
} = require('appium-flutter-finder');
module.exports = class Resetpassword {
    forgetPasswordPOM() {
        return byValueKey('getEmailPassword_forgotPassword');
    }
     errorMessagePOM() {
        return undefined;
    };
     submitButtonPOM() {
        return undefined;
    };
}