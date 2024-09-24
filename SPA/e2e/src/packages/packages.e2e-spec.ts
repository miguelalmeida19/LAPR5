import {
  browser,
  element,
  by,
  ElementFinder,
  ElementArrayFinder
} from 'protractor';
import {By} from "selenium-webdriver";

const targetPackage = {
  packageId: "P01",
  xCoordinate: 10,
  yCoordinate: 11,
  zCoordinate: 12,
  shipmentId: "S01",
  deliveryId: "D01",
  pathId: "P01"
};

const newPackage = {
  packageId: "P02",
  xCoordinate: 11,
  yCoordinate: 12,
  zCoordinate: 13,
  shipmentId: "S02",
  deliveryId: "D02",
  pathId: "P02"
};

const shipmentIdAppend = "S10";
const newShipmentId = shipmentIdAppend;

class Package {
  constructor(
    public packageId: string,
    public xCoordinate: number,
    public yCoordinate: number,
    public zCoordinate: number,
    public shipmentId: string,
    public deliveryId: string,
    public pathId: string
  ) {}

  static fromString(s: string): Package {
    return new Package(
      s.substring(0, s.indexOf(' ')),
        +s.slice(s.indexOf(' ') + 1),
        +s.slice(s.indexOf(' ') + 2),
        +s.slice(s.indexOf(' ') + 3),
        s.slice(s.indexOf(' ') + 4),
        s.slice(s.indexOf(' ') + 5),
        s.slice(s.indexOf(' ') + 6)
    );
  }

  // Package from package list <li> element.
  static async fromLi(li: ElementFinder): Promise<Package> {
    const stringsFromA = await li.getText();
    const strings = stringsFromA.split('\n');
    return {
      packageId: strings[0],
      xCoordinate: +strings[1],
      yCoordinate: +strings[2],
      zCoordinate: +strings[3],
      shipmentId: strings[4],
      deliveryId: strings[5],
      pathId: strings[6]
    };
  }

  // Package id and name from the given detail element.
  static async fromDetail(detail: ElementFinder): Promise<Package> {
    const packageId = await detail.all(by.css('input-form input')).get(0).getAttribute("placeholder");
    const xCoordinate = await detail.all(by.css('input-form input')).get(1).getAttribute("placeholder");
    const yCoordinate = await detail.all(by.css('input-form input')).get(2).getAttribute("placeholder");
    const zCoordinate = await detail.all(by.css('input-form input')).get(3).getAttribute("placeholder");
    const shipmentId = await detail.all(by.css('input-form input')).get(4).getAttribute("placeholder");
    const deliveryId = await detail.all(by.css('input-form input')).get(5).getAttribute("placeholder");
    const pathId = await detail.all(by.css('input-form input')).get(6).getAttribute("placeholder");

    return {
      packageId: packageId,
      xCoordinate: +xCoordinate,
      yCoordinate: +yCoordinate,
      zCoordinate: +zCoordinate,
      shipmentId: shipmentId,
      deliveryId: deliveryId,
      pathId: pathId
    };
  }

}

