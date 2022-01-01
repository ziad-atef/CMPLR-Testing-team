const {returnPOM} = require('../utils/utils');
module.exports = class Home {
    async WritePostButton() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/composer_fab")';
        return returnPOM(selector);
    }
    async HomeScreenButton() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/homeScreenFragment")';
        return returnPOM(selector);
    }
    async SearchScreenButton() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/searchScreenFragment")';
        return returnPOM(selector);
    }
    async MessageScreenButton() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/messagesScreenFragment")';
        return returnPOM(selector);
    }
    async ProfileScreenButton() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/topnav_account_button_img_active")';
        return returnPOM(selector);
    }
}