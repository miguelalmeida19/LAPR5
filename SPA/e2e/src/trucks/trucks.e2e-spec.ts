import { browser, element, by, ElementFinder, ElementArrayFinder } from 'protractor';
import {By} from "selenium-webdriver";

const targetTruck = {
  truckId: "CF-00-IS",
  tare: 129,
  capacity: 346,
  batteryCharge: 1.4,
  autonomy: 20.5,
  rechargeBattery: 123 };
const newTruck = {
  truckId: "BB-22-AA",
  tare: 129,
  capacity: 346,
  batteryCharge: 1.4,
  autonomy: 20.5,
  rechargeBattery: 123  };
const capacityAppend = 350;
const newTruckCapacity = capacityAppend;

class Truck {
  constructor(public truckId:string, public tare: number, public capacity: number,
              public batteryCharge: number, public autonomy: number,
              public rechargeBattery: number) {}
  // Factory methods


  static fromString(s: string): Truck {
    return new Truck(
      s.substring(0, s.indexOf(' ')),
      +s.slice(s.indexOf(' ') + 1),
      +s.slice(s.indexOf(' ') + 2),
      +s.slice(s.indexOf(' ') + 3),
      +s.slice(s.indexOf(' ') + 4),
      +s.slice(s.indexOf(' ') + 5),
    );
  }

  // Truck from truck list <li> element.
  static async fromLi(li: ElementFinder): Promise<Truck> {
    const stringsFromA = await li.getText();
    const strings = stringsFromA.split('\n');
    return {
      truckId: strings[0], tare: +strings[1],
      capacity: +strings[2], batteryCharge: +strings[3],
      autonomy: +strings[4], rechargeBattery: +strings[5]
    };
  }

  // Truck id and name from the given detail element.
  static async fromDetail(detail: ElementFinder): Promise<Truck> {
    // Get truckId
    const truckId = await detail.all(by.css('input-form input')).get(0).getAttribute("placeholder")
    // Get tare
    const tare = await detail.all(by.css('input-form input')).get(1).getAttribute("placeholder")
    // Get capacity
    const capacity = await detail.all(by.css('input-form input')).get(2).getAttribute("placeholder")
    // Get batteryCharge
    const batteryCharge = await detail.all(by.css('input-form input')).get(3).getAttribute("placeholder")
    // Get autonomy
    const autonomy = await detail.all(by.css('input-form input')).get(4).getAttribute("placeholder")
    // Get rechargeBattery
    const rechargeBattery = await detail.all(by.css('input-form input')).get(5).getAttribute("placeholder")

    return {
      truckId: truckId,
      tare: +tare,
      capacity: +capacity,
      batteryCharge: +batteryCharge,
      autonomy: +autonomy,
      rechargeBattery: +rechargeBattery,
    };
  }
}

