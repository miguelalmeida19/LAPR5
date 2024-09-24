import { browser, element, by, ElementFinder, ElementArrayFinder } from 'protractor';
import {By} from "selenium-webdriver";


const targetWarehouse = {
  id : "W02",
  designation : "Warehouse Gondomar",
  street : "Rua de Gondomar",
  postalCode : "4300-100",
  location : "Gondomar",
  latitude : 44,
  longitude : 44
};

const newWarehouse = {
  id : "W01",
  designation : "Warehouse Porto",
  street : "Rua do Porto",
  postalCode : "4400-400",
  location : "Porto",
  latitude : 33,
  longitude : 33
};

const latitudeAppend = 48;
const newWarehouseLatitude = latitudeAppend;


class Warehouse{
  constructor(public id:string, public designation:string, public street:string, public postalCode:string, public location:string, public latitude:number, public longitude:number ) {
  }

  // Factory methods

  // Warehouse from string formatted as '<id> <designation> <street> <postalCode> <location> <latitude> <longitude>'.
  static fromString(s: string):Warehouse{
    return new Warehouse(
      s.substring(0,s.indexOf('')),
      s.slice(s.indexOf('') + 1),
      s.slice(s.indexOf('') + 2),
      s.slice(s.indexOf('') + 3),
      s.slice(s.indexOf('') + 4),
      +s.slice(s.indexOf('') + 5),
      +s.slice(s.indexOf('') + 6),
    );
  }

  //Warehouse from warehouse list <li> element.
  static async fromLi(li: ElementFinder): Promise<Warehouse>{
    const stringsFromA = await li.getText();
    const strings = stringsFromA.split('\n');
    return{
      id: strings[0], designation: strings[1],
      street: strings[2], postalCode: strings[3], location: strings[4],
      latitude: +strings[5], longitude: +strings[6],
    };
  }

  // Warehouse id and name from the given detail element.
  static async fromDetail(detail: ElementFinder): Promise<Warehouse> {
    // Get warehouse id
    const id = await detail.all(by.css('input-form input')).get(0).getAttribute("placeholder")
    // Get designation
    const designation = await detail.all(by.css('input-form input')).get(1).getAttribute("placeholder")
    // Get street
    const street = await detail.all(by.css('input-form input')).get(2).getAttribute("placeholder")
    // Get postal code
    const postalCode = await detail.all(by.css('input-form input')).get(3).getAttribute("placeholder")
    // Get location
    const location = await detail.all(by.css('input-form input')).get(4).getAttribute("placeholder")
    // Get latitude
    const latitude = await detail.all(by.css('input-form input')).get(5).getAttribute("placeholder")
    // Get longitude
    const longitude = await detail.all(by.css('input-form input')).get(6).getAttribute("placeholder")

    return {
      id: id,
      designation: designation,
      street: street,
      postalCode: postalCode,
      location: location,
      latitude: +latitude,
      longitude: +longitude,
    };
  }
}

