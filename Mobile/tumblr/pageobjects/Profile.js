const {
    returnPOM,
    returnPOMs
} = require('../utils/utils');
module.exports = class Profile {
    //  Profile Posts
    async PostBlogName() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/post_card_blog_name")';
        return returnPOMs(selector);
    }
    async PostContent() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/dashboard_blocks_text")';
        return returnPOMs(selector);
    }
    async PostTags() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/post_card_wrapped_tags")';
        return returnPOMs(selector);
    }
    async PostShareButton() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/post_control_share_to_msg")';
        return returnPOMs(selector);
    }
    async PostCommentButton() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/post_control_comment")';
        return returnPOMs(selector);
    }
    async PostReblogButton() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/post_control_reblog")';
        return returnPOMs(selector);
    }
    async PostDeleteButton() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/post_control_delete")';
        return returnPOMs(selector);
    }
    async PostEditButton() {
        const selector = await 'new UiSelector().resourceId("com.tumblr:id/post_control_edit")';
        return returnPOMs(selector);
    }

}