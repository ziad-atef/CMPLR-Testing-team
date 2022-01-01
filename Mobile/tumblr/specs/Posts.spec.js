const Profile = require('../pageobjects/Profile');
const Post = require('../pageobjects/Post');
const Home = require('../pageobjects/Home');
const emails = require('../fixtures/emails.json');
const activities = require('../fixtures/Activities.json');
const {
    stateAssertion,ScreenContains
} = require('../utils/utils');
const {
    WritePost,
    AssertPostOnProfile
} = require('../utils/utilsPosts');

const faker = require('faker/locale/en');
const ProfilePOM = new Profile();
const PostPOM = new Post();
const HomePOM = new Home();

describe('Posting', () => {

    afterEach(async () => {
        await driver.launchApp();
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


    

});