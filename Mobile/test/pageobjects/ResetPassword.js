const {
    returnPOM
} = require('../utils/utils');
module.exports = class Resetpassword {
    async forgetPasswordPOM() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/forgot_button")';
        return returnPOM(selector);
    };
    async errorMessagePOM() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/error_text_forgot")';
        return returnPOM(selector);
    };
    async submitButtonPOM() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/forgot_submit_button")';
        return returnPOM(selector);
    };
}