const Profile = require('../pageobjects/Profile');
const Post = require('../pageobjects/Post');
const Home = require('../pageobjects/Home');

const ProfilePOM = new Profile();
const PostPOM = new Post();
const HomePOM = new Home();

const {
    byValueKey,
    byText
} = require('appium-flutter-finder');


module.exports.WritePost = async (Body = '', Tags = []) => {
    const WritePostPOM = HomePOM.WritePostButton();
    await driver.elementClick(WritePostPOM);


    const PostBodyPOM = PostPOM.textEditor();
    const PostButtonPOM = await PostPOM.PostButton();


    if (Body !== '') {
        // await driver.elementClick(PostBodyPOM);
        await driver.elementSendKeys(PostBodyPOM, Body);

        await driver.pause(4000);
        expect(await driver.getElementText(PostBodyPOM)).toBe(Body);
        await driver.elementClick(PostButtonPOM);
    }
}

module.exports.AssertPostOnProfile = async (Body = '', Tags = []) => {
    const ProfileScreenButtonPOM = HomePOM.ProfileScreenButton();

    await driver.elementClick(ProfileScreenButtonPOM);

    await ScreenContains(Body);
}