const { returnPOM } = require('../utils/utils');

module.exports.loginButtonPOM = async () => {
    const selector = await 'new UiSelector().resourceId("com.tumblr:id/login_button")';
    return returnPOM(selector);
}
module.exports.signupButtonPOM = async () => {
    const selector = await 'new UiSelector().resourceId("com.tumblr:id/sign_up_button")';
    return returnPOM(selector);
}
module.exports.loginWithEmailButtonPOM = async () => {
    const selector = await 'new UiSelector().resourceId("com.tumblr:id/email_auth_button")';
    return returnPOM(selector);
}
module.exports.emailFieldPOM = async () => {
    const selector = await 'new UiSelector().resourceId("com.tumblr:id/email")';
    return returnPOM(selector);
}
module.exports.continueButtonPOM = async () => {
    const selector = await 'new UiSelector().resourceId("com.tumblr:id/primary_button")';
    return returnPOM(selector);
}
module.exports.secondContinueButtonPOM = async () => {
    const selector = await 'new UiSelector().resourceId("com.tumblr:id/use_password_button")';
    return returnPOM(selector);
}
module.exports.enterPasswordButtonButtonPOM = async () => {
    const selector = await 'new UiSelector().textContains("password")';
    return returnPOM(selector);
}
module.exports.logButtonPOM = async () => {
    const selector = await 'new UiSelector().resourceId("com.tumblr:id/action_button")';
    return returnPOM(selector);
}
module.exports.errorMessagePOM = async () => {
    const selector = await 'new UiSelector().resourceId("com.tumblr:id/action_message_text")';
    return returnPOM(selector);
}
module.exports.textInputMessagePOM = async () => {
    const selector = await 'new UiSelector().resourceId("com.tumblr:id/textinput_error")';
    return returnPOM(selector);
}
module.exports.emailFieldInnerPOM = async (text) => {
    const selector = await `new UiSelector().textContains("${text}")`;
    return returnPOM(selector);
}
module.exports.forgetPasswordPOM = async () => {
    const selector = await `new UiSelector().resourceId("com.tumblr:id/secondary_button")`;
    return returnPOM(selector);
}
module.exports.resetPasswordTitlePOM = async () => {
    const selector = await `new UiSelector().resourceId("com.tumblr:id/title_text")`;
    return returnPOM(selector);
}
module.exports.resetPasswordSubmitPOM = async () => {
    const selector = await `new UiSelector().resourceId("com.tumblr:id/action_button")`;
    return returnPOM(selector);
}
module.exports.resetPasswordEmailSentTitlePOM = async () => {
    const selector = await `new UiSelector().resourceId("com.tumblr:id/title_text")`;
    return returnPOM(selector);
}
