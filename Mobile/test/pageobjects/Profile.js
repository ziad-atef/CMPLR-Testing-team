const {
    returnPOM,
    returnPOMs,
    ScreenContains
} = require('../utils/utils');
module.exports = class Profile {
    //  Profile Posts
    async PostBlogName() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/username_home")';
        return returnPOMs(selector);
    }
    // async PostContent() {
    //     const selector = await 'new UiSelector().resourceId("com.tumblr:id/dashboard_blocks_text")';
    //     return returnPOMs(selector);
    // }
    // async PostTags() {
    //     const selector = await 'new UiSelector().resourceId("com.tumblr:id/post_card_wrapped_tags")';
    //     return returnPOMs(selector);
    // }
    async PostLikeButton() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/love_btn")';
        return returnPOMs(selector);
    }
    async PostCommentButton() {
        const selector = await 'new UiSelector().resourceId("com.cmp.cmplr:id/comments_btn")';
        return returnPOMs(selector);
    }
    // async PostReblogButton() {
    //     const selector = await 'new UiSelector().resourceId("com.tumblr:id/post_control_reblog")';
    //     return returnPOMs(selector);
    // }
    // async PostDeleteButton() {
    //     const selector = await 'new UiSelector().resourceId("com.tumblr:id/post_control_delete")';
    //     return returnPOMs(selector);
    // }
    // async PostEditButton() {
    //     const selector = await 'new UiSelector().resourceId("com.tumblr:id/post_control_edit")';
    //     return returnPOMs(selector);
    // }

}

