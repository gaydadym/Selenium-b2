const {By, Key, until } = require('selenium-webdriver');

describe('Task#17', () => {
    let driver = require('selenium-webdriver');

    let chromeCapabilities = driver.Capabilities.chrome();
//setting chrome options to start the browser fully maximized
    let chromeOptions = {
        'args': ['--test-type', '--start-maximized']
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    let browser = new driver.Builder().withCapabilities(chromeCapabilities).build();

    it('Autorization and opening catalog page', async () => {
        await browser.get('http://localhost/litecart/admin/');
        await browser.findElement(By.name('username')).sendKeys('admin', Key.RETURN);
        await browser.findElement(By.name('password')).sendKeys('admin', Key.RETURN);
        await browser.wait(until.titleIs('My Store'), 2000);
        await browser.get('http://localhost/litecart/admin/?app=catalog&doc=catalog&category_id=1');
        await browser.wait(until.titleIs('Catalog | My Store'),2000);
    });

    it('Opening product page and checking browser log', async () => {
        let links = await browser.findElements(By.css('tr.row>td>a'));
        let logs;
        for (let i=0;i<links.length;i=i+2){
            links = await browser.findElements(By.css('tr.row>td>a'));
            await links[i].click();
            await console.log('Зашел на страницу товара, вывожу логи браузера');
            logs = await browser.manage().logs().get("browser");
            if (logs.length>0)console.log(logs);
            else console.log('логи пустые');
            await browser.get('http://localhost/litecart/admin/?app=catalog&doc=catalog&category_id=1');
        }
    });


    after(async () => browser.quit());
});