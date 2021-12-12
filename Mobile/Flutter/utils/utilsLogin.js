const Login = require('../pageobjects/Login');
const Signup = require('../pageobjects/Signup');
const Home = require('../pageobjects/Home');

const {
    CreatePasswordDots,
    stateAssertion,
    ScreenContains
} = require('./utils');

const LoginPOM = new Login();
const SignupPOM = new Signup();
const HomePOM = new Home();

// const HomePOM = new Home();

module.exports.LoginWithEmail = async () => {
    const LoginButton = LoginPOM.loginButtonPOM();
    const SignupButton = SignupPOM.signupButtonPOM();
    await driver.elementClick(LoginButton);

    const LoginWithEmailButton = LoginPOM.loginWithEmailButtonPOM();
    await driver.elementClick(LoginWithEmailButton);
}
module.exports.EnterEmail = async (inputEmail = '') => {
    // inputEmail = inputEmail === '' ? 'email' : inputEmail;

    let EmailField = LoginPOM.emailFieldPOM();
    let ContinueButton = LoginPOM.ContinueButtonPOM();

    await driver.elementSendKeys(EmailField, inputEmail);
    let email = await driver.getElementText(EmailField);
    expect(email).toBe(inputEmail);
    await driver.elementClick(ContinueButton);

    EmailField = LoginPOM.email2FieldPOM();
    ContinueButton = LoginPOM.EnterPasswordButtonPOM();
    let EmailClear = LoginPOM.email2FieldClearPOM();

    email = await driver.getElementText(EmailField);
    expect(email).toBe(inputEmail);
    await driver.elementClick(ContinueButton);
}
module.exports.EnterPassword = async (inputEmail = '', inputPassword = '') => {
    // inputEmail = inputEmail === '' ? 'email' : inputEmail;
    // inputPassword = inputPassword === '' ? 'password' : inputPassword;

    let EmailField = LoginPOM.email3FieldPOM();
    let PasswordField = LoginPOM.passwordFieldPOM();
    let EmailClear = LoginPOM.email3FieldClearPOM();
    let PasswordShow = LoginPOM.showPasswordButtonPOM();

    let email = await driver.getElementText(EmailField);
    expect(email).toBe(inputEmail);

    await driver.elementSendKeys(PasswordField, inputPassword);
    await driver.elementClick(PasswordShow);
    await driver.elementClick(PasswordShow);
    await driver.elementClick(PasswordShow);
    await driver.elementClick(PasswordShow);

    let password = await driver.getElementText(PasswordField);
    expect(password).toBe(inputPassword);
    // expect(password).not.toBe(inputPassword);
}
module.exports.EmptyEmailPasswordAssertion = async (email, password) => {
    const emailText = await driver.getElementText(LoginPOM.email3FieldPOM());
    const passwordText = await driver.getElementText(LoginPOM.passwordFieldPOM());

    expect(emailText.toString()).toBe(email);
    expect(passwordText.toString()).toBe(password);
}
module.exports.SuccessLoginAssertion = async (email, password) => {
    await driver.elementClick(HomePOM.HomeScreenButton());

    await driver.elementClick(HomePOM.SearchScreenButton());

    await driver.elementClick(HomePOM.MessageScreenButton());

    await driver.elementClick(HomePOM.ProfileScreenButton());
}