const Login = require('../pageobjects/Login');
const emails = require('../fixtures/emails.json');
const {
    LoginWithEmail,
    EnterEmailAndPassword,
    ShowPassword,
    Log,
    SuccessfulLog,
    AssertEmailOrPasswordEmpty,
    AssertErrorMessage
} = require('../utils/utilsLogin');
const {
    CreatePasswordDots,
    stateAssertion,
    ScreenContains
} = require('../utils/utils');
const faker = require('faker/locale/en');

const LoginPOM = new Login();

describe('Login', () => {

    const emptyEmailMessage = "please enter your email";
    const emptyPasswordMessage = "please enter your password";
    const InvalidEmailMessage = "The email must be a valid email address.";
    const InvalidLoginMessage = "Either your login email or password is incorrect";
    const IncorrectLoginMessage = 'invalid email or password, try again or press on forgot my password';

    afterEach(async () => {
        await driver.reset();
    });

    it('Login With Invaild Email', async () => {
        await LoginWithEmail();

        await EnterEmailAndPassword(faker.internet.email(), emails.password);

        await ShowPassword(emails.password);

        await Log();

        await AssertErrorMessage(InvalidLoginMessage);

    });

    it('Login With Invaild Email (2)', async () => {
        await LoginWithEmail();

        await EnterEmailAndPassword(emails.email.slice(0, 19), emails.password);

        await ShowPassword(emails.password);

        await Log();

        await AssertEmailOrPasswordEmpty();

    });

    it('Login With Wrong Password', async () => {
        const randomPassword = faker.internet.password();
        await LoginWithEmail();

        await EnterEmailAndPassword(emails.email, randomPassword);

        await ShowPassword(randomPassword);

        await Log();

        
        await AssertErrorMessage(InvalidLoginMessage);
    });

    it('Login With Empty Password', async () => {
        await LoginWithEmail();

        await EnterEmailAndPassword(emails.email, '');

        await ShowPassword('');

        await Log();

        await AssertEmailOrPasswordEmpty();
    });


    it('Login With Empty Email', async () => {
        await LoginWithEmail();

        await EnterEmailAndPassword('', emails.password);

        await ShowPassword(emails.password);

        await Log();

        await AssertEmailOrPasswordEmpty();
    });

    it('Login With Empty Email And Password', async () => {
        await LoginWithEmail();

        await EnterEmailAndPassword('', '');

        await ShowPassword();

        await Log();

        await AssertEmailOrPasswordEmpty();
    });

    it('Login With Spaced Email  Should Error Message', async () => {
        await LoginWithEmail();

        await EnterEmailAndPassword(emails.spacedEmail, emails.password);

        await ShowPassword(emails.password);

        await Log();

        await AssertEmailOrPasswordEmpty();
    });

    it('Login With Semi Spaced Email Should Error Message', async () => {
        await LoginWithEmail();

        await EnterEmailAndPassword(emails.semiSpacedEmail, emails.password);

        await ShowPassword(emails.password);

        await Log();

        await AssertEmailOrPasswordEmpty();
    });


    it.only('Display Password Before Typing it', async () => {
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

    it.only('Successful Login', async () => {
        await LoginWithEmail();

        await EnterEmailAndPassword(emails.email, emails.password);

        await ShowPassword(emails.password);

        await Log();

        await SuccessfulLog();
    });
});