const Login = require('../pageobjects/Login');
const emails = require('../fixtures/emails.json');
const {
    LoginWithEmail,
    EnterEmailAndPassword,
    ShowPassword,
    Log,
    SuccessfulLog
} = require('../utils/utilsLogin');
const {
    CreatePasswordDots,
    stateAssertion
} = require('../utils/utils');
const faker = require('faker/locale/en');

const LoginPOM = new Login();

describe('Login', () => {
    const InvalidLoginMessage = '∘ Please enter a valid email\n';
    const IncorrectLoginMessage = '∘ invalid email or password, try again or press on forgot my password';
    const EmptyPasswordMessage = '∘ please enter a password';
    afterEach(async () => {
        await driver.reset();
    });

    it('Login With Invaild Email', async () => {
        await LoginWithEmail();

        await EnterEmailAndPassword(faker.internet.email(), emails.password);

        await ShowPassword(emails.password);

        await Log();

        const ErrorMessage = await LoginPOM.errorMessagePOM();
        const errorMessage = await ErrorMessage.getText();
        expect(errorMessage).toBe(InvalidLoginMessage);

    });

    it('Login With Wrong Password', async () => {
        const randomPassword = faker.internet.password();
        await LoginWithEmail();

        await EnterEmailAndPassword(emails.email, randomPassword);

        await ShowPassword(randomPassword);

        await Log();

        const ErrorMessage = await LoginPOM.errorMessagePOM();
        const errorMessage = await ErrorMessage.getText();
        expect(errorMessage).toBe(IncorrectLoginMessage);
    });

    it.only('Login With Empty Password', async () => {
        await LoginWithEmail();

        await EnterEmailAndPassword(emails.email, '');

        await ShowPassword('');

        await Log();

        const ErrorMessage = await LoginPOM.errorMessagePOM();
        const errorMessage = await ErrorMessage.getText();
        expect(errorMessage).toBe(EmptyPasswordMessage);
    });


    it('Login With Empty Email', async () => {
        await LoginWithEmail();

        await EnterEmailAndPassword('', emails.password);

        await ShowPassword(emails.password);

        await Log();

        const ErrorMessage = await LoginPOM.errorMessagePOM();
        const errorMessage = await ErrorMessage.getText();
        expect(errorMessage).toBe(InvalidLoginMessage);
    });


    it('Display Password Before Typing it', async () => {
        await LoginWithEmail();

        const EmailField = await LoginPOM.emailFieldPOM();
        await stateAssertion(EmailField);
        const PasswordField = await LoginPOM.passwordFieldPOM();
        await stateAssertion(PasswordField);
        const showPasswordCheckBox = await LoginPOM.showPasswordCheckBoxPOM();
        await stateAssertion(showPasswordCheckBox);

        await EmailField.addValue(emails.email);
        const email = await EmailField.getText();
        expect(email).toBe(emails.email);

        await showPasswordCheckBox.click();

        await PasswordField.addValue(emails.password);

        let password = await PasswordField.getText();
        expect(password).toBe(emails.password);
        expect(password).not.toBe(CreatePasswordDots(password));

        await showPasswordCheckBox.click();

        password = await PasswordField.getText();
        expect(password).toBe(CreatePasswordDots(password));
        expect(password).not.toBe(emails.password);

        await Log();

        await SuccessfulLog();
    });

    it('Successful Login', async () => {
        await LoginWithEmail();

        await EnterEmailAndPassword(emails.email, emails.password);

        await ShowPassword(emails.password);

        await Log();

        await SuccessfulLog();
    });
});