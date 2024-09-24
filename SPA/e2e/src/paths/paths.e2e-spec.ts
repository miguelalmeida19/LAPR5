import { browser, element, by, ElementFinder, ElementArrayFinder } from 'protractor';
import {By, WebDriver} from "selenium-webdriver";

const targetPath = {
  id: "d7fcb590-b55d-4e3c-9a15-cb3da619eda3",
  departureWarehouse: "001",
  arrivalWarehouse: "002",
  distance: 100,
  duration: 22,
  consumedEnergy: 50 };
const newPath = {
  id: "",
  departureWarehouse: "003",
  arrivalWarehouse: "001",
  distance: 20,
  duration: 30,
  consumedEnergy: 50 };
const distanceAppend = 104;
const newPathDistance = distanceAppend;

class Path {
  constructor(public id:string, public departureWarehouse: string, public arrivalWarehouse: string,
              public distance: number, public duration: number,
              public consumedEnergy: number) {}
  // Factory methods

  // Path from string formatted as '<departureWarehouse> <arrivalWarehouse> <distance> <duration> <consumedEnergy>'.
  static fromString(s: string): Path {
    return new Path(
      s.substring(0, s.indexOf(' ')),
      s.slice(s.indexOf(' ') + 1),
      s.slice(s.indexOf(' ') + 2),
      +s.slice(s.indexOf(' ') + 3),
      +s.slice(s.indexOf(' ') + 4),
      +s.slice(s.indexOf(' ') + 5),
    );
  }

  // Path from path list <li> element.
  static async fromLi(li: ElementFinder): Promise<Path> {
    const stringsFromA = await li.getText();
    const strings = stringsFromA[0].split('\n');
    return {
      id: strings[0], departureWarehouse: strings[1],
      arrivalWarehouse: strings[2], distance: +strings[3],
      duration: +strings[4], consumedEnergy: +strings[5]
    };
  }

  // Path id and name from the given detail element.
  static async fromDetail(detail: ElementFinder): Promise<Path> {
    // Get path id
    const id = await detail.all(by.css('input-form input')).get(0).getAttribute("placeholder")
    // Get departureWarehouse
    const departureWarehouse = await detail.all(by.css('input-form input')).get(1).getAttribute("placeholder")
    // Get arrivalWarehouse
    const arrivalWarehouse = await detail.all(by.css('input-form input')).get(2).getAttribute("placeholder")
    // Get distance
    const distance = await detail.all(by.css('input-form input')).get(3).getAttribute("placeholder")
    // Get duration
    const duration = await detail.all(by.css('input-form input')).get(4).getAttribute("placeholder")
    // Get consumedEnergy
    const consumedEnergy = await detail.all(by.css('input-form input')).get(5).getAttribute("placeholder")

    return {
      id: id,
      departureWarehouse: departureWarehouse,
      arrivalWarehouse: arrivalWarehouse,
      distance: +distance,
      duration: +duration,
      consumedEnergy: +consumedEnergy,
    };
  }
}

