const Login = require('../pageobjects/Login');
const Signup = require('../pageobjects/Signup');
// const Home = require('../pageobjects/Home');

const {
    CreatePasswordDots,
    stateAssertion
} = require('./utils');

const LoginPOM = new Login();
const SignupPOM = new Signup();
// const HomePOM = new Home();

module.exports.LoginWithEmail = async () => {
    const LoginButton = LoginPOM.loginButtonPOM();
    const SignupButton = SignupPOM.signupButtonPOM();
    await driver.elementClick(LoginButton);

    const LoginWithEmailButton = LoginPOM.loginWithEmailButtonPOM();
    await driver.elementClick(LoginWithEmailButton);
}
module.exports.EnterEmail = async (inputEmail = '') => {
    inputEmail = inputEmail === '' ? 'email' : inputEmail;

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
    inputEmail = inputEmail === '' ? 'email' : inputEmail;
    inputPassword = inputPassword === '' ? 'password' : inputPassword;

    let EmailField =  LoginPOM.email3FieldPOM();
    let PasswordField =  LoginPOM.passwordFieldPOM();
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
// module.exports.ShowPassword = async (inputPassword = '') => {
//     inputPassword = inputPassword === '' ? 'password' : inputPassword;
//     const showPasswordCheckBox = await LoginPOM.showPasswordCheckBoxPOM();
//     await stateAssertion(showPasswordCheckBox);
//     const PasswordField = await LoginPOM.passwordFieldPOM();

//     await showPasswordCheckBox.click();
//     password = await PasswordField.getText();
//     expect(password).not.toBe(CreatePasswordDots(password));
//     expect(password).toBe(inputPassword);
// }
// module.exports.Log = async () => {
//     const LogButton = await LoginPOM.logButtonPOM();
//     await stateAssertion(LogButton);
//     await LogButton.click();
// }
// module.exports.SuccessfulLog = async () => {
//     await stateAssertion(await HomePOM.WritePostButton());
//     await stateAssertion(await HomePOM.HomeScreenButton());
//     await stateAssertion(await HomePOM.SearchScreenButton());
//     await stateAssertion(await HomePOM.MessageScreenButton());
//     await stateAssertion(await HomePOM.ProfileScreenButton());
// }