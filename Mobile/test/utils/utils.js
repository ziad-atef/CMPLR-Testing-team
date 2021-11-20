module.exports.returnPOM = async (selector) => {
    const POM = (await $(`android=${selector}`));
    await POM.waitForDisplayed({ timeout: 300000 });
    return POM;
}