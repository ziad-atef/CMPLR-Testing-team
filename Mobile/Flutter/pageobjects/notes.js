const {
    byValueKey
} = require('appium-flutter-finder');
module.exports = class Notes {
    replyButton() {
        return byValueKey('notes_reply');
    }
    textArea() {
        return byValueKey('notes_textfield');
    }

    likesCounts() {
        return byValueKey('notes_likes');
    }
    reblogCounts() {
        return byValueKey('notes_reblogs');
    }
    likesCounts() {
        return byValueKey('notes_comments');
    }
    closeButton() {
        return byValueKey('notes_close');
    }

    // inLikesScreen
    followButton() {
        return byValueKey('notes_follow');
    }
}