const expect = require('chai').expect;
const Signup = require('../pageobjects/Signup');



describe('Signup testing', () => {

  it('Signup with invalid age', async () =>{
    selector = await signupButtonPOM();
    await selector.click()

    selector= await emailSignupButtonPOM();
    await selector.click()

    selector = ageTextBoxPOM()
    await selector.addValue("10")

    selector = await ageNextButtonPOM()
    await selector.click()

    expect(selector).exist("Next")
    await driver.resetApp();
  })

  it('Signup with invalid age2', async () =>{
    selector = await signupButtonPOM();
    await selector.click()

    selector= await emailSignupButtonPOM();
    await selector.click()

    selector = ageTextBoxPOM()
    await selector.addValue("140")

    selector = await ageNextButtonPOM()
    await selector.click()

    expect(selector).exist("Next")
    await driver.resetApp();
  })

  it('Full valid test through profile icon', async () => {
    
    selector = await signupButtonPOM();
    await selector.click()

    selector= await emailSignupButtonPOM();
    await selector.click()

    selector = ageTextBoxPOM()
    await selector.addValue("10")

    selector = await ageNextButtonPOM()
    await selector.click()

    expect(selector).exist("Next")
    await driver.resetApp();

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
    selector = await profileButtonPOM();
    await selector.click()
    
    selector = await emailTextBoxPOM()
    await selector.addValue("ziad@gmail.com")

    selector = await passwordTextBoxPOM()
    await selector.addValue("Qwer1234##")

    selector = await nameTextBoxPOM()
    await selector.addValue("ssthsrth2lm")

    selector = await signupDoneButtonPOM()
    await selector.click()

    driver.waitUntil (()=>selector)
  })

  it('Full valid test through message icon', async () => {
    
    selector = await signupButtonPOM();
    await selector.click()

    selector= await emailSignupButtonPOM();
    await selector.click()

    selector = ageTextBoxPOM()
    await selector.addValue("10")

    selector = await ageNextButtonPOM()
    await selector.click()

    expect(selector).exist("Next")
    await driver.resetApp();

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
    selector = await messageButtonPOM();
    await selector.click()
    
    selector = await emailTextBoxPOM()
    await selector.addValue("ziad@gmail.com")

    selector = await passwordTextBoxPOM()
    await selector.addValue("Qwer1234##")

    selector = await nameTextBoxPOM()
    await selector.addValue("ssthsrth2lm")

    selector = await signupDoneButtonPOM()
    await selector.click()

    driver.waitUntil (()=>selector)
  })

  it('Full valid test through post icon', async () => {
    
    selector = await signupButtonPOM();
    await selector.click()

    selector= await emailSignupButtonPOM();
    await selector.click()

    selector = ageTextBoxPOM()
    await selector.addValue("10")

    selector = await ageNextButtonPOM()
    await selector.click()

    expect(selector).exist("Next")
    await driver.resetApp();

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
    selector = await postButtonPOM()
    await selector.click()
    
    selector = await emailTextBoxPOM()
    await selector.addValue("ziad@gmail.com")

    selector = await passwordTextBoxPOM()
    await selector.addValue("Qwer1234##")

    selector = await nameTextBoxPOM()
    await selector.addValue("ssthsrth2lm")

    selector = await signupDoneButtonPOM()
    await selector.click()

    driver.waitUntil (()=>selector)
  })

})
