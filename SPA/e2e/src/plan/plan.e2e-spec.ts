import { browser, element, by, ElementFinder, ElementArrayFinder } from 'protractor';
import {By, WebDriver} from "selenium-webdriver";


describe('Plan tests', () => {

  function getPageElts() {
    const navElts = element.all(by.css('.page'));

    return {
      navElts,

      appPlansHref: navElts.get(4),
      appPlans: element(by.css('app-root app-plan')),

    };
  }

  beforeAll(async () => {
    browser.get('https://localhost:4200/')
    await browser.sleep(3000)
  });

  it('can switch to Plans view', async () => {
    await getPageElts().appPlansHref.click();
    await browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6
    await browser.sleep(3000)
    const page = getPageElts();
    expect(await page.appPlans.isPresent()).toBeTruthy();
  });

  it('can load a plan', async () => {
    await browser.findElement(By.css('body > app-root > app-plan > div > div > button.col-md-5.me-3.btn.btn-outline-info.fw-bold.text-center.rounded-pill.p-4.fs-2')).click()
    await browser.sleep(3000)
    let numberOfTrucks = await browser.findElement(By.xpath('/html/body/app-root/app-plan/div/div[2]/div[1]')).findElements(By.className('truck'))
    expect(numberOfTrucks.length).toEqual(5)
  });

  it('shows a text with the number of trucks that will be necessary for the plan', async () => {
    await browser.sleep(1000)
    expect( await browser.findElement(By.css('body > app-root > app-plan > div > div:nth-child(4) > span:nth-child(2)')).getText()).toEqual("There will be necessary 5 Trucks to complete all the deliveries.")
  });

  it('can generate different maps', async () => {
    await browser.sleep(1000)
    browser.executeScript("window.scrollTo(0, 800);")
    await browser.sleep(2000)
    await browser.findElement(By.css('body > app-root > app-plan > div > div:nth-child(4) > div.p-4.bg-info.mt-4.mb-4.rounded-5 > div > div.bg-white.p-4.rounded-5.col.me-2.d-flex.flex-column.text-center > button:nth-child(3)')).click()
    await browser.sleep(1000)
    await browser.findElement(By.css('body > app-root > app-plan > div > div:nth-child(4) > div.p-4.bg-info.mt-4.mb-4.rounded-5 > div > div.bg-white.p-4.rounded-5.col.me-2.d-flex.flex-column.text-center > button:nth-child(4)')).click()
    await browser.sleep(1000)
    await browser.findElement(By.css('body > app-root > app-plan > div > div:nth-child(4) > div.p-4.bg-info.mt-4.mb-4.rounded-5 > div > div.bg-white.p-4.rounded-5.col.me-2.d-flex.flex-column.text-center > button:nth-child(5)')).click()
    await browser.sleep(1000)
  });

  it('can type the parameters and obtain a time', async () => {
    browser.executeScript("window.scrollTo(800, 1000);")
    await browser.sleep(2000)
    for (let i=0; i<5; i++){
      await browser.findElement(By.css('body > app-root > app-plan > div > div:nth-child(4) > div.p-4.d-flex.justify-content-center.flex-column.align-items-center > div:nth-child(2) > input')).sendKeys(1)
      await browser.findElement(By.css('body > app-root > app-plan > div > div:nth-child(4) > div.p-4.d-flex.justify-content-center.flex-column.align-items-center > div:nth-child(3) > input')).sendKeys(1)
      await browser.findElement(By.css('body > app-root > app-plan > div > div:nth-child(4) > div.p-4.d-flex.justify-content-center.flex-column.align-items-center > div:nth-child(4) > input')).sendKeys(0)
      await browser.findElement(By.css('body > app-root > app-plan > div > div:nth-child(4) > div.p-4.d-flex.justify-content-center.flex-column.align-items-center > div:nth-child(5) > input')).sendKeys(0)
      await browser.sleep(2000)
      browser.executeScript("window.scrollTo(1000, 1400);")
      await browser.sleep(2000)
      await browser.findElement(By.xpath('/html/body/app-root/app-plan/div/div[2]/div[3]/div[6]/button')).click()
      await browser.sleep(500)
    }
    await browser.sleep(2000)
    expect(await browser.findElement(By.css('body > app-root > app-plan > div > div:nth-child(4) > span:nth-child(5)')).isDisplayed()).toBeTruthy()
  });

  it('can load a simulated plan', async () => {
    await browser.get('https://localhost:4200/deliveryPlan')
    await browser.sleep(2000)
    await browser.findElement(By.xpath('/html/body/app-root/app-plan/div/div[1]/button[2]')).click()
    await browser.sleep(3000)
    let numberOfTrucks = await browser.findElement(By.xpath('/html/body/app-root/app-plan/div/div[2]/div[1]')).findElements(By.className('truck'))
    expect(numberOfTrucks.length).toBeGreaterThanOrEqual(3)
  });

  it('can generate different maps', async () => {
    await browser.sleep(1000)
    browser.executeScript("window.scrollTo(0, 800);")
    await browser.sleep(2000)
    await browser.findElement(By.css('body > app-root > app-plan > div > div:nth-child(4) > div.p-4.bg-info.mt-4.mb-4.rounded-5 > div > div.bg-white.p-4.rounded-5.col.me-2.d-flex.flex-column.text-center > button:nth-child(3)')).click()
    await browser.sleep(1000)
    await browser.findElement(By.css('body > app-root > app-plan > div > div:nth-child(4) > div.p-4.bg-info.mt-4.mb-4.rounded-5 > div > div.bg-white.p-4.rounded-5.col.me-2.d-flex.flex-column.text-center > button:nth-child(4)')).click()
    await browser.sleep(1000)
    await browser.findElement(By.css('body > app-root > app-plan > div > div:nth-child(4) > div.p-4.bg-info.mt-4.mb-4.rounded-5 > div > div.bg-white.p-4.rounded-5.col.me-2.d-flex.flex-column.text-center > button:nth-child(5)')).click()
    await browser.sleep(1000)
  });

  it('can obtain a final message with the lowest time', async () => {
    browser.executeScript("window.scrollTo(800, 1800);")
    await browser.sleep(1000)
    expect(await browser.findElement(By.css('body > app-root > app-plan > div > div:nth-child(4) > span:nth-child(5)')).isDisplayed()).toBeTruthy()
  });
});
