module.exports.returnPOM = async (selector) => {
    const POM = (await $(`android=${selector}`));

    await POM.waitForDisplayed({
        timeout: 300000
    });
    return POM;
}
module.exports.stateAssertion = async (POM, isDisplayed = true, isEnabled = true, isSelected = false) => {
    console.log(await POM.isDisplayed());
    if (isDisplayed)
        expect(await POM.isDisplayed()).toBe(true);
    if (isEnabled)
        expect(await POM.isEnabled()).toBe(true);
    if (isSelected)
        expect(await POM.isEnabled()).toBe(true);
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