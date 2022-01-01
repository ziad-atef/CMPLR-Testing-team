const {
    byValueKey
} = require('appium-flutter-finder');
module.exports = class Chat {
    FirstChat() {
        return byValueKey('chat_0');
    }
    textField() {
        return byValueKey('chat_testField');
    }
    sendButton() {
        return byValueKey('chatSend');
    }
}