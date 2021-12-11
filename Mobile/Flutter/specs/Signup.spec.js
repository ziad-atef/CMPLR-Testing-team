const expect = require('chai').expect;
const Signup = require('../pageobjects/Signup');

const {
  byText
} = require('appium-flutter-finder');

const faker = require('faker/locale/en');
const SignupPOM = new Signup();

const {
  ScreenContains
} = require('../utils/utils');

describe('Signup testing', () => {
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    afterEach(async () => {
        await driver.reset();
    });
    it('Signup with invalid age', async () =>{

      await driver.elementClick(SignupPOM.signupButtonPOM() );

      await driver.elementClick(SignupPOM.emailSignupButtonPOM() );
  
      await driver.elementSendKeys(SignupPOM.ageTextBoxPOM(),"10");
  
      await driver.elementClick(SignupPOM.ageNextButtonPOM() );
  
      const assertion = await ScreenContains("next")
      driver.waitUntil (()=>assertion)
    })
  
    it('Signup with invalid email', async () => {
      
      await driver.elementClick( SignupPOM.signupButtonPOM() );

      await driver.elementClick( SignupPOM.emailSignupButtonPOM() );
  
      await driver.elementSendKeys( SignupPOM.ageTextBoxPOM(),"20");
  
      await driver.elementClick( SignupPOM.ageNextButtonPOM() );
      
      await driver.elementSendKeys( SignupPOM.nameTextBoxPOM(),"ssthsrth2lm");
  
      await driver.elementSendKeys( SignupPOM.emailTextBoxPOM(),"ziadgmail.com");
  
      await driver.elementSendKeys( SignupPOM.passwordTextBoxPOM(),"Qwer1234##");

      await driver.elementClick( SignupPOM.signupDoneButtonPOM() );
      
/////////////////////////this part needs editing////////////////////////
      selector = await SignupPOM.signupErrorPOM()
      expect(selector).exist("∘ Please enter a valid email")
      driver.waitUntil (()=>selector)
    })
  
    it('Signup with invalid blog name', async () => {
      
      await driver.elementClick( SignupPOM.signupButtonPOM() );

      await driver.elementClick( SignupPOM.emailSignupButtonPOM() );
  
      await driver.elementSendKeys( SignupPOM.ageTextBoxPOM(),"20");
  
      await driver.elementClick( SignupPOM.ageNextButtonPOM() );
  
      await driver.elementSendKeys( SignupPOM.emailTextBoxPOM(),"ziad@gmail.com");
  
      await driver.elementSendKeys( SignupPOM.passwordTextBoxPOM(),"Qwer1234##");

      await driver.elementClick( SignupPOM.signupDoneButtonPOM() );

/////////////////////////this part needs editing////////////////////////
      selector = await SignupPOM.signupErrorPOM()
      expect(selector).exist("∘ Please enter a blog name")
      driver.waitUntil (()=>selector)
    })
  
    it('Signup with invalid password name', async () => {
      
      selector = await SignupPOM.signupButtonPOM();
      await selector.click()
  
      await driver.elementClick( SignupPOM.signupButtonPOM() );

      await driver.elementClick( SignupPOM.emailSignupButtonPOM() );
  
      await driver.elementSendKeys( SignupPOM.ageTextBoxPOM(),"20");
  
      await driver.elementClick( SignupPOM.ageNextButtonPOM() );
      
      await driver.elementSendKeys( SignupPOM.nameTextBoxPOM(),"ssthsrth2lm");
  
      await driver.elementSendKeys( SignupPOM.emailTextBoxPOM(),"ziad@gmail.com");
  
      await driver.elementSendKeys( SignupPOM.passwordTextBoxPOM(),"Qw");

      await driver.elementClick( SignupPOM.signupDoneButtonPOM() );
  
/////////////////////////this part needs editing////////////////////////
      selector = await SignupPOM.signupErrorPOM()
      expect(selector).exist("∘ Password must be more than 6 characters")
      driver.waitUntil (()=>selector)
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
      driver.waitUntil (()=>selector)
    })
})
