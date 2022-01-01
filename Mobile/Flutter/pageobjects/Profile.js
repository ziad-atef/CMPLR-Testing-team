const {
    byValueKey,
    byText
} = require('appium-flutter-finder');
module.exports = class Profile {
    profileSettingsButton() {
        return byText('Profile_Settings');
    }
    profileShareButton() {
        return byValueKey('Profile_Share');
    }
    profileEditButton() {
        return byValueKey('Profile__EditProfile');
    }
    profileSearchButton() {
        return byValueKey('Profile_Search');
    }
    postsTabButton() {
        return byValueKey('Profile_PostsTab');
    }
    LikesTabButton() {
        return byValueKey('Profile_LikesTab');
    }
    followingTabButton() {
        return byValueKey('Profile_FollowingTab');
    }
    followingScreenProfilesButton(index = 0) {
        return byValueKey(`Profile_following_${index}`);
    }
    followingScreenFollowButton(index = 0) {
        return byValueKey(`Profile_following_${index}_follow`);
    }
    followingScreenProfilesSettingShareButton(index = 0) {
        return byValueKey(`Profile_following_${index}_Share`);
    }
    followingScreenProfilesSettingUnfollowButton(index = 0) {
        return byValueKey(`Profile_following_${index}_Unfollow`);
    }

}