const Login = require('../pageobjects/Login');
const Signup = require('../pageobjects/Signup');
const Home = require('../pageobjects/Home');

const {
    CreatePasswordDots,
    stateAssertion
} = require('./utils');

const LoginPOM = new Login();
const SignupPOM = new Signup();
const HomePOM = new Home();

module.exports.LoginWithEmail = async () => {
    const LoginButton = await LoginPOM.loginButtonPOM();
    await stateAssertion(LoginButton);

    const SignupButton = await SignupPOM.signupButtonPOM();
    await stateAssertion(SignupButton);

    await LoginButton.click();

    const LoginWithEmailButton = await LoginPOM.loginWithEmailButtonPOM();
    await stateAssertion(LoginWithEmailButton);
    await LoginWithEmailButton.click();
}
module.exports.EnterEmailAndPassword = async (inputEmail = '', inputPassword = '') => {
    inputEmail = inputEmail === ''? 'email':inputEmail;
    inputPassword = inputPassword === ''? 'password':inputPassword;
    const EmailField = await LoginPOM.emailFieldPOM();
    await stateAssertion(EmailField);
    await EmailField.addValue(inputEmail);
    const email = await EmailField.getText();
    expect(email).toBe(inputEmail);

    const PasswordField = await LoginPOM.passwordFieldPOM();
    await stateAssertion(PasswordField);
    await PasswordField.addValue(inputPassword);
    const password = await PasswordField.getText();
    expect(password).toBe(CreatePasswordDots(password));
    expect(password).not.toBe(inputPassword);
}
module.exports.ShowPassword = async (inputPassword = '') => {
    inputPassword = inputPassword === ''? 'password':inputPassword;
    const showPasswordCheckBox = await LoginPOM.showPasswordCheckBoxPOM();
    await stateAssertion(showPasswordCheckBox);
    const PasswordField = await LoginPOM.passwordFieldPOM();

    await showPasswordCheckBox.click();
    password = await PasswordField.getText();
    expect(password).not.toBe(CreatePasswordDots(password));
    expect(password).toBe(inputPassword);
}
module.exports.Log = async () => {
    const LogButton = await LoginPOM.logButtonPOM();
    await stateAssertion(LogButton);
    await LogButton.click();
}
module.exports.SuccessfulLog = async () => {
    await stateAssertion(await HomePOM.WritePostButton());
    await stateAssertion(await HomePOM.HomeScreenButton());
    await stateAssertion(await HomePOM.SearchScreenButton());
    await stateAssertion(await HomePOM.MessageScreenButton());
    await stateAssertion(await HomePOM.ProfileScreenButton());
}