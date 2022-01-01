const {
    returnPOM,
    returnPOMs,
    ScreenContains
} = require('../utils/utils');
module.exports = class Notes {
    async replyButton() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/replay_btn")';
        return returnPOM(selector);
    }
    async textArea() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/comment_input")';
        return returnPOM(selector);
    }
    async mentionButton() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/mention_btn")';
        return returnPOM(selector);
    }
    async likesCounts() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/likes_count")';
        return returnPOM(selector);
    }
    async likesCounts() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/notes_count")';
        return returnPOM(selector);
    }

}

