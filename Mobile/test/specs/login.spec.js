const Login = require('../pageobjects/Login');
const Signup = require('../pageobjects/Signup');
const emails = require('../fixtures/emails.json');
const {
    CreatePasswordDots
} = require('../utils/utils');

describe('Login', () => {
    const LoginPOM = new Login();
    const SignupPOM = new Signup();
    const InvalidLoginMessage = 'please enter a valid email';
    const IncorrectLoginMessage = 'invalid email or password, try again or press on forgot my password';
    afterEach(async () => {
        await driver.reset();
    });

    it('Login With Not Registered Email', async () => {
        const LoginButton = await LoginPOM.loginButtonPOM();

        const SignupButton = await SignupPOM.signupButtonPOM();

        await LoginButton.click();

        const LoginWithEmailButton = await LoginPOM.loginWithEmailButtonPOM();
        await LoginWithEmailButton.click();


        const EmailField = await LoginPOM.emailFieldPOM();
        await EmailField.addValue(emails.notRegisteredEmail);
        const email = await EmailField.getText();
        expect(email).toBe(emails.notRegisteredEmail);

        const PasswordField = await LoginPOM.passwordFieldPOM();
        await PasswordField.addValue(emails.password);
        const password = await PasswordField.getText();
        expect(password).toBe(CreatePasswordDots(password));
        expect(password).not.toBe(emails.password);

        const LogButton = await LoginPOM.logButtonPOM();
        await LogButton.click();

        const ErrorMessage = await LoginPOM.errorMessagePOM();
        const errorMessage = await ErrorMessage.getText();
        expect(errorMessage).toBe(InvalidLoginMessage);

    });

    it('Login With Wrong Password', async () => {
        const LoginButton = await LoginPOM.loginButtonPOM();

        const SignupButton = await SignupPOM.signupButtonPOM();

        await LoginButton.click();

        const LoginWithEmailButton = await LoginPOM.loginWithEmailButtonPOM();
        await LoginWithEmailButton.click();


        const EmailField = await LoginPOM.emailFieldPOM();
        await EmailField.addValue(emails.email);
        const email = await EmailField.getText();
        expect(email).toBe(emails.email);

        const PasswordField = await LoginPOM.passwordFieldPOM();
        await PasswordField.addValue(emails.wrongPassword);
        let password = await PasswordField.getText();
        expect(password).toBe(CreatePasswordDots(password));
        expect(password).not.toBe(emails.wrongPassword);

        const showPasswordCheckBox = await LoginPOM.showPasswordCheckBoxPOM();
        await showPasswordCheckBox.click();
        password = await PasswordField.getText();
        expect(password).not.toBe(CreatePasswordDots(password));
        expect(password).toBe(emails.wrongPassword);

        const LogButton = await LoginPOM.logButtonPOM();
        await LogButton.click();

        const ErrorMessage = await LoginPOM.errorMessagePOM();
        const errorMessage = await ErrorMessage.getText();
        expect(errorMessage).toBe(IncorrectLoginMessage);
    });

    it('Successful Login', async () => {
        const LoginButton = await LoginPOM.loginButtonPOM();

        const SignupButton = await SignupPOM.signupButtonPOM();

        await LoginButton.click();

        const LoginWithEmailButton = await LoginPOM.loginWithEmailButtonPOM();
        await LoginWithEmailButton.click();


        const EmailField = await LoginPOM.emailFieldPOM();
        await EmailField.addValue(emails.email);
        const email = await EmailField.getText();
        expect(email).toBe(emails.email);

        const PasswordField = await LoginPOM.passwordFieldPOM();
        await PasswordField.addValue(emails.password);
        let password = await PasswordField.getText();
        expect(password).toBe(CreatePasswordDots(password));
        expect(password).not.toBe(emails.password);

        const showPasswordCheckBox = await LoginPOM.showPasswordCheckBoxPOM();
        await showPasswordCheckBox.click();
        password = await PasswordField.getText();
        expect(password).not.toBe(CreatePasswordDots(password));
        expect(password).toBe(emails.password);

        const LogButton = await LoginPOM.logButtonPOM();
        await LogButton.click();
    });
});