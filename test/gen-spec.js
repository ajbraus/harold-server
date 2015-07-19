/*
 * TESTS - PROTRACTOR 
 */

 // HERE ARE YOUR PROTRACTOR TESTS
 // TO RUN THEM RUN THE FOLLOWING IN THE TERMINAL
 // $ webdriver-manager start 
 // $ protractor test/conf.js
describe("Harold", function() {
  beforeEach(function() {
    browser.get('http://localhost:1337/');
  });

  describe('Home Page', function() {
    it('should always have the correct title', function() {
      expect(browser.getTitle()).toEqual('Harold');
    });
    it('should not show the menu dropdown if not logged in', function() {
      var menu = element(by.css('#menu-dropdown'))
      expect(menu.isDisplayed()).toBeFalsy();
    })  
  });

  describe('Auth', function() {
    beforeEach(function() {
      
    })

    it('after login, should see dropdown menu caret', function() {  
      login();
      // expect(element(by.model('user').toBeTruthy))
    });  
  });

  // describe('Edit Profile', function() {
  //   it('should update', function() {
  //     browser.get('http://localhost:1337/profile/edit');
  //     expect(browser.getTitle()).toEqual('Harold');
  //   });
  // });
})

// HELPERS

var login = function() {
  element(by.css('#login-link')).click()
  var emailInput = element(by.model('login_user.email'));
  var pwInput = element(by.model('login_user.password'));
  var loginButton = element(by.css('.loginmodal-submit'));

  browser.wait(function() {
    return loginButton.isPresent().then(function() {
      emailInput.sendKeys('test@seven.com');
      pwInput.sendKeys('password');
      loginButton.click()
    });
  }, 1000);
}