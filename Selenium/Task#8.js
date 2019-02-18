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

    it('Task#8. Opening main page', async () => {
        await browser.get('http://localhost/litecart/');
        await browser.wait(until.titleIs('Online Store | My Store'), 2000);
    });
    it('Task#8. Stickers checking', async()=> {
        let elements = await browser.findElements(By.css("div.image-wrapper"));
        let i = 0;
        let l = elements.length;
        let subElements;
        while (i<l){
            console.log(i+1+' товар');
            elements = await browser.findElements(By.css("div.image-wrapper"));
            subElements = await elements[i].findElements(By.css('div[class^=sticker]'));
            if (subElements.length===1) await console.log('ОК. У товара один стикер');
            else if (subElements.length===0) await console.log('TEST FAILED. У товара нет стикеров!!! ');
            else if (subElements.length>1) await console.log('TEST FAILED. У товара более одного стикера!!! ');
            i++;
        }
    });

    after(async () => browser.quit());
});