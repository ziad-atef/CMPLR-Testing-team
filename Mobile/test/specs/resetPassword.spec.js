const Login = require('../pageobjects/Login');
const Resetpassword = require('../pageobjects/ResetPassword');
const {
    ScreenContains
} = require('../utils/utils');
const emails = require('../fixtures/emails.json');


describe('Reset Password', () => {
    const LoginPOM = new Login();
    const ResetPasswordPOM = new Resetpassword();
    const NotRegisteredMessage = "please enter an existing email."
    const Titles = [
        "Forgot your password? It happens.",
        "We'll send you a link to reset it."
    ];

    afterEach(async () => {
        await driver.reset();
    });
    it('Forget Password With Not Registered Email', async () => {
        const LoginButton = await LoginPOM.loginButtonPOM();

        await LoginButton.click();

        const LoginWithEmailButton = await LoginPOM.loginWithEmailButtonPOM();
        await LoginWithEmailButton.click();

        const ForgetPasswordButton = await ResetPasswordPOM.forgetPasswordPOM();
        await ForgetPasswordButton.click();

        await ScreenContains(Titles[0]);
        await ScreenContains(Titles[1]);

        const EmailField = await LoginPOM.emailFieldPOM();
        await EmailField.addValue(emails.notRegisteredEmail);
        let email = await EmailField.getText();
        expect(email).toBe(emails.notRegisteredEmail);

        const SubmitResetScreenButton = await ResetPasswordPOM.submitButtonPOM();
        let label = await SubmitResetScreenButton.getText();
        expect(label).toBe("Submit");
        await SubmitResetScreenButton.click();

        // const EmailSentTitle = await resetPasswordEmailSentTitlePOM();
        // title = await EmailSentTitle.getText();
        // expect(title).toBe("Okay, we just sent you a password reset email");
        await ScreenContains(NotRegisteredMessage);
    });
    it('Send Reset Password', async () => {
        const LoginButton = await LoginPOM.loginButtonPOM();

        await LoginButton.click();

        const LoginWithEmailButton = await LoginPOM.loginWithEmailButtonPOM();
        await LoginWithEmailButton.click();

        const ForgetPasswordButton = await ResetPasswordPOM.forgetPasswordPOM();
        await ForgetPasswordButton.click();

        await ScreenContains(Titles[0]);
        await ScreenContains(Titles[1]);

        const EmailField = await LoginPOM.emailFieldPOM();
        await EmailField.addValue(emails.email);
        let email = await EmailField.getText();
        expect(email).toBe(emails.email);

        const SubmitResetScreenButton = await ResetPasswordPOM.submitButtonPOM();
        let label = await SubmitResetScreenButton.getText();
        expect(label).toBe("Submit");
        await SubmitResetScreenButton.click();

        // const EmailSentTitle = await resetPasswordEmailSentTitlePOM();
        // title = await EmailSentTitle.getText();
        // expect(title).toBe("Okay, we just sent you a password reset email");
        await ScreenContains("Okay, we just sent you a password reset email");
    });
});