describe('Path tests', () => {

  function getPageElts() {
    const navElts = element.all(by.css('.page'));

    return {
      navElts,

      appPathsHref: navElts.get(3),
      appPaths: element(by.css('app-root app-paths')),
      allPaths: element.all(by.css('app-root app-paths table-component .tab-row')),

      pathDetail: element(by.css('app-root app-path-detail details-component')),

      updatePathButton: element(by.cssContainingText('div button','Save changes'))

    };
  }

  describe('Path tests', () => {

    beforeAll(async () => {
      browser.get('https://localhost:4200/')
      await browser.sleep(3000)
      await browser.sleep(3000)
    });

    it('can switch to Paths view', async () => {
      await getPageElts().appPathsHref.click();
      await browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6
      const page = getPageElts();
      expect(await page.appPaths.isPresent()).toBeTruthy();
      expect(await page.allPaths.count()).toEqual(5, 'number of paths');
    });

    it('can route to path details', async () => {
      await browser.findElement(By.css('#paths')).click()
      await browser.sleep(1000)
      await browser.findElement(By.xpath('/html/body/app-root/app-paths/table-component/div/div[3]/div[2]')).click()
      await browser.sleep(1000)
      const page = getPageElts();
      expect(await page.pathDetail.isPresent()).toBeTruthy()
      const path = await Path.fromDetail(page.pathDetail);
      expect(path.id).toEqual(targetPath.id);
      expect(path.departureWarehouse).toEqual(targetPath.departureWarehouse);
      expect(path.arrivalWarehouse).toEqual(targetPath.arrivalWarehouse);
      expect(path.distance).toEqual(targetPath.distance);
      expect(path.duration).toEqual(targetPath.duration);
      expect(path.consumedEnergy).toEqual(targetPath.consumedEnergy);
    });

    it(`updates Path (${targetPath.id}) distance (${newPathDistance}) in path details view`, updatePathDistanceInDetailView);

    it(`shows ${targetPath.id} in Paths list`, async () => {
      const page = getPageElts();
      page.updatePathButton.click();
      await browser.waitForAngular();
      await browser.waitForAngular();
      await browser.waitForAngular();
      await browser.waitForAngular();
      const expectedText = +`${newPathDistance}`;
      expect(+(await getPathById(targetPath.id).all(by.css(".col")).get(3).getText())).toEqual(expectedText);
    });

    it(`adds new Path`, async () => {
      const pathsBefore = await toPathArray(getPageElts().allPaths);
      const numPaths = pathsBefore.length;

      await addNewPath()
      const page = getPageElts();
      const heroesAfter = await toPathArray(page.allPaths);
      expect(heroesAfter.length).toEqual(numPaths + 1, 'number of paths');

      expect(heroesAfter.slice(0, numPaths)).toEqual(pathsBefore, 'Old paths are still there');
    });

    it('can paginate paths', async () => {
      await browser.findElement(By.css('#paths')).click()
      await browser.sleep(1000)
      let currentPageNumber = await browser.findElement(By.css('body > app-root > app-paths > table-component > div > nav > ul > li:nth-child(3) > a')).getText()
      let currentPageClasses = await browser.findElement(By.css('body > app-root > app-paths > table-component > div > nav > ul > li:nth-child(3) > a')).getCssValue('class')
      // Check that the current page is 1
      expect(Number(currentPageNumber)).toEqual(1, 'current page');
      browser.executeScript("window.scrollTo(0, 900);")
      await browser.sleep(2000)
      await browser.findElement(By.css('body > app-root > app-paths > table-component > div > nav > ul > li:nth-child(4) > a')).click()
      await browser.sleep(2000)
      const page = getPageElts();
      expect(await page.allPaths.count()).toEqual(3, 'number of paths');
    });


    it('can change how many paths to show per page', async () => {
      browser.executeScript("window.scrollTo(900, 0);")
      await browser.sleep(2000)
      await browser.findElement(By.css('#paths')).click()
      await browser.sleep(1000)
      const page = getPageElts();
      expect(await page.allPaths.count()).toEqual(5, 'number of paths');
      browser.executeScript("window.scrollTo(0, 900);")
      await browser.sleep(2000)
      await browser.findElement(By.css('body > app-root > app-paths > table-component > div > nav > ul > div > select')).click()
      await browser.sleep(500)
      await browser.findElement(By.css('body > app-root > app-paths > table-component > div > nav > ul > div > select > option:nth-child(2)')).click()
      await browser.sleep(2000)
      expect(await page.allPaths.count()).toEqual(8, 'number of paths');
    });

  });

  async function updatePathDistanceInDetailView() {
    // Assumes that the current view is the path details view.
    await addToPathDistance(distanceAppend);

    const page = getPageElts();

    const path = await Path.fromDetail(page.pathDetail);

    expect(path.id).toEqual(targetPath.id);
    expect(path.departureWarehouse).toEqual(targetPath.departureWarehouse);
    expect(path.arrivalWarehouse).toEqual(targetPath.arrivalWarehouse);
    expect(path.distance).toEqual(newPathDistance);
    expect(path.duration).toEqual(targetPath.duration);
    expect(path.consumedEnergy).toEqual(targetPath.consumedEnergy);
  }

});

async function addNewPath(): Promise<void>{
  await element(by.css('header-add .add-button')).click()
  await browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6
  await browser.sleep(2000)

  // Departure Warehouse
  await element.all(by.css("add-dialog .form-control")).get(0).clear()
  await element.all(by.css("add-dialog .form-control")).get(0).sendKeys(newPath.departureWarehouse)

  // Arrival Warehouse
  await element.all(by.css("add-dialog .form-control")).get(1).clear()
  await element.all(by.css("add-dialog .form-control")).get(1).sendKeys(newPath.arrivalWarehouse)

  // Distance
  await element.all(by.css("add-dialog .form-control")).get(2).clear()
  await element.all(by.css("add-dialog .form-control")).get(2).sendKeys(newPath.distance)

  // Duration
  await element.all(by.css("add-dialog .form-control")).get(3).clear()
  await element.all(by.css("add-dialog .form-control")).get(3).sendKeys(newPath.duration)

  // Consumed energy
  await element.all(by.css("add-dialog .form-control")).get(4).clear()
  await element.all(by.css("add-dialog .form-control")).get(4).sendKeys(newPath.consumedEnergy)

  await element(by.css('add-dialog .submit')).click()
}

async function addToPathDistance(num: number): Promise<void> {
  const input = element.all(by.css('input-form input')).get(3);
  await input.clear()
  await input.sendKeys(num);
}

function getPathById(id: string): ElementFinder {
  return element(by.cssContainingText('.tab-row', id.toString()));
}

async function toPathArray(allPaths: ElementArrayFinder): Promise<Path[]> {
  return allPaths.map(path => Path.fromLi(path!));
}
