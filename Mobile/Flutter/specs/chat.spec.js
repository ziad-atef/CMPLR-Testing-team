const Chat = require('../pageobjects/Chat');

const faker = require('faker/locale/en');
const ChatPOM = new Chat();

describe('Login', () => {
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    afterEach(async () => {
        await driver.launchApp();
    });

    it('Send messages', async () => {
        const message = faker.lorem.words(faker.random.number({
            min: 3,
            max: 10
        }));

        const messageReciever = ChatPOM.FirstChat()
        await driver.elementClick(messageReciever);
        
        const textField = ChatPOM.textField()
        await driver.elementSendKeys(textField, "message");

        const sendButton = ChatPOM.sendButton();
        await driver.elementClick(sendButton);
    });
});