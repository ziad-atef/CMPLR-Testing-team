const {
    returnPOM
} = require('../utils/utils');
module.exports = class Login {

    async signupButtonPOM() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/signup_btn")';
        return returnPOM(selector);
    }

    async emailSignupButtonPOM() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/signup_email")';
        return returnPOM(selector);
    }

    async ageTextBoxPOM() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/age_text")';
        return returnPOM(selector);
    }

    async ageNextButtonPOM() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/next_age_screen")';
        return returnPOM(selector);
    }

    async messageButtonPOM() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/notification_button_wrapper")';
        return returnPOM(selector);
    }

    async postButtonPOM() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/composer_fab")';
        return returnPOM(selector);
    }

    async profileButtonPOM() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/topnav_account_button_img_active")';
        return returnPOM(selector);
    }

    async emailTextBoxPOM() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/email_text_signup")';
        return returnPOM(selector);
    }

    async passwordTextBoxPOM() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/password_text_signup")';
        return returnPOM(selector);
    }

    async nameTextBoxPOM() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/name_text_signup")';
        return returnPOM(selector);
    }

    async signupDoneButtonPOM() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/signup_button")';
        return returnPOM(selector);
    }
    
    async signupErrorPOM() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/error_text_signup")';
        return returnPOM(selector);
    }
}