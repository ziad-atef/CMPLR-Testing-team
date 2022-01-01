const Profile = require('../pageobjects/Profile');
const Post = require('../pageobjects/Post');
const Home = require('../pageobjects/Home');

const ProfilePOM = new Profile();
const PostPOM = new Post();
const HomePOM = new Home();


const {
    stateAssertion,
    ScreenContains
} = require('./utils');


module.exports.WritePost = async (Body = '', Tags = []) => {
    const WritePostPOM = await HomePOM.WritePostButton();
    await stateAssertion(WritePostPOM);
    await WritePostPOM.click();

    const PostBodyPOM = await PostPOM.PostBody();
    await stateAssertion(PostBodyPOM);
    const PostButtonPOM = await PostPOM.PostButton();
    await stateAssertion(PostButtonPOM);
    await PostBodyPOM.click();
    await PostBodyPOM.addValue("Body");
    // await driver.adbSendText("Type Something")

    if (Body !== '') {
    await PostBodyPOM.click();
        await PostBodyPOM.setValue("Body");
        await driver.pause(3000);
        expect(await ((await PostBodyPOM.getText()))).toBe(Body);
    }
}

module.exports.AssertPostOnProfile = async (Body = '', Tags = []) => {
    const ProfileScreenButtonPOM = await HomePOM.ProfileScreenButton();
    await stateAssertion(ProfileScreenButtonPOM);
    await ProfileScreenButtonPOM.click();

    await ScreenContains(Body);
}