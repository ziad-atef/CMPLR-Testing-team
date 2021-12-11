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
    EnterPassword
} = require('../utils/utilsLogin');
const {
    byText
} = require('appium-flutter-finder');

const faker = require('faker/locale/en');
const LoginPOM = new Login();
const SignupPOM = new Signup();

describe('Login', () => {
    // const InvalidLoginMessage = 'please enter a valid email';
    const InvalidLoginMessage = 'UnAuthorized';
    const IncorrectLoginMessage = 'invalid email or password, try again or press on forgot my password';
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    afterEach(async () => {
        await driver.reset();
    });

    it.only('Login With Not Registered Email', async () => {
        const fakeEmail = faker.internet.email();
        await LoginWithEmail();

        await EnterEmail(fakeEmail);

        await EnterPassword(fakeEmail, emails.password);

        await driver.elementClick(LoginPOM.logButtonPOM());
        
        const errorMessage = await driver.getElementText(ScreenContains('Log in'));
        console.log(errorMessage);
        expect(errorMessage.toString()).toBe(InvalidLoginMessage);
    });

    it('Login With Wrong Password', async () => {
        const fakePassword = faker.internet.password();
        await LoginWithEmail();

        await EnterEmail(emails.email);

        await EnterPassword(emails.email, fakePassword);

        await driver.elementClick(LoginPOM.logButtonPOM());


        const errorMessage = await driver.getElementText(byText(InvalidLoginMessage))
        console.log(errorMessage)
        expect(errorMessage.toString()).toBe(InvalidLoginMessage);
    });

    it('Login With Empty Password', async () => {
        await LoginWithEmail();

        await EnterEmail(emails.email);

        await EnterPassword(emails.email, '');

        await driver.elementClick(LoginPOM.logButtonPOM());

        const errorMessage = await driver.getElementText(byText(IncorrectLoginMessage))
        console.log(errorMessage)
        expect(errorMessage.toString()).toBe(IncorrectLoginMessage);
    });


    it('Login With Empty Email', async () => {
        await LoginWithEmail();

        await EnterEmail('');

        // await EnterPassword('', fakePassword);

        // await driver.elementClick(LoginPOM.logButtonPOM());


        const errorMessage = await driver.getElementText(byText(IncorrectLoginMessage))
        console.log(errorMessage)
        expect(errorMessage.toString()).toBe(IncorrectLoginMessage);
    });

    it('Successful Login', async () => {
        const fakePassword = faker.internet.password();
        await LoginWithEmail();

        await EnterEmail(fakeEmail);

        await EnterPassword(emails.email, fakePassword);

        await driver.elementClick(LoginPOM.logButtonPOM());

        ScreenContains(InvalidLoginMessage);
    });
});