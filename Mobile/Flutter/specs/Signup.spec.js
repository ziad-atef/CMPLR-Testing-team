const expect = require('chai').expect;

describe('Signup testing', () => {
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    afterEach(async () => {
        await driver.reset();
    });
  it('Signup with invalid address1', async () =>{
    selector = await 'new UiSelector().resourceId("com.tumblr:id/sign_up_button")'
    const signupButton = await $(`android=${selector}`).click()

    selector= await 'new UiSelector().resourceId("com.tumblr:id/email_auth_button")'
    const emailSignupButton = await $(`android=${selector}`).click()

    selector = await 'new UiSelector().resourceId("com.tumblr:id/tm_edit_text")'
    const ageBox = await $(`android=${selector}`).addValue("10")

    selector = await 'new UiSelector().resourceId("com.tumblr:id/next_button")'
    const ageNext = await $(`android=${selector}`).click()

    expect(selector).exist("Next")
    await driver.resetApp();
  })
  it('Full valid test', async () => {
    
    selector = await 'new UiSelector().resourceId("com.tumblr:id/sign_up_button")'
    const signupButton = await $(`android=${selector}`).click()

    selector= await 'new UiSelector().resourceId("com.tumblr:id/email_auth_button")'
    const emailSignupButton = await $(`android=${selector}`).click()

    selector = await 'new UiSelector().resourceId("com.tumblr:id/tm_edit_text")'
    const ageBox = await $(`android=${selector}`).addValue("15")
    selector = await 'new UiSelector().resourceId("com.tumblr:id/next_button")'
    const ageNext = await $(`android=${selector}`).click()

    /*For real application and cross testing Interests needs to be added*/
    selector = await 'new UiSelector().text("Trending")'
    intrest = await $(`android=${selector}`).click()


    selector = await 'new UiSelector().text("F1")'
    intrest = await $(`android=${selector}`).click()

    selector = await 'new UiSelector().text("Tgcf")'
    intrest = await $(`android=${selector}`).click()

    selector = await 'new UiSelector().text("Ski Jumping")'
    intrest = await $(`android=${selector}`).click()

    selector = await 'new UiSelector().text("Pierre Gasly")'
    intrest = await $(`android=${selector}`).click()

    

    selector = await 'new UiSelector().resourceId("com.tumblr:id/next_button")'
    const intrestsNext = await $(`android=${selector}`).click()
    /********************************************************************/
    selector = await 'new UiSelector().resourceId("com.tumblr:id/topnav_account_button_img_active")'
    const accountButton = await $(`android=${selector}`).click()
    
    selector = await 'new UiSelector().text("email")'
    const emailArea = await $(`android=${selector}`).addValue("ziad@gmail.com")

    selector = await 'new UiSelector().text("password")'
    const passwordArea = await $(`android=${selector}`).addValue("Qwer1234##")

    selector = await 'new UiSelector().text("name")'
    const nameArea = await $(`android=${selector}`).addValue("ssthsrth2lm")

    selector = await 'new UiSelector().text("Done")'
    const Done = await $(`android=${selector}`).click()

    driver.waitUntil (()=>selector)
  })
})
