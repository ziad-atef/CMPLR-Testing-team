const {
    byValueKey
} = require('appium-flutter-finder');
module.exports = class Login {
    loginButtonPOM() {
        return byValueKey('introScreen_logIn');
    }
    loginWithEmailButtonPOM() {
        return byValueKey('login_withEmail');
    }
    emailFieldPOM() {
        return byValueKey('getEmail1_getEmail');
    }
    ContinueButtonPOM() {
        return byValueKey('getEmail1_getPassword');
    }
    email2FieldPOM() {
        return byValueKey('getEmail2_getEmail');
    }
    email2FieldClearPOM() {
        return byValueKey('email_clear');
    }
    EnterPasswordButtonPOM() {
        return byValueKey('getEmail2_getPassword');
    }
    email3FieldPOM() {
        return byValueKey('getEmailPassword_getEmail');
    }
    email3FieldClearPOM() {
        return byValueKey('email_clear');
    }
    passwordFieldPOM() {
        return byValueKey('getEmailPassword_getPassword');
    }
    showPasswordButtonPOM() {
        return byValueKey('password_visibility');
    }
    logButtonPOM() {
        return byValueKey('getEmailPassword_login');
    }
    // errorMessagePOM() {
    //     return byValueKey(undefined);
    // }
}