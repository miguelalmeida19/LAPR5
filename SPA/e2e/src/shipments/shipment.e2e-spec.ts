import {
  browser,
  element,
  by,
  ElementFinder,
  ElementArrayFinder
} from 'protractor';
import {By} from "selenium-webdriver";

const targetShipment = {
  shipmentId: "S01",
  truckId: "GF-00-IS",
  toBeDeliveredDay: 16,
  toBeDeliveredMonth: 5,
  toBeDeliveredYear: 2023
};

const newShipment = {
  shipmentId: "S02",
  truckId: "GF-27-IS",
  toBeDeliveredDay: 13,
  toBeDeliveredMonth: 7,
  toBeDeliveredYear: 2023
};

const truckIdAppend = "GF-90-PP";
const newTruckId = truckIdAppend;

class Shipment {
  constructor(
    public shipmentId: string,
    public truckId: string,
    public toBeDeliveredDay: number,
    public toBeDeliveredMonth: number,
    public toBeDeliveredYear: number
  ) {}

  static fromString(s: string): Shipment {
    return new Shipment(
      s.substring(0, s.indexOf(' ')),
      s.slice(s.indexOf(' ') + 1),
      +s.slice(s.indexOf(' ') + 2),
      +s.slice(s.indexOf(' ') + 3),
      +s.slice(s.indexOf(' ') + 4)
    );
  }

  // Shipment from shipment list <li> element.
  static async fromLi(li: ElementFinder): Promise<Shipment> {
    const stringsFromA = await li.getText();
    const strings = stringsFromA.split('\n');
    return {
      shipmentId: strings[0],
      truckId: strings[1],
      toBeDeliveredDay: +strings[2],
      toBeDeliveredMonth: +strings[3],
      toBeDeliveredYear: +strings[4]
    };
  }

  // Shipment id and name from the given detail element.
  static async fromDetail(detail: ElementFinder): Promise<Shipment> {
    const shipmentId = await detail.all(by.css('input-form input')).get(0).getAttribute("placeholder");
    const truckId = await detail.all(by.css('input-form input')).get(1).getAttribute("placeholder");
    const toBeDeliveredDay = await detail.all(by.css('input-form input')).get(2).getAttribute("placeholder");
    const toBeDeliveredMonth = await detail.all(by.css('input-form input')).get(3).getAttribute("placeholder");
    const toBeDeliveredYear = await detail.all(by.css('input-form input')).get(4).getAttribute("placeholder");

    return {
      shipmentId: shipmentId,
      truckId: truckId,
      toBeDeliveredDay: +toBeDeliveredDay,
      toBeDeliveredMonth: +toBeDeliveredMonth,
      toBeDeliveredYear: +toBeDeliveredYear,
    };
  }

}