describe('Warehouse tests', () => {


  function getPageElts() {
    const navElts = element.all(by.css('.page'));

    return {
      navElts,

      appWarehousesHref: navElts.get(2),
      appWarehouses: element(by.css('app-root app-warehouses')),
      allWarehouses: element.all(by.css('app-root app-warehouses table-component .tab-row')),

      warehouseDetail: element(by.css('app-root app-warehouse-detail details-component')),

      updateWarehouseButton: element(by.cssContainingText('div button','Save changes'))

    };
  }

  describe('Warehouse tests', () => {

    beforeAll(async () => {
      browser.get('https://localhost:4200/')
      await browser.sleep(3000)
    });

    it('can switch to Warehouses view', async () => {
      await getPageElts().appWarehousesHref.click();
      await browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6
      const page = getPageElts();
      expect(await page.appWarehouses.isPresent()).toBeTruthy();
      expect(await page.allWarehouses.count()).toEqual(16, 'number of warehouses');
    });

    it('can route to warehouse details', async () => {
      await browser.findElement(By.css('#warehouses')).click()
      await browser.sleep(1000)
      await browser.findElement(By.xpath('/html/body/app-root/app-warehouses/table-component/div/div[3]/div[3]')).click()
      await browser.sleep(1000)
      const page = getPageElts();
      expect(await page.warehouseDetail.isPresent()).toBeTruthy('shows warehouse detail');
      const warehouse = await Warehouse.fromDetail(page.warehouseDetail);
      expect(warehouse.id).toEqual(targetWarehouse.id);
      expect(warehouse.designation).toEqual(targetWarehouse.designation);
      expect(warehouse.street).toEqual(targetWarehouse.street);
      expect(warehouse.postalCode).toEqual(targetWarehouse.postalCode);
      expect(warehouse.location).toEqual(targetWarehouse.location);
      expect(warehouse.latitude).toEqual(targetWarehouse.latitude);
      expect(warehouse.longitude).toEqual(targetWarehouse.longitude);

    });

    it(`updates Warehouse (${targetWarehouse.id}) latitude (${newWarehouseLatitude}) in warehouse details view`, updateWarehouseLatitudeInDetailView);

    it(`shows ${targetWarehouse.id} in Warehouses list`, async () => {
      const page = getPageElts();
      page.updateWarehouseButton.click();
      await browser.waitForAngular();
      await browser.waitForAngular();
      await browser.waitForAngular();
      await browser.waitForAngular();
      const expectedText = +`${newWarehouseLatitude}`;
      expect(+(await getWarehouseById(targetWarehouse.id).all(by.css(".col")).get(5).getText())).toEqual(expectedText);
    });

    it(`adds new Warehouse`, async () => {
      const warehousesBefore = await toWarehouseArray(getPageElts().allWarehouses);
      const numWarehouses = warehousesBefore.length;

      await addNewWarehouse(numWarehouses, warehousesBefore)
    });

    it('can deactivate a Warehouse', async () => {
      await getPageElts().appWarehousesHref.click();
      await browser.waitForAngular();
      await browser.sleep(2000)
      let checked = await browser.findElement(By.xpath('/html/body/app-root/app-warehouses/table-component/div/div[3]/div[8]/div/input')).getAttribute('checked')
      expect(checked).toBeTruthy();
      await browser.findElement(By.xpath('/html/body/app-root/app-warehouses/table-component/div/div[3]/div[8]/div/input')).click()
      await browser.sleep(2000)
      checked = await browser.findElement(By.xpath('/html/body/app-root/app-warehouses/table-component/div/div[3]/div[8]/div/input')).getAttribute('checked')
      expect(checked).toBeNull();
    })

  });

  async function updateWarehouseLatitudeInDetailView() {
    // Assumes that the current view is the warehouse details view.
    await addToWarehouseLatitude(latitudeAppend);

    const page = getPageElts();

    const warehouse = await Warehouse.fromDetail(page.warehouseDetail);

    expect(warehouse.id).toEqual(targetWarehouse.id);
    expect(warehouse.designation).toEqual(targetWarehouse.designation);
    expect(warehouse.street).toEqual(targetWarehouse.street);
    expect(warehouse.postalCode).toEqual(targetWarehouse.postalCode);
    expect(warehouse.location).toEqual(targetWarehouse.location);
    expect(warehouse.latitude).toEqual(newWarehouseLatitude);
    expect(warehouse.longitude).toEqual(targetWarehouse.longitude);
  }


async function addNewWarehouse(numWarehouses:number, warehousesBefore:Warehouse[]): Promise<void>{
  await element(by.css('header-add .add-button')).click()
  await browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6
  await browser.sleep(2000)

  // Warehouse Id
  await element.all(by.css("add-dialog .form-control")).get(0).clear()
  await element.all(by.css("add-dialog .form-control")).get(0).sendKeys(newWarehouse.id)

  // Designation
  await element.all(by.css("add-dialog .form-control")).get(1).clear()
  await element.all(by.css("add-dialog .form-control")).get(1).sendKeys(newWarehouse.designation)

  // Street
  await element.all(by.css("add-dialog .form-control")).get(2).clear()
  await element.all(by.css("add-dialog .form-control")).get(2).sendKeys(newWarehouse.street)

  // Postal Code
  await element.all(by.css("add-dialog .form-control")).get(3).clear()
  await element.all(by.css("add-dialog .form-control")).get(3).sendKeys(newWarehouse.postalCode)

  // Location
  await element.all(by.css("add-dialog .form-control")).get(4).clear()
  await element.all(by.css("add-dialog .form-control")).get(4).sendKeys(newWarehouse.location)

  // Laitude
  await element.all(by.css("add-dialog .form-control")).get(5).clear()
  await element.all(by.css("add-dialog .form-control")).get(5).sendKeys(newWarehouse.latitude)

  // Longitude
  await element.all(by.css("add-dialog .form-control")).get(6).clear()
  await element.all(by.css("add-dialog .form-control")).get(6).sendKeys(newWarehouse.longitude)


  await element(by.css('add-dialog .submit')).click()

  await browser.waitForAngular();
  browser.sleep(2000)

  const page = getPageElts();
  expect(page.allWarehouses.isPresent).toBeTruthy()

  const heroesAfter = await toWarehouseArray(page.allWarehouses);
  expect(heroesAfter.length).toEqual(numWarehouses + 1, 'number of warehouses');

  expect(heroesAfter.slice(0, numWarehouses)).toEqual(warehousesBefore, 'Old warehouses are still there');

}

});

function getWarehouseById(id: string): ElementFinder {
  return element(by.cssContainingText('.tab-row', id.toString()));
}

async function addToWarehouseLatitude(s: number): Promise<void> {
  const input = element.all(by.css('input-form input')).get(5);
  await input.clear()
  await input.sendKeys(s);
}

async function toWarehouseArray(allWarehouses: ElementArrayFinder): Promise<Warehouse[]> {
  return allWarehouses.map(warehouse => Warehouse.fromLi(warehouse!));
}
