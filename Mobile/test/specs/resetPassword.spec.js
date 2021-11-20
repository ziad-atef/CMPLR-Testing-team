const { loginButtonPOM, loginWithEmailButtonPOM, signupButtonPOM,
    emailFieldPOM, continueButtonPOM, secondContinueButtonPOM,
    enterPasswordButtonButtonPOM, logButtonPOM, errorMessagePOM,
    textInputMessagePOM, emailFieldInnerPOM, forgetPasswordPOM,
    resetPasswordTitlePOM,resetPasswordSubmitPOM,resetPasswordEmailSentTitlePOM } = require('../pageobjects/HomePage');
const emails = require('../fixtures/emails.json');


describe('Reset Password', () => {
    it('Send Reset Password', async () => {
        const LoginButton = await loginButtonPOM();

        const SignupButton = await signupButtonPOM();

        await LoginButton.click();

        const LoginWithEmailButton = await loginWithEmailButtonPOM();
        await LoginWithEmailButton.click();


        const EmailField = await emailFieldPOM();
        await EmailField.addValue(emails.email);
        let email = await EmailField.getText();
        expect(email).toBe(emails.email);

        const ContinueButton = await continueButtonPOM();
        await ContinueButton.click();

        const SecondContinueButton = await secondContinueButtonPOM();
        await SecondContinueButton.click();
        
        const ForgetPasswordButton = await forgetPasswordPOM();
        await ForgetPasswordButton.click();

        const ResetPasswordTitle =await resetPasswordTitlePOM();
        let title = await ResetPasswordTitle.getText();
        expect(title).toBe(`Forgot your password? It happens. 
 We'll send you a link to reset it.`);

        const EmailFieldResetScreen = await emailFieldInnerPOM(emails.email);
        email = await EmailFieldResetScreen.getText();
        expect(email).toBe(emails.email);

        const SubmitResetScreenButton = await SubmitResetScreenButton();
        let label = await SubmitResetScreenButton.getText();
        expect(label).toBe("Submit");
        await SubmitResetScreenButton.click();

        const EmailSentTitle = await resetPasswordEmailSentTitlePOM();
        title = await EmailSentTitle.getText();
        expect(title).toBe("Okay, we just sent you a password reset email");



    });
});