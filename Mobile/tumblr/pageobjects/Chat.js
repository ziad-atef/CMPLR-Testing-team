const {returnPOM} = require('../utils/utils');
module.exports = class Chat {
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
    async logButtonPOM() {
        const selector = await `new UiSelector().resourceId("com.cmp.cmplr:id/login_btn")`;
        return returnPOM(selector);
    }
    async messageButtonPOM() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/notification_button_wrapper")';
        return returnPOM(selector);
    }
    async newMessageButtonPOM() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/action_button")';
        return returnPOM(selector);
    }
    async searchFieldPOM() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/searchable_action_bar")';
        return returnPOM(selector);
    }
}