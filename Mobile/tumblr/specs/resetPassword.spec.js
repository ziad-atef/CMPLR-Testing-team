const Login = require('../pageobjects/Login');
const Resetpassword = require('../pageobjects/ResetPassword');
const {
    ScreenContains
} = require('../utils/utils');
const emails = require('../fixtures/emails.json');
const {
    LoginWithEmail,
    EnterEmailAndPassword,
    ShowPassword,
    Log,
    SuccessfulLog
} = require('../utils/utilsLogin');
const {
    stateAssertion
} = require('../utils/utils');


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
        await LoginWithEmail();

        const ForgetPasswordButton = await ResetPasswordPOM.forgetPasswordPOM();
        stateAssertion(ForgetPasswordButton);
        await ForgetPasswordButton.click();

        await ScreenContains(Titles[0]);
        await ScreenContains(Titles[1]);

        const EmailField = await LoginPOM.emailFieldPOM();
        stateAssertion(EmailField);
        await EmailField.addValue(emails.notRegisteredEmail);
        let email = await EmailField.getText();
        expect(email).toBe(emails.notRegisteredEmail);

        const SubmitResetScreenButton = await ResetPasswordPOM.submitButtonPOM();
        stateAssertion(SubmitResetScreenButton);
        let label = await SubmitResetScreenButton.getText();
        expect(label).toBe("Submit");
        await SubmitResetScreenButton.click();

        // const EmailSentTitle = await resetPasswordEmailSentTitlePOM();
        // title = await EmailSentTitle.getText();
        // expect(title).toBe("Okay, we just sent you a password reset email");
        await ScreenContains(NotRegisteredMessage);
    });
    it('Send Reset Password', async () => {
        await LoginWithEmail();

        const ForgetPasswordButton = await ResetPasswordPOM.forgetPasswordPOM();
        stateAssertion(ForgetPasswordButton);
        await ForgetPasswordButton.click();

        await ScreenContains(Titles[0]);
        await ScreenContains(Titles[1]);

        const EmailField = await LoginPOM.emailFieldPOM();
        stateAssertion(EmailField);
        await EmailField.addValue(emails.email);
        let email = await EmailField.getText();
        expect(email).toBe(emails.email);

        const SubmitResetScreenButton = await ResetPasswordPOM.submitButtonPOM();
        stateAssertion(SubmitResetScreenButton);
        let label = await SubmitResetScreenButton.getText();
        expect(label).toBe("Submit");
        await SubmitResetScreenButton.click();

        // const EmailSentTitle = await resetPasswordEmailSentTitlePOM();
        // title = await EmailSentTitle.getText();
        // expect(title).toBe("Okay, we just sent you a password reset email");
        await ScreenContains("Okay, we just sent you a password reset email");
    });
});