describe('Package tests', () => {
  beforeAll(() => browser.get(''));

  function getPageElts() {
    const navElts = element.all(by.css('.page'));

    return {
      navElts,
      appPackagesHref: navElts.get(3),
      appPackages: element(by.css('app-root app-packages')),
      allPackages: element.all(by.css('app-root app-packages table-component .tab-row')),
      packageDetail: element(by.css('app-root app-package-detail details-component')),
      updatePackageButton: element(by.cssContainingText('div button','Save changes'))
    };
  }

  describe('Package tests', () => {
    beforeAll(() => browser.get(''));

    it('can switch to Packages view', async () => {
      await getPageElts().appPackagesHref.click();
      await browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6
      const page = getPageElts();
      expect(await page.appPackages.isPresent()).toBeTruthy();
      expect(await page.allPackages.count()).toEqual(4, 'number of packages');
    });

    it('can route to package details', async () => {
      await getPageElts().appPackagesHref.click();
      await browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6

      await getPackageById(targetPackage.packageId).click();

      const page = getPageElts();
      expect(await page.packageDetail.isPresent()).toBeTruthy('shows package detail');
      const p = await Package.fromDetail(page.packageDetail);
      expect(p.packageId).toEqual(targetPackage.packageId);
      expect(p.xCoordinate).toEqual(targetPackage.xCoordinate);
      expect(p.yCoordinate).toEqual(targetPackage.yCoordinate);
      expect(p.zCoordinate).toEqual(targetPackage.zCoordinate);
      expect(p.shipmentId).toEqual(targetPackage.shipmentId);
      expect(p.deliveryId).toEqual(targetPackage.deliveryId);
      expect(p.pathId).toEqual(targetPackage.pathId);
    });

    it(`updates Package (${targetPackage.packageId}) packageId (${newShipmentId}) in package details view`,
      updatePackageShipmentIdInDetailView);

    it(`shows ${targetPackage.packageId} in Packages list`, async () => {
      const page = getPageElts();
      page.updatePackageButton.click();
      await browser.waitForAngular();
      await browser.waitForAngular();
      await browser.waitForAngular();
      await browser.waitForAngular();
      const expectedText = +`${newShipmentId}`;
      expect(+(await getPackageById(targetPackage.packageId).all(by.css(".col")).get(4).getText())).toEqual(expectedText);
    });

    it(`adds new Package`, async () => {
      const packagesBefore = await toPackageArray(getPageElts().allPackages);
      const numPackages = packagesBefore.length;

      await addNewPackage();
      const page = getPageElts();
      const packagesAfter = await toPackageArray(page.allPackages);

      expect(packagesAfter.length).toEqual(numPackages + 1, 'number of packages');
      expect(packagesAfter.slice(0, numPackages)).toEqual(packagesBefore, 'Old Packages still there');
    });

    it('can paginate packages', async () => {
      await browser.findElement(By.css('#packages')).click()
      await browser.sleep(1000)
      let currentPageNumber = await browser.findElement(By.css('body > app-root > app-packages > table-component > div > nav > ul > li:nth-child(3) > a')).getText()
      let currentPageClasses = await browser.findElement(By.css('body > app-root > app-packages > table-component > div > nav > ul > li:nth-child(3) > a')).getCssValue('class')
      // Check that the current page is 1
      expect(Number(currentPageNumber)).toEqual(1, 'current page');
      browser.executeScript("window.scrollTo(0, 900);")
      await browser.sleep(2000)
      await browser.findElement(By.css('body > app-root > app-packages > table-component > div > nav > ul > li:nth-child(4) > a')).click()
      await browser.sleep(2000)
      const page = getPageElts();
      expect(await page.allPackages.count()).toEqual(3, 'number of packages');
    });

    it('can change how many packages to show per page', async () => {
      browser.executeScript("window.scrollTo(900, 0);")
      await browser.sleep(2000)
      await browser.findElement(By.css('#packages')).click()
      await browser.sleep(1000)
      const page = getPageElts();
      expect(await page.allPackages.count()).toEqual(5, 'number of shipments');
      browser.executeScript("window.scrollTo(0, 900);")
      await browser.sleep(2000)
      await browser.findElement(By.css('body > app-root > app-packages > table-component > div > nav > ul > div > select')).click()
      await browser.sleep(500)
      await browser.findElement(By.css('body > app-root > app-packages > table-component > div > nav > ul > div > select > option:nth-child(2)')).click()
      await browser.sleep(2000)
      expect(await page.allPackages.count()).toEqual(8, 'number of packages');
    });

  });

  async function updatePackageShipmentIdInDetailView() {
    // Assumes that the current view is the path details view.
    await addToPackageShipmentId(shipmentIdAppend);

    const page = getPageElts();
    const p = await Package.fromDetail(page.packageDetail);

    expect(p.packageId).toEqual(targetPackage.packageId);
    expect(p.xCoordinate).toEqual(targetPackage.xCoordinate);
    expect(p.yCoordinate).toEqual(targetPackage.yCoordinate);
    expect(p.zCoordinate).toEqual(targetPackage.zCoordinate);
    expect(p.shipmentId).toEqual(newShipmentId);
    expect(p.deliveryId).toEqual(targetPackage.deliveryId);
    expect(p.pathId).toEqual(targetPackage.pathId);
  }

});

async function addNewPackage(): Promise<void>{
  await element(by.css('header-add .add-button')).click();
  await browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6
  await browser.sleep(2000);

  // PackageId
  await element.all(by.css("add-dialog .form-control")).get(0).clear();
  await element.all(by.css("add-dialog .form-control")).get(0).sendKeys(newPackage.packageId);

  // xCoordinate
  await element.all(by.css("add-dialog .form-control")).get(1).clear();
  await element.all(by.css("add-dialog .form-control")).get(1).sendKeys(newPackage.xCoordinate);

  // yCoordinate
  await element.all(by.css("add-dialog .form-control")).get(2).clear();
  await element.all(by.css("add-dialog .form-control")).get(2).sendKeys(newPackage.yCoordinate);

  // zCoordinate
  await element.all(by.css("add-dialog .form-control")).get(3).clear();
  await element.all(by.css("add-dialog .form-control")).get(3).sendKeys(newPackage.zCoordinate);

  // ShipmentId
  await element.all(by.css("add-dialog .form-control")).get(4).clear();
  await element.all(by.css("add-dialog .form-control")).get(4).sendKeys(newPackage.shipmentId);

  // DeliveryId
  await element.all(by.css("add-dialog .form-control")).get(5).clear();
  await element.all(by.css("add-dialog .form-control")).get(5).sendKeys(newPackage.deliveryId);

  // PathId
  await element.all(by.css("add-dialog .form-control")).get(6).clear();
  await element.all(by.css("add-dialog .form-control")).get(6).sendKeys(newPackage.pathId);

  await element(by.css('add-dialog .submit')).click();
}

async function addToPackageShipmentId(value: string): Promise<void> {
  const input = element.all(by.css('input-form input')).get(4);
  await input.clear();
  await input.sendKeys(value);
}

function getPackageById(packageId: string): ElementFinder {
  return element(by.cssContainingText('.tab-row', packageId.toString()));
}

async function toPackageArray(allPackages: ElementArrayFinder): Promise<Package[]> {
  return allPackages.map(p => Package.fromLi(p!));
}
