module.exports.returnPOM = async (selector) => {
    const POM = (await $(`android=${selector}`));
    await POM.waitForDisplayed({
        timeout: 300000
    });
    return POM;
}
module.exports.ScreenContains = async (text, time = 3000) => {
    const selector = await `new UiSelector().textContains("${text}")`;
    const POM = (await $(`android=${selector}`));
    await POM.waitForDisplayed({
        timeout: time
    });
    return POM;
}
module.exports.CreatePasswordDots = (password) => {
    return ''.padEnd(password.length, '•');
}