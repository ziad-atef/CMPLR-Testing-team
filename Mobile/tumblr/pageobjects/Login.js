const {returnPOM} = require('../utils/utils');
module.exports = class Login {
    async loginButtonPOM() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/login_btn")';
        return returnPOM(selector);
    }
    async loginWithEmailButtonPOM() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/login_email")';
        return returnPOM(selector);
    }
    async emailFieldPOM() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/email_text")';
        return returnPOM(selector);
    }
    async passwordFieldPOM() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/password_text")';
        return returnPOM(selector);
    }
    async showPasswordCheckBoxPOM() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/show_pass")';
        return returnPOM(selector);
    }
    async forgetPasswordPOM() {
        const selector = await `new UiSelector().resourceId("com.cmp.cmplr:id/forgot_button")`;
        return returnPOM(selector);
    }
    async errorMessagePOM() {
        const selector = await `new UiSelector().resourceId("com.cmp.cmplr:id/error_text")`;
        return returnPOM(selector);
    }
    async logButtonPOM() {
        const selector = await `new UiSelector().resourceId("com.cmp.cmplr:id/login_btn")`;
        return returnPOM(selector);
    }
}