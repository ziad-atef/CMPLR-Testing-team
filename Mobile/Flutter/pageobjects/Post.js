const {
    byValueKey,
    byText,
    byType
} = require('appium-flutter-finder');
module.exports = class Post {
    textEditor() {
        return byType('HtmlEditor')
    }
    tagsButton() {
        return byValueKey('WritePostAddTags')
    }
    tagsDoneButton() {
        return byValueKey('WritePostAddTagsDone')
    }
    tagsTextField() {
        return byValueKey('WritePostAddTagsTextField')
    }
    PostButton() {
        return byValueKey('WritePostSend');
    }
}