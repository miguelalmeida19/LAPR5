import { browser, element, by, ElementFinder, ElementArrayFinder } from 'protractor';

const expectedWelcomeMessage = 'Good morning, Yev';
const expectedWelcomeTip = 'You can follow all new data here';
const expectedTitle = 'Dashboard';
const targeTruckObject = { id: 'GF-27-IS' };
const targeTruckObjectDashboardIndex = 2;

describe('Initial page tests', () => {

  beforeAll(() => browser.get(''));

  function getPageElts() {
    const navElts = element.all(by.css('.page'));

    return {
      navElts,

      appDashboardHref: navElts.get(0),
      appDashboard: element(by.css('app-root app-dashboard')),
      someTrucks: element.all(by.css('.some-trucks')),
      seeMore: element.all(by.css('.see-more')),
      numberOfTrucks: element(by.css('#number-of-trucks')),
      numberOfPaths: element(by.css('#number-of-paths')),
      numberOfWarehouses: element(by.css('#number-of-warehouses')),
      numberOfDeliveries: element(by.css('#number-of-deliveries')),
      loginDropdown: element(by.css('.dropdown-menu')),
      loginDropdownItems: element.all(by.css('.dropdown-item')),

      trucksTitle: element(by.css('app-root app-trucks header-add div div span'))
    };
  }

  describe('Initial page', () => {

    it(`has title '${expectedTitle}'`, async () => {
      expect(await browser.getTitle()).toEqual(expectedTitle);
    });

    it(`has welcome message '${expectedWelcomeMessage}'`, async () => {
      await expectHeading('welcome-message', expectedWelcomeMessage);
    });

    it(`has welcome tip '${expectedWelcomeTip}'`, async () => {
      await expectHeading('welcome-secondary-message', expectedWelcomeTip);
    });

    const expectedViewNames = ['Dashboard', 'Trucks','Warehouses','Paths','Deliveries','Network'];
    it(`has views ${expectedViewNames}`, async () => {
      const viewNames = await getPageElts().navElts.map(el => el!.getText());
      expect(viewNames).toEqual(expectedViewNames);
    });

    it('has dashboard as the active view', async () => {
      const page = getPageElts();
      expect(await page.appDashboard.isPresent()).toBeTruthy();
    });

  });

  describe('Dashboard tests', () => {

    beforeAll(() => browser.get(''));

    it('has some trucks', async () => {
      const page = getPageElts();
      expect(await page.someTrucks.count()).toEqual(3);
    });

    it(`selects See more and routes to Trucks`, dashboardSelectSeeMore);
  });

  async function dashboardSelectSeeMore() {
    const targetTruck = getPageElts().someTrucks.get(targeTruckObjectDashboardIndex);
    expect(await targetTruck.getText()).toEqual(targeTruckObject.id);
    await getPageElts().seeMore.click();
    await browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6

    const page = getPageElts();
    expect(await page.trucksTitle.isPresent()).toBeTruthy('shows trucks page');
  }

});


async function expectHeading(id: string, expectedText: string): Promise<void> {
  const hText = await element(by.id(id)).getText();
  expect(hText).toEqual(expectedText);
}
