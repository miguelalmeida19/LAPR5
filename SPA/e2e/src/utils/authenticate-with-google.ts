import {By, WebDriver} from "selenium-webdriver";
import {browser} from "protractor";


export async function authenticateWithGoogle(driver: WebDriver) {
  // create a new Chrome browser
  console.log("Doing login in Google SSO")

  // wait for the email field to be displayed
  await browser.sleep(2000)

  // enter your email address
  await driver.findElement(By.id('identifierId')).sendKeys('paulo.eletricgo@gmail.com');

  // click the "Next" button
  await driver.findElement(By.id('identifierNext')).click();

  // wait for the password field to be displayed
  await browser.sleep(15000)

  // enter your password
  await driver.findElement(By.name('password')).sendKeys('pauferreira-eletricgo');

  // click the "Next" button
  await driver.findElement(By.id('passwordNext')).click();

  // wait for the login process to complete
  await browser.sleep(5000)
}
