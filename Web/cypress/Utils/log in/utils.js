import Login from "../../Page Objects/login";
const LoginPOM = new Login();

module.exports.pressAppBarLoginButton = () => {
  LoginPOM.loginButton();
  LoginPOM.loginButton();
  LoginPOM.appbarLoginButton().click();
};
module.exports.pressBodyLoginButton = () => {
  LoginPOM.loginButton();
  LoginPOM.appbarLoginButton();
  LoginPOM.loginButton().click({
    force: true,
  });
};
module.exports.pressLowerLoginButton = () => {
  LoginPOM.loginButton();
  LoginPOM.appbarLoginButton();
  LoginPOM.loginButton();
  LoginPOM.secondaryLoginButton().click({
    force: true,
  });
};
module.exports.fillEmailAndPassword = (passEmail, passPassword) => {
  if (passEmail === "") LoginPOM.emailField();
  else LoginPOM.emailField().type(passEmail);

  if (passPassword === "") LoginPOM.passwordField();
  else LoginPOM.passwordField().type(passPassword);

  LoginPOM.loginButtoninside().click();
};
