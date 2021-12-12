const {
    byValueKey
} = require('appium-flutter-finder');

module.exports = class Signup {

    signupButtonPOM() {
        return byValueKey('introScreen_signUp');
    }

    emailSignupButtonPOM() {
        return byValueKey('signUp_withEmail');
    }

    ageTextBoxPOM() {
        return byValueKey('signUpAge_getAge');
    }

    ageNextButtonPOM() {
        return byValueKey('signUpAge_next');
    }

    emailTextBoxPOM() {
        return byValueKey('completeSignUp_email');
    }

    passwordTextBoxPOM() {
        return byValueKey('completeSignUp_password');
    }

    nameTextBoxPOM() {
        return byValueKey('completeSignUp_name');
    }

    signupDoneButtonPOM() {
        return byValueKey('');
    }
}