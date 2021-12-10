const Login = require('../pageobjects/Login');
const Resetpassword = require('../pageobjects/ResetPassword');
const emails = require('../fixtures/emails.json');
const {
    CreatePasswordDots,
    ScreenContains
} = require('../utils/utils');


const LoginPOM = new Login();
const ResetPasswordPOM = new Resetpassword();

describe('Reset Password', () => {
    const NotRegisteredMessage = "please enter an existing email."
    const Titles = [
        "Forgot your password? It happens.",
        "We'll send you a link to reset it."
    ];
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    afterEach(async () => {
        await driver.reset();
    });

    it('Forget Password With Not Registered Email', async () => {
        const LoginButton =  LoginPOM.loginButtonPOM();

        await LoginButton.click();

        const LoginWithEmailButton =  LoginPOM.loginWithEmailButtonPOM();
        await LoginWithEmailButton.click();

        const ForgetPasswordButton =  ResetPasswordPOM.forgetPasswordPOM();
        await ForgetPasswordButton.click();

        await ScreenContains(Titles[0]);
        await ScreenContains(Titles[1]);

        const EmailField =  LoginPOM.emailFieldPOM();
        await EmailField.addValue(emails.notRegisteredEmail);
        let email = await EmailField.getText();
        expect(email).toBe(emails.notRegisteredEmail);

        const SubmitResetScreenButton =  ResetPasswordPOM.submitButtonPOM();
        let label = await SubmitResetScreenButton.getText();
        expect(label).toBe("Submit");
        await SubmitResetScreenButton.click();

        // const EmailSentTitle = await resetPasswordEmailSentTitlePOM();
        // title = await EmailSentTitle.getText();
        // expect(title).toBe("Okay, we just sent you a password reset email");
        await ScreenContains(NotRegisteredMessage);
    });
    it('Send Reset Password', async () => {
        const LoginButton =  LoginPOM.loginButtonPOM();

        await LoginButton.click();

        const LoginWithEmailButton =  LoginPOM.loginWithEmailButtonPOM();
        await LoginWithEmailButton.click();

        const ForgetPasswordButton =  ResetPasswordPOM.forgetPasswordPOM();
        await ForgetPasswordButton.click();

        await ScreenContains(Titles[0]);
        await ScreenContains(Titles[1]);

        const EmailField =  LoginPOM.emailFieldPOM();
        await EmailField.addValue(emails.email);
        let email = await EmailField.getText();
        expect(email).toBe(emails.email);

        const SubmitResetScreenButton =  ResetPasswordPOM.submitButtonPOM();
        let label = await SubmitResetScreenButton.getText();
        expect(label).toBe("Submit");
        await SubmitResetScreenButton.click();

        // const EmailSentTitle = await resetPasswordEmailSentTitlePOM();
        // title = await EmailSentTitle.getText();
        // expect(title).toBe("Okay, we just sent you a password reset email");
        await ScreenContains("Okay, we just sent you a password reset email");
    });
});