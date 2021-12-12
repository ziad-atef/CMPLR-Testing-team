const Login = require('../pageobjects/Login');
const Signup = require('../pageobjects/Signup');
const emails = require('../fixtures/emails.json');
const {
    CreatePasswordDots,
    ScreenContains
} = require('../utils/utils');
const {
    LoginWithEmail,
    EnterEmail,
    EnterPassword,
    EmptyEmailPasswordAssertion,
    SuccessLoginAssertion
} = require('../utils/utilsLogin');
const {
    byText
} = require('appium-flutter-finder');

const faker = require('faker/locale/en');
const LoginPOM = new Login();
const SignupPOM = new Signup();

describe('Login', () => {
    // const InvalidLoginMessage = 'please enter a valid email';
    const InvalidLoginMessage = 'UnAuthorized\n';
    const InvalidEmailMessage = 'Invalid Email\n';
    const IncorrectLoginMessage = 'email or password is not valid\n';
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    afterEach(async () => {
        await driver.reset();
    });
    


    it('Login With Wrong Password', async () => {
        const fakePassword = faker.internet.password();
        await LoginWithEmail();

        await EnterEmail(emails.email);

        await EnterPassword(emails.email, fakePassword);

        await driver.elementClick(LoginPOM.logButtonPOM());


        const errorMessage = await driver.getElementText(ScreenContains(IncorrectLoginMessage));
        console.log(errorMessage);
        expect(errorMessage.toString()).toBe(IncorrectLoginMessage);
    });

    it('Login With Empty Password', async () => {
        await LoginWithEmail();

        await EnterEmail(emails.email);

        await EnterPassword(emails.email, '');

        await driver.elementClick(LoginPOM.logButtonPOM());


        await EmptyEmailPasswordAssertion(emails.email, '');
    });


    it('Login With Empty Email', async () => {
        await LoginWithEmail();

        await EnterEmail('');


        const emailText = await driver.getElementText(LoginPOM.email2FieldPOM());
        expect(emailText.toString()).toBe('');
    });

    it('Login With Empty Email In Email Password View', async () => {
        const fakePassword = faker.internet.password();
        await LoginWithEmail();

        await EnterEmail('to be removed');

        await EnterPassword('to be removed', fakePassword);

        await driver.elementClick(LoginPOM.email3FieldClearPOM());

        await EmptyEmailPasswordAssertion('', fakePassword);
    });

    it('Login With Empty Email and Password In Email Password View', async () => {
        await LoginWithEmail();

        await EnterEmail('to be removed');


        await driver.elementClick(LoginPOM.email3FieldClearPOM());

        await EmptyEmailPasswordAssertion('', '');
    });

    it('Login With Spaced Email', async () => {
        await LoginWithEmail();

        await EnterEmail(emails.spacedEmail);

        await EnterPassword(emails.spacedEmail, emails.password);

        await driver.elementClick(LoginPOM.logButtonPOM());

        const errorMessage = await driver.getElementText(ScreenContains(InvalidEmailMessage));
        console.log(errorMessage);
        expect(errorMessage.toString()).toBe(InvalidEmailMessage);
    });

    it('Login With Invalid Email (1)', async () => {
        await LoginWithEmail();

        await EnterEmail('TEST.EMAIL');

        await EnterPassword('TEST.EMAIL', emails.password);

        await driver.elementClick(LoginPOM.logButtonPOM());

        const errorMessage = await driver.getElementText(ScreenContains(InvalidEmailMessage));
        console.log(errorMessage);
        expect(errorMessage.toString()).toBe(InvalidEmailMessage);
    });

    it('Login With Invalid Email (2)', async () => {
        await LoginWithEmail();

        await EnterEmail('TEST.EMAIL@gmail');

        await EnterPassword('TEST.EMAIL@gmail', emails.password);

        await driver.elementClick(LoginPOM.logButtonPOM());

        const errorMessage = await driver.getElementText(ScreenContains(InvalidEmailMessage));
        console.log(errorMessage);
        expect(errorMessage.toString()).toBe(InvalidEmailMessage);
    });

    it('Login With Invalid Email (3)', async () => {
        await LoginWithEmail();

        await EnterEmail('TEST.EMAIL.com');

        await EnterPassword('TEST.EMAIL.com', emails.password);

        await driver.elementClick(LoginPOM.logButtonPOM());

        const errorMessage = await driver.getElementText(ScreenContains(InvalidEmailMessage));
        console.log(errorMessage);
        expect(errorMessage.toString()).toBe(InvalidEmailMessage);
    });

    it('Login With Semi Spaced Email', async () => {
        await LoginWithEmail();

        await EnterEmail(emails.semiSpacedEmail);

        await EnterPassword(emails.semiSpacedEmail, emails.password);

        await driver.elementClick(LoginPOM.logButtonPOM());

        const errorMessage = await driver.getElementText(ScreenContains(InvalidEmailMessage));
        console.log(errorMessage);
        expect(errorMessage.toString()).toBe(InvalidEmailMessage);
    });

    it('Successful Login', async () => {
        await LoginWithEmail();

        await EnterEmail(emails.email);

        await EnterPassword(emails.email, emails.password);

        await driver.elementClick(LoginPOM.logButtonPOM());

        await SuccessLoginAssertion();
    });
});