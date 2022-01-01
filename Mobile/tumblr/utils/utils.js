module.exports.returnPOM = async (selector) => {
    const POM = (await $(`android=${selector}`));
    await POM.waitForDisplayed({
        timeout: 300000
    });
    return POM;
}
module.exports.returnPOMs = async (selector) => {
    const POM = (await $$(`android=${selector}`));
    await driver.pause(1500);
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
module.exports.stateAssertion = async (POM, isDisplayed = true, isEnabled = true, isSelected = false) => {
    expect(await POM.isDisplayed()).toBe(isDisplayed);
    expect(await POM.isEnabled()).toBe(isEnabled);
    expect(await POM.isSelected()).toBe(isSelected);
}