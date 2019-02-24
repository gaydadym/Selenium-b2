const {By, Key, until } = require('selenium-webdriver');

describe('Task#12', () => {
    let driver = require('selenium-webdriver');

    let chromeCapabilities = driver.Capabilities.chrome();
//setting chrome options to start the browser fully maximized
    let chromeOptions = {
        'args': ['--test-type', '--start-maximized']
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    let browser = new driver.Builder().withCapabilities(chromeCapabilities).build();

    it('Autorization', async () => {
        await browser.get('http://localhost/litecart/admin/');
        await browser.findElement(By.name('username')).sendKeys('admin', Key.RETURN);
        await browser.findElement(By.name('password')).sendKeys('admin', Key.RETURN);
        await browser.wait(until.titleIs('My Store'), 2000);
    });

    it('Opening catalog and product add form', async () => {
        await browser.findElement(By.css('li#app->a[href*=catalog]')).click();
        await browser.wait(until.titleIs('Catalog | My Store'), 2000);
        await browser.findElement(By.css('a.button[href*=edit_product]')).click();
    });

    it('Filling product fields', async () => {

        await browser.findElement(By.css('input[name^=name]')).sendKeys('test_duck');
        await browser.findElement(By.css('input[data-name=Root]')).click();
        await browser.findElement(By.css('input[data-name*=Ducks]')).click();
        await browser.findElement(By.css('input[value="1-3"]')).click();
        await browser.findElement(By.css('input[name=quantity]')).clear();
        await browser.findElement(By.css('input[name=quantity]')).sendKeys('50');
        let imageUrl = await __dirname+'\\images\\image.jpg';
        await browser.findElement(By.css('input[name^=new_images]')).sendKeys(imageUrl);
        await browser.findElement(By.css('input[name=date_valid_from]')).sendKeys('20022019');
        await browser.findElement(By.css('input[name=date_valid_to]')).sendKeys('20022020');
        await browser.findElement(By.css('a[href="#tab-information"]')).click();
        await browser.sleep(100);
        let select = await browser.findElement(By.css('select[name=manufacturer_id]'));
        await select.click();
        select.sendKeys(Key.ARROW_DOWN,Key.RETURN);
        await browser.findElement(By.css('input[name^=short_description]')).sendKeys('Test product');
        await browser.findElement(By.css('a[href="#tab-prices"]')).click();
        await browser.sleep(100);
        await browser.findElement(By.css('input[name=purchase_price]')).clear();
        await browser.findElement(By.css('input[name=purchase_price]')).sendKeys('1000');
        select = await browser.findElement(By.css('select[name*=currency_code]'));
        await select.click();
        await select.sendKeys(Key.ARROW_DOWN,Key.RETURN);
        await browser.findElement(By.css('button[name=save]')).click();
        await browser.wait(until.titleIs('Catalog | My Store'), 2000);
        await console.log('Filling fields done. Starting catalog checking.'+'\n')


    });

    it('Checking added product', async () => {
        await browser.findElement(By.css('a[href*="doc=catalog&category_id=1"]')).click();
        await browser.wait(until.titleIs('Catalog | My Store'), 2000);
        let rows = await browser.findElements(By.css('table.dataTable>tbody>tr'));
        let cells;
        let productAdded = false;
        for (let i = 0;i<rows.length;i++){
            cells = await rows[i].findElements(By.css('td'));
            for (let j = 0;j<cells.length;j++){
                if (await cells[j].getAttribute('textContent')===' test_duck'){
                    productAdded = true;
                    break;
                }
            }
        }
        if (productAdded===true) await console.log('Test passed. Product already added in the catalog');
    });

    after(async () => browser.quit());
});