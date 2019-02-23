const {By, Key, until } = require('selenium-webdriver');

describe('DefaultTest', () => {
    let driver = require('selenium-webdriver');

    let chromeCapabilities = driver.Capabilities.chrome();
//setting chrome options to start the browser fully maximized
    let chromeOptions = {
        'args': ['--test-type', '--start-maximized']
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    let browser = new driver.Builder().withCapabilities(chromeCapabilities).build();

    it('Task#7_autorization', async () => {
        await browser.get('http://localhost/litecart/admin/');
        await browser.findElement(By.name('username')).sendKeys('admin', Key.RETURN);
        await browser.findElement(By.name('password')).sendKeys('admin', Key.RETURN);
        await browser.wait(until.titleIs('My Store'), 2000);
    });
    it('Task#7_finding_Menu_Elements', async()=> {
        let elements = await browser.findElements(By.css("ul#box-apps-menu>li#app-"));
        let i = 0;
        let l = elements.length;
        let subElements;
        while (i<l){
            console.log(i+' итерация');
            elements = await browser.findElements(By.css("ul#box-apps-menu>li#app-"));
            await elements[i].click();
            elements = await browser.findElements(By.css("ul#box-apps-menu>li#app-"));
            subElements = await elements[i].findElements(By.tagName('a'));
            await console.log('В подменю '+subElements.length+ ' элементов');
            for (let j = 0; j < subElements.length; j++) {
                elements = await browser.findElements(By.css("ul#box-apps-menu>li#app-"));
                subElements = await elements[i].findElements(By.tagName('a'));
                await subElements[j].click();
                await console.log('Кликаю по '+(j+1)+' вложенному элементу');
                await browser.findElement(By.tagName('h1'));
                await console.log('Элемент с тегом h1 присутствует на странице');
            }
            i++;
            continue;
        }
    });

    after(async () => browser.quit());
});