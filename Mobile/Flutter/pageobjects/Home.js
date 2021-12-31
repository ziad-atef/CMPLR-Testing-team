const {
    byValueKey
} = require('appium-flutter-finder');
module.exports = class Home {
    WritePostButton() {
        return byValueKey('masterPage_write_post');
    }
    HomeScreenButton() {
        return byValueKey('masterPage_home');
    }
    SearchScreenButton() {
        return byValueKey('masterPage_search');
    }
    MessageScreenButton() {
        return byValueKey('masterPage_activity');
    }
    ProfileScreenButton() {
        return byValueKey('masterPage_profile');
    }
    HomeNotesButton(index=0){
        return byValueKey(`HomeFollowing_postNotes_${index}`);
    }
}