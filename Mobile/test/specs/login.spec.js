const { loginButtonPOM, loginWithEmailButtonPOM, signupButtonPOM,
    emailFieldPOM, continueButtonPOM, secondContinueButtonPOM,
    enterPasswordButtonButtonPOM, logButtonPOM, errorMessagePOM,
    textInputMessagePOM, emailFieldInnerPOM } = require('../pageobjects/HomePage');
const emails = require('../fixtures/emails.json');


describe('Login', () => {

    afterEach(async () => {
        await driver.reset();
    });

    it('Login With Not Registered Email', async () => {
        const LoginButton = await loginButtonPOM();

        const SignupButton = await signupButtonPOM();

        await LoginButton.click();

        const LoginWithEmailButton = await loginWithEmailButtonPOM();
        await LoginWithEmailButton.click();


        const EmailFieldButton = await emailFieldPOM();
        await EmailFieldButton.addValue(emails.notRegisteredEmail);

        const ContinueButton = await continueButtonPOM();
        await ContinueButton.click();

        const ErrorMessage = await errorMessagePOM();
        const errorMessage = await ErrorMessage.getText();

        expect(errorMessage).toBe("That email doesn't have a Tumblr account. Sign up now?")

    });

    it('Login With Wrong Password', async () => {
        const LoginButton = await loginButtonPOM();

        const SignupButton = await signupButtonPOM();

        await LoginButton.click();

        const LoginWithEmailButton = await loginWithEmailButtonPOM();
        await LoginWithEmailButton.click();


        const EmailField = await emailFieldPOM();
        await EmailField.addValue(emails.email);

        const ContinueButton = await continueButtonPOM();
        await ContinueButton.click();

        const SecondContinueButton = await secondContinueButtonPOM();
        await SecondContinueButton.click();

        const EmailFieldInner = await emailFieldInnerPOM(emails.email);
        const email = await EmailFieldInner.getText();
        expect(email).toBe(emails.email);

        const EnterPasswordButton = await enterPasswordButtonButtonPOM();
        await EnterPasswordButton.addValue(emails.wrongPassword);

        const LogButton = await logButtonPOM();
        await LogButton.click();

        const textInputMessages = await textInputMessagePOM();
        const errorMessage = await textInputMessages.getText();
        expect(errorMessage).toBe('Incorrect email address or password. Please try again.');
    });

    it('Successful Login', async () => {
        const LoginButton = await loginButtonPOM();

        const SignupButton = await signupButtonPOM();

        await LoginButton.click();

        const LoginWithEmailButton = await loginWithEmailButtonPOM();
        await LoginWithEmailButton.click();


        const EmailField = await emailFieldPOM();
        await EmailField.addValue(emails.email);
        const email = await EmailField.getText();
        expect(email).toBe(emails.email);

        const ContinueButton = await continueButtonPOM();
        await ContinueButton.click();

        const SecondContinueButton = await secondContinueButtonPOM();
        await SecondContinueButton.click();

        const EnterPasswordButton = await enterPasswordButtonButtonPOM();
        await EnterPasswordButton.addValue(emails.password);

        const LogButton = await logButtonPOM();
        await LogButton.click();
    });
});