const Chat = require('../pageobjects/Chat');

describe('Chat', () => {
    const ChatPOM = new Chat();
    afterEach(async () => {
        await driver.reset();
    });

    it('Chat', async () => {
        const LoginButton = await LoginPOM.loginButtonPOM();

        const SignupButton = await SignupPOM.signupButtonPOM();

        await LoginButton.click();

        const LoginWithEmailButton = await ChatPOM.loginWithEmailButtonPOM();
        await LoginWithEmailButton.click();


        const EmailField = await ChatPOM.emailFieldPOM();
        await EmailField.addValue("ziadatef35@hotmail.com");

        const PasswordField = await ChatPOM.passwordFieldPOM();
        await PasswordField.addValue("6102000z");

        const LogButton = await ChatPOM.logButtonPOM();
        await LogButton.click();

        const messageButton = await ChatPOM.messageButtonPOM();
        await messageButton.click();

        const newMessageButton = await ChatPOM.newMessageButtonPOM();
        await newMessageButton.click();

        const searchBar = await ChatPOM.searchFieldPOM();
        await searchBar.addValue("zi");

        
    });


});