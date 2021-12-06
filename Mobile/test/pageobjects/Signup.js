const {
    returnPOM
} = require('../utils/utils');
module.exports = class Login {
    async signupButtonPOM() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/signup_btn")';
        return returnPOM(selector);
    }
}