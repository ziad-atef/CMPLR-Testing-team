const Profile = require('../pageobjects/Profile');
const Post = require('../pageobjects/Post');
const Home = require('../pageobjects/Home');
const Notes = require('../pageobjects/notes');
const emails = require('../fixtures/emails.json');
const {
    byType
} = require('appium-flutter-finder');

const {
    WritePost,
    AssertPostOnProfile
} = require('../utils/utilsPosts');

const faker = require('faker/locale/en');
const ProfilePOM = new Profile();
const PostPOM = new Post();
const HomePOM = new Home();
const NotesPOM = new Notes();

describe('Posting', () => {

    afterEach(async () => {
        await driver.launchApp();
    });
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('Enter Posts Screen', async () => {
        const Body = faker.lorem.paragraph(faker.random.number({
            min: 3,
            max: 10
        }));
        const Tags = faker.lorem.words(faker.random.number({
            min: 3,
            max: 10
        })).split(' ');

        await WritePost(Body, Tags);

        await (await PostPOM.PostButton()).click();

        await AssertPostOnProfile(Body, Tags);
        await driver.pause(4000);
    });

    it.only('Enter Posts Screen', async () => {
        const Body = faker.lorem.paragraph(faker.random.number({
            min: 1,
            max: 3
        }));

        await driver.pause(20000);
        const firstPostNotesPOM = HomePOM.HomeNotesButton();
        driver.execute('flutter:scrollUntilVisible', byType('ListView'), {
            item: firstPostNotesPOM,
            dxScroll: 90,
            dyScroll: -400
        });
        // driver.execute('flutter:scrollIntoView', firstPostNotesPOM, {
        //     alignment: 0.1
        // })
        await driver.elementClick(firstPostNotesPOM);

        const notesTextAreaPOM = NotesPOM.textArea();
        await driver.elementSendKeys(notesTextAreaPOM, Body);

        const notesReplyButtonPOM = NotesPOM.replyButton();
        await driver.elementClick(notesReplyButtonPOM);

        await driver.pause(10000);
    });




});