const {
    returnPOM,
    returnPOMs
} = require('../utils/utils');
module.exports = class Post {
    //  Screen Body
    async PostBody() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/text")';
        return returnPOM(selector);
    }
    async BlogName() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/blog_name")';
        return returnPOM(selector);
    }
    async PostMenu() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/overflow_menu")';
        return returnPOM(selector);
    }

    //  Tags POMs
    async TagsButton() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/label")';
        return returnPOM(selector);
    }
    async TagsButtonAfterTagsEntered() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/plus_icon")';
        return returnPOM(selector);
    }
    async TagsTextField() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/add_tags")';
        return returnPOM(selector);
    }
    async EnteredTag() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/label")';
        return returnPOMs(selector);
    }
    async DoneButton() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/done_button")';
        return returnPOM(selector);
    }
    async RecommendedTags() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/tag_text")';
        return returnPOMs(selector);
    }

    async PostButton() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/action_button")';
        return returnPOM(selector);
    }
}