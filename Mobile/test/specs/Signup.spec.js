const expect = require('chai').expect;
const Signup = require('../pageobjects/Signup');

const faker = require('faker/locale/en');

const { 
  ScreenContains,
  stateAssertion
 } = require('../utils/utils');
describe('Signup testing', () => {

  const SignupPOM = new Signup();
  
  afterEach(async () => {
    await driver.reset();
  });

  it('Signup with invalid age', async () =>{
    selector = await SignupPOM.signupButtonPOM();
    await selector.click()

    selector= await SignupPOM.emailSignupButtonPOM();
    await selector.click()

    selector = await SignupPOM.ageTextBoxPOM()
    await selector.addValue("10")

    selector = await SignupPOM.ageNextButtonPOM()
    await selector.click()    

    const assertion = await ScreenContains("next")
    driver.waitUntil (()=>assertion)
  })

  it('Signup with invalid email', async () => {
    
    selector = await SignupPOM.signupButtonPOM();
    await selector.click()

    selector= await SignupPOM.emailSignupButtonPOM();
    await selector.click()

    selector = await SignupPOM.ageTextBoxPOM()
    await selector.addValue("20")

    selector = await SignupPOM.ageNextButtonPOM()
    await selector.click()
    
    selector = await SignupPOM.nameTextBoxPOM()
    await selector.addValue("ssthsrth2lm")

    selector = await SignupPOM.emailTextBoxPOM()
    await selector.addValue("ziadgmail.com")

    selector = await SignupPOM.passwordTextBoxPOM()
    await selector.addValue("Qwer1234##")

    selector = await SignupPOM.signupDoneButtonPOM()
    await selector.click()

    await stateAssertion( await SignupPOM.emailTextBoxPOM());
    await stateAssertion( await SignupPOM.passwordTextBoxPOM());
    await stateAssertion( await SignupPOM.nameTextBoxPOM());
    await stateAssertion( await SignupPOM.signupDoneButtonPOM());
  })

  it('Signup with invalid blog name', async () => {
    
    selector = await SignupPOM.signupButtonPOM();
    await selector.click()

    selector= await SignupPOM.emailSignupButtonPOM();
    await selector.click()

    selector = await SignupPOM.ageTextBoxPOM()
    await selector.addValue("20")

    selector = await SignupPOM.ageNextButtonPOM()
    await selector.click()

    selector = await SignupPOM.emailTextBoxPOM()
    await selector.addValue("ziad@gmail.com")

    selector = await SignupPOM.passwordTextBoxPOM()
    await selector.addValue("Qwer1234##")

    selector = await SignupPOM.signupDoneButtonPOM()
    await selector.click()

    await stateAssertion( await SignupPOM.emailTextBoxPOM());
    await stateAssertion( await SignupPOM.passwordTextBoxPOM());
    await stateAssertion( await SignupPOM.nameTextBoxPOM());
    await stateAssertion( await SignupPOM.signupDoneButtonPOM());
  })

  it('Signup with invalid blog name', async () => {
    
    selector = await SignupPOM.signupButtonPOM();
    await selector.click()

    selector= await SignupPOM.emailSignupButtonPOM();
    await selector.click()

    selector = await SignupPOM.ageTextBoxPOM()
    await selector.addValue("20")

    selector = await SignupPOM.ageNextButtonPOM()
    await selector.click()

    selector = await SignupPOM.nameTextBoxPOM()
    await selector.addValue("ssthsrth2lm")

    selector = await SignupPOM.emailTextBoxPOM()
    await selector.addValue("ziad@gmail.com")

    selector = await SignupPOM.passwordTextBoxPOM()
    await selector.addValue("Qw")

    selector = await SignupPOM.signupDoneButtonPOM()
    await selector.click()


    await stateAssertion( await SignupPOM.emailTextBoxPOM());
    await stateAssertion( await SignupPOM.passwordTextBoxPOM());
    await stateAssertion( await SignupPOM.nameTextBoxPOM());
    await stateAssertion( await SignupPOM.signupDoneButtonPOM());
  })

  it('Full valid test', async () => {
    
    selector = await SignupPOM.signupButtonPOM();
    await selector.click()

    selector= await SignupPOM.emailSignupButtonPOM();
    await selector.click()

    selector = await SignupPOM.ageTextBoxPOM()
    await selector.addValue("20")

    selector = await SignupPOM.ageNextButtonPOM()
    await selector.click()
    
    selector = await SignupPOM.nameTextBoxPOM()
    await selector.addValue("ssthsrth2lm")

    selector = await SignupPOM.emailTextBoxPOM()
    await selector.addValue("ziad@gmail.com")

    selector = await SignupPOM.passwordTextBoxPOM()
    await selector.addValue("Qwer1234##")

    selector = await SignupPOM.signupDoneButtonPOM()
    await selector.click()

    driver.waitUntil (()=>selector)
  })

})