describe('Shipment tests', () => {

  beforeAll(() => browser.get(''));

  function getPageElts() {
    const navElts = element.all(by.css('.page'));

    return {
      navElts,
      appShipmentsHref: navElts.get(3),
      appShipments: element(by.css('app-root app-shipments')),
      allShipments: element.all(by.css('app-root app-shipments table-component .tab-row')),
      shipmentDetail: element(by.css('app-root app-shipment-detail details-component')),
      updateShipmentButton: element(by.cssContainingText('div button','Save changes'))
    };
  }

  describe('Shipment tests', () => {

    beforeAll(async () => {
      browser.get('https://localhost:4200/')
      await browser.sleep(3000)
      await browser.sleep(3000)
    });

    it('can switch to Shipments view', async () => {
      await getPageElts().appShipmentsHref.click();
      await browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6
      const page = getPageElts();
      expect(await page.appShipments.isPresent()).toBeTruthy();
      expect(await page.allShipments.count()).toEqual(8, 'number of shipments');
    });

    it('can route to shipment details', async () => {
      await getPageElts().appShipmentsHref.click();
      await browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6

      await getShipmentById(targetShipment.shipmentId).click();

      const page = getPageElts();
      expect(await page.shipmentDetail.isPresent()).toBeTruthy('shows shipment detail');
      const shipment = await Shipment.fromDetail(page.shipmentDetail);
      expect(shipment.shipmentId).toEqual(targetShipment.shipmentId);
      expect(shipment.truckId).toEqual(targetShipment.truckId);
      expect(shipment.toBeDeliveredDay).toEqual(targetShipment.toBeDeliveredDay);
      expect(shipment.toBeDeliveredMonth).toEqual(targetShipment.toBeDeliveredMonth);
      expect(shipment.toBeDeliveredYear).toEqual(targetShipment.toBeDeliveredYear);
    });

    it(`updates Shipment (${targetShipment.shipmentId}) truckId (${newTruckId}) in shipment details view`,
      updateShipmentTruckIdInDetailView);

    it(`shows ${targetShipment.shipmentId} in Shipments list`, async () => {
      const page = getPageElts();
      page.updateShipmentButton.click();
      await browser.waitForAngular();
      await browser.waitForAngular();
      await browser.waitForAngular();
      await browser.waitForAngular();
      const expectedText = +`${newTruckId}`;
      expect(+(await getShipmentById(targetShipment.shipmentId).all(by.css(".col")).get(2).getText())).toEqual(expectedText);
    });

    it(`adds new Shipment`, async () => {
      const shipmentsBefore = await toShipmentArray(getPageElts().allShipments);
      const numShipments = shipmentsBefore.length;

      await addNewShipment();
      const page = getPageElts();
      const shipmentsAfter = await toShipmentArray(page.allShipments);

      expect(shipmentsAfter.length).toEqual(numShipments + 1, 'number of shipments');
      expect(shipmentsAfter.slice(0, numShipments)).toEqual(shipmentsBefore, 'Old Shipments still there');
    });

    it('can paginate shipments', async () => {
      await browser.findElement(By.css('#shipments')).click()
      await browser.sleep(1000)
      let currentPageNumber = await browser.findElement(By.css('body > app-root > app-shipments > table-component > div > nav > ul > li:nth-child(3) > a')).getText()
      let currentPageClasses = await browser.findElement(By.css('body > app-root > app-shipments > table-component > div > nav > ul > li:nth-child(3) > a')).getCssValue('class')
      // Check that the current page is 1
      expect(Number(currentPageNumber)).toEqual(1, 'current page');
      browser.executeScript("window.scrollTo(0, 900);")
      await browser.sleep(2000)
      await browser.findElement(By.css('body > app-root > app-shipments > table-component > div > nav > ul > li:nth-child(4) > a')).click()
      await browser.sleep(2000)
      const page = getPageElts();
      expect(await page.allShipments.count()).toEqual(3, 'number of shipments');
    });


    it('can change how many shipments to show per page', async () => {
      browser.executeScript("window.scrollTo(900, 0);")
      await browser.sleep(2000)
      await browser.findElement(By.css('#shipments')).click()
      await browser.sleep(1000)
      const page = getPageElts();
      expect(await page.allShipments.count()).toEqual(5, 'number of shipments');
      browser.executeScript("window.scrollTo(0, 900);")
      await browser.sleep(2000)
      await browser.findElement(By.css('body > app-root > app-shipments > table-component > div > nav > ul > div > select')).click()
      await browser.sleep(500)
      await browser.findElement(By.css('body > app-root > app-shipments > table-component > div > nav > ul > div > select > option:nth-child(2)')).click()
      await browser.sleep(2000)
      expect(await page.allShipments.count()).toEqual(8, 'number of shipments');
    });

  });

  async function updateShipmentTruckIdInDetailView() {
    // Assumes that the current view is the shipment details view.
    await addToShipmentTruckId(truckIdAppend);

    const page = getPageElts();
    const shipment = await Shipment.fromDetail(page.shipmentDetail);

    expect(shipment.shipmentId).toEqual(targetShipment.shipmentId);
    expect(shipment.truckId).toEqual(newTruckId);
    expect(shipment.toBeDeliveredDay).toEqual(targetShipment.toBeDeliveredDay);
    expect(shipment.toBeDeliveredMonth).toEqual(targetShipment.toBeDeliveredMonth);
    expect(shipment.toBeDeliveredYear).toEqual(targetShipment.toBeDeliveredYear);
  }

});

async function addNewShipment(): Promise<void>{
  await element(by.css('header-add .add-button')).click();
  await browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6
  await browser.sleep(2000);

  // ShipmentId
  await element.all(by.css("add-dialog .form-control")).get(0).clear();
  await element.all(by.css("add-dialog .form-control")).get(0).sendKeys(newShipment.shipmentId);

  // TruckId
  await element.all(by.css("add-dialog .form-control")).get(1).clear();
  await element.all(by.css("add-dialog .form-control")).get(1).sendKeys(newShipment.truckId);

  // toBeDeliveredDay
  await element.all(by.css("add-dialog .form-control")).get(2).clear();
  await element.all(by.css("add-dialog .form-control")).get(2).sendKeys(newShipment.toBeDeliveredDay);

  // toBeDeliveredMonth
  await element.all(by.css("add-dialog .form-control")).get(3).clear();
  await element.all(by.css("add-dialog .form-control")).get(3).sendKeys(newShipment.toBeDeliveredMonth);

  // toBeDeliveredYear
  await element.all(by.css("add-dialog .form-control")).get(4).clear();
  await element.all(by.css("add-dialog .form-control")).get(4).sendKeys(newShipment.toBeDeliveredYear);

  await element(by.css('add-dialog .submit')).click();
}

async function addToShipmentTruckId(value: string): Promise<void> {
  const input = element.all(by.css('input-form input')).get(1);
  await input.clear();
  await input.sendKeys(value);
}

function getShipmentById(shipmentId: string): ElementFinder {
  return element(by.cssContainingText('.tab-row', shipmentId.toString()));
}

async function toShipmentArray(allShipments: ElementArrayFinder): Promise<Shipment[]> {
  return allShipments.map(shipment => Shipment.fromLi(shipment!));
}
