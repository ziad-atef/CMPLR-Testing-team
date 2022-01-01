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
      
    })
  
    it('Signup with invalid blog name', async () => {
      
      await driver.elementClick( SignupPOM.signupButtonPOM() );

      await driver.elementClick( SignupPOM.emailSignupButtonPOM() );
  
      await driver.elementSendKeys( SignupPOM.ageTextBoxPOM(),"20");
  
      await driver.elementClick( SignupPOM.ageNextButtonPOM() );
  
      await driver.elementSendKeys( SignupPOM.emailTextBoxPOM(),"ziad@gmail.com");
  
      await driver.elementSendKeys( SignupPOM.passwordTextBoxPOM(),"Qwer1234##");

      await driver.elementClick( SignupPOM.signupDoneButtonPOM() );

    })
  
    it('Signup with invalid password name', async () => {
  
      await driver.elementClick( SignupPOM.signupButtonPOM() );

      await driver.elementClick( SignupPOM.emailSignupButtonPOM() );
  
      await driver.elementSendKeys( SignupPOM.ageTextBoxPOM(),"20");
  
      await driver.elementClick( SignupPOM.ageNextButtonPOM() );
      
      await driver.elementSendKeys( SignupPOM.nameTextBoxPOM(),"ssthsrth2lm");
  
      await driver.elementSendKeys( SignupPOM.emailTextBoxPOM(),"ziad@gmail.com");
  
      await driver.elementSendKeys( SignupPOM.passwordTextBoxPOM(),"Qw");

      await driver.elementClick( SignupPOM.signupDoneButtonPOM() );
  

    })
  
    it('Full valid test', async () => {
      
      await driver.elementClick( SignupPOM.signupButtonPOM() );

      await driver.elementClick( SignupPOM.emailSignupButtonPOM() );
  
      await driver.elementSendKeys( SignupPOM.ageTextBoxPOM(),"20");
  
      await driver.elementClick( SignupPOM.ageNextButtonPOM() );
      
      await driver.elementSendKeys( SignupPOM.nameTextBoxPOM(),"fdbfdb");
  
      await driver.elementSendKeys( SignupPOM.emailTextBoxPOM(),"ziadfgsg@gmail.com");
  
      await driver.elementSendKeys( SignupPOM.passwordTextBoxPOM(),"Qwfdgs131$#!");

      await driver.elementClick( SignupPOM.signupDoneButtonPOM() );
    })
})
