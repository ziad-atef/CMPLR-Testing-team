const {returnPOM} = require('../utils/utils');
module.exports = class Home {
    async WritePostButton() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/writePostBtn")';
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
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/profileScreenFragment")';
        return returnPOM(selector);
    }
}