describe('Truck tests', () => {

  function getPageElts() {
    const navElts = element.all(by.css('.page'));

    return {
      navElts,

      appTrucksHref: navElts.get(1),
      appTrucks: element(by.css('app-root app-trucks')),
      allTrucks: element.all(by.css('app-root app-trucks table-component .tab-row')),

      truckDetail: element(by.css('app-root app-truck-detail details-component')),

      updateTruckButton: element(by.cssContainingText('div button','Save changes'))

    };
  }

  describe('Truck tests', () => {

    beforeAll(async () => {
      browser.get('https://localhost:4200/')
      await browser.sleep(3000)
    });

    it('can switch to Trucks view', async () => {
      await getPageElts().appTrucksHref.click();
      await browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6
      const page = getPageElts();
      expect(await page.appTrucks.isPresent()).toBeTruthy();
      expect(await page.allTrucks.count()).toEqual(4, 'number of trucks');
    });

    it('can route to truck details', async () => {
      await browser.findElement(By.css('#trucks')).click()
      await browser.sleep(1000)
      await browser.findElement(By.xpath('/html/body/app-root/app-trucks/table-component/div/div[3]/div[3]')).click()
      await browser.sleep(1000)
      const page = getPageElts();
      expect(await page.truckDetail.isPresent()).toBeTruthy('shows truck detail');
      const truck = await Truck.fromDetail(page.truckDetail);
      expect(truck.truckId).toEqual(targetTruck.truckId);
      expect(truck.tare).toEqual(targetTruck.tare);
      expect(truck.capacity).toEqual(targetTruck.capacity);
      expect(truck.batteryCharge).toEqual(targetTruck.batteryCharge);
      expect(truck.autonomy).toEqual(targetTruck.autonomy);
      expect(truck.rechargeBattery).toEqual(targetTruck.rechargeBattery);
    });

    it(`updates Truck (${targetTruck.truckId}) capacity (${newTruckCapacity}) in truck details view`, updateTruckCapacityInDetailView);

    it(`shows ${targetTruck.truckId} in Trucks list`, async () => {
      const page = getPageElts();
      page.updateTruckButton.click();
      await browser.waitForAngular();
      await browser.waitForAngular();
      await browser.waitForAngular();
      await browser.waitForAngular();
      const expectedText = +`${newTruckCapacity}`;
      expect(+(await getTruckById(targetTruck.truckId).all(by.css(".col")).get(2).getText())).toEqual(expectedText);
    });

    it(`adds new Truck`, async () => {
      const trucksBefore = await toTruckArray(getPageElts().allTrucks);
      const numTrucks = trucksBefore.length;

      await addNewTruck(numTrucks, trucksBefore)
    });

    it('can deactivate a Truck', async () => {
      await getPageElts().appTrucksHref.click();
      await browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6
      await browser.sleep(2000)
      let checked = await browser.findElement(By.xpath('/html/body/app-root/app-trucks/table-component/div/div[3]/div[7]/div/input')).getAttribute('checked')
      expect(checked).toBeTruthy();
      await browser.findElement(By.xpath('/html/body/app-root/app-trucks/table-component/div/div[3]/div[7]/div/input')).click()
      await browser.sleep(2000)
      checked = await browser.findElement(By.xpath('/html/body/app-root/app-trucks/table-component/div/div[3]/div[7]/div/input')).getAttribute('checked')
      expect(checked).toBeNull();
    });

    it('cannot access Truck details of a deactivated Truck', async () => {
      await getPageElts().appTrucksHref.click();
      await browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6
      await browser.sleep(2000)
      let beforeUrl = browser.getCurrentUrl()
      await browser.findElement(By.xpath('/html/body/app-root/app-trucks/table-component/div/div[3]/div[2]')).click()
      expect(browser.getCurrentUrl()).toEqual(beforeUrl)

    });

  });

  async function updateTruckCapacityInDetailView() {
    // Assumes that the current view is the truck details view.
    await addToTruckCapacity(capacityAppend);

    const page = getPageElts();

    const truck = await Truck.fromDetail(page.truckDetail);

    expect(truck.truckId).toEqual(targetTruck.truckId);
    expect(truck.tare).toEqual(targetTruck.tare);
    expect(truck.capacity).toEqual(newTruckCapacity);
    expect(truck.batteryCharge).toEqual(targetTruck.batteryCharge);
    expect(truck.autonomy).toEqual(targetTruck.autonomy);
    expect(truck.rechargeBattery).toEqual(targetTruck.rechargeBattery);
  }

  async function addNewTruck(numTrucks:number,trucksBefore:Truck[]): Promise<void>{
    await element(by.css('header-add .add-button')).click()
    await browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6
    await browser.sleep(2000)


    // truckId
    await element.all(by.css("add-dialog .form-control")).get(0).clear()
    await element.all(by.css("add-dialog .form-control")).get(0).sendKeys(newTruck.truckId)

    // tare
    await element.all(by.css("add-dialog .form-control")).get(1).clear()
    await element.all(by.css("add-dialog .form-control")).get(1).sendKeys(newTruck.tare)

    // capacity
    await element.all(by.css("add-dialog .form-control")).get(2).clear()
    await element.all(by.css("add-dialog .form-control")).get(2).sendKeys(newTruck.capacity)

    // batteryCharge
    await element.all(by.css("add-dialog .form-control")).get(3).clear()
    await element.all(by.css("add-dialog .form-control")).get(3).sendKeys(newTruck.batteryCharge)

    // autonomy
    await element.all(by.css("add-dialog .form-control")).get(4).clear()
    await element.all(by.css("add-dialog .form-control")).get(4).sendKeys(newTruck.autonomy)

    // rechargeBattery
    await element.all(by.css("add-dialog .form-control")).get(5).clear()
    await element.all(by.css("add-dialog .form-control")).get(5).sendKeys(newTruck.rechargeBattery)

    await element(by.css('add-dialog .submit')).click()

    await browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6
    browser.sleep(2000)


    const page = getPageElts();
    expect(page.allTrucks.isPresent).toBeTruthy()

    const heroesAfter = await toTruckArray(page.allTrucks);
    expect(heroesAfter.length).toEqual(numTrucks + 1, 'number of trucks');

    expect(heroesAfter.slice(0, numTrucks)).toEqual(trucksBefore, 'Old trucks are still there');

  }

});

async function addToTruckCapacity(num: number): Promise<void> {
  const input = element.all(by.css('input-form input')).get(2);
  await input.clear()
  await input.sendKeys(num);
}

function getTruckById(truckId: string): ElementFinder {
  return element(by.cssContainingText('.tab-row', truckId.toString()));
}

async function toTruckArray(allTrucks: ElementArrayFinder): Promise<Truck[]> {
  return allTrucks.map(truck => Truck.fromLi(truck!));
}
