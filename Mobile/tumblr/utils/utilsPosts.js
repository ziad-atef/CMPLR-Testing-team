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
    await stateAssertion(PostButtonPOM, true, false);
    const TagsButtonPOM = await PostPOM.TagsButton();
    await stateAssertion(TagsButtonPOM);

    if (Body !== '') {
        await PostBodyPOM.addValue(Body);
        expect(await ((await PostBodyPOM.getText()))).toBe(Body);
    }
    if (Tags.length !== 0) {
        await TagsButtonPOM.click();
        const TagField = await PostPOM.TagsTextField();
        await stateAssertion(TagField);
        for (let i = 0; i < Tags.length; i++) {
            await TagField.addValue(`${Tags[i]} \n`);
            expect(await ((await PostPOM.EnteredTag())[i]).getText()).toBe(`#${Tags[i]}`);
        }
        await (await PostPOM.DoneButton()).click();
    }
}

module.exports.AssertPostOnProfile = async (Body = '', Tags = []) => {
    const ProfileScreenButtonPOM = await HomePOM.ProfileScreenButton();
    await stateAssertion(ProfileScreenButtonPOM);
    await ProfileScreenButtonPOM.click();

    await ScreenContains(Body);
    // expect(await ((await ProfilePOM.PostContent())[0]).getText()).toBe(Body);

    // if (Tags.length !== 0) {
    //     await TagsButtonPOM.click();
    //     const TagField = await PostPOM.TagsTextField();
    //     await stateAssertion(TagField);
    //     for (let i = 0; i < Tags.length; i++) {
    //         await TagField.addValue(`${Tags[i]} \n`);
    //         expect(await ((await ProfilePOM.PostTags())[i]).getText()).toBe(`#${Tags[i]}`);
    //     }
    //     await (await PostPOM.DoneButton()).click();
    // }
}